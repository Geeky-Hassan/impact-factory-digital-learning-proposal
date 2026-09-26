'use client';
import { useState } from 'react';
import { ArrowRight, Check, LockKeyhole, Mail, RotateCcw, Users } from 'lucide-react';
import { Disclosure, Select, Segmented, TabBar } from './ui';
import { SourceButton } from './sources';
export { Segmented } from './ui';

const stages = [
  { value: 'before', label: 'Prepare', detail: 'Before the room', title: 'Arrive with a real situation.', text: 'A few preparation questions could help Sarah reflect before the programme and, with her agreement, give the trainer useful context.', note: 'Preparation supports the live session. It is not a test.' },
  { value: 'live', label: 'Live', detail: 'Human-led', title: 'The human experience stays central.', text: 'Sarah attends an Impact Factory programme. Discussion, exercises, roleplay and personal feedback remain with the trainers.', note: 'The proposed digital journey surrounds this experience.' },
  { value: 'remember', label: 'Remember', detail: 'Revisit', title: 'A small, useful follow-up.', text: 'Smart nudges could offer a short video, personalised mini-lesson, question or reminder. Email or Teams is the invitation; the linked activity is where the learning happens.', note: 'Follow-up could reflect course, goals and previous responses, with trainer-approved content and learner preferences.' },
  { value: 'practise', label: 'Practise', detail: 'Rehearse', title: 'Another chance to try it.', text: 'The proposed roleplay is a live, conversational AI character. Learners could speak to a voice persona or on-screen avatar, or type. The character stays in role; separate feedback follows the simulation.', note: 'An additional practice opportunity, guided by criteria Impact Factory approves.' },
  { value: 'apply', label: 'Apply', detail: 'Use it at work', title: 'Help at the moment it matters.', text: 'An Impact Factory Digital Coach could be a live AI persona, available through voice, an on-screen avatar or text. With permission, it could use Sarah’s course and practice history to help her prepare for a real situation.', note: 'A possible extension after the pilot. A persistent coach needs separate scoping.' },
  { value: 'continue', label: 'Continue', detail: 'Stay connected', title: 'A route back to a person.', text: 'Sarah could return to her trainer, reflect on what happened at work or consider another programme when it is useful.', note: 'Learner preferences and the corporate client relationship would guide follow-up.' },
];
export function JourneyExplorer() {
  const [stage, setStage] = useState('before');
  const current = stages.find(s => s.value === stage)!;
  function openPractice() {
    setStage('practise');
    requestAnimationFrame(() => document.getElementById('journey-practise')?.focus());
  }
  return <>
    <div className="example-topline"><span><span className="avatar avatar-small">S</span><strong>Sarah</strong> · Manager at Northstar Ltd</span><span>Select a stage · Fictional example</span></div>
    <div className="journey-explorer">
      <TabBar id="journey" label="Learner journey stages" items={stages} value={stage} onChange={setStage} className="journey-tabs" />
      <div className="journey-stage" id="journey-panel" role="tabpanel" aria-labelledby={'journey-' + stage}>
        <div className="stage-copy"><span className="eyebrow">{stage === 'live' ? 'Human-led training' : 'Proposed · ' + current.label}</span><h2>{current.title}</h2><p>{current.text}</p><div className="stage-note"><span className="short-rule" />{current.note}</div>{(stage === 'practise' || stage === 'apply') && <PersonaOptions />}</div>
        <div className="stage-example" key={stage}>
          {stage === 'before' && <PrepareDemo />}
          {stage === 'live' && <div className="live-example"><Users size={35} strokeWidth={1.5} /><span className="eyebrow">In the room or live online</span><h3>Impact Factory<br />+ the learner</h3><div className="live-topics"><span>Discussion</span><span>Practice</span><span>Personal feedback</span></div><p>The trainer leads.<br />The technology supports what comes around it.</p></div>}
          {stage === 'remember' && <RememberDemo />}
          {stage === 'practise' && <RoleplayDemo />}
          {stage === 'apply' && <CoachExample onPractise={openPractice} />}
          {stage === 'continue' && <div className="continue-example"><span className="eyebrow">A possible follow-up</span><h3>“How did the conversation go?”</h3><p>Sarah could reflect on what she tried and choose what happens next.</p><ul className="plain-list"><li><Check size={16} />Ask her trainer a question</li><li><Check size={16} />Revisit a useful activity</li><li><Check size={16} />Explore a follow-up programme</li></ul><div className="note-panel">A continued relationship, with a clear human contact.</div></div>}
        </div>
      </div>
      <div className="journey-foundation"><LockKeyhole size={15} /><span>A learner record could connect these moments, with clear permissions.</span><SourceButton id="P02">Concept notes</SourceButton></div>
    </div>
    <Disclosure title="Why practice and retrieval are part of the idea">
      <p>Research supports giving people opportunities to retrieve, rehearse and receive useful feedback. It does not prove that this proposed experience would work for Impact Factory.</p>
      <div className="research-links"><span>Behaviour modelling · 117 studies <SourceButton id="S14">Research</SourceButton></span><span>Retrieval practice · 122 experiments, 10,382 participants <SourceButton id="S15">Research</SourceButton></span></div>
    </Disclosure>
  </>;
}
export function PrepareDemo() {
  const [difficulty, setDifficulty] = useState('I worry about their reaction');
  const [confidence, setConfidence] = useState(2);
  const [share, setShare] = useState(false);
  return <div className="prepare-example"><span className="example-kicker">Before Difficult Conversations</span><h3>Which conversation at work are you avoiding?</h3><div className="sample-answer">“A team member keeps missing deadlines.”</div>
    <label className="field-label" htmlFor="prep-difficulty">What makes it difficult?</label><Select id="prep-difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)}><option>I worry about their reaction</option><option>I am unsure how to begin</option><option>I need clearer expectations</option></Select>
    <div className="range-heading"><label htmlFor="prep-confidence">How confident do you feel?</label><output htmlFor="prep-confidence">{confidence} / 5</output></div><input id="prep-confidence" type="range" min="1" max="5" value={confidence} onChange={e => setConfidence(Number(e.target.value))} />
    <label className="consent-choice"><input type="checkbox" checked={share} onChange={e => setShare(e.target.checked)} />Preview sharing with my trainer</label>
    <p className="prep-sharing" aria-live="polite">{share ? 'Trainer preview: ' + difficulty.toLowerCase() + '. Confidence ' + confidence + '/5.' : 'Sharing is optional. Nothing in this example is saved or sent.'}</p>
  </div>;
}
const quizOptions = [
  { text: 'We need to talk about your performance.', feedback: 'This states the concern, but may feel like a verdict before you have heard their perspective.' },
  { text: 'I’d like to understand what’s been happening recently.', feedback: 'This invites their perspective. Next, describe the specific concern and listen before moving to solutions.' },
  { text: 'Why have you missed your deadlines again?', feedback: '“Again” can sound accusatory. A specific observation and an open question may make it easier to explore what happened.' },
];
export function RememberDemo() {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  return <div className="remember-example">{!open ? <><div className="example-kicker"><Mail size={15} />Day 3 · Example notification</div><h3>A 60-second refresher on opening a difficult conversation.</h3><p>A question today; a video, personalised lesson or reminder when that is more useful.</p><button className="button button-primary" onClick={() => setOpen(true)}>Open the refresher <ArrowRight size={16} /></button><div className="nudge-options"><span><strong>Day 7</strong>Video recap</span><span><strong>Day 10</strong>Personalised lesson</span><span><strong>Day 14</strong>Helpful reminder</span></div><p className="micro">Proposed timing. Most activities would take 1–3 minutes.</p></> : <>
      <span className="example-kicker">Remember · One question</span><h3>Which opening invites their perspective?</h3><p className="micro">A 30–60 second trainer-approved video could accompany this question.</p><div className="quiz-options" role="group" aria-label="Choose a conversation opening">{quizOptions.map((option, i) => <button key={option.text} aria-pressed={answer === i} onClick={() => setAnswer(i)}><span>{'ABC'[i]}</span>{option.text}</button>)}</div>
      {answer !== null && <div className="answer-feedback" role="status">{quizOptions[answer].feedback}</div>}
      <div className="example-bottom"><span>Illustrative feedback · approval required</span><button className="text-link" onClick={() => { setAnswer(null); setOpen(false); }}><RotateCcw size={13} />Reset</button></div>
    </>}</div>;
}
const alexResponses: Record<string, string> = {
  Receptive: 'I know I’ve fallen behind. Every time I start something, another urgent request comes in.',
  Defensive: 'I’m doing what I can. The deadlines keep changing, and I’m not the only one involved.',
  Challenging: 'It feels like nobody notices how much I’m dealing with. Why am I the one being singled out?',
};
export function RoleplayDemo() {
  const [level, setLevel] = useState('Receptive');
  const [state, setState] = useState<'scene' | 'ended' | 'feedback'>('scene');
  return <div className="roleplay-example"><span className="example-kicker">Scripted illustration · no live AI</span><h3>Alex has missed three deadlines.</h3><p className="control-hint">Choose a difficulty to preview Alex’s response.</p><Segmented label="Scenario difficulty" options={Object.keys(alexResponses)} value={level} onChange={v => { setLevel(v); setState('scene'); }} />
    {state === 'scene' && <div className="conversation"><div className="chat-line"><span>Sarah</span><p>Alex, I’d like to understand what’s been happening recently.</p></div><div className="chat-line alex"><span>Alex · character</span><p>{alexResponses[level]}</p></div><button className="text-link" onClick={() => setState('ended')}>End scenario <ArrowRight size={15} /></button></div>}
    {state === 'ended' && <div className="scene-ended"><span className="status-dot" /><h4>Simulation ended</h4><p>The character exchange is over. A separate evaluation could now review it.</p><button className="button button-primary" onClick={() => setState('feedback')}>View example feedback <ArrowRight size={15} /></button></div>}
    {state === 'feedback' && <div className="roleplay-feedback"><span className="eyebrow">Separate feedback · illustrative</span><h4>One strength. One next step.</h4><p><strong>What went well</strong>You opened by asking for Alex’s perspective.</p><p><strong>Try next time</strong>Clarify the specific concern, then allow time to listen.</p><p className="micro">This short opening gives limited evidence. A real evaluation would use Impact Factory-approved criteria.</p><button className="text-link" onClick={() => setState('scene')}><RotateCcw size={14} />Practise again</button></div>}
  </div>;
}
function CoachExample({ onPractise }: { onPractise: () => void }) {
  const [choice, setChoice] = useState('Review');
  return <div className="coach-example"><span className="example-kicker">Later-stage concept · Digital Coach</span><h3>“I need to give someone difficult feedback tomorrow.”</h3><p className="micro">With permission, the coach could use Sarah’s course and past practice. Choose the help she needs.</p><Segmented label="Coach options" options={['Review','Plan','Practise']} value={choice} onChange={setChoice} />
    <div className="coach-response">{choice === 'Review' && <><h4>Return to the course idea</h4><p>Revisit the relevant framework and a short example approved by Impact Factory.</p></>}{choice === 'Plan' && <><h4>A small conversation plan</h4><ul className="plain-list"><li>What happened, specifically?</li><li>What do you want to understand?</li><li>What would a useful next step be?</li></ul></>}{choice === 'Practise' && <><h4>Rehearse before tomorrow</h4><p>Try the situation in a bounded roleplay, then review separate feedback.</p><button className="text-link" onClick={onPractise}>Open the practice example <ArrowRight size={15} /></button></>}</div>
  </div>;
}

function PersonaOptions() {
  const [format, setFormat] = useState('Voice');
  return <Disclosure title="AI persona, avatar & voice options" className="persona-options">
    <Segmented label="Proposed AI interaction format" options={['Text','Voice','Avatar']} value={format} onChange={setFormat} />
    <p className="persona-preview" role="status">{format === 'Text' ? 'Type naturally to the AI persona. A text option could remain available alongside spoken interaction.' : format === 'Voice' ? 'Speak naturally and hear the AI persona respond. Use an approved licensed voice, or an instructor’s voice with explicit permission.' : 'Talk with an on-screen AI avatar. Choose an approved character, or an instructor’s likeness and voice with explicit permission.'}</p>
    <p>Roleplay and the Digital Coach could both offer these formats. An instructor’s likeness or voice would need consent and agreed use; licensed alternatives are also an option.</p>
    <p className="micro">Proposed custom capability. This is a format preview, with no live AI, generated speech or avatar video. Feasibility, quality, rights and usage costs need testing.</p>
  </Disclosure>;
}
