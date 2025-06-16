package com.lightsupport.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.response.FaultResponseDto;
import com.lightsupport.backend.models.Fault;
import com.lightsupport.backend.repositories.FaultRepo;
import com.lightsupport.backend.services.FaultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fault")
public class FaultController {

    private final FaultService faultService;
    private final FaultRepo faultRepo;

    @Autowired
    public FaultController(FaultService faultService, FaultRepo faultRepo) {
        this.faultService = faultService;
        this.faultRepo = faultRepo;
    }

    @GetMapping("/get-all")
    public List<FaultResponseDto> getAllFaults(Authentication authentication) throws JsonProcessingException {
        String clientId = authentication.getName();
//        return faultRepo.findByIdUserId(authentication.getName());
        return faultService.getAllFaults(clientId);
    }
}