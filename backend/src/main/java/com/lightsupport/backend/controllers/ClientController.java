package com.lightsupport.backend.controllers;

import com.lightsupport.backend.dto.requests.CreateFaultRequestDto;
import com.lightsupport.backend.services.FaultService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
public class ClientController {
    private final FaultService faultService;

    public ClientController(FaultService faultService) {
        this.faultService = faultService;
    }

    @PostMapping("/create-fault")
    public ResponseEntity<?> createFault(@RequestBody final CreateFaultRequestDto createFaultRequestDto, Authentication authentication) {
        String clientId = authentication.getName();
        System.out.println(clientId);
        return faultService.createFault(clientId, createFaultRequestDto);
    }
}
