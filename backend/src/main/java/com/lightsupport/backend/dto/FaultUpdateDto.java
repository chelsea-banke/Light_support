package com.lightsupport.backend.dto;

import com.lightsupport.backend.models.types.FaultType;
import com.lightsupport.backend.models.types.Status;

public class FaultUpdateDto {
    private String id;
    private Status status;
    private FaultType type;
    private String description;

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

    public FaultType getType() {
        return type;
    }

    public void setType(FaultType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
