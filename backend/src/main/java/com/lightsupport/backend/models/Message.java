package com.lightsupport.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "message")
public class Message {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "message", nullable = false)
    private String message;

    @CreationTimestamp
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "created_date")
    private LocalDate createdDate;

    @CreationTimestamp
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "updated_date")
    private LocalDate updatedDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_chat_session", nullable = false)
    private ChatSession idChatSession;

    @PrePersist
    public void generateId() {
        this.id = UUID.randomUUID().toString();
    }

    public Message() {

    }

    public Message(String message, ChatSession idChatSession) {
        this.message = message;
        this.idChatSession = idChatSession;
        generateId();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDate updatedDate) {
        this.updatedDate = updatedDate;
    }

    public ChatSession getIdChatSession() {
        return idChatSession;
    }

    public void setIdChatSession(ChatSession idChatSession) {
        this.idChatSession = idChatSession;
    }
}