# LogShield Lab Case Study

## Overview

LogShield Lab is a secure educational incident response dashboard built by Tyler Parrish under Bizarre Studios, a solo indie development brand.

It is a portfolio-safe cybersecurity prototype that demonstrates how a full-stack application can handle synthetic log analysis, incident tracking, analyst notes, role-based behavior, and privacy-conscious design.

Live public demo:

```text
https://logshield-lab.vercel.app

GitHub repository:

https://github.com/TParrish21p/logshield-lab
```

## Problem
Security dashboards and SOC tools often deal with sensitive logs, credentials, internal infrastructure details, and regulated data.

For a portfolio project, that creates a challenge:

The project should demonstrate realistic cybersecurity thinking
The project should not invite users to upload real sensitive data
The public demo should be safe to review
The implementation should still show full-stack development ability
LogShield Lab solves this by separating the project into two modes:

Public-safe frontend demo mode
Local developer full-stack mode

## Goals
The main goals were to demonstrate:

React dashboard development
Java Spring Boot API design
Python parser service design
PostgreSQL persistence
Secure upload handling concepts
Incident status tracking
Analyst notes
Mock role-based access behavior
Clear safety boundaries
Portfolio-friendly documentation
Architecture
The local developer version uses:

React frontend
        ↓
Spring Boot backend API
        ↓
Python parser service
        ↓
PostgreSQL database
The public hosted demo uses:

React frontend
        ↓
Built-in synthetic data
The public demo intentionally avoids backend calls, real uploads, parser service calls, and database writes.

## Key Features
## Public Demo Mode
The hosted demo is frontend-only and safe for portfolio review.

It includes:

Built-in synthetic incident data
Synthetic parser results
Mock role selector
Incident summary cards
Incident table
Severity badges
Redacted preview examples
Disabled real upload controls

## Local Full-Stack Mode
The local developer mode includes:

Spring Boot health endpoint
Incident API
PostgreSQL-backed incident persistence
Python Flask parser service
Demo log analysis endpoint
Local secure upload endpoint
Analyst notes
Status updates
Mock role checks

## Parser Service
The Python parser detects synthetic examples of:

Failed login attempts
Multiple failed login attempts from the same IP
Suspicious PowerShell usage
Possible credential exposure
It also redacts sensitive-looking fields such as:

password=
token=
api_key=
api-key=
secret=
bearer=

## Security Decisions
## Public Demo Uploads Disabled
The hosted demo does not accept real uploads.

This reduces risk because reviewers cannot accidentally upload:

Credentials
Private keys
Customer data
Employee data
Financial data
Healthcare data
Regulated data
Company secrets

## Local Upload Restrictions
The local developer upload flow includes:

File extension allowlist
Empty file rejection
1 MB size limit
Safe server-side processing ID
No intentional long-term raw log storage
Parser redaction of sensitive-looking values

## Secrets Handling
The PostgreSQL password is read from:

LOGSHIELD_DB_PASSWORD
It is not committed to Git.

## Mock Roles
The project currently uses mock demo roles:

ADMIN
ANALYST
VIEWER

This is not real authentication. It demonstrates role-based behavior before adding Spring Security.

## Tradeoffs
## Mock Auth Instead Of Real Auth
Real authentication would add significant complexity.

For this portfolio stage, mock roles were chosen to teach and demonstrate access-control concepts without pretending to be production-ready.

## In-Memory Demo Mode For Hosting
The public hosted demo uses browser memory and synthetic data.

This makes the demo safer and easier to host, but it does not demonstrate live backend persistence in the hosted version.

## Pattern-Based Redaction
The parser redacts obvious sensitive-looking patterns.

This is useful for education, but it is not a guarantee that all sensitive information will be detected.

## What I Learned
This project helped practice:

Structuring a full-stack application
Creating React dashboard components
Building Spring Boot REST APIs
Calling a Python service from Java
Handling file uploads more safely
Connecting Spring Boot to PostgreSQL
Managing environment variables
Thinking through public demo safety
Writing security documentation
Separating portfolio demo behavior from local developer behavior

## Future Improvements
Possible future improvements:

Replace mock roles with Spring Security
Add real login and logout
Add BCrypt password hashing
Add audit logs
Store parser-generated incidents in PostgreSQL
Add incident status history
Add exportable incident reports
Add frontend form validation for uploads
Add parser timeout handling
Add database migrations with Flyway or Liquibase
Add automated tests
Add Docker Compose for local development

## Safety Statement
LogShield Lab is an educational prototype for portfolio and learning purposes only.

It is not intended for production use, compliance use, or processing real sensitive, confidential, regulated, or personally identifiable information.