package com.lightsupport.backend.services;

import com.lightsupport.backend.dto.UserDto;
import com.lightsupport.backend.models.User;
import com.lightsupport.backend.repositories.FaultRepo;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    final FaultRepo faultRepo;
    final ModelMapper modelMapper;

    @Autowired
    public UserService(FaultRepo faultRepo, ModelMapper modelMapper) {
        this.faultRepo = faultRepo;
        this.modelMapper = modelMapper;
    }

    public UserDto getClient(String faultId){
        User user = faultRepo.findById(faultId)
                .orElseThrow(() -> new EntityNotFoundException("client with fault not found"))
                .getIdClient();
        return  modelMapper.map(user, UserDto.class);
    }
}
