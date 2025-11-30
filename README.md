# react-typescript-wealth-app
Mock FinTech Client Dashboard built with React and TypeScript, demonstrating advanced state management and data visualization.
[https://github.com/ChaseAMathis-droid/react-typescript-wealth-app.git]
[![CI](https://github.com/ChaseAMathis-droid/react-typescript-wealth-app/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/ChaseAMathis-droid/react-typescript-wealth-app/actions/workflows/ci.yml) [![PR status](https://github.com/ChaseAMathis-droid/react-typescript-wealth-app/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/ChaseAMathis-droid/react-typescript-wealth-app/actions/workflows/ci.yml)

# react-typescript-wealth-app
Mock FinTech Client Dashboard built with React and TypeScript, demonstrating advanced state management and data visualization.

Development setup (local)

1. Clone the repo and generate a local Vite + React + TypeScript skeleton if you haven't already:

```bash
git clone https://github.com/ChaseAMathis-droid/react-typescript-wealth-app.git
cd react-typescript-wealth-app
# (optional) scaffold a Vite + React TypeScript app if you don't have src/ yet
npm create vite@latest . -- --template react-ts
```

2. Install dependencies and generate a lockfile for CI (the workflow uses `npm ci` when `package-lock.json` exists):

```bash
# This ensures package-lock.json is created for reproducible CI installs
npm install --package-lock
```

3. Run tests and typecheck locally:

```bash
npm test
npm run typecheck
```

## Docker

Build and run the production container:

```bash
# Build the Docker image
docker build -t wealth-app .

# Run the container (production)
docker run -d -p 3000:80 --name wealth-app wealth-app

# Or use docker-compose
docker-compose up web
```

For development with hot reload:

```bash
docker-compose up dev
```

The production container uses a multi-stage build:
- Stage 1: Node 20 Alpine to build the app with Vite
- Stage 2: Nginx Alpine to serve the static files

Access the app at http://localhost:3000 (production) or http://localhost:5173 (dev).

Notes
- The repository's GitHub Actions workflow will use `npm ci` when `package-lock.json` is present and caches the npm cache (~/.npm) to speed up CI runs.
- `index.html` must be at the project root (not in `public/`) for Vite builds to work correctly.
