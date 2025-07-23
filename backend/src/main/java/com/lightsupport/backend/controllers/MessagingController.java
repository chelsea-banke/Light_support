package com.lightsupport.backend.controllers;

import com.lightsupport.backend.services.MessagingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/messages")
public class MessagingController {
    private final MessagingService messagingService;

    @Autowired
    public MessagingController(MessagingService messagingService) {
        this.messagingService = messagingService;
    }

    @GetMapping("get-all")
    public ResponseEntity<?> getMessages(@RequestParam String faultId) {
        return messagingService.getAllMessages(faultId);
    }

}
