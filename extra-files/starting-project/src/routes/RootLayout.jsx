// --- Layout Routes ---
//
// In most applications, certain UI elements — a navigation bar, a footer,
// a sidebar — should be visible on EVERY page, regardless of which route
// is active. Without layout routes, each route's element would need to
// render those shared elements individually, leading to duplication.
//
// A layout route solves this by acting as a WRAPPER around a group of
// child routes. The layout route's element renders the shared UI once,
// and includes a special placeholder (Outlet) where the active child
// route's content is injected. When the user navigates between child
// routes, only the Outlet area changes — the surrounding layout stays
// in place without re-mounting.
//
// --- Folder Organization: routes/ vs components/ ---
//
// With routing in place, the project now has two kinds of components:
//   1. ROUTE components — rendered by React Router for a specific URL
//      path. These live in the routes/ folder (e.g., RootLayout.jsx).
//   2. REGULAR components — reusable UI building blocks that are used
//      inside route components or other components. These stay in the
//      components/ folder (e.g., MainHeader, Post, Modal).
//
// This separation is a convention, not a technical requirement. React
// and React Router do not care which folder a component lives in. But
// organizing by role makes the project easier to navigate: when you
// need to change what a URL renders, look in routes/; when you need
// to change a reusable UI piece, look in components/.

// --- Outlet ---
//
// Outlet is a component provided by react-router-dom that serves as a
// placeholder for nested (child) route content. When this layout route
// is active, React Router looks at the current URL, finds the matching
// child route, and renders that child's element in place of <Outlet />.
//
// For example, if the URL is "/" and the child route for "/" has
// element={<App />}, then <Outlet /> renders the App component. If the
// URL changes to "/create-post", <Outlet /> swaps in the NewPost
// component instead — while everything OUTSIDE the Outlet (like
// MainHeader) remains untouched on screen.
//
// Without Outlet, the layout route would render only its own JSX
// (the header) and the child route content would have nowhere to
// appear. The page would show the header but no page content below it.
import { Outlet } from 'react-router-dom';

import MainHeader from '../components/MainHeader';

// --- RootLayout Component ---
//
// This is the top-level layout for the entire application. It renders
// the MainHeader (shared across all pages) followed by the Outlet
// (where the active child route's content appears).
//
// The component tree with this layout looks like:
//   RouterProvider
//     └─ RootLayout          (layout route for "/")
//          ├─ MainHeader     (always visible — contains Link to /create-post)
//          └─ <Outlet />     (swaps between child routes)
//               └─ Posts     (nested layout route for "/")
//                    ├─ <Outlet />  (renders NewPost modal when active)
//                    └─ PostsList   (always visible under Posts)
//
// MainHeader now handles its own navigation internally using Link
// (no props needed from RootLayout), so it is rendered with no props.
function RootLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export default RootLayout;
