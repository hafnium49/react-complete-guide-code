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
import RootLayout from './routes/RootLayout';
import './index.css';

// --- Route Configuration with Layout Routes ---
//
// createBrowserRouter receives an ARRAY of route definition objects.
// Each object represents one route the application supports. At minimum,
// a route needs:
//   path    — a string that React Router compares against the current URL
//   element — the JSX that should appear on screen when path matches
//
// --- Layout Routes and the children Property ---
//
// A route definition can include a THIRD property: children. This is an
// array of nested route definitions. When a parent route has children,
// it becomes a "layout route" — its element renders shared UI (like a
// header or sidebar) and includes an <Outlet /> component that acts as
// a placeholder. React Router renders the matching child's element
// inside that Outlet.
//
// The structure below creates one layout route (path "/") that wraps
// two child routes. The layout route's element is RootLayout, which
// renders MainHeader and an Outlet. The children define what appears
// in the Outlet based on the URL:
//
//   URL "/"             → RootLayout renders, Outlet shows <App />
//   URL "/create-post"  → RootLayout renders, Outlet shows <NewPost />
//
// Because both child routes are nested under the same layout, the
// MainHeader from RootLayout stays on screen regardless of which
// child route is active. Only the Outlet content swaps.
//
// The position of the layout route in the array does not matter —
// React Router matches by path, not by array index.
//
// If the user navigates to a path that does NOT match any route (e.g.,
// /about), React Router displays an error page indicating that no
// matching route was found.
//
// NOTE: At this stage, the App component still renders its OWN
// MainHeader internally, so navigating to "/" will show the header
// TWICE — once from RootLayout and once from App. This duplication
// will be resolved in the next refactoring step.
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/create-post', element: <NewPost /> },
    ],
  },
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
