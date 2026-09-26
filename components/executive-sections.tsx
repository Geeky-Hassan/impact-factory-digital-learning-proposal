'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Disclosure, TabBar } from './ui';
import { SourceButton } from './sources';

const options = [
  {value:'demo',label:'Concept demo / MVP',price:'£2,500–£3,500',detail:'2–3 weeks',title:'Make the idea easy to judge.',scope:['Map one programme’s preparation, live session and follow-up.','Build a clickable learner journey and sample company view.','Create one recap or mini-lesson with a smart-nudge example.','Show one scripted roleplay, separate feedback and voice/avatar options.'],outcome:'A reviewable demo and a pilot outline.',outcomeDetail:'Walk through the experience with Impact Factory, gather trainer feedback and agree what is worth testing.',boundary:'A concept demonstration, not a live learner service. Production AI, integrations and real learner data are outside this scope.'},
  {value:'pilot',label:'Working pilot',price:'£7,500–£12,000',detail:'Around 2 months',title:'Test it with real learners.',scope:['One approved programme; around 30–50 learners across small cohorts.','Learner access, preparation, approved content and smart follow-up.','One live AI roleplay scenario with a separate feedback stage.','Basic learner history, company reporting and trainer approval.'],outcome:'Evidence from a small, supported pilot.',outcomeDetail:'Review learner use, feedback quality, client value and the effort needed to operate it.',boundary:'Agree text, voice or avatar scope and usage allowances. A full course rollout and persistent, open-ended Digital Coach are outside this scope.'},
];
export function NextSteps() {
  const [option,setOption] = useState('demo');
  const current = options.find(item => item.value === option)!;
  return <>
    <section className="pilot-options" aria-label="Demo and working pilot options">
      <div className="options-heading"><span className="eyebrow">Two ways to start</span><span>Select an option to compare the scope</span></div>
      <TabBar id="pilot" label="Compare demo and pilot" items={options} value={option} onChange={setOption} className="pilot-choice-tabs" />
      <div className="phase-section">
        <div className="phase-panel" id="pilot-panel" role="tabpanel" aria-labelledby={'pilot-' + option}>
          <div className="phase-scope"><span className="eyebrow">{option === 'demo' ? 'Demo scope' : 'Pilot scope'}</span><h2>{current.title}</h2><ul className="scope-list">{current.scope.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
          <aside className="phase-estimate"><span className="eyebrow">What we would review</span><h3>{current.outcome}</h3><p>{current.outcomeDetail}</p><div className="scope-boundary"><strong>Scope boundary</strong><p>{current.boundary}</p></div><SourceButton id="P01">Pricing & scope assumptions</SourceButton></aside>
        </div>
        <p className="phase-disclaimer">Indicative, subject to scope; VAT excluded. Timing starts after scope and content approval. Agree a total cap and content, usage, hosting and support allowances before work begins.</p>
      </div>
      <p className="options-footnote">The demo can come first, or a working pilot can be scoped directly. Moving from demo to pilot requires a separate agreement on scope and total cost.</p>
    </section>
    <section className="pilot-review" aria-labelledby="review-title"><div><span className="eyebrow">A decision at each step</span><h2 id="review-title">Review before going further.</h2><p>Agree what useful results look like at the start. Use the demo to judge the idea and the pilot to test it with learners.</p></div><div className="review-decision"><strong>Refine, extend or stop.</strong><p>Decide any further scope and price from the results. There is no long-term pricing or rollout commitment.</p></div></section>
    <div className="working-model">
      <section aria-labelledby="partner-title"><span className="eyebrow">A possible operating model</span><h2 id="partner-title">Impact Factory leads the learning.</h2><p>Impact Factory brings the methodology, trainers, approved content and client relationships. MyPath could build and operate the technology around that expertise.</p>
        <Disclosure title="What MyPath could contribute"><p>Noor describes MyPath’s current workflow as turning source material into teaching videos and supporting course assets, with review and approval.</p><div className="capability-notes"><div><strong>Already working in MyPath</strong><p>Content, video and course-material generation with review, based on Noor’s product context.</p></div><div><strong>Proposed for Impact Factory</strong><p>LMS-style learning hub, company dashboard, live AI roleplay and Digital Coach personas, optional avatars/voices, and personalised journeys.</p></div></div><p className="micro">The separate MyPath product is outside this repository. Custom capabilities and operating capacity need scoping and validation.</p></Disclosure>
      </section>
      <section aria-labelledby="trust-title"><span className="eyebrow">The working principles</span><h2 id="trust-title">Designed with trust in mind.</h2><p>Trainer approval, clear AI identity and careful learner-data handling would guide the design. Company reporting would not automatically expose private conversations.</p>
        <Disclosure title="What we would design carefully"><ul className="trust-list"><li><strong>Human approval.</strong> Impact Factory reviews content, scenarios and feedback criteria.</li><li><strong>Learner choice.</strong> Appropriate consent and clear explanations of AI, remembered context and sharing.</li><li><strong>Role-based access.</strong> Agree what learners, trainers, L&D and support can see.</li><li><strong>Conversation data.</strong> Minimise sensitive details; agree retention, deletion and provider use.</li><li><strong>Trainer likeness.</strong> An instructor’s face or voice is an optional choice requiring explicit consent, approved use and governance. Licensed alternative voices or avatars can be used instead; no likeness is assumed in the pilot.</li><li><strong>Workload and adoption.</strong> Name an operator and measure support time and real use.</li></ul><p className="micro">Proposed principles, not a legal compliance guarantee.</p></Disclosure>
      </section>
    </div>
    <section className="closing-question" aria-labelledby="closing-title"><span className="eyebrow">The decision for discussion</span><h2 id="closing-title">Is this worth testing with one programme?</h2><p>Choose one programme, agree the right starting scope and review the evidence together.</p></section>
  </>;
}
