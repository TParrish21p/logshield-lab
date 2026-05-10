import re
from collections import Counter


SENSITIVE_VALUE_PATTERN = re.compile(
    r"(password|token|api[_-]?key|secret|bearer)\s*=\s*[^,\s]+",
    re.IGNORECASE,
)

IP_PATTERN = re.compile(r"\b(?:\d{1,3}\.){3}\d{1,3}\b")


def redact_sensitive_values(line):
    return SENSITIVE_VALUE_PATTERN.sub(lambda match: f"{match.group(1)}=[REDACTED]", line)


def detect_alerts(log_text):
    alerts = []
    failed_login_ips = Counter()
    redacted_lines = []

    for line in log_text.splitlines():
        redacted_line = redact_sensitive_values(line)
        redacted_lines.append(redacted_line)

        lower_line = line.lower()

        if "status=failed" in lower_line and "action=login" in lower_line:
            ip_address = extract_ip_address(line)
            failed_login_ips[ip_address] += 1

            alerts.append({
                "title": "Failed login attempt",
                "description": "A failed login attempt was detected in a synthetic log line.",
                "severity": "LOW",
                "source": "parser-service",
                "evidence": redacted_line,
            })

        if "powershell" in lower_line and ("encodedcommand" in lower_line or "-enc" in lower_line):
            alerts.append({
                "title": "Suspicious PowerShell usage",
                "description": "A suspicious PowerShell command pattern was detected.",
                "severity": "HIGH",
                "source": "parser-service",
                "evidence": redacted_line,
            })

        if SENSITIVE_VALUE_PATTERN.search(line):
            alerts.append({
                "title": "Possible credential exposure",
                "description": "A sensitive-looking value appeared in the log and was redacted.",
                "severity": "MEDIUM",
                "source": "parser-service",
                "evidence": redacted_line,
            })

    for ip_address, count in failed_login_ips.items():
        if ip_address != "unknown" and count >= 3:
            alerts.append({
                "title": "Multiple failed login attempts from same IP",
                "description": f"{count} failed login attempts were detected from {ip_address}.",
                "severity": "HIGH",
                "source": "parser-service",
                "evidence": f"ip={ip_address} failed_login_count={count}",
            })

    return {
        "alertCount": len(alerts),
        "alerts": alerts,
        "redactedPreview": redacted_lines[:10],
    }


def extract_ip_address(line):
    match = IP_PATTERN.search(line)

    if match is None:
        return "unknown"

    return match.group(0)