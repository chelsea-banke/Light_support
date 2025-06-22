package com.lightsupport.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.requests.CreateFaultRequestDto;
import com.lightsupport.backend.dto.response.CreateFaultResponseDto;
import com.lightsupport.backend.dto.response.FaultResponseDto;
import com.lightsupport.backend.models.ChatSession;
import com.lightsupport.backend.models.Fault;
import com.lightsupport.backend.models.User;
import com.lightsupport.backend.repositories.ChatSessionRepo;
import com.lightsupport.backend.repositories.FaultRepo;
import com.lightsupport.backend.repositories.UserRepo;
import com.lightsupport.backend.utils.JsonUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FaultService {
    private final UserRepo userRepo;
    private final FaultRepo faultRepo;
    private final ModelMapper modelMapper;
    private final ChatSessionRepo chatSessionRepo;
    JsonUtil jsonUtil = new JsonUtil();

    @Autowired
    public FaultService(UserRepo userRepo, FaultRepo faultRepo, ModelMapper modelMapper, ChatSessionRepo chatSessionRepo) {
        this.userRepo = userRepo;
        this.faultRepo = faultRepo;
        this.modelMapper = modelMapper;
        this.chatSessionRepo = chatSessionRepo;
    }

    @Transactional
    public ResponseEntity<?> createFault(String clientId, CreateFaultRequestDto createFaultRequestDto){
        User client = userRepo.getById(clientId);
        Fault fault = faultRepo.save(new Fault(createFaultRequestDto.getDescription(), client));
        ChatSession chatSession = chatSessionRepo.save(new ChatSession(client, fault));
        return ResponseEntity.ok(modelMapper.map(fault, CreateFaultResponseDto.class));
    }

    public List<FaultResponseDto> getAllFaults(String clientId) throws JsonProcessingException {

        List<FaultResponseDto> faultResponseDtos =  faultRepo
                .findByIdUserId(clientId).get()
                .stream().map(fault ->
                        modelMapper.map(fault, FaultResponseDto.class))
                .toList();
        return faultResponseDtos;
//        return modelMapper.map(faultRepo.findById("2d590092-5783-42c0-95b7-ccded9548798"), FaultResponseDto.class);
    }
}