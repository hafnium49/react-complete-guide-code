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

// --- Route Loaders (React Router v6.4+) ---
//
// React Router v6.4 introduced a powerful data-loading feature: the
// "loader" property on route definitions. A loader is a FUNCTION that
// React Router calls BEFORE rendering the route's element. Its job is
// to fetch or prepare whatever data the route (or its nested components)
// will need.
//
// Key characteristics of loaders:
//
//   1. EXECUTION TIMING — The loader runs BEFORE the route component
//      renders. React Router waits for the loader to complete, then
//      renders the element with the data already available. This is
//      fundamentally different from useEffect, which runs AFTER the
//      first render (causing a "render → fetch → re-render" cycle).
//
//   2. RUNS ON THE CLIENT — Despite being defined outside of a component,
//      the loader still executes in the browser. It has access to the
//      same browser APIs (fetch, localStorage, etc.) as any other
//      client-side code.
//
//   3. CAN BE ASYNC — If the loader returns a Promise (e.g., because it
//      uses async/await), React Router automatically waits for the
//      Promise to resolve before rendering. This means you can use
//      async/await freely without the workarounds needed with useEffect.
//
//   4. RETURN VALUE — Whatever the loader returns becomes available to
//      the route's element (and any nested component) via the
//      useLoaderData hook. You typically return the data the component
//      needs (e.g., an array of posts).
//
//   5. CONVENTION — The loader function is commonly defined and exported
//      from the SAME file as the route component it serves. This keeps
//      related code together. The function is typically named "loader"
//      and imported with an alias in main.jsx (e.g., postsLoader) to
//      avoid name clashes when multiple routes each have their own loader.
//
// --- Why Loaders Replace useEffect for Route Data ---
//
// With useEffect, the component renders first (showing empty or loading
// state), THEN fires the effect to fetch data, THEN re-renders with the
// fetched data. This requires managing useState for the data and often
// a separate isFetching state for loading indicators.
//
// With a loader, the data is fetched BEFORE the component renders, so
// the component can be written as if the data is always available. No
// useState for the fetched data. No useEffect. No isFetching boolean.
// The result is significantly less code inside the component.
//
// Trade-off: because the loader must finish before the element renders,
// a slow backend can cause a visible delay where nothing appears on
// screen. React Router provides advanced features (deferred data,
// loading UI) to handle slow backends, but those are beyond the scope
// of this crash course.
export async function loader() {
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();
  return resData.posts;
}

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
