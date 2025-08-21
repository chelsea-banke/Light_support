package com.lightsupport.backend.models;

import com.lightsupport.backend.models.types.MessageSource;
import com.lightsupport.backend.models.types.MessageType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
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

    @Column(name = "content", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "source", nullable = false )
    private MessageSource source;

    @CreationTimestamp
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_fault", nullable = false)
    private Fault idFault;

    @PrePersist
    public void generateId() {
        this.id = UUID.randomUUID().toString();
    }

    public Message(){}
    public Message(String content, Fault idFault, MessageSource source) {
        this.content = content;
        this.idFault = idFault;
        this.source = source;
        generateId();
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

    public Fault getIdFault() {
        return idFault;
    }

    public void setIdFault(Fault idFault) {
        this.idFault = idFault;
    }

    public MessageSource getSource() {
        return source;
    }

    public void setSource(MessageSource source) {
        this.source = source;
    }
}