# Phase 7 Authentication and Roles Notes

## What We Built

Phase 7 added a beginner-friendly mock role layer.

This is not real authentication yet. It is an educational stepping stone that demonstrates role-based behavior before adding Spring Security.

## Current Demo Roles

```text
ADMIN
ANALYST
VIEWER
```

## Current Role Behavior

### Admin

Admin can:

- View incidents
- Update incident status
- Update analyst notes

Future admin behavior may include:

- Manage users
- Delete incidents
- View audit logs

### Analyst

Analyst can:

- View incidents
- Update incident status
- Update analyst notes
- Use demo log analysis
- Use local developer upload analysis

### Viewer

Viewer can:

- View incidents
- Read incident status
- Read analyst notes

Viewer cannot:

- Update incident status
- Update analyst notes

## Backend Demo Role Header

The backend reads the current demo role from this request header:

```text
X-Demo-Role
```

Example:

```text
X-Demo-Role: ANALYST
```

If no role header is provided, the backend treats the request as:

```text
VIEWER
```

## Backend Files Added

```text
backend/src/main/java/com/bizarrestudios/logshieldlab/security/DemoRole.java
backend/src/main/java/com/bizarrestudios/logshieldlab/security/DemoRoleGuard.java
```

## Backend Role Enforcement

Role checks were added to:

```text
PATCH /api/incidents/{id}/status
PATCH /api/incidents/{id}/notes
```

Allowed roles:

```text
ADMIN
ANALYST
```

Blocked role:

```text
VIEWER
```

## Manual Backend Tests

### Viewer Should Be Blocked

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/incidents/1/notes" -Method Patch -ContentType "application/json" -Headers @{ "X-Demo-Role" = "VIEWER" } -Body '{"notes":"Viewer should not be able to update this."}'
```

Expected result:

```text
403 Forbidden
```

### Analyst Should Be Allowed

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/incidents/1/notes" -Method Patch -ContentType "application/json" -Headers @{ "X-Demo-Role" = "ANALYST" } -Body '{"notes":"Analyst role updated this note during Phase 7 testing."}'
```

Expected result:

- Request succeeds
- Incident note is updated

### Admin Should Be Allowed

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/incidents/1/status" -Method Patch -ContentType "application/json" -Headers @{ "X-Demo-Role" = "ADMIN" } -Body '{"status":"RESOLVED"}'
```

Expected result:

- Request succeeds
- Incident status is updated

## Frontend Role Selector

The frontend now includes a demo role selector.

Current frontend behavior:

- Admin can edit status and notes
- Analyst can edit status and notes
- Viewer sees read-only status and notes

## Important Security Note

This mock role layer is not real authentication or authorization.

It should not be presented as production-ready security.

The frontend role selector can be changed by the user, and request headers can be manually modified.

This phase exists only to demonstrate:

- Basic access control concepts
- Role-based UI behavior
- Server-side role checks
- Why real authentication is needed later

## Future Real Authentication Plan

A later improvement may replace this mock role layer with Spring Security.

Potential future work:

- Add login endpoint
- Store demo users in PostgreSQL
- Hash passwords with BCrypt
- Add Spring Security
- Add session-based auth or JWT learning flow
- Enforce roles through real authenticated identities
- Add logout
- Add audit log entries for role-protected actions

## Safety Reminder

LogShield Lab remains an educational prototype for portfolio and learning purposes only.

It is not intended for production use, compliance use, or processing real sensitive, confidential, regulated, or personally identifiable information.