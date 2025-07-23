package com.lightsupport.backend.dto;

import com.lightsupport.backend.models.types.MessageType;

import java.time.LocalDateTime;

public class MessageDto {
    private String id;
    private String content;
    private LocalDateTime createdDate;
    private String chatId;
    private MessageType type;

    public MessageDto() {
    }

    public MessageDto(String content, String chatId, MessageType type) {
        this.content = content;
        this.chatId = chatId;
        this.type = type;
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

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }
}
