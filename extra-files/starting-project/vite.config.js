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
// Vite serves as that build tool here. During development, it provides:
//   1. A live-preview dev server that automatically reloads when you change code
//   2. On-the-fly JSX transformation so the browser receives valid JavaScript
//
// For production, "vite build" compiles and bundles everything into optimized
// static files that can be deployed to any hosting provider.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The @vitejs/plugin-react plugin teaches Vite how to handle React's JSX
// syntax and enables features like fast refresh (instant UI updates during
// development without losing component state).
export default defineConfig({
  plugins: [react()]
})
