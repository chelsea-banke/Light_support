package com.lightsupport.backend.repositories;

import com.lightsupport.backend.dto.TicketDto;
import com.lightsupport.backend.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepo extends JpaRepository <Ticket, String> {

    Optional<List<Ticket>> findByIdUserId(String userId);
}