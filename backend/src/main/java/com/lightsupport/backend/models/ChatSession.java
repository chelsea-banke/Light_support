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
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "chat_session")
public class ChatSession {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @CreationTimestamp
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;

    @CreationTimestamp
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "updated_date", nullable = false)
    private LocalDate updatedDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_user", nullable = false)
    private User idUser;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_fault", nullable = false)
    private Fault idFault;

    @PrePersist
    public void generateId() {
        this.id = UUID.randomUUID().toString();
    }

    public ChatSession(User idUser, Fault idFault) {
        this.idUser = idUser;
        this.idFault = idFault;
        this.generateId();
    }

    public ChatSession() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public User getIdUser() {
        return idUser;
    }

    public void setIdUser(User idUser) {
        this.idUser = idUser;
    }

    public Fault getIdFault() {
        return idFault;
    }

    public void setIdFault(Fault idFault) {
        this.idFault = idFault;
    }

}