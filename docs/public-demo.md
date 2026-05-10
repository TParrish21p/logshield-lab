# Public Demo Mode

## Purpose

LogShield Lab includes a public-safe frontend demo mode for portfolio hosting.

This mode is designed so reviewers can see the dashboard experience without running the full local stack and without uploading real files.

## Public Demo Safety Positioning

Public demo mode uses only built-in synthetic data.

It does not require:

- Spring Boot backend
- Python parser service
- PostgreSQL
- Real file uploads
- Real user accounts
- Real log data

## What Public Demo Mode Shows

Public demo mode demonstrates:

- Dashboard layout
- Incident summary cards
- Incident table
- Severity badges
- Mock role selector
- Analyst/Admin editable UI behavior
- Viewer read-only UI behavior
- Built-in synthetic parser alerts
- Redacted preview examples
- Safety warnings

## What Public Demo Mode Disables

Public demo mode disables:

- Real file uploads
- Backend API calls
- Database writes
- Parser service calls
- Persistent changes

Any edits made in the hosted public demo happen only in browser memory and reset when the page reloads.

## Running Public Demo Mode Locally

From the frontend folder:

```powershell
npm run dev:demo