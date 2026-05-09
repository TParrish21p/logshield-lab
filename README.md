# LogShield Lab

**LogShield Lab** is a secure educational incident response dashboard built by Tyler Parrish under **Bizarre Studios**, a solo indie development brand.

> An educational prototype for portfolio and learning purposes only. It is not intended for production use, compliance use, or processing real sensitive, confidential, regulated, or personally identifiable information.

## Safety Notice

Do not upload real credentials, private keys, customer data, employee data, financial data, healthcare data, company secrets, regulated data, or other sensitive information. Use only synthetic, sanitized, or lab-generated logs.

LogShield Lab is not a real SOC platform, compliance product, enterprise security tool, or production monitoring system.

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
