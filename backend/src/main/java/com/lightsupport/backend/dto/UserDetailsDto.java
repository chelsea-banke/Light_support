package com.lightsupport.backend.dto;// src/main/java/com/example/jwt/dto/CustomUserDetailsDto.java
import com.lightsupport.backend.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserDetailsDto implements UserDetails {

    private String id;
    private String contact; // Typically email or login ID
    private String password; // Hashed password
    private List<GrantedAuthority> authorities;

    public UserDetailsDto(User user) {
        this.contact = user.getContact(); // Map entity's email to UserDetails username
        this.password = user.getPassword(); // Map entity's password
        this.authorities = List.of(new SimpleGrantedAuthority(user.getRole().name()));
    }

    // Implement all methods from the UserDetails interface

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public String getUsername() {
        return contact;
    }

}