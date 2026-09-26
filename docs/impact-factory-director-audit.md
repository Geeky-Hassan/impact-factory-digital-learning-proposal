# Impact Factory — director audit and handoff

**Historical audit of the earlier single-page version.** The later client brief revised the page structure, prototype/pilot scope and commercial presentation. See [the current UX update](impact-factory-ux-update.md) and strategy sections 13–14 and 17. The original factual corrections below remain relevant.

**Audited: 26 September 2026.** This records the fixes made to the strategy and interactive proposal, the evidence used and the remaining decisions. The source of truth remains [the strategy](impact-factory-digital-learning-strategy.md); the site's matching source register is [lib/sources.json](../lib/sources.json).

## Outcome

The proposal now leads with one hypothesis: a connected digital journey could help Impact Factory maintain the learner relationship around its premium, human-led training. It separates the customer experience, potential business value and the proposed technology operating role. It does not claim tested demand, learning effectiveness, retention gains or ROI.

A short opening brief covers the question, potential value, initial scope, indicative pilot cost and decision. The closing question is exactly: **“Is this worth testing with one programme?”**

The updated proposal runs locally and uses a standard Next.js build suitable for Vercel. It has not been deployed to Vercel or republished to Sites. The old active Sites proposal has been replaced by an HTTP 410 removal response. Deleting the Sites project and historical versions still requires the account's Sites interface; the connector exposes no delete/unpublish operation.

## Factual decisions and numerical classification

“VERIFIED PUBLIC FACT” means that the cited source publishes the statement. It does not mean the company's underlying records have been independently audited. Public source titles, URLs and access dates are recorded in strategy section 16 and in the source drawer; the sources below were accessed on 26 September 2026.

| Number or statement | Classification | Verification / treatment |
| --- | --- | --- |
| 175,000+ historical delegates; 13,000 companies; 50+ countries; 35 years | VERIFIED PUBLIC FACT | Retained as Impact Factory-published cumulative/experience figures. [Official homepage](https://www.impactfactory.com/) (S01). Not annual sales or reachable customers. |
| 5,000+ people trained annually; 30+ open courses; founded 1991 | VERIFIED PUBLIC FACT | Retained as [Impact Factory LinkedIn profile](https://uk.linkedin.com/company/impact-factory) statements (S06), separately attributed from its website. The model uses exactly 5,000 as a scale assumption. |
| A LinkedIn retrospective mentions 4,100 individuals | VERIFIED PUBLIC FACT, qualified | [Company showcase](https://uk.linkedin.com/showcase/communicate-with-impact/) (S07). Original post date/reporting period not established; not substituted for a verified latest-year annual total. Reconcile actual unique learners with Impact Factory. |
| Typical open groups around 6–8 | VERIFIED PUBLIC FACT | [What We Offer](https://www.impactfactory.com/what-we-offer/) (S03). Typical, not a universal cap: the Line Management page describes a maximum of ten. Do not generalise group size or dual-trainer delivery across all tailored tiers. |
| One-day private £3,500 + VAT / maximum eight; £3,750 + VAT / maximum ten | VERIFIED PUBLIC FACT | [Private Open Course Booking Form](https://www.impactfactory.com/private-open-course-booking-form/) (S12). Corrected the requested £3,750 / “up to eight” factual pairing. The form is a published reference, not a current quotation for bespoke work. |
| Two-day examples £7,000–£7,500 + VAT | VERIFIED PUBLIC FACT | S12 describes programme-specific prices and caps. £7,000 maximum-eight options and £7,500 maximum-ten options occur; Presentation Skills at £7,500 has a maximum of eight. No universal tailored-programme tariff inferred. |
| Five-day intensive £2,750 per person, excluding VAT | VERIFIED PUBLIC FACT | [Communicate with Impact](https://www.impactfactory.com/programmes/communication-skills-training/communicate-with-impact/) (S11); duration and amount visible in the rendered course page. Current booking price still to confirm. |
| Broad public management tariff of £550–£1,100 | Removed as a current factual anchor | Current selectable group tariffs were not established on the rendered S08–S10 pages. Removed unsupported current prices and inferences drawn from hidden conditional booking messages. Do not interpret this as proof that public courses are unavailable. |
| Resource-filter counts: Article 339; Blog 75; Podcast 29; Tips 67; Video 2; Quiz 6 | VERIFIED PUBLIC FACT, inventory snapshot | [Resources](https://www.impactfactory.com/resources/) (S05). Category counts can overlap and change. Not summed into a unique-resource total. Two items under a Video filter is not Impact Factory's complete video inventory. |
| Post-course webpages with handouts, PDFs, recommended reading and video links; trainer follow-up access | VERIFIED PUBLIC FACT | [Conflict Management/Difficult Conversations](https://www.impactfactory.com/programmes/management-skills-training/open-courses/conflict-management-course/) and [Line Management](https://www.impactfactory.com/programmes/management-skills-training/open-courses/line-management-course/) (S08–S09). These are existing strengths, not newly proposed capabilities. |
| Approximately 90% live delivery; Taylor's 60–70% tailored-revenue estimate | DISCOVERY-CALL FACT | D01, the user-supplied discovery account. Approximate, not audited financial data. Call dates/transcripts were not supplied. |
| No formal learner LMS/journey platform; resource pages, email, HubSpot, Zoom/Teams, manual follow-up; manager-to-learner handoff | DISCOVERY-CALL FACT | D01. Attributed to the conversations; confirm the current operating picture before scoping. Manual contact is treated as a deliberate personal-service choice. |
| 117 behaviour-modelling studies | VERIFIED PUBLIC FACT | [Taylor, Russ-Eft & Chan, 2005](https://pubmed.ncbi.nlm.nih.gov/16060787/) (S14). Practice with trainee-generated scenarios was associated with stronger transfer alongside other moderators. |
| 122 experiments / 10,382 participants | VERIFIED PUBLIC FACT | [Pan & Rickard, 2018](https://pubmed.ncbi.nlm.nih.gov/29733621/) (S15). Conditional retrieval-practice transfer evidence. Neither meta-analysis tests this proposed AI product. |
| Annual adoption/price scenarios and booking uplifts | ILLUSTRATIVE CALCULATION | C01–C02. Programmatically checked below. Gross sales/value arithmetic, not forecasts, profit or willingness-to-pay evidence. |
| 1–3 minute activities; 30–60 second recaps; sample dates/Day 3/7/10/14; three roleplay levels; 30/60/90-day journeys | PROPOSED CONCEPT | P02. Design hypotheses, not proven optimal schedules or existing production features. The displayed 1:00 recap is a scripted text demonstration, not a promised video asset. |
| Fictional Sarah/Northstar records; dashboard 20 booked / 18 attended / 15 prepared / 12 reinforced / 9 practised; mock cohort counts and confidence scale | PROPOSED CONCEPT | P02. Fictional demonstration data throughout. Cohort bookings 8+6+6 = 20 and attendance 8+5+5 = 18 reconcile. Participation is not competence or an employer-facing performance assessment. |
| Initial 6–8-person prototype, one programme/journey/scenario, three reinforcement activities around 30 days; optional later 30–50-person test | PROPOSED CONCEPT | P02. Initial scope and later expansion explicitly separated. The larger test is neither a 30–50-person live workshop nor included in the prototype budget. Invented activation/completion targets were removed. |
| Pilot £2,000–£3,500; annual alternatives £9,000–£15,000, £18,000–£25,000, £25,000–£40,000 | INDICATIVE COMMERCIAL RANGE | P01. Internal recommended planning ranges, indicative and subject to scope. Annual options are alternatives, plus agreed usage/integrations; VAT and unagreed inclusions excluded. No confirmed quote or automatic annual commitment. |

Section indices, bibliographic dates and input bounds are navigation/reference/interface metadata, not company performance claims. Currency, decimals and sample timing labels were checked for consistency.

Additional qualitative evidence comes from [About Us](https://www.impactfactory.com/about-impact-factory/) (S02), [Tailored In-House Solutions](https://www.impactfactory.com/what-we-offer/tailored-in-house-solutions/) (S04) and [Private Open Courses](https://www.impactfactory.com/private-open-courses/) (S13). [Wisniewski, Zierer & Hattie, 2020](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.03087/full) (S16) supports careful feedback design, with heterogeneous outcomes; it is not evidence of this product's effectiveness.

## Calculation audit

Annual formula: annual learner scale × assumed adoption × assumed per-learner sales price. No cumulative historical delegate base is used.

| Scale | Adoption | Learners | At £50 | At £100 | At £200 |
| --- | --- | --- | --- | --- | --- |
| 5,000 | 10% | 500 | £25,000 | £50,000 | £100,000 |
| 5,000 | 20% | 1,000 | £50,000 | £100,000 | £200,000 |
| 5,000 | 30% | 1,500 | £75,000 | £150,000 | £300,000 |

**Illustrative gross sales scenarios using current annual learner scale; excludes costs, discounts, VAT, implementation, churn and client adoption uncertainty.**

| Booking illustration | Addition | New value | Gross uplift |
| --- | --- | --- | --- |
| Assumed £3,750 base; eight × £50 | £400 | £4,150 | 10.7% |
| Assumed £3,750 base; eight × £100 | £800 | £4,550 | 21.3% |
| Published maximum-eight £3,500 option; eight × £50 | £400 | £3,900 | 11.4% |
| Published maximum-eight £3,500 option; eight × £100 | £800 | £4,300 | 22.9% |

The default booking view uses the published £3,500 maximum-eight option. The requested £3,750/eight-attendee calculation remains selectable as an explicitly assumed attendance example. Addition ÷ base booking × 100 gives the uplift; percentages display one decimal.

All nine required annual cases and both required £3,750 booking cases pass automated tests. Additional checks cover blank/out-of-range inputs, zero values, custom adoption and prices, reset, and large permitted values without layout overflow. £50.50 retains both decimal places; whole-pound values display without unnecessary pence. Fractional adopted-learner equivalents are not rounded before multiplication. One extension per adopted learner is assumed; actual unique learners, eligibility and repeat attendance require reconciliation.

These prices are potential customer sales assumptions. Technology fees would be a separate cost to Impact Factory; gross sales are not margin.

## Executive and commercial-copy fixes

- Added an early decision brief so a director can see the question, learner value, potential business value, pilot, cost range and limited ask without reading the full page.
- Replaced diagnostic/assertive copy with a working hypothesis open to correction. Acknowledged existing trainer access, useful resources, deliberate personal follow-up and the possibility that some needs can be met through existing systems.
- Preserved the sequence: BEFORE → LIVE human-led training → REMEMBER → PRACTISE → APPLY → CONTINUE through a trainer or further programme.
- Clarified that notifications lead to an interaction; email alone is not reinforcement.
- Kept the roleplay actor separate from subsequent feedback. The local demonstrations are explicitly scripted.
- Put differentiation, participation visibility, optional premium packaging, continued engagement and a longer learner relationship forward as possibilities to test, without invented causal gains.
- Separated the £2,000–£3,500 prototype from an optional broader test and later annual services. Removed invented pilot participation targets; agree measures and staff-time allowance before learner use.
- MyPath is an enabling technology partner. “Live today” content/video/course-asset generation and review is attributed to Noor's product context, not independently established by this repository. The platform, dashboard, roleplay, personalised journey and persistent coach are proposed/custom work.

## Trust and privacy fixes

Added a visible **Designed with trust in mind** section covering trainer approval, appropriate learner consent/choices, clear AI identification, role-based access, minimal conversation data, retention/deletion/provider use and human escalation. Corporate reports do not automatically disclose private conversations or individual AI assessments. No real trainer face/voice cloning is proposed for the initial pilot without explicit consent and governance.

The prototype uses fictional data and in-memory state. No responses are submitted or persisted. There is no live AI API, microphone, analytics, learner backend or employer integration. Consent preview starts unchecked. These design principles are not a legal compliance guarantee.

## Visual and interaction verification

Captured full-page and viewport images at **1440 × 1000, 1024 × 768, 768 × 1024 and 390 × 844**. Inspected the four hero views and detailed sections including the decision brief, journey, business case, learner/company examples, pilot, evidence, trust, commercial options, capability boundary and closing question.

The final visual language uses warm white, dark navy typography, restrained warm accent, serif headings, clean rules and simple fictional UI examples. Fixed mobile headings whose hidden line breaks joined words; improved small-screen text sizing, evidence labels, spacing and long currency handling. No document overflow remained at any requested size. Section-only captures hide fixed navigation to avoid screenshot-overlay artefacts; ordinary viewport/full-page captures retain it.

Local visual evidence:
- [1440 × 1000](audit/screenshots/1440x1000-hero.png)
- [1024 × 768](audit/screenshots/1024x768-hero.png)
- [768 × 1024](audit/screenshots/768x1024-hero.png)
- [390 × 844](audit/screenshots/390x844-hero.png)
- [Layout report](audit/screenshots/layout-report.json)

Screenshots are generated local audit artefacts and ignored by Git; recreate with the documented command. [Rendered public-page checks](audit/public-page-checks.json) record the price-verification limits.

| Check | Result |
| --- | --- |
| ESLint, warnings treated as errors | Pass |
| TypeScript type check | Pass |
| Vitest unit/component suite | 23 passed |
| Next.js production build | Pass; both proposal routes generated |
| Local production smoke test | Both routes HTTP 200; quiz and calculator interactions pass after hydration; no page errors |
| Playwright in installed Google Chrome | 16 passed: four tests at each requested viewport |
| Journey stages; Remember answers/reset; all three practice difficulties; actor/debrief separation; coach actions | Pass |
| Learner/trainer and company views; pilot tabs; calculator presets/custom inputs; source drawer/filter/close/focus; mobile navigation | Pass |
| Keyboard tabs, focus behaviour and automated axe WCAG 2 A/AA + 2.1 AA checks | Pass; no detected violations in tested states |
| Horizontal document overflow | None at all four requested sizes |
| Old Sites page and asset paths | HTTP 410 verified; removal text returned and cache disabled |

These are prototype checks, not certification of accessibility, all-browser compatibility, AI reliability or learning transfer. Safari/Firefox and real assistive-technology users were not tested.

## Local/Vercel migration and Sites removal

Removed the root Sites hosting configuration, staging/static-serving scripts and Sites Git remote. Changed the build from a Sites static export to standard Next.js production output. Added explicit Vercel configuration and rewrote the README with laptop, production and future deployment commands. No environment variables or backend are needed for this proposal.

The old Sites address returns HTTP 410 on the root route, the proposal route and an asset path, verified after the retirement operation. It no longer serves the proposal. The Sites project, historical versions and source history are not deleted because the connector offers no deletion operation. Remove that remaining account record through Sites if complete history deletion is required.

Vercel deployment is left for Noor. Before confidential sharing there, choose appropriate deployment access protection: search-engine noindex metadata is not authentication.

## Facts and decisions still requiring Noor / Impact Factory confirmation

1. **Impact Factory:** latest annual unique learner count, eligible audiences, repeated attendees, and the reporting period behind the separate LinkedIn retrospective.
2. **Impact Factory:** current private/open/tailored quotes, group caps and exact programme availability. Published private-open prices do not establish bespoke-programme pricing.
3. **Impact Factory / Taylor:** whether the discovery account is still current, including the approximate 90% live mix, 60–70% tailored-revenue share, LMS status, systems and learner handoff. These remain discovery-call facts rather than public verification.
4. **Impact Factory:** preferred programme, approved methodology/material and reuse rights, trainer reviewer, willing test group and corporate buyer route. The draft examples are not an approved Impact Factory rubric.
5. **Both parties:** learner access/consent, employer reporting boundaries, data roles, retention, provider use, support access, escalation and any client IT requirements.
6. **Noor:** a reviewable demonstration of the separately existing MyPath generation/review workflow and the actual delivery/operating capacity for custom work.
7. **Both parties:** achievable prototype depth, workload allowance, usage caps, total pilot budget and success measures. All ranges remain indicative and willingness to pay remains untested.

## Files changed

- Strategy and handoff: this report, the strategy document, README, public-page check evidence.
- Narrative and evidence: proposal, executive-sections, evidence-tag, sources and source-register components/data.
- Interactive examples and arithmetic: journey, illustrations, calculators, calculation helpers and unit tests.
- Visual design: app/globals.css.
- Local/Vercel and checks: next.config.ts, vercel.json, package files, ESLint/PostCSS configuration, Playwright configuration/browser tests and audit capture scripts.
- Removed: .openai/hosting.json, scripts/stage-site.mjs and scripts/serve-static.mjs.
- Next.js development generated AGENTS.md and CLAUDE.md; its applicable repository instructions were read.
