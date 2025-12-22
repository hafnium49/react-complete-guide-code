# Data Fetching with Tanstack Query

*formerly React Query*

## Slide 1: Course Overview

> **Sending HTTP Requests With Ease**

- **What** Is Tanstack Query & **Why** Would You Use It?
- **Fetching** & **Mutating** Data
- **Configuring** Tanstack Query
- **Advanced Concepts:** Cache Invalidation, Optimistic Updating & More

---

## Slide 2: Frontend-Backend Architecture

```
┌─────────────┐                      ┌─────────────┐
│  Frontend   │  ←── HTTP Request ──→│   Backend   │
│             │                      │             │
│ Controls    │                      │ Manages     │
│ the UI      │                      │ backend     │
│             │                      │ tasks & data│
└─────────────┘                      │             │
       ↑                             │ May "talk"  │
       │                             │ to a        │
  React Query                        │ database    │
  (Tanstack Query)                   └─────────────┘
```

---

## Slide 3: What Is Tanstack Query?

---

## Slide 4: What Is Tanstack Query? (Definition)

> A library that helps with sending HTTP requests & keeping your frontend UI in sync

---

## Slide 5: You Don't Need Tanstack Query!

---

## Slide 6: You Don't Need Tanstack Query! (But...)

> But it can vastly simplify your code (and your life as a developer)

---

## Slide 7: Tanstack Query Does Not Send HTTP Requests

At least **not on its own**

- **You** have to write the code that sends the actual HTTP request
- Tanstack Query then manages the **data, errors, caching & much more!**

---

## Slide 8: Tanstack Query Caches Query Data

**Called in Component A @ 10:32:**
```javascript
useQuery({
  queryKey: ['some-key'],
  queryFn: fetchData
});
```

→ `fetchData()` is executed & HTTP request is sent

→ Data is **received**:
```javascript
{
  id: 'd1',
  title: 'Some data'
}
```

→ Cached (stored) by Tanstack Query

**Called in Component B @ 10:34:**
```javascript
useQuery({
  queryKey: ['some-key'],
  queryFn: fetchData
});
```

→ Cached data is reused & shown on the screen immediately
