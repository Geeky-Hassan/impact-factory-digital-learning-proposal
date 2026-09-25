# Impact Factory · Beyond the room

A private, interactive working proposal built with Next.js, TypeScript and Tailwind CSS. The source of truth is [the researched strategy](docs/impact-factory-digital-learning-strategy.md).

## Run locally

Use Node.js 22.12+ and npm. Dependencies are locked in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`. The full proposal is available at `/` and `/impact-factory-digital-learning/`.

```sh
npm test
npm run typecheck
npm run build
npm start
```

`build` produces a static export in `out/` and stages `dist/` for Sites. `start` serves the production export locally; stop the development server first, or set a different `PORT`.

## What is interactive

- Five-stage journey with keyboard navigation, explicit preparation-sharing preview, a reinforcement question, three scripted roleplay levels, a separate debrief and a coach-to-practice path.
- Learner/trainer views and a fictional corporate participation dashboard.
- Editable annual gross-sales calculator and an existing-booking illustration.
- Source drawer, evidence filters, commercial assumptions and a local discussion checklist.

All examples are fictional and labelled. Interactions use in-memory React state. No information is submitted or persisted, and there is no AI API, microphone, analytics, authentication service or learner backend in this prototype. Refreshing resets the examples. Private hosting access is enforced by Sites; the local export itself does not implement authentication. Search indexing is disabled, which is not an access control.

## Content and boundaries

The human trainer remains central. MyPath is presented only as a proposed enabling partner. Future capabilities are concepts, not representations of a live MyPath product.

Public evidence, discovery facts, calculations and proposed pricing have distinct source categories. Source titles, URLs and original access dates are in `lib/sources.json`; the full reasoning is in the strategy document. The UI preserves the strategy's qualifications around LinkedIn annual volumes, published private-course prices and the scope difference between the initial prototype and a larger learner test.

The visual system uses Impact Factory-compatible navy and restrained orange on warm white, with system fonts, editorial serif headings, CSS diagrams and Lucide icons. There are no remote font, image or AI dependencies. Responsive layouts cover desktop, tablet and phone breakpoints, and respect reduced-motion preferences.

## Verification

Vitest tests check the nine agreed annual scenarios, booking calculations, validation, roleplay/debrief separation, reinforcement feedback, explicit sharing, keyboard tabs, source disclosure and navigation. These are DOM/component tests; they do not replace visual testing in a browser.

## Files

- `components/proposal.tsx`: narrative and section order
- `components/journey.tsx`: staged learning concepts
- `components/illustrations.tsx`: learner and company examples
- `components/calculators.tsx`, `lib/calculations.ts`: scenario inputs and arithmetic
- `components/sources.tsx`, `lib/sources.json`: evidence drawer and source register
- `app/globals.css`: visual system and responsive rules
- `.openai/hosting.json`: private Sites project identity, when provisioned

Source and build versions must be kept aligned when publishing. No credentials belong in source control or the deployment archive.
