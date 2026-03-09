import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

// React takes over the DOM node with id="root" and manages everything rendered
// inside it from this point forward.
const root = ReactDOM.createRoot(document.getElementById('root'));

// This line kicks off the first render by giving React the top-level component.
// React starts with App and keeps evaluating nested components returned in JSX
// until only regular DOM elements remain.
// Later screen updates happen when React is told that tracked data, such as
// state, has changed and part of the tree should be evaluated again.
root.render(<App />);
