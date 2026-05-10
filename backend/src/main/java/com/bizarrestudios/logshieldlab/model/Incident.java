package com.bizarrestudios.logshieldlab.model;

import java.time.Instant;

public class Incident {

    private Long id;
    private String title;
    private String description;
    private String severity;
    private String status;
    private String source;
    private String notes;
    private Instant createdAt;

    public Incident() {
    }

    public Incident(Long id, String title, String description, String severity, String status, String source, String notes, Instant createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.status = status;
        this.source = source;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getSeverity() {
        return severity;
    }

    public String getStatus() {
        return status;
    }

    public String getSource() {
        return source;
    }

    public String getNotes() {
        return notes;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}