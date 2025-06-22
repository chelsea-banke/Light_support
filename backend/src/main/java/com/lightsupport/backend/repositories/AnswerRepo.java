package com.lightsupport.backend.repositories;

import com.lightsupport.backend.dto.MessageDto;
import com.lightsupport.backend.models.Answer;
import com.lightsupport.backend.models.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface AnswerRepo extends JpaRepository <Answer, String> {
    Collection<Answer> findByIdChatSession_Id(String chatSessionId);
}