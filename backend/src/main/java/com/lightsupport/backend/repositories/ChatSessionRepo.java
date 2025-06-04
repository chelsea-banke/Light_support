package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatSessionRepo extends JpaRepository <ChatSession, String> {
}