package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepo extends JpaRepository <Request, String> {
}