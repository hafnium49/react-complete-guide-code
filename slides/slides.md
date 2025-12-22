# Building Multi-Page Apps with React Router

## Slide 1: What Is Routing?

```
┌────────────┐    URL changes    ┌────────────┐
│  /welcome  │ ────────────────► │  /products │
├────────────┤                   ├────────────┤
│ ┌────────┐ │    Visible        │ ┌──┬──┬──┐ │
│ │        │ │    content        │ │  │  │  │ │
│ ├────────┤ │    changes        │ ├──┼──┼──┤ │
│ │        │ │ ═══════════════►  │ │  │  │  │ │
│ └────────┘ │                   │ └──┴──┴──┘ │
└────────────┘                   └────────────┘
```

---

## Slide 2: Multi-Page Routing (Traditional)

```
┌────────────┐    URL changes    ┌────────────┐
│  /welcome  │ ────────────────► │  /products │
└────────────┘                   └────────────┘
      │                                │
      │    Page Change = New           │
      │    Requests + Response         │
      │                                │
      ▼    HTML is requested & loaded  ▼
┌────────────┐                   ┌──────────────┐
│welcome.html│                   │products.html │
└────────────┘                   └──────────────┘
```

Each page change triggers a new HTTP request to the server.

---

## Slide 3: Building SPAs

> When building complex user interfaces, we typically build **Single Page Applications (SPAs)**

1. **Only one initial HTML request & response**

2. **Page (URL) changes are then handled by client-side (React) code**
   - Changes the visible content without fetching a new HTML file

### Benefits of SPAs:
- Faster page transitions (no server round-trip)
- Better user experience
- State is preserved across "page" changes
- More app-like feel
