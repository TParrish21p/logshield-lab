package com.bizarrestudios.logshieldlab.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bizarrestudios.logshieldlab.model.Incident;

@RestController
public class IncidentController {

    private final List<Incident> incidents = new ArrayList<>();

    public IncidentController() {
        incidents.add(new Incident(
                1L,
                "Multiple failed login attempts",
                "Synthetic demo alert: repeated failed login attempts were detected from the same IP address.",
                "HIGH",
                "OPEN",
                "demo-auth.log",
                Instant.now()
        ));

        incidents.add(new Incident(
                2L,
                "Possible credential exposure",
                "Synthetic demo alert: a token-like value appeared in a log line and should be redacted by the parser.",
                "MEDIUM",
                "TRIAGE",
                "demo-auth.log",
                Instant.now()
        ));
    }

    @GetMapping("/api/incidents")
    public List<Incident> getIncidents() {
        return incidents;
    }
}