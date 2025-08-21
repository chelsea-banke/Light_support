package com.lightsupport.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.TicketDto;
import com.lightsupport.backend.dto.requests.CreateTicketDto;
import com.lightsupport.backend.models.Ticket;
import com.lightsupport.backend.repositories.AssetRepo;
import com.lightsupport.backend.repositories.FaultRepo;
import com.lightsupport.backend.repositories.TicketRepo;
import com.lightsupport.backend.repositories.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Boolean createTicket(CreateTicketDto ticketDto){
        Ticket ticket = new Ticket(
                faultRepo.findById(ticketDto.getFaultId()).get().getIdDeskSupport(),
                faultRepo.findById(ticketDto.getFaultId()).get(),
                ticketDto.getDescription()
        );
        if(ticketDto.getAssetId() != null){
            ticket.setIdAsset(assetRepo.findById(ticketDto.getAssetId()).get());
        }
        ticketRepo.save(ticket);
        return true;
    }
}