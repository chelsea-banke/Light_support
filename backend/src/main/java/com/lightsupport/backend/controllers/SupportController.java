package com.lightsupport.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.services.FaultService;
import com.lightsupport.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/support")
public class SupportController {

    final FaultService faultService;
    final UserService userService;

    @Autowired
    public SupportController(FaultService faultService, UserService userService) {
        this.faultService = faultService;
        this.userService = userService;
    }

    @GetMapping("/get-faults")
    ResponseEntity<?> getFaults(Authentication authentication) {
        return ResponseEntity.ok(faultService.getAllFaults());
    }

    @GetMapping("/get-client")
    ResponseEntity<?> getClient(@RequestParam String faultId) {
        return ResponseEntity.ok(userService.getClient(faultId));
    }

}
