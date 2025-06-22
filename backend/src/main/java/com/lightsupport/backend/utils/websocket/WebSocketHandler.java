package com.lightsupport.backend.utils.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.lightsupport.backend.dto.MessageDto;
import com.lightsupport.backend.repositories.ChatSessionRepo;
import com.lightsupport.backend.services.MessagingService;
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
        try {
            // Convert JSON string to DTO
            MessageDto incoming = objectMapper.readValue(message.getPayload(), MessageDto.class);
            incoming.setChatId(chatSessionRepo.findByIdFault_Id(incoming.getChatId()).get(0).getId());
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(messagingService.saveMessage(incoming))));
        } catch (Exception e) {
            e.printStackTrace();
            session.sendMessage(new TextMessage("{\"error\": \"Invalid message format\"}"));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("WebSocket closed: " + session.getId());
    }
}