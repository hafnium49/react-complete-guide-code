// This is the entry point of the React application.
// React itself is the core library, while ReactDOM provides the glue
// between React components and the browser's DOM.
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// React renders the entire application into a single DOM element (the "root").
// React.StrictMode is a development helper that highlights potential issues.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
