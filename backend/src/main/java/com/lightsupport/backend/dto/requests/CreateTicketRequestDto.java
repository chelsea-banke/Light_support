package com.lightsupport.backend.dto.requests;

import com.lightsupport.backend.models.types.Status;

public class CreateTicketRequestDto {
    private String priority;
    private String idUser;
    private String idFault;
    private String longitude;
    private String latitude;
    private String address;

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
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

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}