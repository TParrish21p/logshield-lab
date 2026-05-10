# LogShield Lab Architecture Diagram

## Public Demo Mode

The hosted public demo is intentionally frontend-only.

```mermaid
flowchart TD
    A["Reviewer opens public demo"] --> B["React frontend on Vercel"]
    B --> C["Built-in synthetic incidents"]
    B --> D["Built-in synthetic parser results"]
    B --> E["Browser-memory role and status changes"]

    C --> F["No backend calls"]
    D --> F
    E --> F

    F --> G["No real uploads, no database writes, no sensitive data collection"]
```

## Local Developer Mode

The local developer version runs the full educational stack.

```mermaid
flowchart TD
    A["User opens browser"] --> B["React frontend localhost:5173"]
    B --> C["Spring Boot backend localhost:8080"]
    C --> D["Python parser service 127.0.0.1:5000"]
    C --> E["PostgreSQL logshield_lab database"]

    D --> C
    C --> B

    F["Synthetic or sanitized local log file"] --> B
    B --> C
    C --> G["Validate upload type and size"]
    G --> H["Read file text temporarily"]
    H --> D
    D --> I["Return redacted parser alerts"]
    I --> C
    C --> B
```

## Safety Boundaries

```mermaid
flowchart LR
    A["Public hosted demo"] --> B["Synthetic data only"]
    A --> C["Uploads disabled"]
    A --> D["No backend"]
    A --> E["No database"]

    F["Local developer mode"] --> G["Local upload learning flow"]
    F --> H["1 MB limit"]
    F --> I["Allowed extensions only"]
    F --> J["No intentional long-term raw log storage"]
```

## Notes

LogShield Lab is an educational prototype for portfolio and learning purposes only.

It is not intended for production use, compliance use, or processing real sensitive, confidential, regulated, or personally identifiable information.