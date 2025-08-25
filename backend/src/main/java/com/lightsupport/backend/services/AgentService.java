package com.lightsupport.backend.services;

import com.lightsupport.backend.dto.FaultUpdateDto;
import com.lightsupport.backend.dto.TicketDto;
import com.lightsupport.backend.dto.requests.CreateTicketDto;
import com.lightsupport.backend.models.Asset;
import com.lightsupport.backend.models.Ticket;
import com.lightsupport.backend.models.User;
import com.lightsupport.backend.models.types.FaultType;
import com.lightsupport.backend.models.types.Status;
import com.lightsupport.backend.repositories.AssetRepo;
import com.lightsupport.backend.repositories.TicketRepo;
import com.lightsupport.backend.repositories.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AgentService {

    private final UserRepo userRepo;
    private final TicketRepo ticketRepo;
    private final FaultService faultService;
    private final ModelMapper modelMapper;
    private final TicketService ticketService;

    @Autowired
    public AgentService(UserRepo userRepo, TicketRepo ticketRepo, FaultService faultService, ModelMapper modelMapper, TicketService ticketService) {
        this.userRepo = userRepo;
        this.ticketRepo = ticketRepo;
        this.faultService = faultService;
        this.modelMapper = modelMapper;
        this.ticketService = ticketService;
    }

    public Boolean closeTicket(FaultUpdateDto faultUpdateDto){
        faultService.updateDescription(faultUpdateDto);
        faultUpdateDto.setStatus(Status.COMPLETED);
        faultService.updateFaultStatus(faultUpdateDto);
        return true;
    }

    @Transactional
    public Boolean createQueryTicket(CreateTicketDto createTicketDto){
        FaultUpdateDto faultUpdateDto = modelMapper.map(createTicketDto, FaultUpdateDto.class);
        faultUpdateDto.setType(FaultType.ADVANCED_QUERY);
        faultUpdateDto.setStatus(Status.PENDING);
        faultService.updateDescription(faultUpdateDto);
        faultService.updateFaultStatus(faultUpdateDto);
        faultService.updateType(faultUpdateDto);
        ticketService.createTicket(createTicketDto);
        return true;
    }

    @Transactional
    public Boolean createInterventionTicket(CreateTicketDto createTicketDto){
        FaultUpdateDto faultUpdateDto = modelMapper.map(createTicketDto, FaultUpdateDto.class);
        faultUpdateDto.setStatus(Status.PENDING);
        faultUpdateDto.setType(FaultType.FIELD_INTERVENTION);
        faultService.updateDescription(faultUpdateDto);
        faultService.updateFaultStatus(faultUpdateDto);
        faultService.updateType(faultUpdateDto);
        ticketService.createTicket(createTicketDto);
        return true;
    }

    @Transactional
    public Boolean assignTicket(String ticketId){
        User fieldTech = userRepo.findAvailableFieldTech()
                .orElseThrow(() -> new EntityNotFoundException("no available fieldTech found"));
        Ticket ticket = ticketRepo.findById(ticketId).orElseThrow(() -> new EntityNotFoundException("ticket not found"));
        ticket.setIdFieldSupport(fieldTech);
        return true;
    }
}