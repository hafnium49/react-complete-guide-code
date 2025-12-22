# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a course companion repository for "React - The Complete Guide". All code is organized in **git branches**, not in the master branch. Each branch corresponds to a course section.

## Branch Navigation

Switch to a section's code with:
```bash
git checkout <branch-name>
```

Example branches:
- `01-getting-started` - Getting started with React
- `03-react-basics-working-with-components` - Components
- `18-diving-into-redux` - Redux
- `23-nextjs-introduction` - Next.js

List all branches: `git branch -a`

## Branch Structure

Each section branch typically contains:
- `/code` - Code snapshots for lectures (numbered subfolders)
- `/slides` - Section presentation slides
- `/extra-files` - Additional resources like CSS files

## Development Commands

### Create React App Projects (most sections)

```bash
cd code/<snapshot-folder>
npm install
npm start        # Development server
npm test         # Run tests
npm run build    # Production build
```

### Next.js Projects (section 23)

```bash
cd code/<snapshot-folder>
npm install
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
```

## Important Notes

- Modules involving HTTP requests or APIs require your own backend URLs/API keys
- Each code snapshot is self-contained - always `cd` into the specific snapshot folder before running commands
