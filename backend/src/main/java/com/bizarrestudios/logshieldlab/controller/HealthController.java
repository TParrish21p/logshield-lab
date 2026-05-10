package com.bizarrestudios.logshieldlab.controller;

import java.time.Instant;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, String> healthCheck() {
        return Map.of(
                "status", "ok",
                "service", "logshield-backend",
                "purpose", "educational incident response dashboard API",
                "timestamp", Instant.now().toString()
        );
    }
}