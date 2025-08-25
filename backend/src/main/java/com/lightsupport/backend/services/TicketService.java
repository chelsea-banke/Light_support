package com.lightsupport.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.TicketDto;
import com.lightsupport.backend.dto.requests.CreateTicketDto;
import com.lightsupport.backend.models.Asset;
import com.lightsupport.backend.models.Fault;
import com.lightsupport.backend.models.Ticket;
import com.lightsupport.backend.models.User;
import com.lightsupport.backend.models.types.FaultType;
import com.lightsupport.backend.repositories.AssetRepo;
import com.lightsupport.backend.repositories.FaultRepo;
import com.lightsupport.backend.repositories.TicketRepo;
import com.lightsupport.backend.repositories.UserRepo;
import com.lightsupport.backend.utils.JsonUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final UserRepo userRepo;
    private final FaultRepo faultRepo;
    private final TicketRepo ticketRepo;
    private final ModelMapper modelMapper;
    private final AssetRepo assetRepo;

    @Autowired
    public TicketService(UserRepo userRepo, FaultRepo faultRepo,
                         TicketRepo ticketRepo, ModelMapper modelMapper,
                         AssetRepo assetRepo) {
        this.userRepo = userRepo;
        this.faultRepo = faultRepo;
        this.ticketRepo = ticketRepo;
        this.modelMapper = modelMapper;
        this.assetRepo = assetRepo;
    }

    public List<TicketDto> getAllTickets(String matricule) throws JsonProcessingException {

        List<TicketDto> ticketDtos = ticketRepo.findByIdFieldSupport_Id(matricule).get()
                .stream().map(
                        ticket -> modelMapper.map(ticket, TicketDto.class))
                .toList();

        return ticketDtos;
    }

    public TicketDto getTicket(String faultId) {
        return modelMapper.map(ticketRepo.findByIdFault_Id(faultId).orElseThrow().get(0), TicketDto.class);
    }

    public Boolean createTicket(CreateTicketDto ticketDto){
        User fieldSupport = userRepo.findById("QWERTY").orElseThrow();
        Fault fault = faultRepo.findById(ticketDto.getFaultId()).orElseThrow();
        Asset asset = assetRepo.findById(ticketDto.getAssetId()).orElseThrow();

        Ticket ticket = new Ticket(
                fieldSupport,
                fault,
                ticketDto.getDescription()
        );

        ticket.setIdAsset(asset);
        ticketRepo.save(ticket);
        fault.setType(FaultType.FIELD_INTERVENTION);
        faultRepo.save(fault);
        return true;
    }

}