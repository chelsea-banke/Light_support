package com.lightsupport.backend.models;

import com.lightsupport.backend.models.types.Location;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "asset")
public class Asset {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "type", nullable = false)
    private String type;

    @Embedded
    @Column(name = "location", nullable = false)
    private Location location;

}