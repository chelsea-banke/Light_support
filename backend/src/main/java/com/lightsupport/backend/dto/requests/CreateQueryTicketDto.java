package com.lightsupport.backend.dto.requests;

public class CreateQueryTicketDto {
    private String idUser;
    private String idFault;
    private String description;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}