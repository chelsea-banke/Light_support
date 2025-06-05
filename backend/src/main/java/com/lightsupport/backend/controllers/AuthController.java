package com.lightsupport.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.requests.LoginRequestDto;
import com.lightsupport.backend.dto.requests.RegisterUserRequestDto;
import com.lightsupport.backend.dto.response.RegisterUserResponseDto;
import com.lightsupport.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/")
    public String index() {
        return "Hello World";
    }

    @PostMapping("/auth/register-client")
    public RegisterUserResponseDto registerClient(@RequestBody RegisterUserRequestDto registerUserRequest) {
        return authService.registerUser(registerUserRequest);
    }

    @PostMapping("/auth/client-login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest) throws JsonProcessingException {
        return authService.clientLogin(loginRequest);
    }
}