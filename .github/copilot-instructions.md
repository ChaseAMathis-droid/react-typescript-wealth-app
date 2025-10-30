## Quick orientation

This repo is a React + TypeScript mock FinTech dashboard (see `README.md`). The codebase is minimal as-checked-in; first actions for any AI agent are discovery steps (search for manifests, source folders and CI) and then follow the concrete patterns discovered.

## First things to do (automated discovery)
- Open `README.md` to get the repo purpose (already done).
- Look for these files/paths (in order) and stop when you find them:
  - `package.json`, `yarn.lock` or `pnpm-lock.yaml` — npm scripts and dependencies
  - `tsconfig.json` — TypeScript settings
  - `src/` — main app code (components, pages, hooks)
  - `src/components`, `src/pages`, `src/services`, `src/store` — common boundaries
  - `.env` / `.env.local` — runtime config and API endpoints
  - `.github/workflows` — CI test/build commands

Suggested quick commands to run locally if you need them:
```bash
# list repo files
git ls-files
# search for common manifests
rg --hidden --glob '!.git' "package.json|tsconfig.json|src/" || true
```

## Architecture & where to look
- If `src/` exists, treat it as the primary surface. Look for these responsibilities:
  - UI layer: `src/components` or `src/ui`
  - Pages / routes: `src/pages` or `src/views`
  - Data layer / integrations: `src/services`, `src/api`, or `src/lib` — these are the service boundaries
  - Global state: `src/store`, `src/state`, or usage of libs like `redux`, `zustand`, `react-query` — inspect imports to identify the chosen approach

How to identify the "why" behind structure: trace imports from top-level routes (e.g., `src/App.tsx` or `src/index.tsx`) into `services` and `store` to see data flows and separation between UI and API logic.

## Developer workflows (how to run, test, debug)
- Primary source of truth: `package.json` scripts (if present). Typical commands to inspect:
  - `npm run build` / `npm run start` / `npm run test`
- If no `package.json` exists, look for `Makefile`, `devcontainer.json`, or `.github/workflows` to learn CI steps.
- Debugging: find `vite.config.ts`, `webpack.config.js`, or `next.config.js` for dev server flags and proxies; open `src` and run the dev script the CI uses.

## Conventions & patterns to follow
- Prefer the repository's existing file and naming patterns. If you find `.tsx` components using function components and hooks, follow that style exactly.
- If a global state solution is present (e.g., Redux slices, React Query hooks), extend it instead of introducing a new library.
- Tests (if present) live next to implementation (e.g., `Component.test.tsx` beside `Component.tsx`). Mirror the repo's test runner (Jest, Vitest, Testing Library) and assertion style.

## Integration points to check
- Environment-driven endpoints: inspect `.env*` files and any API clients under `src/services`.
- Mock data / fixtures: search for `__mocks__`, `fixtures`, or `mock` directories.
- CI secrets & deployment: check `.github/workflows` for environment variables or special deploy steps.

## Concrete examples (from this repo)
- Repo title: `react-typescript-wealth-app` — a mock FinTech client dashboard (see `README.md`).
- Because this repo currently contains only `README.md`, begin by requesting or adding the project manifests (package.json, tsconfig, src) so we can generate code or edits that match the project's real setup.

## Edit & PR guidance for AI agents
- Make minimal, focused changes per PR. Each PR should include:
  1. A short description of intent and the files changed.
  2. If code is added, include a small test (happy path) and update `package.json` scripts if needed.
  3. If introducing a dependency, prefer widely-used, actively-maintained packages and add a short justification in the PR body.

## When something is missing
- If core files are missing (no `package.json`, no `src/`), ask the user to provide them or permission to scaffold a minimal app. Don’t assume package manager or bundler — detect from repo files.

---
If you want, I can: (1) open the repo and search for the files listed above and then update this doc with exact found patterns; or (2) scaffold a minimal `package.json` + `src/` skeleton that matches React + TypeScript conventions. Which would you prefer?
