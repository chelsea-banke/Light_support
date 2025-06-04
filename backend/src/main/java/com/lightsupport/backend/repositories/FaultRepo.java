package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.Fault;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaultRepo extends JpaRepository <Fault, String> {
}