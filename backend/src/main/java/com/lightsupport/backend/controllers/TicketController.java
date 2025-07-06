package com.lightsupport.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.TicketDto;
import com.lightsupport.backend.dto.requests.CreateTicketRequestDto;
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
    public ResponseEntity<?> createTicket(@RequestBody CreateTicketRequestDto createTicketRequestDto){
        return ResponseEntity.ok(ticketService.createTicket(createTicketRequestDto));
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(Authentication authentication) throws JsonProcessingException {
        String matricule = authentication.getName();
        return ResponseEntity.ok(ticketService.getAllTickets(matricule));
    }
}
