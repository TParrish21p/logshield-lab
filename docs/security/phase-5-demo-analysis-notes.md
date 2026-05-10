# Phase 5 Demo Analysis Notes

## What We Built

Phase 5 started with the safest version of log analysis: built-in synthetic demo log analysis.

Instead of accepting real file uploads immediately, the frontend has a button that asks the backend to analyze a built-in synthetic log sample.

Current flow:

```text
React frontend
        ↓
Spring Boot backend
        ↓
Python parser service
        ↓
React frontend results