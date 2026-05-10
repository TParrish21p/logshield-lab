# Phase 1 Setup Notes

## What We Built

Phase 1 created the starting foundation for LogShield Lab.

The project now has:

- A Git repository
- A project README
- A Spring Boot backend foundation
- A React TypeScript frontend foundation
- A Python Flask parser service foundation
- A synthetic sample log file
- Basic project folders for documentation and security notes

## Local Project Path

```text
C:\Users\tparr\OneDrive\Desktop\Dev\logshield-lab
```

## Current Architecture

```text
React frontend
        ↓
Spring Boot backend
        ↓
Python parser service
        ↓
PostgreSQL later
```

## Current Local Services

### Frontend

```text
http://localhost:5173
```

Created with Vite and React TypeScript.

### Backend

```text
http://localhost:8080
```

Created with Spring Boot and Java 17.

### Parser Service

```text
http://127.0.0.1:5000
```

Created with Flask.

Current endpoint:

```text
GET /health
```

## Safety Positioning

LogShield Lab is an educational prototype only.

It should not be used with real credentials, private keys, company secrets, customer data, employee data, financial data, healthcare data, regulated data, or other sensitive information.

Use only synthetic, sanitized, or lab-generated logs.

## Git Checkpoints Created

The repository has commits for:

- Initial project setup
- Spring Boot backend foundation
- React frontend foundation
- Python parser service foundation
- Synthetic sample auth log

## Next Phase

Phase 2 will build the backend MVP.

Planned Phase 2 goals:

- Add a backend health check endpoint
- Add an incident model
- Add an incident controller
- Return a simple in-memory incident list
- Keep the backend beginner-friendly before adding PostgreSQL