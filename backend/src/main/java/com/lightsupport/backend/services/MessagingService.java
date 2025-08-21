package com.lightsupport.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.configs.RabbitMQConfig;
import com.lightsupport.backend.utils.JsonUtil;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MessagingService {

    private final ConnectionFactory connectionFactory;
    private Connection connection;
    private Channel channel;

    // Track active consumers (userId -> consumerTag)
    private final Map<String, String> activeConsumers = new ConcurrentHashMap<>();

    public MessagingService(ConnectionFactory connectionFactory) {
        this.connectionFactory = connectionFactory;
    }

    @PostConstruct
    public void init() throws Exception {
        connection = connectionFactory.newConnection();
        channel = connection.createChannel();
    }

    public void bindUserQueue(String userId) throws IOException {
        channel.queueDeclare(userId, false, false, true, null);
    }

    public void sendMessageToUser(String userId, String message) throws IOException {
        channel.basicPublish("", userId, null, message.getBytes());
        System.out.println("[MessagingService] Sent message to user " + userId);
    }

    /**
     * Start consuming messages from a specific user's queue
     */
    public void startUserConsumer(String userId, WebSocketSession session) throws IOException {
        bindUserQueue(userId);

        String consumerTag = channel.basicConsume(userId, true, (tag, delivery) -> {
            String payload = new String(delivery.getBody());

            if (session.isOpen()) {
                session.sendMessage(new TextMessage(payload));
            }
        }, tag -> {
            System.out.println("[MessagingService] Consumer cancelled: " + tag);
            activeConsumers.remove(userId); // cleanup when cancelled
        });

        activeConsumers.put(userId, consumerTag);
        System.out.println("[MessagingService] Started consumer for user: " + userId);
    }

    /**
     * Check if a user already has an active consumer
     */
    public boolean isConsumerActive(String userId) {
        System.out.println("A: "+ userId);
        return activeConsumers.containsKey(userId);
    }

    /**
     * Stop consuming for a specific user
     */
    public void stopUserConsumer(String userId) throws IOException {
        String consumerTag = activeConsumers.remove(userId);
        if (consumerTag != null) {
            channel.basicCancel(consumerTag);
            channel.queueDelete(consumerTag);
            System.out.println("[MessagingService] Stopped consumer for user: " + consumerTag);
        }
    }

    @PreDestroy
    public void cleanup() throws Exception {
        for (String consumerTag : activeConsumers.values()) {
            channel.basicCancel(consumerTag);
        }
        activeConsumers.clear();

        if (channel != null && channel.isOpen()) channel.close();
        if (connection != null && connection.isOpen()) connection.close();
    }
}