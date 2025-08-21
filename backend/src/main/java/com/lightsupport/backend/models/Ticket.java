package com.lightsupport.backend.models;

import com.lightsupport.backend.models.types.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "priority", nullable = false)
    private String priority;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_field_support")
    private User idFieldSupport;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_fault", nullable = false)
    private Fault idFault;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_asset")
    private Asset idAsset;

    public Ticket(){}

    public Ticket(User idFieldSupport, Fault idFault, String description) {
        this.priority = "MEDIUM";
        this.idFieldSupport = idFieldSupport;
        this.idFault = idFault;
        this.description = description;
        this.status = Status.PENDING;
        generateId();
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

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getIdFieldSupport() {
        return idFieldSupport;
    }

    public void setIdFieldSupport(User idFieldSupport) {
        this.idFieldSupport = idFieldSupport;
    }

    public Fault getIdFault() {
        return idFault;
    }

    public void setIdFault(Fault idFault) {
        this.idFault = idFault;
    }

    public Asset getIdAsset() {
        return idAsset;
    }

    public void setIdAsset(Asset idAsset) {
        this.idAsset = idAsset;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}