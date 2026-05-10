# Phase 2 Backend MVP Notes

## What We Built

Phase 2 created the first useful backend API for LogShield Lab.

The backend now includes:

- A health check endpoint
- An in-memory incident model
- An incident listing endpoint
- An incident status update endpoint
- An analyst notes update endpoint

This was intentionally simple at first. Incidents were stored in memory before PostgreSQL was added later.

## Current Backend Endpoints

### Health Check

```text
GET /api/health
```

Returns basic backend status information.

Example response:

```json
{
  "status": "ok",
  "service": "logshield-backend",
  "purpose": "educational incident response dashboard API",
  "timestamp": "2026-05-09T00:00:00Z"
}
```

### List Incidents

```text
GET /api/incidents
```

Returns the current incident list.

Initial demo incidents:

- Multiple failed login attempts
- Possible credential exposure

### Update Incident Status

```text
PATCH /api/incidents/{id}/status
```

Example PowerShell test command:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/incidents/1/status" -Method Patch -ContentType "application/json" -Body '{"status":"RESOLVED"}'
```

### Update Analyst Notes

```text
PATCH /api/incidents/{id}/notes
```

Example PowerShell test command:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/incidents/1/notes" -Method Patch -ContentType "application/json" -Body '{"notes":"Confirmed this is synthetic demo data for learning."}'
```

## Current Incident Fields

Each incident currently has:

- `id`
- `title`
- `description`
- `severity`
- `status`
- `source`
- `notes`
- `createdAt`

## Why We Used In-Memory Data First

Using an in-memory list let us learn backend API design before adding database complexity.

This kept Phase 2 focused on:

- Java classes
- Spring Boot controllers
- HTTP endpoints
- JSON responses
- Simple API testing

PostgreSQL was added later after the API shape was easier to understand.

## Safety Reminder

The current incidents are synthetic demo incidents only.

LogShield Lab should not be used to process real credentials, private keys, company secrets, regulated data, customer data, employee data, financial data, healthcare data, or other sensitive information.

## Next Phase

Phase 3 builds the Python Parser MVP.

Planned parser goals:

- Read synthetic sample logs
- Detect failed login attempts
- Detect repeated failed attempts from the same IP address
- Detect token-like values
- Redact sensitive-looking values
- Return structured JSON alerts