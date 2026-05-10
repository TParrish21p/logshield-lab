# Phase 3 Parser MVP Notes

## What We Built

Phase 3 created the first useful Python parser service for LogShield Lab.

The parser now includes:

- A Flask health endpoint
- A Flask analysis endpoint
- Basic sensitive value redaction
- Failed login detection
- Repeated failed login detection by IP address
- Suspicious PowerShell command detection
- Possible credential exposure detection
- A local smoke test script

## Current Parser Endpoints

### Health Check

```text
GET /health
```

Returns basic parser service status.

### Analyze Log Text

```text
POST /analyze
```

Accepts JSON with a `logText` field.

Example request:

```json
{
  "logText": "WARN user=bob action=login status=failed ip=198.51.100.23 token=demo-token"
}
```

Example response shape:

```json
{
  "alertCount": 2,
  "alerts": [
    {
      "title": "Failed login attempt",
      "description": "A failed login attempt was detected in a synthetic log line.",
      "severity": "LOW",
      "source": "parser-service",
      "evidence": "WARN user=bob action=login status=failed ip=198.51.100.23 token=[REDACTED]"
    }
  ],
  "redactedPreview": [
    "WARN user=bob action=login status=failed ip=198.51.100.23 token=[REDACTED]"
  ]
}
```

## Parser Files

```text
parser-service/
├── app.py
├── log_parser.py
├── requirements.txt
└── test_parser.py
```

## Current Detections

### Failed Login Attempts

The parser checks for log lines containing:

```text
action=login
status=failed
```

These create low severity alerts.

### Multiple Failed Login Attempts From Same IP

If the same IP address has 3 or more failed login attempts, the parser creates a high severity alert.

### Suspicious PowerShell Usage

The parser checks for PowerShell command patterns such as:

```text
powershell
encodedcommand
-enc
```

These create high severity alerts.

### Possible Credential Exposure

The parser checks for sensitive-looking fields such as:

```text
password=
token=
api_key=
api-key=
secret=
bearer=
```

The parser redacts matching values before including evidence in the response.

## Redaction Behavior

Example input:

```text
token=demo-token-should-be-redacted
```

Example redacted output:

```text
token=[REDACTED]
```

## Local Smoke Test

Run from the parser service folder:

```powershell
python test_parser.py
```

Expected result:

- Several alerts are printed
- Sensitive-looking values are redacted
- Repeated failed login detection is shown
- Suspicious PowerShell detection is shown

## Safety Reminder

Use only synthetic, sanitized, or lab-generated logs.

Do not upload or process real credentials, private keys, customer data, employee data, financial data, healthcare data, regulated data, company secrets, or other sensitive information.

## Next Phase

Phase 4 creates the React frontend MVP.

Planned frontend goals:

- Replace the default Vite screen
- Create a clean dark dashboard
- Fetch incidents from the Spring Boot backend
- Show severity badges
- Show incident status
- Prepare space for analyst notes