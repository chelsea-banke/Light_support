package com.lightsupport.backend.utils.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.lightsupport.backend.dto.MessageDto;
import com.lightsupport.backend.models.Message;
import com.lightsupport.backend.models.types.MessageType;
import com.lightsupport.backend.repositories.ChatSessionRepo;
import com.lightsupport.backend.services.MessagingService;
import com.lightsupport.backend.utils.JsonUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.stereotype.Component;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
    private final ChatSessionRepo chatSessionRepo;
    private final MessagingService messagingService;
    private final SessionRegistry sessionRegistry;

    @Autowired
    public WebSocketHandler(ChatSessionRepo chatSessionRepo, MessagingService messagingService, SessionRegistry sessionRegistry) {
        this.chatSessionRepo = chatSessionRepo;
        this.messagingService = messagingService;
        this.sessionRegistry = sessionRegistry;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessionRegistry.register(session);
//        System.out.println("WebSocket connection established: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
            // Convert JSON string to DTO
            JsonUtil jsonUtil = new JsonUtil();
            MessageDto incoming = objectMapper.readValue(message.getPayload(), MessageDto.class);
            jsonUtil.printOut("incomming: "+incoming);
            incoming.setChatId(chatSessionRepo.findByIdFault_Id(incoming.getChatId()).get(0).getId());

            MessageDto sentMessage = messagingService.saveMessage(incoming);
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(sentMessage)));

            MessageDto recievedMessage = new MessageDto(messagingService.queryAiAgent(sentMessage), sentMessage.getChatId(), MessageType.RECIEVED);
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(messagingService.saveMessage(recievedMessage))));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("WebSocket closed: " + session.getId());
    }
}