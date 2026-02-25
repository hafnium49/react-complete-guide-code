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

import RootLayout from './routes/RootLayout';
// --- Importing the Loader Alongside the Component ---
//
// A route's loader function is typically exported from the same file as
// the route component. Here we import both: Posts (the default export,
// the component) and loader (a named export, the data-fetching function).
//
// Since multiple route files may each export a function called "loader",
// we use an import alias to avoid name collisions: "loader as postsLoader".
// This way, each route's loader has a unique name in main.jsx.
import Posts, { loader as postsLoader } from './routes/Posts';
// --- Importing the Action Alongside the Component ---
//
// The same aliasing pattern used for loaders applies to actions. The
// NewPost route file exports both the component (default export) and
// an action function (named export). We import the action with an
// alias (newPostAction) to avoid name clashes with actions from other
// routes. The action will be assigned to the "action" property on the
// /create-post route definition.
import NewPost, { action as newPostAction } from './routes/NewPost';
import './index.css';

// --- Nested Layout Routes ---
//
// The route configuration now has TWO levels of nesting:
//
//   Level 1: RootLayout (path "/")
//     Provides the MainHeader and an Outlet for its children.
//
//   Level 2: Posts (path "/")
//     A child of RootLayout that is ALSO a layout route. It renders
//     its own Outlet (for the modal overlay) plus the PostsList in a
//     <main> section. Because Posts has the same path as its parent,
//     it matches the root URL and renders inside RootLayout's Outlet.
//
//   Level 3: NewPost (path "/create-post")
//     A child of Posts. When the URL is /create-post, NewPost renders
//     inside Posts' Outlet — which sits ABOVE the post list. Since
//     NewPost wraps itself in a Modal, it appears as an overlay on
//     top of the posts, achieving the desired stacked look.
//
// The full nesting visualized:
//   RootLayout          → MainHeader + Outlet
//     └─ Posts           → Outlet + <main><PostsList /></main>
//          └─ NewPost    → Modal overlay with the form
//
// When the URL is just "/":
//   RootLayout renders MainHeader, its Outlet renders Posts,
//   Posts' Outlet is empty (no child route matches), and PostsList
//   displays below.
//
// When the URL is "/create-post":
//   RootLayout renders MainHeader, its Outlet renders Posts,
//   Posts' Outlet renders NewPost (as a modal), and PostsList
//   still displays below — giving the overlay-on-list appearance.
//
// --- The loader Property on a Route Definition ---
//
// In addition to path, element, and children, a route definition can
// include a "loader" property. Its value is a function that React Router
// calls BEFORE rendering the route's element.
//
// The sequence when a user navigates to "/" is:
//   1. React Router matches the "/" path to the Posts route.
//   2. It calls postsLoader() and waits for the returned Promise to
//      resolve (the async fetch to the backend).
//   3. Once the data is available, it renders <Posts /> (and any nested
//      children). The fetched data is accessible inside Posts or any
//      descendant component via the useLoaderData hook.
//
// This "fetch-then-render" approach eliminates the need for useState
// and useEffect inside the component. The component always has its
// data ready when it first renders.
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: postsLoader,
        // --- The action Property on a Route Definition ---
        //
        // Just as "loader" fetches data before a route renders,
        // "action" handles data when a <Form> inside the route is
        // submitted. React Router calls this function, passes it
        // the form data wrapped in a Request object, and waits for
        // it to complete. If the action returns a redirect(), React
        // Router navigates to the specified path afterward.
        children: [
          { path: '/create-post', element: <NewPost />, action: newPostAction },
        ],
      },
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
