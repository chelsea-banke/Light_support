package com.lightsupport.backend.dto;

import com.lightsupport.backend.models.types.MessageSource;
import com.lightsupport.backend.models.types.MessageType;

import java.time.LocalDateTime;

public class MessageDto {
    private String id;
    private String content;
    private LocalDateTime createdDate;
    private String faultId;
    private MessageType type;
    private MessageSource source;

    public MessageDto() {
    }

    public MessageDto(String content, String faultId, MessageSource source) {
        this.content = content;
        this.faultId = faultId;
        this.source = source;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getFaultId() {
        return faultId;
    }

    public void setFaultId(String faultId) {
        this.faultId = faultId;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public MessageSource getSource() {
        return source;
    }

    public void setSource(MessageSource source) {
        this.source = source;
    }
}
