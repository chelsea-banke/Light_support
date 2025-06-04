package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.Geocordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeocordinateRepo extends JpaRepository <Geocordinate, String> {
}