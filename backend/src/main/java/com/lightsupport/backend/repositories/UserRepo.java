package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository <User, String> {
    Optional<User> findByContact(String contact);

    @Query(value = """
            SELECT * FROM user u
            WHERE u.role = 'FIELD_TECH'
            AND NOT EXISTS (
                SELECT 1 FROM ticket t
                WHERE t.id_user = u.id AND t.status = 'PENDING'
            )
            LIMIT 1
        """,
            nativeQuery = true)
    Optional<User> findAvailableFieldTech();


}