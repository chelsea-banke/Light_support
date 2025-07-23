package com.lightsupport.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lightsupport.backend.dto.MessageDto;
import com.lightsupport.backend.models.ChatSession;
import com.lightsupport.backend.models.Message;
import com.lightsupport.backend.repositories.AnswerRepo;
import com.lightsupport.backend.repositories.ChatSessionRepo;
import com.lightsupport.backend.repositories.MessageRepo;
import com.lightsupport.backend.utils.JsonUtil;
import com.lightsupport.backend.utils.jwt.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;

import java.net.URI;
import java.net.http.HttpRequest;
import java.util.Map;

@Service
public class MessagingService {
    private final ChatSessionRepo chatSessionRepo;
    private final MessageRepo messageRepo;
    private final ModelMapper modelMapper;
    private final AnswerRepo answerRepo;

    @Autowired
    public MessagingService(ChatSessionRepo chatSessionRepo, MessageRepo messageRepo, ModelMapper modelMapper, AnswerRepo answerRepo) {
        this.chatSessionRepo = chatSessionRepo;
        this.messageRepo = messageRepo;
        this.modelMapper = modelMapper;
        this.answerRepo = answerRepo;
    }

    public MessageDto saveMessage(MessageDto messageDto) {
        Optional<ChatSession> chatSession = chatSessionRepo.findById(messageDto.getChatId());
        if(chatSession.isPresent()) {
            ChatSession chatSessionObj = chatSession.get();
            Message message = new Message(messageDto.getContent(), chatSessionObj, messageDto.getType());
            return modelMapper.map(messageRepo.save(message), MessageDto.class);
        }
        else{
            throw new EntityNotFoundException("ChatSession not found with ID: " + messageDto.getChatId());
        }
    }

    public ResponseEntity<?> getAllMessages(String faultId) {
        List<ChatSession> chatSessionOptional = chatSessionRepo.findByIdFault_Id(faultId);
        if (chatSessionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chat session not found");
        }

        ChatSession chatSession = chatSessionOptional.get(0);
        List<MessageDto> messages = new ArrayList<>();

        messages.addAll(
                messageRepo.findByIdChatSession_Id(chatSession.getId())
                        .stream().map(message -> modelMapper.map(message, MessageDto.class))
                        .toList()
        );

        return ResponseEntity.ok(messages);
    }

    public String queryAiAgent(MessageDto message) {
        String webhookUrl = "http://localhost:5678/webhook/bcdbc4be-3c38-4c9c-bcc7-ba2e14312d60";

        // Prepare payload safely (null-safe)
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", message.getId());
        payload.put("chatId", message.getChatId());
        payload.put("content", message.getContent());
        payload.put("preload", false);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Combine headers and body
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        // Initialize RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // Send POST request and parse response
        Map<String, Object> response = restTemplate.postForObject(webhookUrl, entity, Map.class);

        // Extract and return the "reply"
        System.out.println(response);
        if (response != null && response.containsKey("output")) {
            return response.get("output").toString();
        } else {
            throw new RuntimeException("No reply field found in the response");
        }
    }
}
