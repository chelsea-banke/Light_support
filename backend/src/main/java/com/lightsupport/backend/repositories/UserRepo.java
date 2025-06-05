package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository <User, String> {
    Optional<User> findByContact(String contact);
}