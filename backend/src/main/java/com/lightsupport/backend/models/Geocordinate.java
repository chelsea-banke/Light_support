package com.lightsupport.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "geocordinate")
public class Geocordinate {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "lattitude", nullable = false)
    private Long lattitude;

    @Column(name = "longitude", nullable = false)
    private Long longitude;

    @Column(name = "address", nullable = false)
    private String address;

}