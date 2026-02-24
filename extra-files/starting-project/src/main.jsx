// --- Configuring Client-Side Routes ---
//
// This file now sets up the router that maps URL paths to React
// components. Instead of always rendering <App />, the application
// will render DIFFERENT components depending on the current URL.
//
// The planned routes for this demo application are:
//   /             → the starting page showing all posts
//   /create-post  → the new-post form (its own URL, shareable/bookmarkable)
//   /posts/:id    → a detail page for a single post (future lesson)
//
// Each route is an object with at least two properties:
//   path    — the URL path segment to match (e.g., "/" or "/create-post")
//   element — the JSX to render when that path is active
//
// Together these route objects form the route configuration array passed
// to createBrowserRouter.

// This is the main entry file of the entire application — the code here
// executes first when the website is loaded in the browser.
// This .jsx file extension signals that the file contains JSX syntax,
// which the build tool (Vite) must transform into valid JavaScript
// before it reaches the browser.

// React and ReactDOM are two separate packages created by the same team.
// Together they form what we call "the React library":
//   - React provides the core concepts (components, JSX, state, etc.)
//   - ReactDOM connects React to the browser's DOM
// Both are listed as dependencies in package.json, which is the standard
// Node.js mechanism for declaring which third-party packages a project uses.
// Running "npm install" reads that file and downloads everything into
// node_modules.
import React from 'react';
import ReactDOM from 'react-dom/client';

// --- RouterProvider and createBrowserRouter ---
//
// These are the two key imports from react-router-dom needed to enable
// client-side routing:
//
//   createBrowserRouter — a function that accepts an array of route
//     definition objects and returns a router configuration object. It
//     uses the browser's History API under the hood to monitor and
//     manipulate the URL without triggering full page reloads.
//
//   RouterProvider — a React component that activates the router. It
//     replaces the previous <App /> at the render root and takes a
//     single prop called "router", whose value is the configuration
//     object returned by createBrowserRouter. Once rendered, it watches
//     the browser URL and renders the matching route's element.
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import NewPost from './components/NewPost';
import './index.css';

// --- Route Configuration ---
//
// createBrowserRouter receives an ARRAY of route definition objects.
// Each object represents one route the application supports. At minimum,
// a route needs:
//   path    — a string that React Router compares against the current URL
//   element — the JSX that should appear on screen when path matches
//
// The path "/" (a single forward slash with nothing after it) matches the
// bare domain URL (e.g., localhost:5173/). This is the "index" or "home"
// route. When a user visits the root URL, React Router renders the
// element associated with this path — in this case the App component,
// which displays the header and the full post list.
//
// The path "/create-post" matches localhost:5173/create-post. Navigating
// there renders only the NewPost form component. Notice that at this
// stage NewPost is rendered WITHOUT any props — onCancel and onAddPost
// are not passed, so the cancel button and form submission will not
// work correctly yet. The rest of the application (header, post list)
// is also absent because each route renders its element in ISOLATION.
// These issues will be solved with "layout routes" in the next lesson.
//
// If the user navigates to a path that does NOT match any route (e.g.,
// /about), React Router displays an error page indicating that no
// matching route was found. This confirms that the router is active
// and enforcing the configured paths.
//
// The element property accepts any JSX — it could be a component tag
// like <App />, a raw HTML element like <h1>Hello</h1>, or any other
// valid JSX expression. In practice, you almost always render a
// component because each page has enough complexity to warrant its
// own file.
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/create-post', element: <NewPost /> },
]);

// --- Rendering the Router Instead of a Component ---
//
// Previously, <App /> was rendered directly inside createRoot().render().
// Now <RouterProvider /> takes its place. This is the key switch that
// enables routing: instead of React always rendering the same component
// tree, RouterProvider inspects the current browser URL, finds the
// matching route in the configuration, and renders that route's element.
//
// The router prop receives the configuration object created above.
// Without this prop, RouterProvider has no routes to match and will
// throw an error.
//
// React.StrictMode still wraps everything — it is unrelated to routing
// and continues to provide its development-time warnings.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
