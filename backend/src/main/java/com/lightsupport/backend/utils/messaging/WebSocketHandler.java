package com.lightsupport.backend.utils.messaging;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lightsupport.backend.dto.MessageDto;
import com.lightsupport.backend.models.Fault;
import com.lightsupport.backend.models.Message;
import com.lightsupport.backend.models.types.MessageSource;
import com.lightsupport.backend.models.types.MessageType;
import com.lightsupport.backend.repositories.FaultRepo;
import com.lightsupport.backend.repositories.MessageRepo;
import com.lightsupport.backend.services.MessagingService;
import com.lightsupport.backend.utils.JsonUtil;
import com.lightsupport.backend.utils.RabbitMQ.RabbitMQConsumer;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final MessagingService messagingService;
    private final ObjectMapper mapper = new ObjectMapper();
    private final ModelMapper modelMapper = new ModelMapper();

    // Map of connected clients
    private final Map<String, WebSocketSession> activeSessions = new ConcurrentHashMap<>();
    private final MessageRepo messageRepo;
    private final FaultRepo faultRepo;

    public WebSocketHandler(MessagingService messagingService,
                            MessageRepo messageRepo,
                            FaultRepo faultRepo) {
        this.messagingService = messagingService;
        this.messageRepo = messageRepo;
        this.faultRepo = faultRepo;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String userId = session.getUri().getQuery().split("[=&]")[1];
        if(!userId.isEmpty()){
            activeSessions.put(userId, session);
            // Start consuming messages from user's queue
            messagingService.startUserConsumer(userId, session);
        }
    }


    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonNode json = mapper.readTree(message.getPayload());

        String type = json.path("type").asText();
        String clientId = json.path("clientId").asText("");
        String supportId = json.path("supportId").asText("");
        String faultId = json.path("faultId").asText("");

        if (supportId == null || supportId.isEmpty() || clientId == null || clientId.isEmpty() || Objects.equals(type, "PING")) {
            System.err.println("[WebSocket] Missing destinations in message: " + message.getPayload());
            return;
        }

        Fault fault = faultRepo.findById(faultId).orElseThrow(()-> new EntityNotFoundException("can't find parent fault for message"));
        MessageDto messageDto = modelMapper.map(messageRepo
                .save(new Message(json.path("content").asText(""), fault, MessageSource.valueOf(json.path("source").asText("CLIENT")))),
                MessageDto.class);

        ObjectNode messageNode = json.deepCopy();
        messageNode.put("createdDate", messageDto.getCreatedDate().toString());
        if (messagingService.isConsumerActive("client-"+faultId)) {
            messageNode.put("type", "CHAT");
            messagingService.sendMessageToUser("client-"+faultId, mapper.writeValueAsString(messageNode));
        }
        else {
            ObjectNode alertPayload = json.deepCopy();
            alertPayload.put("type", "ALERT");
            messagingService.sendMessageToUser(clientId, mapper.writeValueAsString(alertPayload));
        }
        if (messagingService.isConsumerActive("support-"+faultId)) {
            messageNode.put("type", "CHAT");
            messagingService.sendMessageToUser("support-"+faultId, mapper.writeValueAsString(messageNode));
        }
        else {
            ObjectNode alertPayload = json.deepCopy();
            alertPayload.put("type", "ALERT");
            messagingService.sendMessageToUser(supportId, mapper.writeValueAsString(alertPayload));
        }
        System.out.println("[WebSocket] Message between " + clientId + " and " + supportId);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException {
        String userId = null;

        // Find which user had this session
        for (Map.Entry<String, WebSocketSession> entry : activeSessions.entrySet()) {
            if (entry.getValue().equals(session)) {
                userId = entry.getKey();
                activeSessions.remove(userId);
                break;
            }
        }

        if (userId != null) {
            messagingService.stopUserConsumer(userId);
            System.out.println("[WebSocket] Closed connection and stopped consumer for user: " + userId);
        }
    }
}