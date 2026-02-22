// This is the entry point of the React application.
// This .jsx file extension signals that the file contains JSX syntax,
// which the build tool (Vite) must transform into valid JavaScript
// before it reaches the browser.
// React itself is the core library, while ReactDOM provides the glue
// between React components and the browser's DOM.
// These packages (react, react-dom) were installed by "npm install",
// which reads the dependencies listed in package.json and downloads
// them into the node_modules folder.
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// React renders the entire application into a single DOM element (the "root").
// Rather than imperatively manipulating individual DOM nodes yourself,
// you hand React a root element and let it declaratively manage everything
// inside it based on the component tree you define (starting with <App />).
// React.StrictMode is a development helper that highlights potential issues.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
