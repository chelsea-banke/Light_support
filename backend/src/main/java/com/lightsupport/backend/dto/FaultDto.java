package com.lightsupport.backend.dto;

import com.lightsupport.backend.models.types.FaultType;
import com.lightsupport.backend.models.types.Status;

import java.time.LocalDateTime;

public class FaultDto {
    private String id;
    private String description;
    private Status status;
    private LocalDateTime createdDate;
    private LocalDateTime updateDate;
    private String clientId;
    private String DeskSupportId;
    private FaultType type;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getDeskSupportId() {
        return DeskSupportId;
    }

    public void setDeskSupportId(String deskSupportId) {
        DeskSupportId = deskSupportId;
    }

    public FaultType getType() {
        return type;
    }

    public void setType(FaultType type) {
        this.type = type;
    }
}
