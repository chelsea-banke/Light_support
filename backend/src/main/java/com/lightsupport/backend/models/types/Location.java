package com.lightsupport.backend.models.types;

import jakarta.persistence.Embeddable;

import java.math.BigDecimal;

@Embeddable
public class Location {
    private BigDecimal longitude;
    private BigDecimal lattitude;
    private String address;
}
