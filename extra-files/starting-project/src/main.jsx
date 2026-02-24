// --- Client-Side Routing (Introduction) ---
//
// Right now this application is a "Single Page Application" (SPA) in the
// literal sense: every piece of UI — the header, the post list, the modal
// form — lives on ONE page with ONE URL path. No matter what the user
// does, the browser address bar always shows the same URL.
//
// In a traditional multi-page website, clicking a link loads an entirely
// new HTML page from the server (e.g., /about, /contact). Each page has
// its own URL, so users can bookmark pages, share links, and use the
// browser's Back/Forward buttons to navigate between them.
//
// SPAs do NOT request new HTML pages from the server. All rendering
// happens client-side via JavaScript. This makes navigation feel instant,
// but it also means the URL never changes — you lose bookmarking, link
// sharing, and browser history support.
//
// CLIENT-SIDE ROUTING solves this by intercepting URL changes in the
// browser and mapping them to different React components — without ever
// requesting a new HTML page. The URL updates in the address bar, the
// Back/Forward buttons work, and links are shareable, but the actual
// rendering is still handled entirely by React in the browser.
//
// The react-router-dom package is the de-facto standard for client-side
// routing in React. It provides components and hooks that let you:
//   - Define which component should render for each URL path
//   - Navigate between paths without full page reloads
//   - Read URL parameters (e.g., /posts/:id) inside components
//   - Load data before rendering a route (loader functions)
//   - Handle form submissions through route actions
//
// This entry file (main.jsx) is where the router will eventually be
// configured, because the router needs to wrap the entire application
// to intercept all navigation. The <App /> component currently rendered
// here will be replaced by a router configuration that maps URL paths
// to specific page components.

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
import React from 'react'
import ReactDOM from 'react-dom/client'

// Here we import the App component from a sibling .jsx file. For JavaScript
// and JSX files, the file extension can (and should) be omitted in the
// import path — so './App' resolves to './App.jsx'.
import App from './App'

// Importing a CSS file directly into a JavaScript file is not something
// browsers support natively. The build tool (Vite) detects this import and
// injects the CSS into the final page automatically — you can verify this
// by opening browser DevTools and inspecting the <head> element, where
// you'll find the styles from index.css injected as a <style> tag.
import './index.css'

// createRoot uses vanilla JavaScript (document.getElementById) to locate the
// <div id="root"> in index.html — the only HTML file in this project.
// The render method then takes JSX code and displays it inside that element.
//
// React.StrictMode is an optional wrapper that enables extra development-time
// checks. It warns about potentially suboptimal or outdated patterns in your
// code, including practices that may conflict with future React releases.
//
// The <App /> tag is how we use our own component in JSX — custom components
// are written as functions (see App.jsx) and can then be embedded in JSX
// just like regular HTML elements. App is the single root component; it
// in turn renders other components (like Post), building the full UI tree.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
