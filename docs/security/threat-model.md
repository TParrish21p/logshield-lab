# LogShield Lab Threat Model

## Purpose

This document describes the main security concerns, assumptions, and safety boundaries for LogShield Lab.

LogShield Lab is an educational prototype for portfolio and learning purposes only. It is not intended for production use, compliance use, or processing real sensitive, confidential, regulated, or personally identifiable information.

## System Overview

LogShield Lab has two modes:

### Public Demo Mode

The public hosted demo is frontend-only.

It uses:

- React frontend
- Built-in synthetic incidents
- Built-in synthetic parser results
- Browser-memory UI changes only

It does not use:

- Real file uploads
- Spring Boot backend
- Python parser service
- PostgreSQL
- Real user accounts
- Real log data

### Local Developer Mode

The local developer version uses:

- React frontend
- Spring Boot backend
- Python parser service
- PostgreSQL database
- Local-only upload handling for learning purposes

## Assets

Important assets include:

- Incident metadata
- Analyst notes
- Demo role behavior
- Parser alert metadata
- Redacted evidence previews
- PostgreSQL database records
- Local environment variables
- Synthetic sample logs

The project should not handle real sensitive data.

## Trust Boundaries

### Browser to Backend

The React frontend sends requests to the Spring Boot backend.

Risks:

- User-controlled input
- Modified request headers
- Invalid file uploads
- Cross-origin requests

Current controls:

- CORS limited to local frontend during development
- Backend role checks for incident updates
- Upload extension allowlist
- Upload size limit

### Backend to Parser Service

The backend sends log text to the Python parser service.

Risks:

- Large input payloads
- Malformed log content
- Parser downtime
- Sensitive values in logs

Current controls:

- Backend file size limit
- Parser redaction of sensitive-looking values
- Local-only parser service
- Public demo does not call the parser service

### Backend to PostgreSQL

The backend stores incident metadata in PostgreSQL.

Risks:

- Credential exposure
- Unintended raw log storage
- Unvalidated data persisted in notes/status fields

Current controls:

- Database password is read from an environment variable
- Raw uploads are not intentionally stored long-term
- PostgreSQL is local-only for development

## Threats and Mitigations

## Real Sensitive Data Uploaded

Risk:

A user could accidentally upload credentials, private keys, customer data, employee data, financial data, healthcare data, company secrets, regulated data, or other sensitive information.

Mitigations:

- Strong safety warning in README
- Strong safety warning in frontend
- Public demo disables file upload
- Local upload is clearly labeled for synthetic data only
- Parser redacts some sensitive-looking values
- Raw uploads are not intentionally stored long-term

Remaining risk:

Redaction is pattern-based and not guaranteed to catch all sensitive information.

## Malicious File Upload

Risk:

A user could upload an unexpected file type or very large file.

Mitigations:

- Backend allows only `.txt`, `.log`, `.csv`, and `.json`
- Backend rejects empty files
- Backend enforces a 1 MB size limit
- Backend does not trust user filenames
- Upload paths are not exposed publicly

Remaining risk:

The current educational version does not perform malware scanning, deep content-type validation, or sandboxed parsing.

## Role Bypass

Risk:

The mock role selector is not real authentication. A user can change frontend state or request headers.

Mitigations:

- Backend checks the `X-Demo-Role` header for protected demo actions
- Documentation clearly states this is not real authentication
- Public demo treats role behavior as educational UI behavior only

Remaining risk:

This is not production-grade authorization. Real authentication should use Spring Security or another proper auth system.

## Parser Service Abuse

Risk:

The parser could receive malformed, unexpected, or excessive input.

Mitigations:

- Backend upload size limit
- Public demo does not call parser service
- Parser only performs simple pattern matching in the educational MVP

Remaining risk:

The parser has no timeout controls, rate limiting, or advanced input isolation yet.

## Database Credential Exposure

Risk:

A database password could be committed accidentally.

Mitigations:

- `application.properties` uses `${LOGSHIELD_DB_PASSWORD}`
- Password is set through PowerShell environment variable locally
- README instructs not to commit secrets

Remaining risk:

A developer could still accidentally expose secrets through screenshots, shell history, or manual edits.

## Cross-Origin Requests

Risk:

A public website could try to call local backend endpoints.

Mitigations:

- CORS is limited to `http://localhost:5173` for development
- Hosted public demo does not call backend APIs

Remaining risk:

CORS is not authentication. Real auth would still be needed for any deployed backend.

## Non-Goals

LogShield Lab does not currently provide:

- Production authentication
- Compliance controls
- Real SOC operations
- Malware scanning
- Secure multi-user tenancy
- Full audit logging
- Encryption key management
- Production deployment hardening
- Guaranteed sensitive data detection
- Regulatory data handling

## Public Demo Safety Decision

The public hosted demo is intentionally frontend-only.

This prevents:

- Real uploads
- Backend exposure
- Database exposure
- Parser service exposure
- Real user data collection

This is the safest portfolio-friendly deployment choice for the current project stage.

## Future Security Improvements

Possible future improvements:

- Replace mock roles with Spring Security
- Add BCrypt password hashing
- Add session-based authentication or a JWT learning flow
- Add audit logs
- Add parser request timeouts
- Add frontend file validation before upload
- Add backend request size configuration
- Add structured parser downtime errors
- Add database migrations
- Add incident status history
- Add security headers for deployed frontend