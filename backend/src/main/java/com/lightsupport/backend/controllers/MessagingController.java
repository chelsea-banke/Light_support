package com.lightsupport.backend.controllers;

import com.lightsupport.backend.services.AIMessagingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/messages")
public class MessagingController {
    private final AIMessagingService messagingService;

    @Autowired
    public MessagingController(AIMessagingService messagingService) {
        this.messagingService = messagingService;
    }

    @GetMapping("get-all")
    public ResponseEntity<?> getMessages(@RequestParam String faultId) {
        System.out.println(faultId);
        return messagingService.getAllMessages(faultId);
    }

}
