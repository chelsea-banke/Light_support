package com.lightsupport.backend.services;

import com.lightsupport.backend.dto.requests.CreateFaultRequestDto;
import com.lightsupport.backend.dto.response.CreateFaultResponseDto;
import com.lightsupport.backend.dto.response.FaultResponseDto;
import com.lightsupport.backend.models.Fault;
import com.lightsupport.backend.models.User;
import com.lightsupport.backend.repositories.FaultRepo;
import com.lightsupport.backend.repositories.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FaultService {
    private final UserRepo userRepo;
    private final FaultRepo faultRepo;
    private final ModelMapper modelMapper;

    @Autowired
    public FaultService(UserRepo userRepo, FaultRepo faultRepo, ModelMapper modelMapper) {
        this.userRepo = userRepo;
        this.faultRepo = faultRepo;
        this.modelMapper = modelMapper;
    }

    public ResponseEntity<?> createFault(String clientId, CreateFaultRequestDto createFaultRequestDto){
        User client = userRepo.getById(clientId);
        Fault fault = new Fault();
        fault.generateId();
        fault.setIdUser(client);
        fault.setStatus("active");
        fault.setDescription(createFaultRequestDto.getDescription());
        fault = faultRepo.save(fault);
        return ResponseEntity.ok(modelMapper.map(fault, CreateFaultResponseDto.class));
    }

    public List<FaultResponseDto> getAllFaults(String clientId){
        return faultRepo
                .findByIdUserId(clientId)
                .stream().map(fault ->
                        modelMapper.map(fault.get(0), FaultResponseDto.class))
                .collect(Collectors.toUnmodifiableList());
//        return modelMapper.map(faultRepo.findById("2d590092-5783-42c0-95b7-ccded9548798"), FaultResponseDto.class);
    }
}