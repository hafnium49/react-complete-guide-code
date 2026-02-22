// --- Why a React project needs a build tool ---
//
// Unlike a vanilla JavaScript project (where you just create HTML, JS, and CSS
// files and open them in a browser), a React project requires a build tool
// because the code you write is not valid browser JavaScript as-is.
//
// Specifically, JSX — the HTML-like syntax blended into JavaScript files —
// is not understood by browsers. A build tool compiles/transforms JSX into
// standard JavaScript that the browser can execute.
//
// --- Project creation ---
//
// This project was scaffolded using Vite (via "npm create vite"), selecting
// the "React" template with JavaScript. An older alternative is Create React
// App (via "npx create-react-app"), which serves a similar purpose.
// Both tools generate a ready-to-use project structure with built-in
// JSX compilation and a live-reloading dev server.
//
// Node.js must be installed on your system — not because you write Node.js
// code, but because the build tools and the dev server run on it internally.
//
// --- Development workflow ---
//
// After creating the project, run "npm install" once to fetch third-party
// packages. Then use the scripts defined in package.json:
//   "npm run dev"     — start the Vite dev server with auto-reload
//   "npm run build"   — compile and bundle for production deployment
//   "npm run preview" — locally preview the production build

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The @vitejs/plugin-react plugin teaches Vite how to handle React's JSX
// syntax and enables features like fast refresh (instant UI updates during
// development without losing component state).
export default defineConfig({
  plugins: [react()]
})
