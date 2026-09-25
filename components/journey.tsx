'use client';

import { useState, type KeyboardEvent } from 'react';
import { ArrowRight, Check, ChevronRight, FileText, HeartHandshake, LockKeyhole, MessageCircle, Play, RotateCcw, Users } from 'lucide-react';

export type Stage = 'before' | 'live' | 'remember' | 'practise' | 'apply';
const stages: { id: Stage; label: string; verb: string; timing: string }[] = [
  { id: 'before', label: 'Before', verb: 'Prepare', timing: 'Before the programme' },
  { id: 'live', label: 'Live', verb: 'Connect', timing: 'The human experience' },
  { id: 'remember', label: 'Remember', verb: 'Reinforce', timing: 'A few minutes at a time' },
  { id: 'practise', label: 'Practise', verb: 'Rehearse', timing: 'A safe space to try' },
  { id: 'apply', label: 'Apply', verb: 'Use it at work', timing: 'At the moment of need' },
];

export function Segmented({ options, value, onChange, label }: { options: string[]; value: string; onChange: (value: string) => void; label: string }) {
  return <div className="segmented" role="group" aria-label={label}>{options.map(option => <button type="button" key={option} aria-pressed={value === option} onClick={() => onChange(option)}>{option}</button>)}</div>;
}

export function CurrentJourney() {
  const [route, setRoute] = useState('Tailored programmes');
  return <div className="current-journey" id="current-journey">
    <div className="current-heading"><div><p className="eyebrow">The current handoff</p><h3>A useful resource. An uncertain next step.</h3></div><Segmented options={['Tailored programmes', 'Open courses']} value={route} onChange={setRoute} label="Current learner route" /></div>
    <ol className="current-flow">
      <li><span className="flow-dot" /><strong>Human-led training</strong><span>Practical, personal, responsive</span></li>
      <li><span className="flow-dot" /><strong>Post-course resources</strong><span>Handouts, reading and video links</span></li>
      <li className={route === 'Tailored programmes' ? 'handoff' : ''}><span className="flow-dot" /><strong>{route === 'Tailored programmes' ? 'Through the booking manager' : 'Back to the learner'}</strong><span>{route === 'Tailored programmes' ? 'Resources may be forwarded' : 'Resources and trainer access'}</span></li>
      <li className="flow-question"><span className="flow-dot">?</span><strong>What happens next?</strong><span>Practice and application are less visible</span></li>
    </ol>
    <p className="micro">Based on discovery. Existing personal follow-up has value; the opportunity is to connect it into a consistent journey.</p>
  </div>;
}

function BeforeDemo() {
  const [difficulty, setDifficulty] = useState('I worry about their reaction');
  const [outcome, setOutcome] = useState('Agree a realistic way forward');
  const [confidence, setConfidence] = useState(3);
  const [shared, setShared] = useState(false);
  return <div className="demo-grid">
    <div className="demo-explanation"><span className="eyebrow">Before · a more useful starting point</span><h3>Arrive with<br />a real goal.</h3><p>A few thoughtful questions can help the learner prepare and give the trainer better context.</p><div className="trainer-note"><Users size={20} /><p>Trainer can receive a concise preparation summary where appropriate.</p></div><p className="micro">Fictional preparation example. Choices stay in this page and are not sent to anyone.</p></div>
    <div className="demo-card prep-card" id="before"><div className="demo-card-header"><span className="small-mark">IF</span><span>Preparing for Difficult Conversations</span><span className="duration">3 min</span></div>
      <div className="demo-card-body"><p className="micro">Example invitation · next Thursday</p><h4>Before we meet, think of one conversation at work that you’ve been avoiding.</h4>
        <p className="sample-context">For this example: a colleague has missed deadlines.</p>
        <label className="field-label" htmlFor="prep-difficulty">What makes it difficult?</label><select id="prep-difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)}><option>I worry about their reaction</option><option>I am unsure how to begin</option><option>I want to protect the relationship</option></select>
        <label className="field-label" htmlFor="prep-outcome">What outcome would you like?</label><select id="prep-outcome" value={outcome} onChange={e => setOutcome(e.target.value)}><option>Agree a realistic way forward</option><option>Understand what is getting in the way</option><option>Explain the impact clearly</option></select>
        <div className="range-heading"><label htmlFor="confidence">How confident do you feel?</label><output htmlFor="confidence">{confidence} / 5</output></div><input id="confidence" type="range" min="1" max="5" value={confidence} onChange={e => setConfidence(Number(e.target.value))} /><div className="range-labels"><span>Not yet confident</span><span>Ready to try</span></div>
        <label className="check-label"><input type="checkbox" checked={shared} onChange={e => setShared(e.target.checked)} />Preview sharing this preparation with my trainer</label>
        <div className="summary-preview" aria-live="polite"><span className="eyebrow">Trainer-view preview</span>{shared ? <p>Focus: {difficulty.toLowerCase()}. Goal: {outcome.toLowerCase()}. Self-reported confidence: {confidence}/5.</p> : <p>Your preparation stays private in this example. Choose to preview the trainer summary.</p>}</div>
      </div>
    </div>
  </div>;
}

function LiveDemo() {
  return <div className="demo-grid"><div className="demo-explanation"><span className="eyebrow">Live · the centre of the experience</span><h3>People learning<br />with people.</h3><p>The trainer brings judgement, energy and the ability to respond to what happens in the room.</p><p>Preparation informs the session. Digital follow-up carries selected ideas forward.</p><div className="trainer-note"><HeartHandshake size={22} /><p>No attempt to replace the live session.</p></div></div><div className="live-card" id="live"><span className="eyebrow">Human-led Impact Factory training</span><div className="human-circle"><Users size={56} strokeWidth={1} /><span>LIVE</span></div><h4>The moment everything<br />is built around.</h4><div className="live-values"><span>Individual attention</span><span>Real situations</span><span>Trainer judgement</span><span>Practical experiments</span></div><p>Human trainer remains central.</p></div></div>;
}

const answers = [
  { letter: 'A', text: '“You clearly don’t care about the deadlines.”', feedback: 'This assumes a motive before understanding what happened. Try describing the missed deadlines and inviting Alex’s perspective.', next: 'Try separating what you observed from what you inferred.' },
  { letter: 'B', text: '“The last three deadlines were missed. Can we talk about what happened?”', feedback: 'This gives a specific starting point and invites Alex’s perspective. It creates room to understand the issue before agreeing a way forward.', next: 'How would you say this naturally, in your own words?' },
  { letter: 'C', text: '“It’s probably nothing. Let’s leave it for now.”', feedback: 'This may avoid discomfort, but leaves the issue unresolved. Consider a clear opening that makes space for both the facts and the relationship.', next: 'What small first step would help you raise the issue?' },
];

export function RememberDemo() {
  const [opened, setOpened] = useState(false);
  const [recap, setRecap] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  return <div className="demo-grid"><div className="demo-explanation"><span className="eyebrow">Remember · small and responsive</span><h3>A nudge is<br />just the beginning.</h3><p>The email or Teams message is the trigger. The learner clicks into a 1–3 minute interaction and gets a useful response.</p><ol className="nudge-schedule"><li><span>Day 3</span>Opening a difficult conversation</li><li><span>Day 7</span>A short reflection</li><li><span>Day 10</span>A small workplace challenge</li><li><span>Day 14</span>A quick check-in</li></ol><p className="micro">Illustrative schedule. Activities and cadence would be approved by Impact Factory.</p></div>
    <div className="demo-card remember-card" id="remember"><div className="demo-card-header"><MessageCircle size={18} /><span>Your learning, continued</span><span className="duration">Day 3</span></div><div className="demo-card-body">
      {!opened ? <div className="notification-preview"><span className="eyebrow">An example notification</span><h4>60-second refresher:<br />opening a difficult conversation.</h4><p>A small question to bring the workshop back into your working day.</p><button className="button button-primary" onClick={() => setOpened(true)}>Open the refresher <ArrowRight size={17} /></button><span className="micro">Try the interaction</span></div> : <>
        <div className="video-concept"><div><span className="micro">Trainer recap · proposed video slot</span><strong>Start with what happened.<br />Make room to understand.</strong><button className="text-link" onClick={() => setRecap(!recap)} aria-expanded={recap}><Play size={14} />{recap ? 'Hide written recap' : 'Read the example recap'}</button></div><span className="video-duration">0:60</span></div>
        {recap && <p className="recap-transcript">Describe the situation clearly, then invite the other person’s perspective. A useful opening can create space for a conversation. This is draft guidance for trainer review, not an approved course script.</p>}
        <p className="micro video-note">No video is played in this concept; the recap is available as text.</p><h4 className="question-title">Which opening gives you the best chance of understanding the issue?</h4>
        <div className="answer-options" role="group" aria-label="Choose a conversation opening">{answers.map((a, i) => <button key={a.letter} className={answer === i ? 'selected' : ''} aria-pressed={answer === i} onClick={() => setAnswer(i)}><span>{a.letter}</span>{a.text}{answer === i && <Check size={18} />}</button>)}</div>
        {answer !== null && <div className="answer-feedback" role="status"><span className="eyebrow">An option to consider</span><p>{answers[answer].feedback}</p><strong>{answers[answer].next}</strong></div>}
        <button className="text-link reset-link" onClick={() => { setAnswer(null); setOpened(false); setRecap(false); }}><RotateCcw size={14} /> Reset refresher</button>
      </>}
    </div><p className="demo-card-footnote">Draft feedback for Impact Factory review. Context matters; there is no universal script.</p></div>
  </div>;
}

const roleplayLevels = ['Receptive', 'Defensive', 'Challenging'];
const alexLines: Record<string, [string, string]> = {
  Receptive: ['“Yes, I know I’ve slipped. I’ve been struggling to balance the requests coming in. I’d like to work it out.”', '“That would help. Can we look at what needs to come first this week?”'],
  Defensive: ['“I’m doing my best. Every time I start something, someone adds another urgent job. It’s not just down to me.”', '“Okay. I can walk you through it, but I need those other priorities taken seriously too.”'],
  Challenging: ['“Honestly, I feel like nobody notices how much I’m carrying. Now I’m being pulled up on deadlines as well.”', '“I need a moment. I do want to sort this out, but I need you to understand why it’s been so difficult.”'],
};

export function RoleplayDemo() {
  const [level, setLevel] = useState('Defensive');
  const [phase, setPhase] = useState<'brief' | 'conversation' | 'ended' | 'feedback'>('brief');
  const [turn, setTurn] = useState(1);
  function reset() { setPhase('brief'); setTurn(1); }
  return <div className="demo-grid"><div className="demo-explanation"><span className="eyebrow">Practise · a safe space to rehearse</span><h3>Try the conversation.<br />Then reflect.</h3><p>Alex has missed three deadlines and can become defensive when challenged. Explore how the same situation could feel at different levels.</p><div className="role-separation"><div><span>01</span><p><strong>During the scenario</strong>AI behaves as Alex, the employee.</p></div><div><span>02</span><p><strong>After the scenario</strong>A separate evaluation layer offers feedback.</p></div></div><p className="micro">All three levels below are scripted demonstrations. The first prototype can begin with one approved level; wider rollout depends on review.</p></div>
    <div className="demo-card roleplay-card" id="practise"><div className="demo-card-header"><span className="avatar avatar-small">A</span><span><strong>Alex</strong><span className="micro">Fictional employee · missed deadlines</span></span><span className="status-dot" /></div><div className="demo-card-body">
      <p className="micro">Concept demonstration — not live learner data.</p>
      <Segmented options={roleplayLevels} value={level} onChange={v => { setLevel(v); reset(); }} label="Roleplay difficulty" />
      {phase === 'brief' && <div className="roleplay-brief"><span className="eyebrow">Scripted example · {level.toLowerCase()}</span><h4>A conversation with Alex</h4><p>Your aim: understand what has been happening and agree a useful next step.</p><button className="button button-primary" onClick={() => setPhase('conversation')}>Begin the example <ArrowRight size={17} /></button><p className="micro">Step through a prepared exchange. No microphone, live AI or recording.</p></div>}
      {phase === 'conversation' && <><div className="conversation" aria-live="polite"><div className="chat-bubble learner"><span>You · scripted learner</span><p>“Alex, I’d like to understand what’s been happening with the deadlines.”</p></div><div className="chat-bubble alex"><span>Alex · in character</span><p>{alexLines[level][0]}</p></div>{turn === 2 && <><div className="chat-bubble learner"><span>You · scripted learner</span><p>“It sounds like there are competing demands. Can you take me through what happened with the last deadline?”</p></div><div className="chat-bubble alex"><span>Alex · in character</span><p>{alexLines[level][1]}</p></div></>}</div><div className="conversation-controls">{turn === 1 && <button className="button button-small" onClick={() => setTurn(2)}>Continue exchange <ChevronRight size={16} /></button>}<button className="text-link" onClick={() => setPhase('ended')}>End scenario <ArrowRight size={15} /></button></div><p className="micro">Alex stays in character. Coaching is reserved for the debrief.</p></>}
      {phase === 'ended' && <div className="roleplay-ended"><Check size={30} /><span className="eyebrow">Simulation ended</span><h4>Now, step back<br />and reflect.</h4><p>The employee role has finished. A separate evaluation step would review the exchange against approved criteria.</p><button className="button button-primary" onClick={() => setPhase('feedback')}>View example feedback <ArrowRight size={17} /></button></div>}
      {phase === 'feedback' && <div className="roleplay-feedback" aria-live="polite"><span className="eyebrow">Separate evaluation · draft for review</span><h4>One strength. One next step.</h4><div><span className="feedback-label"><Check size={16} />Strengths</span><p>You opened with curiosity: “I’d like to understand”. That invites Alex’s perspective.</p></div><div><span className="feedback-label"><ArrowRight size={16} />An area to develop</span><p>{turn === 2 ? 'You explored competing demands. A next step could be to agree a concrete priority and a time to check back.' : 'This short opening gives limited evidence. Continue by asking about the specific obstacles before offering a solution.'}</p></div><div><span className="feedback-label"><FileText size={16} />Relevant course idea</span><p>Exploring the other person’s point of view. Final technique wording and feedback criteria require Impact Factory approval.</p></div><button className="button button-small" onClick={reset}><RotateCcw size={16} /> Retry the example</button></div>}
    </div></div>
  </div>;
}

const coachOptions = ['Review the framework', 'Plan the conversation', 'Practise it'];
function ApplyDemo({ onPractise }: { onPractise: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  return <div className="demo-grid"><div className="demo-explanation"><span className="eyebrow">Apply · help for the moment that matters</span><h3>Tomorrow’s situation.<br />A useful next step.</h3><p>A proposed digital coach could connect a real workplace need with the course and the learner’s previous practice.</p><div className="trainer-note"><HeartHandshake size={21} /><p>Impact Factory’s methodology remains the source of guidance. The human trainer remains available.</p></div><p className="micro">Persistent memory is a proposed capability. Learners would need to be able to review, correct and remove remembered context.</p></div><div className="demo-card coach-card" id="apply"><div className="demo-card-header"><span className="small-mark">IF</span><span>Impact Factory Digital Coach</span><span className="duration">Concept</span></div><div className="demo-card-body"><div className="chat-bubble learner"><span>Sarah · fictional learner</span><p>“I need to give someone difficult feedback tomorrow.”</p></div><div className="context-memory"><span className="eyebrow">Example context, with permission</span><span>Course: Difficult Conversations</span><span>Practice: receptive conversation completed</span><span>Strength: listening and questioning</span><span>Focus: opening conversations clearly</span></div><h4 className="question-title">Where would you like to begin?</h4><div className="coach-options">{coachOptions.map(option => <button key={option} aria-pressed={choice === option} onClick={() => setChoice(option)}>{option}<ArrowRight size={17} /></button>)}</div>{choice && <div className="coach-response" role="status">{choice === coachOptions[0] ? <><strong>Return to the course idea</strong><p>Revisit the other person’s point of view. What do you know about the situation, and what are you assuming?</p></> : choice === coachOptions[1] ? <><strong>A small conversation plan</strong><ol><li>Name the situation you want to discuss.</li><li>Decide what you want to understand.</li><li>Prepare an opening in your own words.</li><li>Leave space to agree the next step together.</li></ol></> : <><strong>Try it before tomorrow</strong><p>Start with the Alex scenario and review the feedback afterwards.</p><button className="text-link" onClick={onPractise}>Open the practice example <ArrowRight size={15} /></button></>}</div>}<p className="micro">Prewritten example guidance; subject to trainer review. A future service would include an agreed route to human support.</p></div></div></div>;
}

export function JourneyExplorer() {
  const [stage, setStage] = useState<Stage>('before');
  const [version, setVersion] = useState(0);
  function select(value: Stage) { setStage(value); }
  function onKeys(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % stages.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + stages.length) % stages.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = stages.length - 1;
    else return;
    e.preventDefault(); select(stages[next].id); document.getElementById(`tab-${stages[next].id}`)?.focus();
  }
  return <div className="journey-explorer">
    <div className="journey-tabs" role="tablist" aria-label="Explore the proposed learner journey">{stages.map((s, i) => <button key={s.id} id={`tab-${s.id}`} role="tab" aria-selected={stage === s.id} aria-controls={`panel-${s.id}`} tabIndex={stage === s.id ? 0 : -1} className={`${stage === s.id ? 'active' : ''} ${s.id === 'live' ? 'live-tab' : ''}`} onClick={() => select(s.id)} onKeyDown={e => onKeys(e, i)}><span className="tab-number">0{i + 1}</span><strong>{s.label}</strong><span>{s.verb}</span>{s.id === 'live' && <span className="central-label">Human-led</span>}</button>)}</div>
    <div className="journey-panel" role="tabpanel" id={`panel-${stage}`} aria-labelledby={`tab-${stage}`} tabIndex={0} key={`${stage}-${version}`}>
      {stage === 'before' && <BeforeDemo />}{stage === 'live' && <LiveDemo />}{stage === 'remember' && <RememberDemo />}{stage === 'practise' && <RoleplayDemo />}{stage === 'apply' && <ApplyDemo onPractise={() => { setStage('practise'); document.getElementById('tab-practise')?.focus(); }} />}
    </div>
    <div className="journey-foundation"><span><LockKeyhole size={17} />One lightweight learner + company platform remembers the journey.</span><button className="text-link" onClick={() => setVersion(v => v + 1)}><RotateCcw size={14} />Reset example</button></div>
    <div className="journey-caption"><p>Illustrative concept — subject to Impact Factory approval. Scripted examples reset when you change stage.</p><span>Then, <strong>continue</strong> with a trainer, follow-up or the next programme <ArrowRight size={15} /></span></div>
  </div>;
}
