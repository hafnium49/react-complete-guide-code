# Authentication

## Slide 1: Why Authentication?

> **Authentication is needed if content should be protected** *(not accessible by everyone)*

---

## Slide 2: Two-step Process

1. **Get access / permission** (login)
2. **Send request to protected resource** (with proof of permission)

---

## Slide 3: Getting Permission

```
┌─────────────────┐     Request                ┌──────────┐
│ Client (Browser)│────(with user credentials)──►│  Server  │
│                 │◄───────Response──────────────│          │
└─────────────────┘      (yes / no)            └──────────┘
```

**Is that enough?**

A "yes" alone is **not enough** to then access protected resources (API endpoints).

---

## Slide 4: How Does Authentication Work?

> We can't just save and use the "yes" - We could send a fake "yes" to the server to request protected data

### Two Main Approaches:

| Server-side Sessions | Authentication Tokens |
|---------------------|----------------------|
| Store unique identifier on server, send same identifier to client | Create (but not store) "permission" token on server, send token to client |
| Client sends identifier along with requests to protected resources | Client sends token along with requests to protected resources |

### Token-based Authentication (JWT):
- More common for SPAs
- Stateless (no server-side storage needed)
- Token contains encoded user information
- Server validates token signature on each request
