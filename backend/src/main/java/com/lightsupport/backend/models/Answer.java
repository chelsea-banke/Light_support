package com.lightsupport.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "answer")
public class Answer {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "answer", nullable = false)
    private String answer;

    @ColumnDefault("CURRENT_DATE")
    @Column(name = "send_date", nullable = false)
    private LocalDateTime sendDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_message", nullable = false)
    private Message idMessage;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_chat_session", nullable = false)
    private ChatSession idChatSession;

    @PrePersist
    public void generateId() {
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public LocalDateTime getSendDate() {
        return sendDate;
    }

    public void setSendDate(LocalDateTime sendDate) {
        this.sendDate = sendDate;
    }

    public Message getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(Message idMessage) {
        this.idMessage = idMessage;
    }

    public ChatSession getIdChatSession() {
        return idChatSession;
    }

    public void setIdChatSession(ChatSession idChatSession) {
        this.idChatSession = idChatSession;
    }
}