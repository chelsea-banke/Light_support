package com.lightsupport.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lightsupport.backend.models.types.FaultType;
import com.lightsupport.backend.models.types.Location;
import com.lightsupport.backend.models.types.Status;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name = "fault")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Fault {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "description", nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @CreationTimestamp
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;

    @CreationTimestamp
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_client", nullable = false)
    private User idClient;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_desk_support")
    private User idDeskSupport;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private FaultType type;

    public Fault(String description, User idClient, User idDeskSupport) {
        this.description = description;
        this.idClient = idClient;
        this.idDeskSupport = idDeskSupport;
        this.status = Status.ACTIVE;
        this.type = FaultType.STANDARD;
        this.generateId();
    }

    public Fault() {

    }

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

    public User getIdClient() {
        return idClient;
    }

    public void setIdClient(User idClient) {
        this.idClient = idClient;
    }

    public User getIdDeskSupport() {
        return idDeskSupport;
    }

    public void setIdDeskSupport(User idDeskSupport) {
        this.idDeskSupport = idDeskSupport;
    }

    public FaultType getType() {
        return type;
    }

    public void setType(FaultType type) {
        this.type = type;
    }
}