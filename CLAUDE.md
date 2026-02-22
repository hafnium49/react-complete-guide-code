# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **"React: The Complete Guide"** course code repository (by Academind). It contains 21 sequential code snapshots in `/code/`, each representing a progressive step in building a React application. The repo also uses **branches** for different course sections (e.g., `01-getting-started`, `zz-reactjs-summary`).

## Project Structure

- `/code/01-starting-project` through `/code/21-finished` — progressive React app snapshots
- `/extra-files/` — shared CSS modules and component files used across lectures
- `/slides/` — course slide deck (PDF + OCR markdown)
- Each snapshot (01–20) is a standalone Vite + React app with its own `package.json`
- Project 21 is split into `react-app/` (frontend) and `backend/` (Express API)

## Build & Run Commands

Each project in `/code/` is independent. Always `cd` into a specific project folder first.

```bash
# Install dependencies (required before first run)
npm install

# Start dev server (Vite)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

For project 21 (full-stack), run frontend and backend separately:
```bash
# Backend (Express on port 8080)
cd code/21-finished/backend && npm install && npm start

# Frontend
cd code/21-finished/react-app && npm install && npm run dev
```

## Tech Stack

- **React 18** with functional components and hooks (no class components)
- **Vite** for bundling and dev server
- **CSS Modules** for component-scoped styling (`.module.css` files)
- **React Router v6** (from project 16+) using `createBrowserRouter`, loaders, and actions
- **Express.js** backend (project 21 only) with JSON file persistence
- Pure **JavaScript** — no TypeScript, no linting config, no test framework

## Key Architectural Notes

- Projects build on each other incrementally: state management (08), lifting state (09), routing (16–18), data loading patterns (19–20), full-stack (21)
- React Router v6 patterns use the data API: `loader` functions for data fetching, `action` functions for form submissions
- The backend stores data in a JSON file (`posts.json`), not a database
