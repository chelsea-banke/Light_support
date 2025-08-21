package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.ChatSession;
import com.lightsupport.backend.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository <Message, String> {
//    void getByIdChatSessionId(ChatSession chatSession);
    List<Message> findByIdFault_Id(String chatSessionId);
}