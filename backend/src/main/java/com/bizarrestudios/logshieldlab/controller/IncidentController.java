package com.bizarrestudios.logshieldlab.controller;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bizarrestudios.logshieldlab.model.Incident;
import com.bizarrestudios.logshieldlab.repository.IncidentRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class IncidentController {

    private final IncidentRepository incidentRepository;

    public IncidentController(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;

        if (incidentRepository.count() == 0) {
            incidentRepository.save(new Incident(
                    "Multiple failed login attempts",
                    "Synthetic demo alert: repeated failed login attempts were detected from the same IP address.",
                    "HIGH",
                    "OPEN",
                    "demo-auth.log",
                    "",
                    Instant.now()
            ));

            incidentRepository.save(new Incident(
                    "Possible credential exposure",
                    "Synthetic demo alert: a token-like value appeared in a log line and should be redacted by the parser.",
                    "MEDIUM",
                    "TRIAGE",
                    "demo-auth.log",
                    "",
                    Instant.now()
            ));
        }
    }

    @GetMapping("/api/incidents")
    public List<Incident> getIncidents() {
        return incidentRepository.findAll();
    }

    @PatchMapping("/api/incidents/{id}/status")
    public Incident updateIncidentStatus(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        String newStatus = requestBody.get("status");

        Incident incident = findIncidentById(id);
        incident.setStatus(newStatus);

        return incidentRepository.save(incident);
    }

    @PatchMapping("/api/incidents/{id}/notes")
    public Incident updateIncidentNotes(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        String notes = requestBody.get("notes");

        Incident incident = findIncidentById(id);
        incident.setNotes(notes);

        return incidentRepository.save(incident);
    }

    private Incident findIncidentById(Long id) {
        return incidentRepository.findById(id)
                .orElseThrow(IncidentNotFoundException::new);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    private static class IncidentNotFoundException extends RuntimeException {
    }
}