# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a course companion repository for "React - The Complete Guide". Code is organized in **git branches** where each branch represents a course section. The master branch contains only documentation.

## Branch Navigation

```bash
git branch -a              # List all branches
git checkout <branch-name> # Switch to a section
```

Branches follow the pattern: `01-getting-started`, `03-react-basics-working-with-components`, `13-class-based-cmp`, `23-nextjs-introduction`, etc.

## Branch Structure

Each section branch contains:
- `/code` - Numbered code snapshots progressing through the lecture (e.g., `01-starting-project`, `08-finished`)
- `/slides` - Section presentation slides
- `/extra-files` - Additional CSS and resource files

## Development Commands

Navigate into a specific code snapshot folder first:

```bash
cd code/<snapshot-folder>
npm install
```

### Create React App Projects (most sections)
```bash
npm start    # Development server on localhost:3000
npm test     # Run tests with Jest
npm run build
```

### Next.js Projects (section 23)
```bash
npm run dev   # Development server
npm run build
npm start     # Production server
```

## Current Branch: 13-class-based-cmp

This section covers class-based React components:
- Class component syntax and state management with `this.state` and `this.setState()`
- Lifecycle methods: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`
- Using Context API with `static contextType`
- Error boundaries with `componentDidCatch`

Architecture in `/code/08-finished`:
- `src/components/` - Class-based components (UserFinder, Users, User, ErrorBoundary)
- `src/store/` - React Context for state management
- CSS Modules for component styling (`*.module.css`)

## Notes

- Modules requiring HTTP requests need your own backend URLs/API keys
- Each code snapshot is self-contained with its own `package.json`
