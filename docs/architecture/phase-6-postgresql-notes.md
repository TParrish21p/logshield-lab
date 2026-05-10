# Phase 6 PostgreSQL Notes

## What We Built

Phase 6 moved LogShield Lab incidents from an in-memory Java list to PostgreSQL persistence.

Before this phase, demo incidents reset every time the backend restarted.

After this phase, incidents are stored in the local PostgreSQL database.

## Local Database

Database name:

```text
logshield_lab