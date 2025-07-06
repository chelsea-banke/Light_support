package com.lightsupport.backend.repositories;

import com.lightsupport.backend.models.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepo extends JpaRepository<Asset, String> {}
