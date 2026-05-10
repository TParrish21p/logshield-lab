# LogShield Lab Demo Walkthrough

## Purpose

This walkthrough explains how to review the public-safe LogShield Lab demo.

Live demo:

```text
https://logshield-lab.vercel.app
```

LogShield Lab is an educational prototype for portfolio and learning purposes only.

It is not intended for production use, compliance use, or processing real sensitive, confidential, regulated, or personally identifiable information.

## Before You Start

Use only the public demo page.

Do not upload real data.

The hosted public demo uses built-in synthetic data only and disables real file upload.

## What To Review

The public demo demonstrates:

- Cybersecurity dashboard layout
- Synthetic incident data
- Severity and status display
- Mock role-based UI behavior
- Safe parser result simulation
- Redacted evidence examples
- Clear safety warnings

## Step 1: Review The Dashboard

Open:

```text
https://logshield-lab.vercel.app
```

Confirm the page shows:

- Public demo mode banner
- Sidebar navigation
- Demo Access Mode selector
- Incident summary cards
- Incident table

The summary cards show:

- Total incidents
- High severity incidents
- Open incidents

## Step 2: Test Demo Roles

Use the Demo Access Mode selector.

### Analyst

Select:

```text
Analyst
```

Expected behavior:

- Incident status fields are editable
- Analyst notes are editable

### Viewer

Select:

```text
Viewer
```

Expected behavior:

- Incident status becomes read-only
- Analyst notes become read-only

### Admin

Select:

```text
Admin
```

Expected behavior:

- Incident status fields are editable
- Analyst notes are editable

Important:

This is mock role behavior for learning purposes. It is not real authentication.

## Step 3: Analyze Built-In Demo Log

Click:

```text
Analyze Demo Log
```

Expected result:

- Parser alert count appears
- Alert cards appear
- Severity badges appear
- Redacted evidence appears
- Redacted preview appears

The demo should show examples such as:

- Failed login attempt
- Multiple failed login attempts from same IP
- Possible credential exposure
- Suspicious PowerShell usage

## Step 4: Review Upload Safety

In the public demo, real upload controls are disabled.

Expected message:

```text
File upload is disabled in this public demo. Use the built-in demo log to view safe, synthetic parser results.
```

This is intentional.

The local developer version includes upload handling for learning, but the hosted public demo avoids accepting real files.

## Step 5: Review Documentation

Recommended docs:

```text
README.md
docs/public-demo.md
docs/architecture/architecture-diagram.md
docs/security/threat-model.md
```

These explain:

- Public demo safety boundaries
- Local full-stack architecture
- Upload limitations
- Threat model
- Why the hosted demo avoids real user data

## Local Developer Version

The local developer version can run the full stack:

```text
React frontend
        ↓
Spring Boot backend
        ↓
Python parser service
        ↓
PostgreSQL database
```

Local developer features include:

- Backend API endpoints
- Parser service
- PostgreSQL persistence
- Local-only upload analysis
- Mock role checks

## Safety Reminder

Do not upload real credentials, private keys, customer data, employee data, financial data, healthcare data, company secrets, regulated data, or other sensitive information.

Use only synthetic, sanitized, or lab-generated logs.
