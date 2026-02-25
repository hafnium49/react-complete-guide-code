// --- Third-Party Libraries ---
//
// React's ecosystem includes thousands of open-source packages published
// on npm (Node Package Manager). You can install any of them into your
// project with "npm install <package-name>", which downloads the package
// into the node_modules/ folder and adds it to the "dependencies" list
// in package.json. After installation, you import from the package by
// name — just like you import from "react" — rather than using a
// relative file path.
//
// react-icons is one such library. It provides thousands of popular icon
// sets (Material Design, Font Awesome, Heroicons, etc.) as ready-to-use
// React components. Each icon is a component that renders an inline SVG,
// so it behaves just like any other React component — you can pass props
// to control size, color, and other attributes.
//
// The import below pulls two specific icons from the Material Design set
// (the "md" sub-path):
//   MdPostAdd  — an icon representing "add a new post"
//   MdMessage  — an icon representing a message/conversation
//
// Using named imports like this lets the bundler (Vite) include ONLY the
// icons you actually use, rather than the entire icon library.

import { MdPostAdd, MdMessage } from 'react-icons/md';

// --- Link: Client-Side Navigation Without Page Reloads ---
//
// The Link component from react-router-dom replaces the standard HTML
// <a> (anchor) element for navigation within a React Router application.
//
// Why not use a plain <a href="/create-post">?
// An anchor element triggers the browser's DEFAULT navigation behavior:
// it sends a brand new HTTP request to the server, downloads the entire
// HTML page and all JavaScript bundles again, and starts the React app
// from scratch. Any in-memory state (fetched data, form inputs, etc.)
// is lost, and the user experiences a visible page reload.
//
// Link renders an <a> element under the hood but PREVENTS the default
// browser behavior. Instead, it tells React Router to update the URL
// in the address bar and render the matching route's component — all
// without leaving the single-page application. The result is instant,
// seamless navigation with no network request for a new HTML page.
//
// Link uses a "to" prop (instead of "href") to specify the target path.
import { Link } from 'react-router-dom';

import classes from './MainHeader.module.css';

// --- No More onCreatePost Prop ---
//
// Previously, MainHeader received an onCreatePost handler from the
// parent (App) which toggled modal visibility state. With routing,
// opening the new-post form is simply a matter of NAVIGATING to the
// /create-post URL. The Link component handles this internally — no
// prop from a parent is needed. This eliminates one more piece of
// lifted state and simplifies the component's interface.
function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        {/* Icon components from react-icons are used inline just like
            any other React component. They render an SVG element. */}
        <MdMessage />
        React Poster
      </h1>
      <p>
        {/* The "to" prop specifies the route path to navigate to.
            Clicking this Link updates the URL to /create-post and
            React Router renders the NewPost component — all without
            a page reload. The Link renders as an <a> in the DOM,
            so it's accessible and supports standard link behaviors
            (right-click → open in new tab, etc.). */}
        <Link to="/create-post" className={classes.button}>
          <MdPostAdd size={18} />
          New Post
        </Link>
      </p>
    </header>
  );
}

export default MainHeader;
