# Sending HTTP Requests

## Browser-side Apps Don't Directly Talk To Databases

```
┌───────────┐          ⛔          ┌────────────────┐
│           │─────────────────────►│    Database    │
│ React App │                      │ (SQL, NoSQL, …)│
│           │                      └────────────────┘
└───────────┘                             ▲
      │                                   │
      │     Database credentials would    │
      │     be exposed in the browser,    │
      │     performance issues, ...       │
      │                                   │
      │                            ┌──────┴───────┐
      └───────────────────────────►│  Backend App │
                                   │ (NodeJS App, │
                                   │  PHP App, …) │
                                   └──────────────┘
```

**Why not connect directly?**
- Database credentials would be exposed in the browser
- Performance issues
- Security vulnerabilities

**The Solution:**
- React apps communicate with Backend APIs (REST, GraphQL)
- Backend apps handle database connections securely
- Backend validates and processes requests
