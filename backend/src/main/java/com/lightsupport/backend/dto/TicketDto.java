package com.lightsupport.backend.dto;

import com.lightsupport.backend.models.types.Status;

import java.math.BigDecimal;

public class TicketDto {
    private String id;
    private String priority;
    private Status status;
    private String idUser;
    private String idFault;

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
}