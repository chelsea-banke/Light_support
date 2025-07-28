package com.lightsupport.backend.dto.requests;

import com.lightsupport.backend.models.types.Status;

public class CreateTicketRequestDto {
    private String priority;
    private String idUser;
    private String idFault;

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
}