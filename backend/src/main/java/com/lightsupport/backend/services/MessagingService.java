package com.lightsupport.backend.services;

import com.lightsupport.backend.dto.MessageDto;
import com.lightsupport.backend.models.ChatSession;
import com.lightsupport.backend.models.Message;
import com.lightsupport.backend.repositories.AnswerRepo;
import com.lightsupport.backend.repositories.ChatSessionRepo;
import com.lightsupport.backend.repositories.MessageRepo;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
            Message message = new Message(messageDto.getContent(), chatSessionObj);
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

        messages.addAll(
                answerRepo.findByIdChatSession_Id(chatSession.getId())
                        .stream().map(answer -> modelMapper.map(answer, MessageDto.class))
                        .toList()
        );

        return ResponseEntity.ok(messages);
    }
}
