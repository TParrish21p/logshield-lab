package com.bizarrestudios.logshieldlab.controller;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UploadAnalysisController {

    private final RestClient restClient = RestClient.create();

    private static final String PARSER_ANALYZE_URL = "http://127.0.0.1:5000/analyze";
    private static final long MAX_FILE_SIZE_BYTES = 1_000_000;
    private static final List<String> ALLOWED_EXTENSIONS = List.of(".txt", ".log", ".csv", ".json");

    @PostMapping(value = "/api/upload/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Object analyzeUploadedLog(@RequestParam("file") MultipartFile file) throws IOException {
        validateFile(file);

        String safeProcessingId = UUID.randomUUID().toString();
        String logText = new String(file.getBytes(), StandardCharsets.UTF_8);

        Map<String, String> requestBody = Map.of(
                "logText", logText,
                "source", "local-upload-" + safeProcessingId
        );

        return restClient.post()
                .uri(PARSER_ANALYZE_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .body(Object.class);
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new InvalidUploadException("Uploaded file cannot be empty.");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new InvalidUploadException("Uploaded file is too large. Maximum size is 1 MB.");
        }

        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null || originalFilename.isBlank()) {
            throw new InvalidUploadException("Uploaded file must have a filename.");
        }

        String lowercaseFilename = originalFilename.toLowerCase();
        boolean hasAllowedExtension = ALLOWED_EXTENSIONS.stream()
                .anyMatch(lowercaseFilename::endsWith);

        if (!hasAllowedExtension) {
            throw new InvalidUploadException("Only .txt, .log, .csv, and .json files are allowed.");
        }
    }

    static class InvalidUploadException extends RuntimeException {
        public InvalidUploadException(String message) {
            super(message);
        }
    }
}