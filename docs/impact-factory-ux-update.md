# Impact Factory proposal: UX update

Updated 26 September 2026 after the final demo/pilot pricing and usability refinement. This is the current implementation record. It supersedes the layout and commercial presentation in the [earlier director audit](impact-factory-director-audit.md). The [strategy](impact-factory-digital-learning-strategy.md) remains the source of truth.

## What changed

The continuous-scroll proposal is now five focused pages: Overview, Learner journey, Learning platform, Business case and Pilot proposal. Each answers one director-level question, with direct URLs, active navigation, previous/next links and a compact mobile menu. The previous proposal URL redirects to the overview.

Locally served DM Sans replaces the previous typography. Smaller headings, compact interactive panels, warm white, dark text, fine dividers and restrained colour give the content a more editorial feel. Repeated claims, a statistics wall and parallel feature grids have been removed. Detailed evidence is available in a searchable drawer; research, extra scenarios, capability distinctions and trust detail use optional disclosures.

The six-stage learner journey remains intact, with the live trainer central. One selected stage is shown at a time. The quiz gives response-specific feedback. Practice uses three scripted character responses, followed by a separately opened evaluation after the scenario ends. Preparation sharing starts unchecked. Company examples show participation only, with no private learner conversations or AI assessments.

The commercial page is now Pilot proposal, retaining its existing URL. Both prices and timelines are visible together: concept demo / MVP at £2,500–£3,500 over 2–3 weeks, and a working pilot at £7,500–£12,000 over around two months after scope/content approval. Selecting either option changes its scope, review outcome and boundary. The demo covers a clickable journey, one approved content/nudge example and scripted practice; the pilot covers real learners, one live AI scenario and basic records/reporting. Moving between scopes requires a separate agreement on scope and total cost. Long-term build and recurring prices have been removed from the current proposal, sources and strategy. The review is explicit: agree useful outcomes first, then refine, extend or stop; decide any further scope and price from the results. No full course rollout or persistent open-ended coach is assumed within this pilot.

The Learning platform page now presents a lightweight LMS: enrol → prepare/attend → revisit/practise → review/continue. Learner, Company and Training team views explain one account across courses, course-filtered participation and trainer approval. All dashboard values are fictional course-enrolment counts, with repeat people explicitly distinguished from unique learners. Benefits and optional feature detail cover public-course learners and corporate programmes. Official Moodle LMS and Workplace documentation inform the foundation assessment; no supplier is selected or installed.

Remember now includes approved videos, personalised mini-lessons and helpful reminders. Practise and Apply explain proposed live conversational AI personas with text, voice or avatar choices. Interactive format previews include licensed alternatives and optional instructor likeness/voice with explicit consent and agreed governance. These are proposed custom capabilities; the webpage generates no AI speech or avatar video.

The final control pass adds explicit mobile Menu and Sources labels, larger touch targets, a clearly styled native select with a visible chevron, mobile input text sizing, selected/hover/focus states, button-like disclosures and previous/next navigation. Source-drawer buttons use a book icon; external source links retain the external-link arrow. Preparation and booking option labels are concise enough to read in their controls. Invalid calculator inputs expose their error state to assistive technology.

The closing decision remains: **Is this worth testing with one programme?**

## Verification

- Lint, TypeScript checking and the production build passed.
- All 25 unit/component tests and 24 browser tests passed.
- Browser tests cover all five routes, direct links, reload/back/forward, mobile navigation, keyboard tabs, preparation choice, all quiz responses, practice levels and separate feedback, coach choices, company course filters, the training-team view, voice/avatar format previews, both priced scopes, their keyboard selection and the searchable sources drawer.
- All nine required annual calculations and both £3,750 booking examples passed. Validation, reset, custom decimal prices, currency formatting, rounding and large permitted results were also checked.
- Automated accessibility checks passed for all pages and the source drawer at the four requested sizes. This is not a cross-browser or accessibility certification.
- The revised production build statically prerenders all proposal routes. Browser checks use the local development server at http://127.0.0.1:3000; the earlier production smoke test is documented in the preceding audit.

Viewport and full-page screenshots were captured at 1440 × 1000, 1024 × 768, 768 × 1024 and 390 × 844, with additional interaction states. Visual review covered wrapping, control sizing, mobile stacking, spacing, hierarchy and contrast. No page has horizontal overflow at these sizes. The default pages measure approximately 1,304–1,747 pixels tall on the largest viewport and 1,642–2,585 pixels on mobile, rather than one long combined document. Expanded optional details naturally add height.

Generated local evidence: [layout report](audit/ux-screenshots/layout-report.json), [desktop overview](audit/ux-screenshots/1440-overview-full.png), [mobile journey](audit/ux-screenshots/390-journey-full.png), [mobile booking](audit/ux-screenshots/390-booking.png), [mobile demo scope](audit/ux-screenshots/390-demo-proposal.png), [working pilot scope](audit/ux-screenshots/1440-pilot-proposal.png), [mobile navigation](audit/ux-screenshots/390-navigation.png). Screenshots are ignored by Git and reproducible with `npm run audit:visual` while the local server is running.

## Evidence and assumptions

Public sources, titles, access dates and qualifications are retained in strategy section 16 and `lib/sources.json`. Sources include Impact Factory's homepage, About, What We Offer, resources and official course/booking pages; its LinkedIn profile; the original behaviour-modelling and retrieval-practice research, and current official Moodle documentation (S17–S18). Public statements, discovery facts, calculations, proposed concepts and indicative estimates remain distinguishable.

The published private booking form pairs £3,500 with a maximum-eight option and £3,750 with maximum ten. The requested £3,750/eight-attendee example remains an explicit assumption. The annual calculator uses exactly 5,000 as a scale assumption derived from LinkedIn's 5,000+ statement, not a verified current-year sales base. Adoption and add-on prices are untested scenarios. Gross sales are not margin, ROI or a forecast.

Noor/Impact Factory still need to confirm current unique learner counts and prices, Taylor's operating/revenue account, the chosen programme and approved materials, trainer/technical ownership, delivery capacity, budget, usage allowances, LMS fit, optional instructor face/voice rights, and data/reporting permissions. The separately existing MyPath generation/review workflow needs a reviewable product demonstration. Custom learner-platform and AI capabilities are proposed, not production-ready claims.

## Local and hosting handover

The application is standard Next.js, works without a backend or external font request, and requires no secrets. Demonstration state is temporary and learner responses are not submitted or saved. Follow the [README](../README.md) for local and Vercel instructions. No Vercel deployment was made. The previous active Sites page was retired during the earlier audit; deleting its historical project remains an account-interface action.

Main changes: `app/` routes/layout/styles; proposal, journey, platform, calculator, navigation, sources and shared UI components; source register; strategy and README; font dependency; interaction/browser tests; screenshot script. Existing numerical calculation helpers and their verified cases are retained.
