import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

// React takes over the DOM node with id="root" and manages everything rendered
// inside it from this point forward.
const root = ReactDOM.createRoot(document.getElementById('root'));

// This is only the initial mount. Later updates on screen come from React
// re-running components when their props or state change.
root.render(<App />);
