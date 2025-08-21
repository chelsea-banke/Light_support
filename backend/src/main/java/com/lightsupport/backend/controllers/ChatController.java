package com.lightsupport.backend.controllers;// ChatController.java
import com.lightsupport.backend.services.MessagingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final MessagingService messagingService;

    public ChatController(MessagingService messagingService) {
        this.messagingService = messagingService;
    }

//    @PostMapping("/{chatId}/send")
//    public void sendMessage(@PathVariable String chatId, @RequestBody String message) {
//        messagingService.sendToChat(chatId, message);
//    }
}
