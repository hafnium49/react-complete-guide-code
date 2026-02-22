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
// just like regular HTML elements. Since App returns an <h1>, what ultimately
// gets rendered into the root element is that <h1>Hello World!</h1>.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
