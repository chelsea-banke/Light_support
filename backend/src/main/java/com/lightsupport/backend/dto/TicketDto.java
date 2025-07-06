package com.lightsupport.backend.dto;

import com.lightsupport.backend.models.types.Status;

import java.math.BigDecimal;

public class TicketDto {
    private String id;
    private String priority;
    private Status status;
    private String idUser;
    private String idFault;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private String address;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getIdFault() {
        return idFault;
    }

    public void setIdFault(String idFault) {
        this.idFault = idFault;
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