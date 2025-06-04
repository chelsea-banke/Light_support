package com.lightsupport.backend.services;

import com.lightsupport.backend.dto.requests.RegisterUserRequestDto;
import com.lightsupport.backend.dto.response.RegisterUserResponseDto;
import com.lightsupport.backend.models.User;
import com.lightsupport.backend.models.enums.Role;
import com.lightsupport.backend.repositories.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public RegisterUserResponseDto registerUser(RegisterUserRequestDto registerUserRequest) {
        if(userRepo.findByContact(registerUserRequest.getContact()).isEmpty()){
            registerUserRequest.setPassword(passwordEncoder.encode(registerUserRequest.getPassword()));
            User newUser = modelMapper.map(registerUserRequest, User.class);
            newUser.setRole(Role.CLIENT);
            newUser.generateId();
            userRepo.save(newUser);
            return modelMapper.map(newUser, RegisterUserResponseDto.class);
        }
        throw new IllegalArgumentException("user with contact already exists");
    }
}
