package com.lightsupport.backend.dto;

import com.lightsupport.backend.models.types.FaultType;
import com.lightsupport.backend.models.types.Status;

public class FaultStatusUpdateDto {
    private String id;
    private Status status;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
