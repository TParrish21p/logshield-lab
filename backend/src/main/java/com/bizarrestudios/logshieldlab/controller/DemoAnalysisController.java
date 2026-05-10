package com.bizarrestudios.logshieldlab.controller;

import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class DemoAnalysisController {

    private final RestClient restClient = RestClient.create();
    private static final String PARSER_ANALYZE_URL = "http://127.0.0.1:5000/analyze";

    private static final String SYNTHETIC_DEMO_LOG = """
            2026-05-09T09:14:22Z INFO user=alice action=login status=success ip=192.0.2.10
            2026-05-09T09:16:03Z WARN user=bob action=login status=failed ip=198.51.100.23 reason=bad_password
            2026-05-09T09:16:18Z WARN user=bob action=login status=failed ip=198.51.100.23 reason=bad_password
            2026-05-09T09:16:44Z WARN user=bob action=login status=failed ip=198.51.100.23 reason=bad_password
            2026-05-09T09:18:30Z WARN user=tester action=password_reset status=requested ip=192.0.2.50 token=demo-token-should-be-redacted
            PowerShell.exe -EncodedCommand synthetic-demo-command
            """;

    @PostMapping("/api/demo/analyze")
    public Object analyzeDemoLog() {
        Map<String, String> requestBody = Map.of("logText", SYNTHETIC_DEMO_LOG);

        return restClient.post()
                .uri(PARSER_ANALYZE_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .body(Object.class);
    }
}