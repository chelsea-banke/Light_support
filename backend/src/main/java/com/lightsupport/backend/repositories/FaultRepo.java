package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.Fault;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FaultRepo extends JpaRepository <Fault, String> {
    Optional<List<Fault >> findByIdClient_Id(String userId);
}