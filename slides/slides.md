# Deploying React Apps

## Slide 1: Deployment Steps

1. **Test** Code
2. **Optimize** Code
3. **Build** App for Production
4. **Upload** Production Code to Server
5. **Configure** Server

---

## Slide 2: Lazy Loading

> **Load code only when it's needed**

Lazy loading helps reduce the initial bundle size by splitting code into smaller chunks that are loaded on demand.

```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

## Slide 3-4: A React SPA is a "Static Website"

> Only **HTML, CSS & JavaScript**

A **Static Site Host** Is Needed

### Popular Static Hosting Options:
- Firebase Hosting
- AWS S3 + CloudFront
- Netlify
- Vercel
- GitHub Pages

---

## Slide 5: Server-side Routing vs Client-side Routing

```
                    Request
┌─────────────┐                    ┌──────────┐    ┌─────────────────┐
│ /some-route │───────────────────►│  Server  │───►│ Production-ready│
└─────────────┘                    └──────────┘    │   React Code    │
                                                   └────────┬────────┘
                                                            │
                                                            ▼ Response
┌─────────────┐                                    ┌─────────────────┐
│   Client    │◄───────────────────────────────────│    HTML, CSS    │
│   (User)    │◄───────── /some-route ─────────────│  JS React Code  │
└─────────────┘                                    └─────────────────┘
```

---

## Slide 6: Server-side Routing with SPAs

1. The server must be configured to **always return the index.html** file and ignore the route

2. Then, **React Router (client-side)** can take over and render the correct page content

### Important Configuration:
For SPAs with client-side routing, configure your server to redirect all requests to `index.html` so React Router can handle the routing.
