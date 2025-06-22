package com.lightsupport.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private LocalDate sendDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_message", nullable = false)
    private Message idMessage;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_chat_session", nullable = false)
    private ChatSession idChatSession;

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

    public LocalDate getSendDate() {
        return sendDate;
    }

    public void setSendDate(LocalDate sendDate) {
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