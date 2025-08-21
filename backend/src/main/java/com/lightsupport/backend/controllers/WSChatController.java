package com.lightsupport.backend.controllers;

import com.lightsupport.backend.dto.MessageDto;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/send") // Client sends to: /app/send
    @SendTo("/topic/messages") // Broadcast to subscribers of /topic/messages
    public String handleMessage(@Payload String message) {
        return message;
    }
}