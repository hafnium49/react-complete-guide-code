# React.js Summary

## Slide 1: What Is React? And Why Would We Use It?

---

## Slide 2: React Definition

> React is a JavaScript library for **building user interfaces**

---

## Slide 3: React Benefits

> React makes building **complex**, **interactive** and **reactive** user interfaces **simpler**

---

## Slide 4: What is React.js?

```
                    ┌─────────────┐
                    │   React.js  │
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  Client-    │ │  Building   │ │ Declarative │
    │  side JS    │ │  modern,    │ │ component-  │
    │  library    │ │  reactive   │ │ focused     │
    │             │ │  UIs for    │ │ approach    │
    │             │ │  the web    │ │             │
    └─────────────┘ └─────────────┘ └─────────────┘
```

---

## Slide 5: Reactive vs Traditional Apps

**Mobile apps and desktop apps** feel very "**reactive**": Things happen instantly, you **don't wait** for new pages to load or actions to start.

**Traditionally, in web apps**, you click a link and wait for a new page to load. You click a button and wait for some action to complete.

```
[Client] ──── Request ────► [Server]
[Client] ◄── HTML Page ──── [Server]
```

---

## Slide 6: JavaScript To The Rescue!

- JavaScript runs in the browser – on the loaded page
- You can manipulate the HTML structure (DOM) of the page
- No (visible) request to the server required, no need to wait for a new HTML page as a response

---

## Slide 7: Building Single-Page-Applications (SPAs)

| Widget Approach | SPA Approach |
|-----------------|--------------|
| React can be used to **control parts** of HTML pages or entire pages | React can also be used to **control the entire frontend** of a web application |
| "**Widget**" approach on a multi-page-application | "**Single-Page-Application**" (**SPA**) approach |
| (Some) pages are still **rendered on and served by a backend server** | Server **only sends one HTML page**, thereafter, React takes over and controls the UI |

---

## Slide 8: HTML, CSS & JavaScript

> **HTML, CSS & JavaScript** are about building user interfaces **as well**

---

## Slide 9: React.js Alternatives

| Angular | React.js | Vue.js |
|---------|----------|--------|
| Complete component-based UI framework, packed with features. Uses TypeScript. Can be overkill for smaller projects. | Lean and focused component-based UI library. Certain features (e.g. routing) are added via community packages. | Complete component-based UI framework, includes most core features. A bit less popular than React & Angular. |
