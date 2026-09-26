# Impact Factory · Beyond the room

An interactive director-level working proposal. [Strategy and source register](docs/impact-factory-digital-learning-strategy.md) · [UX update](docs/impact-factory-ux-update.md) · [Earlier director audit](docs/impact-factory-director-audit.md).

## Run on your laptop

Use Node.js 24 LTS and npm. The Node major is recorded in `package.json` and `.nvmrc` for local, CI and Vercel builds. From this folder:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The overview is at `/`. The old `/impact-factory-digital-learning/` link redirects there. On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

To run the production build, stop the development server, then:

```sh
npm run build
npm start
```

The server binds to your laptop's loopback address. No environment variables, account, API key, database or Sites service is required.

## Deploy to Vercel

This is a standard Next.js application. The Sites configuration and staging scripts have been removed. Build output is `.next/`; there is no Sites packaging or static-export step.

1. In [Vercel New Project](https://vercel.com/new), import [Geeky-Hassan/impact-factory-digital-learning-proposal](https://github.com/Geeky-Hassan/impact-factory-digital-learning-proposal).
2. Use the repository root (`./`), production branch `main`, framework **Next.js** and Node.js **24.x**.
3. Install with `npm ci` and build with `npm run build` (already set in `vercel.json`). Leave the output directory at the Next.js default.
4. No environment variables, database or external service credentials are required. Deploy when ready.

The GitHub repository was public when prepared. Source visibility and deployment access are separate: `noindex` is not authentication. Choose repository/deployment access settings appropriate for the proposal.

`vercel.json` supplies the framework/build/install settings. No Vercel deployment has been made. [Official Vercel Next.js documentation](https://vercel.com/docs/frameworks/full-stack/nextjs).

## Five focused pages

| Page | Route |
| --- | --- |
| Overview | / |
| Learner journey | /learner-journey/ |
| Learning platform | /connected-platform/ |
| Business case | /business-case/ |
| Pilot proposal | /next-steps/ |

Each page has direct URLs, active navigation and previous/next links. Sources are available in a searchable drawer. DM Sans is served locally from the installed open-source font package, with no runtime request to Google Fonts.

## What works without a backend

The journey tabs, preparation preview, Remember quiz, three scripted practice levels with a separate debrief, coach choices, learner/company/training-team views, company course filters, AI format previews, calculators, evidence drawer, demo/pilot scope selector and mobile navigation run in the browser. Examples are fictional. State is held only in memory and resets on refresh. No learner response is submitted or saved. There is no live AI, microphone, analytics, learner backend or employer data feed.

MyPath's content/video/course-asset generation and review workflow is described as existing based on Noor's product context; that separate product is not verified by this repository. The Impact Factory learner platform, dashboard, AI roleplay, persistent coach and personalised journey are proposed/custom capabilities. This code demonstrates the proposed experience only.

## Checks

GitHub Actions runs a clean `npm ci`, lint, route type generation/type checking, unit/component tests and production build on Ubuntu with Node 24 for pushes to `main` and pull requests. The workflow needs no deployment secrets and does not deploy the site.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:browser
npm run audit:visual
```

Unit/component tests cover calculations and state changes. Browser tests use installed Google Chrome and check the four requested viewport sizes, keyboard navigation, accessibility and interactions. Start the local server before `audit:visual`; browser tests can start it automatically. To use Playwright's bundled Chromium instead, install it with `npx playwright install chromium` and set `PLAYWRIGHT_CHANNEL=chromium` for browser tests. Visual capture uses installed Chrome.

Screenshots and layout results are written to `docs/audit/ux-screenshots/` and ignored by Git. Source-check results are in `docs/audit/public-page-checks.json`. These are checks of this prototype, not learning-effectiveness evidence or a cross-browser certification.

## Main files

- `components/proposal.tsx`, `components/executive-sections.tsx`: overview, pilot proposal, trust and capability boundaries.
- `components/journey.tsx`, `components/illustrations.tsx`: fictional learner experiences.
- `components/calculators.tsx`, `lib/calculations.ts`: editable scenarios and arithmetic.
- `components/evidence-tag.tsx`, `components/sources.tsx`, `lib/sources.json`: classifications and attributable evidence.
- `app/*/page.tsx`, `components/navigation.tsx`, `components/ui.tsx`: real routes, shared navigation and accessible controls.
- `app/globals.css`: responsive visual system.
- `tests/`, `playwright.config.ts`, `scripts/capture-audit.mjs`: reproducible verification.

The proposed learning hub uses LMS concepts; no LMS vendor has been selected or installed. Live AI personas, avatars and instructor/alternative voices are proposed custom options, not functions running in this frontend. The proposal compares a £2,500–£3,500 concept demo (2–3 weeks) with a £7,500–£12,000 working pilot (around two months), both indicative. Long-term prices remain removed: decide any further scope and price after reviewing the results.

The human trainer remains central. The only closing decision is: **Is this worth testing with one programme?**
