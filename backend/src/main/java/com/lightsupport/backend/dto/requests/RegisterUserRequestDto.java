package com.lightsupport.backend.dto.requests;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String contact;
    private String role;
}
