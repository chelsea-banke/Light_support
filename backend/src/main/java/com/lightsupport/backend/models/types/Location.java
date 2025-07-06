package com.lightsupport.backend.models.types;

import jakarta.persistence.Embeddable;

import java.math.BigDecimal;

@Embeddable
public class Location {
    private BigDecimal longitude;
    private BigDecimal lattitude;
    private String address;

    public Location() {

    }

    public Location(BigDecimal longitude, BigDecimal lattitude, String address) {
        this.longitude = longitude;
        this.lattitude = lattitude;
        this.address = address;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public BigDecimal getLattitude() {
        return lattitude;
    }

    public void setLattitude(BigDecimal lattitude) {
        this.lattitude = lattitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
