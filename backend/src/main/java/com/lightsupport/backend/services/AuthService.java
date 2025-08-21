package com.lightsupport.backend.services;

import com.lightsupport.backend.dto.requests.*;
import com.lightsupport.backend.dto.response.LoginResponseDto;
import com.lightsupport.backend.dto.response.RegisterUserResponseDto;
import com.lightsupport.backend.models.RefreshToken;
import com.lightsupport.backend.models.User;
import com.lightsupport.backend.models.types.Role;
import com.lightsupport.backend.repositories.RefreshTokenRepo;
import com.lightsupport.backend.repositories.UserRepo;
import com.lightsupport.backend.utils.jwt.JwtUtil;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.chrono.ChronoLocalDateTime;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailServiceImp userDetailsService;
    private final UserRepo userRepo;
    private final RefreshTokenRepo refreshTokenRepo;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;


    public AuthService(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserDetailServiceImp userDetailsService, UserRepo userRepo, RefreshTokenRepo refreshTokenRepo, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userRepo = userRepo;
        this.refreshTokenRepo = refreshTokenRepo;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    // ---------------------------------- Client Registration  ----------------------------------

    public RegisterUserResponseDto registerUser(RegisterClientRequestDto registerFieldTechRequestDto) {
        if(userRepo.findByContact(registerFieldTechRequestDto.getContact()).isEmpty()){
            registerFieldTechRequestDto.setPassword(passwordEncoder.encode(registerFieldTechRequestDto.getPassword()));
            User newUser = modelMapper.map(registerFieldTechRequestDto, User.class);
            newUser.setRole(Role.CLIENT);
            newUser.generateId();
            userRepo.save(newUser);
            return modelMapper.map(newUser, RegisterUserResponseDto.class);
        }
        throw new IllegalArgumentException("user with contact already exists");
    }

    // ---------------------------------- FieldTech Registration  ----------------------------------
    public RegisterUserResponseDto registerFieldTech(RegisterFieldTechRequestDto registerFieldTechRequestDto) {
        if(userRepo.findById(registerFieldTechRequestDto.getMatricule()).isEmpty()){
            registerFieldTechRequestDto.setPassword(passwordEncoder.encode(registerFieldTechRequestDto.getPassword()));
            User newUser = modelMapper.map(registerFieldTechRequestDto, User.class);
            newUser.setRole(Role.FIELD_TECH);
            newUser.setId(registerFieldTechRequestDto.getMatricule());
            userRepo.save(newUser);
            return modelMapper.map(newUser, RegisterUserResponseDto.class);
        }
        throw new IllegalArgumentException("user with contact already exists");
    }
    // -------------- Login (Authenticate + Issue Tokens) --------------

    public LoginResponseDto clientLogin(LoginRequestDto request) {
        // getting ID for user with passed in credentials
        String userId = userRepo.findByContact(request.getIdentifier()).stream().findFirst().get().getId();
        try {
            // 1. Authenticate credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userId,
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid credentials", e);
        }

        // 2. Load user details after successful authentication
        UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
        User user = (User) userDetails;

        // 3. Generate tokens
        String accessToken = jwtUtil.generateAccessToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        // 4. Persist refresh token in DB
        LocalDate expiryDate = Instant.now().plusSeconds(604800).atZone(ZoneId.systemDefault()).toLocalDate();
        RefreshToken rt = new RefreshToken(user, refreshToken, LocalDateTime.now(), expiryDate.atStartOfDay());
        refreshTokenRepo.save(rt);

        // 5. Return both tokens to client
        LoginResponseDto loginResponseDto = modelMapper.map(user, LoginResponseDto.class);
        loginResponseDto.setAccessToken(accessToken);
        loginResponseDto.setRefreshToken(refreshToken);

        return loginResponseDto;
    }

    public LoginResponseDto fieldTechLogin(LoginRequestDto request) {
        // getting ID for user with passed in credentials
        String userId = request.getIdentifier();
        try {
            // 1. Authenticate credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userId,
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid credentials", e);
        }

        // 2. Load user details after successful authentication
        UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
        User user = (User) userDetails;

        // 3. Generate tokens
        String accessToken = jwtUtil.generateAccessToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        // 4. Persist refresh token in DB
        LocalDate expiryDate = Instant.now().plusSeconds(604800).atZone(ZoneId.systemDefault()).toLocalDate();
        RefreshToken rt = new RefreshToken(user, refreshToken, LocalDateTime.now(), expiryDate.atStartOfDay());
        refreshTokenRepo.save(rt);

        // 5. Return both tokens to client
        LoginResponseDto loginResponseDto = modelMapper.map(user, LoginResponseDto.class);
        loginResponseDto.setAccessToken(accessToken);
        loginResponseDto.setRefreshToken(refreshToken);

        return loginResponseDto;
    }

    public LoginResponseDto supportLogin(LoginRequestDto request) {
        // getting ID for user with passed in credentials
        String userId = request.getIdentifier();
        try {
            // 1. Authenticate credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userId,
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid credentials", e);
        }

        // 2. Load user details after successful authentication
        UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
        User user = (User) userDetails;

        // 3. Generate tokens
        String accessToken = jwtUtil.generateAccessToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        // 4. Persist refresh token in DB
        LocalDate expiryDate = Instant.now().plusSeconds(604800).atZone(ZoneId.systemDefault()).toLocalDate();
        RefreshToken rt = new RefreshToken(user, refreshToken, LocalDateTime.now(), expiryDate.atStartOfDay());
        refreshTokenRepo.save(rt);

        // 5. Return both tokens to client
        LoginResponseDto loginResponseDto = modelMapper.map(user, LoginResponseDto.class);
        loginResponseDto.setIdentifier(user.getId());
        loginResponseDto.setAccessToken(accessToken);
        loginResponseDto.setRefreshToken(refreshToken);

        return loginResponseDto;
    }

    // -------------- Refresh Access Token --------------

    @Transactional
    public String refreshAccessToken(RefreshRequestDto request) {
        String rtString = request.getRefreshToken();

        // 1. Find refresh token in DB
        RefreshToken refreshTokenEntity = refreshTokenRepo.findByToken(rtString)
                .orElseThrow(() -> new RuntimeException("Refresh token not found!"));

        // 2. Check expiration
        if (refreshTokenEntity.getExpiresAt().isBefore(ChronoLocalDateTime.from(LocalDateTime.now()))) {
            // Token expired → remove from DB and force re-login
            refreshTokenRepo.delete(refreshTokenEntity);
            throw new RuntimeException("Refresh token expired. Please log in again.");
        }

        // 3. Validate the token structure & signature
        String username = jwtUtil.extractUsername(rtString);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (!jwtUtil.validateRefreshToken(rtString, userDetails)) {
            throw new RuntimeException("Invalid refresh token");
        }

        // 4. Generate new access token
        return jwtUtil.generateAccessToken(userDetails);
    }

    // -------------- Logout (Revoke Refresh Token) --------------

    @Transactional
    public void logout(LogoutRequestDto request) {
        String rtString = request.getRefreshToken();
        refreshTokenRepo.deleteByToken(rtString);
    }
}
