package com.lightsupport.backend.dto;

import com.lightsupport.backend.models.types.Status;

public class TicketDto {
    private String id;
    private String priority;
    private Status status;
    private String fieldSupportId;
    private String faultId;

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

    public String getFieldSupportId() {
        return fieldSupportId;
    }

    public void setFieldSupportId(String fieldSupportId) {
        this.fieldSupportId = fieldSupportId;
    }

    public String getFaultId() {
        return faultId;
    }

    public void setFaultId(String faultId) {
        this.faultId = faultId;
    }
}