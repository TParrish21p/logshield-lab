# Phase 4 Frontend MVP Notes

## What We Built

Phase 4 replaced the default Vite starter screen with the first LogShield Lab dashboard.

The frontend now includes:

- A dark dashboard layout
- Sidebar navigation
- Project identity and safety positioning
- Incident summary cards
- Incident table
- Severity badges
- Incident status display
- Notes display
- A safe upload placeholder warning

## Current Frontend URL

```text
http://localhost:5173
```

## Backend Data Connection

The frontend fetches incidents from:

```text
http://localhost:8080/api/incidents
```

The Spring Boot backend allows the local frontend through CORS:

```text
http://localhost:5173
```

## Current Dashboard Summary Cards

The dashboard currently calculates:

- Total incidents
- High severity incidents
- Open incidents

These values come from the backend incident API.

## Current Incident Table Columns

The incident table displays:

- Title and description
- Severity
- Status
- Source
- Notes

## Safety Warning

The dashboard includes the warning:

```text
Do not upload real credentials, private keys, customer data, employee data, financial data, healthcare data, company secrets, regulated data, or other sensitive information. Use only synthetic, sanitized, or lab-generated logs.
```

## Design Direction

The UI is intentionally:

- Dark
- Clean
- Dashboard-focused
- Cybersecurity-themed without being exaggerated
- Local-first and educational

## Manual Test Steps

To test the current frontend MVP:

1. Start the backend:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

2. Start the frontend in a second terminal:

```powershell
cd frontend
npm run dev
```

3. Open:

```text
http://localhost:5173
```

4. Confirm the dashboard shows:

```text
Total Incidents: 2
High Severity: 1
Open Incidents: 1
```

5. Confirm the incident table shows the two backend demo incidents.

## Next Phase

Phase 5 adds secure upload handling concepts.

Planned work:

- Add demo log analysis button
- Connect frontend to parser flow through the backend
- Add file type restrictions
- Add file size limit
- Add upload safety warning before any upload action
- Keep raw uploaded files temporary only