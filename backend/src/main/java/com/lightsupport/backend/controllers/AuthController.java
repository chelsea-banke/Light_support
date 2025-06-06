package com.lightsupport.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.requests.LoginRequestDto;
import com.lightsupport.backend.dto.requests.LogoutRequestDto;
import com.lightsupport.backend.dto.requests.RegisterUserRequestDto;
import com.lightsupport.backend.dto.response.RegisterUserResponseDto;
import com.lightsupport.backend.services.AuthService;
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

    @PostMapping("/register-client")
    public RegisterUserResponseDto registerClient(@RequestBody RegisterUserRequestDto registerUserRequest) {
        return authService.registerUser(registerUserRequest);
    }

    @PostMapping("/client-login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest) throws JsonProcessingException {
        return ResponseEntity.ok(authService.clientLogin(loginRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequestDto logoutRequest) throws JsonProcessingException {
        authService.logout(logoutRequest);
        return ResponseEntity.ok("ok");
    }
}