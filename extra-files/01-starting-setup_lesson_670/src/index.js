import React from 'react';
import ReactDOM from 'react-dom/client';

// Global styles are loaded once here before the component tree is rendered.
import './index.css';
// App is the top-level custom component for this exercise.
// Most of the lesson work happens inside App.js, not in this bootstrap file.
import App from './App';

// React attaches its component tree to the root DOM element from public/index.html.
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // StrictMode adds extra development checks without affecting the production build output.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
