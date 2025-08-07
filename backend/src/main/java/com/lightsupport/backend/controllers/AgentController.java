package com.lightsupport.backend.controllers;

import com.lightsupport.backend.dto.FaultUpdateDto;
import com.lightsupport.backend.dto.requests.CreateTicketDto;
import com.lightsupport.backend.services.AgentService;
import com.lightsupport.backend.services.FaultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai-agent")
public class AgentController {

    private final FaultService faultService;
    private final AgentService agentService;

    public AgentController(FaultService faultService, AgentService agentService) {
        this.faultService = faultService;
        this.agentService = agentService;
    }

    @PostMapping("/update-description")
    public ResponseEntity<?> updateDescription(@RequestBody FaultUpdateDto faultUpdateDto) {
        return ResponseEntity.ok(faultService.updateDescription(faultUpdateDto));
    }

    @PostMapping("/create-query-ticket")
    public ResponseEntity<?> createQueryTicket(@RequestBody CreateTicketDto createTicketDto){
        return ResponseEntity.ok(agentService.createQueryTicket(createTicketDto));
    }

    @PostMapping("/create-intervention-ticket")
    public ResponseEntity<?> createInterventionTicket(@RequestBody CreateTicketDto createTicketDto){
        return ResponseEntity.ok(agentService.createInterventionTicket(createTicketDto));
    }

    @PostMapping("/close-fault")
    public ResponseEntity<?> closeFault(@RequestBody FaultUpdateDto faultUpdateDto){
        return ResponseEntity.ok(agentService.closeTicket(faultUpdateDto));
    }
}