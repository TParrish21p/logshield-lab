# LogShield Lab

**LogShield Lab** is a secure educational incident response dashboard built by Tyler Parrish under **Bizarre Studios**, a solo indie development brand.

> An educational prototype for portfolio and learning purposes only. It is not intended for production use, compliance use, or processing real sensitive, confidential, regulated, or personally identifiable information.

## Safety Notice

Do not upload real credentials, private keys, customer data, employee data, financial data, healthcare data, company secrets, regulated data, or other sensitive information. Use only synthetic, sanitized, or lab-generated logs.

LogShield Lab is not a real SOC platform, compliance product, enterprise security tool, or production monitoring system.

## Public Demo

LogShield Lab includes a public-safe frontend demo mode for portfolio hosting.

Public demo mode uses only built-in synthetic data. It does not require the Spring Boot backend, Python parser service, PostgreSQL, real uploads, real accounts, or real log data.

In public demo mode:

- Real file uploads are disabled
- Backend API calls are disabled
- Database writes are disabled
- Parser service calls are simulated with built-in synthetic results
- Changes happen only in browser memory and reset on page reload

Run the public-safe demo locally from the frontend folder:

```powershell
npm run dev:demo


## Planned Architecture

```text
User opens browser
        ↓
React frontend dashboard
        ↓
Java Spring Boot backend API
        ↓
Python parser service
        ↓
PostgreSQL database
