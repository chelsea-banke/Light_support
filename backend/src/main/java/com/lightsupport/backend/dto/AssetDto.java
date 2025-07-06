package com.lightsupport.backend.dto;

import com.lightsupport.backend.models.types.Location;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Id;

import java.math.BigDecimal;

public class AssetDto {
    private String id;
    private String type;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private String address;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
