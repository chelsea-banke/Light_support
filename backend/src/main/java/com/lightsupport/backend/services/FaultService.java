package com.lightsupport.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.FaultDto;
import com.lightsupport.backend.dto.FaultUpdateDto;
import com.lightsupport.backend.dto.MessageDto;
import com.lightsupport.backend.dto.requests.CreateFaultRequestDto;
import com.lightsupport.backend.dto.response.CreateFaultResponseDto;
import com.lightsupport.backend.dto.response.FaultResponseDto;
import com.lightsupport.backend.models.ChatSession;
import com.lightsupport.backend.models.Fault;
import com.lightsupport.backend.models.User;
import com.lightsupport.backend.models.types.MessageSource;
import com.lightsupport.backend.repositories.ChatSessionRepo;
import com.lightsupport.backend.repositories.FaultRepo;
import com.lightsupport.backend.repositories.UserRepo;
import com.lightsupport.backend.utils.JsonUtil;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FaultService {
    private final UserRepo userRepo;
    private final FaultRepo faultRepo;
    private final ModelMapper modelMapper;
    private final ChatSessionRepo chatSessionRepo;
    private final AIMessagingService messagingService;
    JsonUtil jsonUtil = new JsonUtil();

    @Autowired
    public FaultService(UserRepo userRepo, FaultRepo faultRepo, ModelMapper modelMapper, ChatSessionRepo chatSessionRepo, AIMessagingService messagingService) {
        this.userRepo = userRepo;
        this.faultRepo = faultRepo;
        this.modelMapper = modelMapper;
        this.chatSessionRepo = chatSessionRepo;
        this.messagingService = messagingService;
    }

    @Transactional
    public ResponseEntity<?> createFault(String clientId, CreateFaultRequestDto createFaultRequestDto){
        User client = userRepo.findById(clientId).orElseThrow(()->new EntityNotFoundException("could not find client with id: "+ clientId));
        User deskSupport = userRepo.findById("QAZXSW").orElseThrow(()->new EntityNotFoundException("could not find support"));
        Fault fault = faultRepo.save(new Fault(createFaultRequestDto.getDescription(), client, deskSupport));
        ChatSession chatSession = chatSessionRepo.save(new ChatSession(client, fault));
        messagingService.saveMessage(new MessageDto("Hello and welcome to light support, How can I help you", chatSession.getId(), MessageSource.SUPPORT_AGENT));
        return ResponseEntity.ok(modelMapper.map(fault, CreateFaultResponseDto.class));
    }

    public FaultDto getFault(String faultId){
        Fault fault = faultRepo.findById(faultId).orElseThrow(()-> new EntityNotFoundException("can't find fault with id: "+faultId));
        return modelMapper.map(fault, FaultDto.class);
    }

    public List<FaultResponseDto> getAllFaults(String clientId) throws JsonProcessingException {
        return faultRepo
                .findByIdClient_Id(clientId).get()
                .stream().map(fault ->
                        modelMapper.map(fault, FaultResponseDto.class))
                .toList();
//        return modelMapper.map(faultRepo.findById("2d590092-5783-42c0-95b7-ccded9548798"), FaultResponseDto.class);
    }

    public List<FaultDto> getAllFaults() {
        return faultRepo
                .findAll()
                .stream().map(fault ->
                        modelMapper.map(fault, FaultDto.class))
                .toList();
    }

    public Boolean updateFaultType(FaultUpdateDto faultUpdateDto){
        Fault fault = faultRepo.findById(faultUpdateDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Fault not found with ID"));
        fault.setType(faultUpdateDto.getType());
        faultRepo.save(fault);
        return true;
    }

    public void updateFaultStatus(FaultUpdateDto faultStatusUpdateDto){
        Fault fault = faultRepo.findById(faultStatusUpdateDto.getId())
                .orElseThrow(()-> new EntityNotFoundException("Fault not found"));
        fault.setStatus(faultStatusUpdateDto.getStatus());
        faultRepo.save(fault);
    }

    public Boolean updateDescription(FaultUpdateDto faultUpdateDto){
        Fault fault = faultRepo.findById(faultUpdateDto.getId())
                .orElseThrow(()-> new EntityNotFoundException("Fault not found"));
        fault.setDescription(faultUpdateDto.getDescription());
        faultRepo.save(fault);
        return true;
    }

    public void updateType(FaultUpdateDto faultUpdateDto){
        Fault fault = faultRepo.findById(faultUpdateDto.getId())
                .orElseThrow(()-> new EntityNotFoundException("Fault not found"));
        fault.setType(faultUpdateDto.getType());
        faultRepo.save(fault);
    }

    public Fault updateFault(FaultUpdateDto faultUpdateDto) {
        Fault fault = faultRepo.findById(faultUpdateDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Fault not found"));

        // Map only non-null fields from DTO to entity
        modelMapper.map(faultUpdateDto, fault);
        return faultRepo.save(fault);
    }

}