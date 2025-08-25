package com.lightsupport.backend.repositories;

import com.lightsupport.backend.dto.TicketDto;
import com.lightsupport.backend.models.Fault;
import com.lightsupport.backend.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepo extends JpaRepository <Ticket, String> {

    Optional<List<Ticket>> findByIdFieldSupport_Id(String userId);

    Optional<List<Ticket>> findByIdFault_Id(String faultId);

    Optional<List<Ticket>> findByIdFault(Fault fault);
}