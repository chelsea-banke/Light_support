package com.lightsupport.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lightsupport.backend.models.enums.Role;
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


@Entity
@Table(name = "fault")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Fault {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "location")
    private String location;

    @CreationTimestamp
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;

    @CreationTimestamp
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "update_date", nullable = false)
    private LocalDate updateDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_user", nullable = false)
    private User idUser;

    public Fault(String description, User idUser) {
        this.description = description;
        this.idUser = idUser;
        this.status = "active";
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public User getIdUser() {
        return idUser;
    }

    public void setIdUser(User idUser) {
        this.idUser = idUser;
    }
}