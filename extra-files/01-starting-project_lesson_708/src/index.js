import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

/*
  TUTOR NOTE:
  This is the main entry point of your React application.
  It takes the root 'App' component and renders it into the DOM
  element with the id 'root' (found in public/index.html).
  You likely won't need to change anything in this file for this project.
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
