// --- index.js: The Application Entry Point ---
//
// This is the FIRST JavaScript file that executes when the page loads.
// That's simply a fact of the project setup (Create React App) — you
// have to know that index.js is the entry point; there is no visible
// configuration that spells it out in the source code itself.
//
// Important: the code you see here is NOT delivered to the browser
// as-is. The development server started by "npm start" runs a build
// tool behind the scenes that TRANSFORMS the code before serving it.
// This transformation step is what makes certain non-standard syntax
// work in the browser — for example:
//
//   1. Importing a CSS file into a JavaScript file (line below).
//      Normally, JavaScript cannot import CSS. The build tool
//      intercepts this import and injects the CSS into the page
//      automatically.
//
//   2. Writing HTML-like syntax (JSX) inside JavaScript, as seen
//      in the render() call at the bottom. JSX is not valid
//      JavaScript — the build tool converts it to regular function
//      calls before the browser ever sees it.
//
// This transformation also ensures the code runs in all supported
// browsers, even if they don't support the latest JavaScript features.

// --- React and ReactDOM ---
//
// The React library is split across two npm packages:
//
//   react     — the core library (components, hooks, JSX logic)
//   react-dom — the bridge that connects React to the browser's DOM
//
// Both are listed as dependencies in package.json and downloaded into
// node_modules by "npm install". Together they form "the React library."
//
// Here we import from 'react-dom/client', which exposes the browser-
// specific rendering API. The import path is the package name (no ./
// prefix), so the build tool looks in node_modules rather than in the
// local src/ folder.
// Although modern project setups no longer require this import,
// we include it to make it explicit that React is the library
// powering JSX and the component model used throughout this app.
// See App.js for a detailed explanation of why this import existed
// historically and why it is still commonly seen in codebases.
import React from 'react';

import ReactDOM from 'react-dom/client';

// Importing a CSS file into a JS file tells the build tool to include
// that stylesheet in the page. The styles defined in index.css (font
// family, background color, etc.) are applied globally — they affect
// the entire page, not just this file.
import './index.css';

// --- Importing Our Own Files ---
//
// This imports the App component from the App.js file in the same
// folder. Notice the relative path starting with "./" — this tells
// the build tool to look for a local file rather than a package in
// node_modules.
//
// The .js extension is OMITTED by convention when importing JavaScript
// files. The build tool resolves it automatically. For non-JS files
// (like CSS), the extension must be included so the tool knows how to
// handle them.
import App from './App';

// --- createRoot: Mounting the React Application ---
//
// createRoot tells React WHERE on the page the application should be
// rendered. It receives a regular DOM element — here obtained with
// standard JavaScript (document.getElementById). The element with
// id="root" is an empty <div> defined in public/index.html. Whatever
// React renders will be placed INSIDE that div.
//
// You could select any DOM element (a span, a section, etc.), but a
// div is the most common choice.
const root = ReactDOM.createRoot(document.getElementById('root'));

// --- render: What to Display ---
//
// The render method tells React WHAT should appear inside the root
// element. Here, <App /> is JSX syntax that tells React to execute
// the App component function (defined in App.js) and render whatever
// it returns into the root div.
//
// This is where the first component — App — enters the picture. App
// is the top-level component of the entire application. All other
// components will eventually be nested inside it.
root.render(<App />);
