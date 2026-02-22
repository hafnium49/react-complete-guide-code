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
// The App component is imported from a sibling .jsx file. Most of the
// development work happens in the src/ folder, inside .jsx files like this.
import App from './App'

// Importing a CSS file directly into a JavaScript file is not something
// browsers support natively. The build tool (Vite) detects this import and
// injects the CSS into the final page automatically — you can verify this
// by opening browser DevTools and inspecting the <head> element, where
// you'll find the styles from index.css injected as a <style> tag.
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
