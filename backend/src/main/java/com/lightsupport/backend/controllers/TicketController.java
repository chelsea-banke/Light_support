package com.lightsupport.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.requests.CreateQueryTicketDto;
import com.lightsupport.backend.dto.requests.CreateTicketDto;
import com.lightsupport.backend.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTicket(@RequestBody CreateTicketDto createTicketDto){
        return ResponseEntity.ok(ticketService.createTicket(createTicketDto));
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(Authentication authentication) throws JsonProcessingException {
        String matricule = authentication.getName();
        return ResponseEntity.ok(ticketService.getAllTickets(matricule));
    }

    @GetMapping("/get")
    public ResponseEntity<?> getTicket(@RequestParam String faultId) throws JsonProcessingException {
        return ResponseEntity.ok(ticketService.getTicket(faultId));
    }
}
