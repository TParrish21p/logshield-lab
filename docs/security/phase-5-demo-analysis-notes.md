# Phase 5 Demo Analysis and Local Upload Notes

## What We Built

Phase 5 started with the safest version of log analysis: built-in synthetic demo log analysis.

Instead of accepting real file uploads immediately, the frontend first received a button that asks the backend to analyze a built-in synthetic log sample.

After that, a local developer-only upload flow was added for learning purposes.

Current flow:

```text
React frontend
        ↓
Spring Boot backend
        ↓
Python parser service
        ↓
React frontend results
```

## Current Demo Endpoint

```text
POST /api/demo/analyze
```

This endpoint exists in the Spring Boot backend.

It sends built-in synthetic demo log text to the parser service at:

```text
POST http://127.0.0.1:5000/analyze
```

## Why Built-In Demo Analysis Is Safer Than Uploads

The built-in demo log avoids accepting user files.

That makes the portfolio demo safer because:

- No real files are uploaded
- No raw user logs are stored
- No file paths are exposed
- No real sensitive data is requested
- The demo can run with built-in synthetic data only

## Local Developer Upload Added

A local developer-only upload flow has been added for learning purposes.

Current endpoint:

```text
POST /api/upload/analyze
```

Current frontend behavior:

- User selects a local file
- Browser sends the file to the Spring Boot backend
- Backend validates the file
- Backend reads the file text temporarily
- Backend sends the text to the Python parser service
- Parser returns structured alerts
- Frontend displays alerts and redacted preview

Current backend controls:

- Allows only `.txt`, `.log`, `.csv`, and `.json`
- Rejects empty files
- Enforces a 1 MB maximum file size
- Generates a safe processing ID instead of trusting the user filename
- Does not expose upload paths
- Does not intentionally store raw uploaded files long-term

Important limitation:

The current implementation reads the uploaded file into memory and forwards the text to the parser. It does not save raw uploads to disk. This is acceptable for the local educational MVP with a 1 MB limit, but production systems would need stronger controls, scanning, storage isolation, audit logging, and more detailed validation.

For any hosted portfolio demo, the safest choice remains using only the built-in synthetic demo log and disabling real uploads.

## Frontend Demo and Upload UI

The frontend includes two analysis options:

```text
Analyze Demo Log
```

and:

```text
Analyze Selected File
```

The dashboard then shows:

- Parser alert count
- Alert cards
- Severity badges
- Redacted evidence
- Redacted preview lines

## Current Parser Behavior

The parser can detect:

- Failed login attempts
- Multiple failed login attempts from the same IP address
- Suspicious PowerShell usage
- Possible credential exposure

The parser can redact sensitive-looking values such as:

- `password=`
- `token=`
- `api_key=`
- `api-key=`
- `secret=`
- `bearer=`

## Safety Warning

The frontend includes this warning before analysis results:

```text
Do not upload real credentials, private keys, customer data, employee data, financial data, healthcare data, company secrets, regulated data, or other sensitive information. Use only synthetic, sanitized, or lab-generated logs.
```

## Manual Test Steps

Three services must run locally.

### Terminal 1: Parser Service

Activate `.venv` only for this Python service terminal:

```powershell
cd parser-service
.\.venv\Scripts\Activate.ps1
python app.py
```

When finished testing, stop the service with `Ctrl + C`, then deactivate `.venv`:

```powershell
deactivate
```

### Terminal 2: Backend

Do not activate `.venv` for the backend.

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

### Terminal 3: Frontend

Do not activate `.venv` for the frontend.

```powershell
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

## Expected Demo Test Result

Click:

```text
Analyze Demo Log
```

Expected result:

- Alerts appear in the demo log section
- Token-like values are redacted
- The page does not request a real file

## Expected Local Upload Test Result

Choose the synthetic sample log:

```text
sample-logs/demo-auth.log
```

Click:

```text
Analyze Selected File
```

Expected result:

- Alerts appear in the log analysis section
- Token-like values are redacted
- File is analyzed through the backend and parser service
- Raw file contents are not stored long-term

## File Type Rejection Test

From the project root, this command should be rejected because `README.md` is not an allowed upload type:

```powershell
curl.exe -X POST "http://localhost:8080/api/upload/analyze" -F "file=@README.md"
```

Expected response:

```json
{
  "error": "Only .txt, .log, .csv, and .json files are allowed."
}
```

## Future Secure Upload Improvements

A stronger local upload flow may be added later for learning purposes.

Possible improvements:

- Add clearer frontend validation before sending files
- Show file size before upload
- Reject invalid file types on the frontend before upload
- Add parser timeout handling
- Add backend request size limits in Spring configuration
- Add audit log entries for upload attempts
- Add structured error responses for parser service downtime
- Store only extracted incident metadata in PostgreSQL
- Continue avoiding long-term raw log storage
- Prefer disabling real upload in any hosted portfolio demo