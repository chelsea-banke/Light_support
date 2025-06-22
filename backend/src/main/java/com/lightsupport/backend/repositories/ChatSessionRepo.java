package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.ChatSession;
import com.lightsupport.backend.models.Fault;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatSessionRepo extends JpaRepository <ChatSession, String> {
    List<ChatSession> findByIdFault_Id(String faultId);
}