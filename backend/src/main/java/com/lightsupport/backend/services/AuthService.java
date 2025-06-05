package com.lightsupport.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.requests.LoginRequestDto;
import com.lightsupport.backend.dto.requests.RegisterUserRequestDto;
import com.lightsupport.backend.dto.response.LoginResponseDto;
import com.lightsupport.backend.dto.response.RegisterUserResponseDto;
import com.lightsupport.backend.models.User;
import com.lightsupport.backend.models.enums.Role;
import com.lightsupport.backend.repositories.UserRepo;
import com.lightsupport.backend.utils.JsonUtil;
import com.lightsupport.backend.utils.jwt.JwtUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    private final JsonUtil jsonUtil = new JsonUtil();


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

    public ResponseEntity<?> clientLogin(LoginRequestDto loginRequest) throws JsonProcessingException {

        // Authenticate user
        Optional<User> client = userRepo.findByContact(loginRequest.getContact()).stream().findFirst();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        client.get().getId(), loginRequest.getPassword())
        );

        // If successful, generate token
        User user = userRepo.findByContact(loginRequest.getContact()).orElse(null);
        String token = jwtUtil.generateToken(user);
        LoginResponseDto loginResponseDto = new LoginResponseDto(token);
        return ResponseEntity.ok(loginResponseDto);
    }
}
