package com.lightsupport.backend.utils.RabbitMQ;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lightsupport.backend.services.MessagingService;
import com.rabbitmq.client.*;
import jakarta.annotation.PostConstruct;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RabbitMQConsumer {

    private final MessagingService messagingService;
    private final Map<String, WebSocketSession> activeSessions;

    public RabbitMQConsumer(MessagingService messagingService,
                            Map<String, WebSocketSession> activeSessions) {
        this.messagingService = messagingService;
        this.activeSessions = activeSessions;
    }

    /**
     * Start consuming messages for a specific user.
     * Called when a user logs in / opens a WebSocket session.
     */
    public void startUserConsumer(String userId, WebSocketSession session) {
        try {
            // MessagingService handles queue declaration and consumption internally
            messagingService.startUserConsumer(userId, session);

            // Keep track of session
            activeSessions.put(userId, session);

            System.out.println("[RabbitMQConsumer] Consumer started for user: " + userId);

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("[RabbitMQConsumer] Failed to start consumer for user: " + userId);
        }
    }

    /**
     * Stop consuming messages for a user if needed (e.g., logout/disconnect)
     */
    public void stopUserConsumer(String userId) {
        activeSessions.remove(userId);
        // Optional: you can cancel the consumer from MessagingService if needed
        System.out.println("[RabbitMQConsumer] Consumer stopped for user: " + userId);
    }
}