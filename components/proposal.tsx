import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { SourceButton } from './sources';

export default function Overview() {
  return <div className="overview-page">
    <header className="overview-heading"><span className="eyebrow"><span className="status-dot" />A conversation, continued</span><span className="quiet-label">The proposal at a glance</span></header>
    <section className="overview-hero" aria-labelledby="overview-title">
      <div className="hero-copy"><h1 id="overview-title">Extending the <br />learning journey <span>beyond the room.</span></h1>
        <p>Impact Factory’s human-led training is the starting point. One possible digital layer could help learners prepare before a programme, then remember, practise and apply what they learned.</p>
        <Link className="button button-primary" href="/learner-journey/">Explore the learner journey <ArrowRight size={17} /></Link>
        <span className="hero-caption">A working proposal following conversations with Abigail and Taylor.</span>
      </div>
      <div className="journey-map" aria-label="Proposed journey: prepare, live human-led training, remember, practise, apply, continue">
        <div className="map-topline"><span className="eyebrow">One connected experience</span><span className="concept-label">Proposed</span></div>
        <div className="map-prepare"><span className="map-node" /><div><strong>Prepare</strong><span>Bring a real situation into the room</span></div></div>
        <div className="map-live"><div className="live-symbol"><Users size={25} strokeWidth={1.6} /></div><div><span className="eyebrow">The centre of the experience</span><h2>Human-led<br />Impact Factory training</h2><p>Trainers, discussion, practice and personal feedback.</p></div></div>
        <div className="map-after"><div><span className="map-node" /><strong>Remember</strong><span>Revisit an idea</span></div><div><span className="map-node" /><strong>Practise</strong><span>Rehearse safely</span></div><div><span className="map-node" /><strong>Apply</strong><span>Use it at work</span></div></div>
        <div className="map-continue"><span>Continue</span><ArrowRight size={15} /><span>Trainer follow-up or the next programme</span></div>
      </div>
    </section>
    <section className="heard-section" aria-labelledby="heard-title">
      <div className="section-topline"><h2 id="heard-title">What we heard</h2><SourceButton id="D01">Discovery conversations</SourceButton></div>
      <div className="heard-columns">
        <article><span className="small-index">01</span><h3>The human experience matters.</h3><p>Trainers, tailored discussion and individual feedback are central. Follow-up is deliberately personal.</p></article>
        <article><span className="small-index">02</span><h3>The connection can become indirect.</h3><p>Resources sit across webpages, email, HubSpot and manual follow-up. In corporate programmes, the manager may forward them to learners.</p></article>
        <article><span className="small-index">03</span><h3>The next step needs to be manageable.</h3><p>Clients are asking for digital and shorter formats. A small team needs a clear answer to who would run the technology.</p></article>
      </div>
      <div className="discovery-footnote"><strong>60–70%</strong><p>Taylor’s estimate of revenue from tailored work. That makes the corporate-to-learner handoff worth exploring.</p><span>Discovery-call estimate<br />Not audited revenue data</span></div>
    </section>
    <aside className="question-strip"><span className="eyebrow">The question to explore</span><p>Could a more connected journey extend the relationship around the live programme?</p><Link href="/next-steps/">Start with one programme <ArrowRight size={17} /></Link></aside>
  </div>;
}
