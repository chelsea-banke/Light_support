package com.lightsupport.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.requests.LoginRequestDto;
import com.lightsupport.backend.dto.requests.LogoutRequestDto;
import com.lightsupport.backend.dto.requests.RegisterClientRequestDto;
import com.lightsupport.backend.dto.requests.RegisterFieldTechRequestDto;
import com.lightsupport.backend.dto.response.RegisterUserResponseDto;
import com.lightsupport.backend.services.AuthService;
import com.lightsupport.backend.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/ping")
    public ResponseEntity<?> ping(){
        return ResponseEntity.ok(true);
    }

    @PostMapping("/register-client")
    public RegisterUserResponseDto registerClient(@RequestBody RegisterClientRequestDto registerUserRequest) {
        return authService.registerUser(registerUserRequest);
    }

    @PostMapping("/register-field-tech")
    public RegisterUserResponseDto registerFieldTech(@RequestBody RegisterFieldTechRequestDto registerFieldTechRequestDto) {
        return authService.registerFieldTech(registerFieldTechRequestDto);
    }

    @PostMapping("/login-client")
    public ResponseEntity<?> loginClient(@RequestBody LoginRequestDto loginRequest) throws JsonProcessingException {
        return ResponseEntity.ok(authService.clientLogin(loginRequest));
    }

    @PostMapping("/login-field-tech")
    public ResponseEntity<?> loginFieldTech(@RequestBody LoginRequestDto loginRequest) throws JsonProcessingException {
        return ResponseEntity.ok(authService.fieldTechLogin(loginRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequestDto logoutRequestDto) throws JsonProcessingException {
        authService.logout(logoutRequestDto);
        return ResponseEntity.ok("ok");
    }
}