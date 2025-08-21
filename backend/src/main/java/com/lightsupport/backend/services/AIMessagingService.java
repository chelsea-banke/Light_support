package com.lightsupport.backend.services;

import com.lightsupport.backend.dto.MessageDto;
import com.lightsupport.backend.models.ChatSession;
import com.lightsupport.backend.models.Fault;
import com.lightsupport.backend.models.Message;
import com.lightsupport.backend.repositories.AnswerRepo;
import com.lightsupport.backend.repositories.ChatSessionRepo;
import com.lightsupport.backend.repositories.FaultRepo;
import com.lightsupport.backend.repositories.MessageRepo;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import java.util.Map;

@Service
public class AIMessagingService {
    private final ChatSessionRepo chatSessionRepo;
    private final MessageRepo messageRepo;
    private final ModelMapper modelMapper;
    private final AnswerRepo answerRepo;
    private final FaultRepo faultRepo;

    @Autowired
    public AIMessagingService(ChatSessionRepo chatSessionRepo, MessageRepo messageRepo, ModelMapper modelMapper, AnswerRepo answerRepo,
                              FaultRepo faultRepo) {
        this.chatSessionRepo = chatSessionRepo;
        this.messageRepo = messageRepo;
        this.modelMapper = modelMapper;
        this.answerRepo = answerRepo;
        this.faultRepo = faultRepo;
    }

    public void saveMessage(MessageDto messageDto) {
        Fault fault = faultRepo.findById(messageDto.getFaultId()).orElseThrow(()->new EntityNotFoundException("ChatSession not found with ID: " + messageDto.getFaultId()));
        Message message = new Message(messageDto.getContent(), fault, messageDto.getSource());
        modelMapper.map(messageRepo.save(message), MessageDto.class);
    }

    public ResponseEntity<?> getAllMessages(String faultId) {
        List<MessageDto> messages = new ArrayList<>(messageRepo.findByIdFault_Id(faultId)
                .stream().map(message -> modelMapper.map(message, MessageDto.class))
                .toList());

        return ResponseEntity.ok(messages);
    }

    public String queryAiAgent(MessageDto message) {
        String webhookUrl = "http://localhost:5678/webhook/bcdbc4be-3c38-4c9c-bcc7-ba2e14312d60";

        // Prepare payload safely (null-safe)
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", message.getId());
        payload.put("content", message.getContent());
        payload.put("faultId", message.getFaultId());
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
