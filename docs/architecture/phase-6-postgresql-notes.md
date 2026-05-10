# Phase 6 PostgreSQL Notes

## What We Built

Phase 6 moved LogShield Lab incidents from an in-memory Java list to PostgreSQL persistence.

Before this phase, demo incidents reset every time the backend restarted.

After this phase, incidents are stored in the local PostgreSQL database.

## Local Database

Database name:

```text
logshield_lab
```

Default local port:

```text
5432
```

Current local database user:

```text
postgres
```

The database password is not stored in Git.

## Password Handling

The backend reads the PostgreSQL password from an environment variable:

```text
LOGSHIELD_DB_PASSWORD
```

In PowerShell, set it before running the backend:

```powershell
$env:LOGSHIELD_DB_PASSWORD="your_postgres_password"
```

This sets the password only for the current terminal session.

## Backend Configuration

The backend database settings live in:

```text
backend/src/main/resources/application.properties
```

Current settings:

```properties
spring.application.name=LogShield Lab

spring.datasource.url=jdbc:postgresql://localhost:5432/logshield_lab
spring.datasource.username=postgres
spring.datasource.password=${LOGSHIELD_DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

## Dependencies Added

The backend now uses:

- Spring Data JPA
- PostgreSQL JDBC driver

These are configured in:

```text
backend/pom.xml
```

## New Backend Files

```text
backend/src/main/java/com/bizarrestudios/logshieldlab/repository/IncidentRepository.java
```

This repository lets Spring Data JPA read and write `Incident` records.

## Incident Entity

The `Incident` model is now a JPA entity.

Important annotations:

```java
@Entity
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
```

These tell Spring Boot that incidents should be stored in a database table and that PostgreSQL should generate incident IDs.

## Seed Data

The backend currently creates two synthetic demo incidents only if the database is empty.

This keeps the dashboard useful on first run while avoiding duplicate demo records on every restart.

## Manual Test Steps

### Start PostgreSQL

PostgreSQL must be running locally before the backend starts.

If `psql` is not in PATH, use the full path:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" --version
```

If needed, PostgreSQL can be started manually with:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" start -D "C:\Program Files\PostgreSQL\18\data" -l "C:\Program Files\PostgreSQL\18\data\manual-start.log"
```

### Confirm Database Exists

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -l
```

Look for:

```text
logshield_lab
```

### Run Backend

```powershell
cd backend
$env:LOGSHIELD_DB_PASSWORD="your_postgres_password"
.\mvnw.cmd spring-boot:run
```

### Test Incidents

Open:

```text
http://localhost:8080/api/incidents
```

Expected result:

- Two synthetic demo incidents appear on first run
- Incident notes and status changes persist after backend restart

### Test Persistence

Update notes:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/incidents/1/notes" -Method Patch -ContentType "application/json" -Body '{"notes":"Stored in PostgreSQL for Phase 6 testing."}'
```

Restart the backend.

Open:

```text
http://localhost:8080/api/incidents
```

Expected result:

- The note still appears after restart

## Safety Reminder

The database should store incident metadata, notes, status, source labels, and timestamps.

The project should avoid storing raw uploaded logs long-term.

Use only synthetic, sanitized, or lab-generated logs.

Do not store real credentials, private keys, customer data, employee data, financial data, healthcare data, regulated data, company secrets, or other sensitive information.

## Future Improvements

Later phases may add:

- Audit log table
- User table
- Role table
- Incident status history
- Parser-generated incidents stored in PostgreSQL
- Database migrations with Flyway or Liquibase
- Safer production-style secret handling