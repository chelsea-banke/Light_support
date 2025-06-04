package com.lightsupport.backend.controllers;

import com.lightsupport.backend.dto.requests.RegisterUserRequestDto;
import com.lightsupport.backend.dto.response.RegisterUserResponseDto;
import com.lightsupport.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private AuthService authService;

    @GetMapping("/")
    public String index() {
        return "Hello World";
    }

    @PostMapping("/register-client")
    public RegisterUserResponseDto registerClient(@RequestBody RegisterUserRequestDto registerUserRequest) {
        return authService.registerUser(registerUserRequest);
    }
}
