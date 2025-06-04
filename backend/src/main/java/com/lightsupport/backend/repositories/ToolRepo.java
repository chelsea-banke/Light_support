package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.Tool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToolRepo extends JpaRepository <Tool, String> {
}