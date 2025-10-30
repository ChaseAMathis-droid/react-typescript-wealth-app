## AI agents check-in (short & actionable)

This file tells an AI assistant how this repo is organized and how to run/edit it. Keep updates small and factual.

Quick run & test
- Install and create a lockfile: `npm install --package-lock`
- Dev server: `npm run dev` (Vite serves at http://localhost:5173)
- Test: `npm test`
- Typecheck: `npm run typecheck`
- Build: `npm run build`; Preview: `npm run preview`

Where to look (important files)
- UI & components: `src/components/` (notable: `ClientOnboardingForm.tsx`, `PortfolioSummary.tsx`)
- Business logic: `src/utils/portfolio.ts`
- Tests: `src/**/*.test.{ts,tsx}` (Vitest + Testing Library)
- Config & tooling: `package.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`
- CI / deploy: `.github/workflows/ci.yml` (tests) and `.github/workflows/deploy-gh-pages.yml` (deploy to GitHub Pages)

Conventions & expectations
- React + TypeScript, function components & hooks, prefer existing patterns (do not introduce new global state libraries without reason).
- Tests required for new behavior touching business logic or public components (Vitest + Testing Library).
- Keep changes minimal and add a focused test; prefer pure functions for business logic.

PR guidance
- 1 file/feature per PR when possible.
- Include: intent, files changed, test(s) added, and upgrade notes if dependencies change.
- If adding a dependency, justify it in the PR body and prefer widely-used packages.

Deployment & demos
- CI builds on push to `main`; GitHub Pages publishes `dist/` to `gh-pages` via workflow.
- For quick demos use `npx localtunnel --port 5173` or `ngrok` (requires authtoken); for stable public demo use Vercel or GitHub Pages.

If anything is unclear, open an issue in the repo or ask the maintainer for missing details (API keys, env vars, preferred conventions).

---
Note: GitHub Copilot reads `/.github/copilot-instructions.md` by default — if you want editors/agents to pick up this file automatically, keep a copy at that name. Otherwise this file name is fine for human and generic AI discovery.
