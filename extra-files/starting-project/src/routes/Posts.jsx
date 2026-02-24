// --- Refactoring: App → Posts (Route Component) ---
//
// This file was originally App.jsx — the root component of the entire
// application. With routing in place, its role has fundamentally changed:
//
//   BEFORE routing: App was the top-level component that rendered
//     MainHeader, managed modal visibility state, and passed props down
//     to PostsList and MainHeader.
//
//   AFTER routing: The MainHeader now lives in RootLayout (the top-level
//     layout route), so App no longer needs to render it. The modal
//     visibility state (modalIsVisible) and its handlers (showModalHandler,
//     hideModalHandler) are also removed because the new-post form is now
//     a separate ROUTE — navigating to /create-post displays it, rather
//     than toggling a boolean state.
//
// The component has been renamed from App to Posts and moved into the
// routes/ folder to reflect its new role: it is a route component
// responsible for the posts page, not the application shell.
//
// --- Posts as a Layout Route ---
//
// Posts is not just a regular route — it is ALSO a layout route. The
// new-post form (/create-post) should appear as a modal OVERLAY on top
// of the posts list, not as a standalone page. To achieve this, the
// /create-post route is configured as a CHILD of the Posts route in
// main.jsx. Posts renders an <Outlet /> where the child route's content
// (the NewPost modal) is injected — directly above the post list.
//
// The resulting nested layout structure is:
//   RootLayout  (provides MainHeader + Outlet)
//     └─ Posts  (provides Outlet + PostsList in <main>)
//          └─ NewPost  (rendered inside Posts' Outlet as modal overlay)
//
// When the URL is "/", only the post list is visible (the Outlet is
// empty because no child route matches). When the URL is "/create-post",
// the NewPost modal appears in the Outlet ABOVE the post list, creating
// the overlay effect.

import { Outlet } from 'react-router-dom';

import PostsList from '../components/PostsList';

function Posts() {
  // The Outlet is placed BEFORE the <main> block. When a child route
  // is active (e.g., /create-post), its element (NewPost wrapped in a
  // Modal) renders here — visually on top of the post list below.
  // When no child route matches (just "/"), the Outlet renders nothing.
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;
