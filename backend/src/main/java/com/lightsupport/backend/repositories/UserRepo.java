package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository <User, String> {
    List<User> findByContact(String contact);
}