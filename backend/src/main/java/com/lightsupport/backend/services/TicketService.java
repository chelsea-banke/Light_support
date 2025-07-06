package com.lightsupport.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.TicketDto;
import com.lightsupport.backend.dto.requests.CreateTicketRequestDto;
import com.lightsupport.backend.dto.response.FaultResponseDto;
import com.lightsupport.backend.models.Ticket;
import com.lightsupport.backend.repositories.FaultRepo;
import com.lightsupport.backend.repositories.TicketRepo;
import com.lightsupport.backend.repositories.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TicketService {

    private final UserRepo userRepo;
    private final FaultRepo faultRepo;
    private final TicketRepo ticketRepo;
    private final ModelMapper modelMapper;

    @Autowired
    public TicketService(UserRepo userRepo, FaultRepo faultRepo,
                         TicketRepo ticketRepo, ModelMapper modelMapper) {
        this.userRepo = userRepo;
        this.faultRepo = faultRepo;
        this.ticketRepo = ticketRepo;
        this.modelMapper = modelMapper;
    }

    public TicketDto createTicket(CreateTicketRequestDto ticketDto){
        Ticket ticket = new Ticket(
                ticketDto.getPriority(),
                userRepo.findById(ticketDto.getIdUser()).get(),
                faultRepo.findById(ticketDto.getIdFault()).get()
        );
        if(!ticketDto.getLongitude().isEmpty() && !ticketDto.getLatitude().isEmpty() && !ticketDto.getAddress().isEmpty()){
            ticket.setLatitude(new BigDecimal(ticketDto.getLatitude()));
            ticket.setLongitude(new BigDecimal(ticketDto.getLongitude()));
            ticket.setAddress(ticketDto.getAddress());
        }
        return modelMapper.map(ticketRepo.save(ticket), TicketDto.class);
    }

    public List<TicketDto> getAllTickets(String matricule) throws JsonProcessingException {

        List<TicketDto> ticketDtos = ticketRepo.findByIdUserId(matricule).get()
                .stream().map(
                        ticket -> modelMapper.map(ticket, TicketDto.class))
                .toList();

        return ticketDtos;
    }
}
