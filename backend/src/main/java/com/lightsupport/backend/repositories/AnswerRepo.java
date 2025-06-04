package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepo extends JpaRepository <Answer, String> {
}