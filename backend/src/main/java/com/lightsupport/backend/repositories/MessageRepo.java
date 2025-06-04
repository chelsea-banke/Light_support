package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepo extends JpaRepository <Message, String> {
}