'use client';

import { useState } from 'react';
import { ArrowRight, Check, Circle, LockKeyhole, Users } from 'lucide-react';
import { Segmented } from './journey';

export function LearnerProfile() {
  const [view, setView] = useState('Learner view');
  return <div className="profile-card">
    <div className="profile-topline"><span className="eyebrow">Illustrative learner profile</span><Segmented options={['Learner view', 'Trainer view']} value={view} onChange={setView} label="Profile perspective" /></div>
    <div className="profile-person"><span className="avatar avatar-large">SM</span><div><h3>Sarah Mitchell</h3><p>Northstar Ltd <span>·</span> Difficult Conversations</p></div><span className="profile-badge">A journey in progress</span></div>
    {view === 'Learner view' ? <div className="profile-body"><div><span className="eyebrow">My journey</span><ol className="learner-checklist">{['Preparation', 'Live programme', 'Nudge 1', 'Nudge 2', 'Practice Level 1', 'Practice Level 2', 'Follow-up reflection'].map((item, i) => <li key={item} className={i < 5 ? 'complete' : ''}>{i < 5 ? <span className="check-circle"><Check size={12} /></span> : <Circle size={18} />}<span>{item}</span>{i === 5 && <span className="next-tag">Up next</span>}</li>)}</ol></div><div className="profile-focus"><div><span className="eyebrow">Development focus</span><p>Opening conversations clearly</p></div><div><span className="eyebrow">A strength to build on</span><p>Listening and questioning</p></div><div className="next-recommendation"><span className="eyebrow">A possible next step</span><strong>Defensive conversation practice</strong><p>Build on the receptive conversation you’ve already tried.</p><span className="micro">Example recommendation</span></div></div></div> : <div className="trainer-profile-view"><Users size={27} /><h4>Enough context to support Sarah.</h4><p>With Sarah’s permission, the trainer could see her preparation goal and a summary she chooses to share.</p><div className="summary-preview"><span className="eyebrow">Example shared goal</span><p>“I’d like to open a difficult conversation clearly, without losing the relationship.”</p></div><p className="micro">Private practice transcripts and individual AI feedback would not be routinely shared. Access needs explicit design.</p></div>}
    <div className="profile-footer"><LockKeyhole size={15} /><span>Fictional data. Development observations are contextual, not fixed traits or performance ratings.</span></div>
  </div>;
}

export function CompanyDashboard() {
  const [view, setView] = useState('Participation');
  const metrics = [{ value: 20, label: 'Delegates' }, { value: 18, label: 'Attended' }, { value: 15, label: 'Activated' }, { value: 12, label: 'Reinforcement' }, { value: 9, label: 'AI practice' }];
  return <div className="company-dashboard">
    <div className="dashboard-header"><div><span className="eyebrow">Illustrative corporate client view</span><h3>Northstar Ltd</h3><p>Difficult Conversations · example 30-day reporting window</p></div><span className="fictional-tag">Fictional data</span></div>
    <div className="dashboard-navigation"><Segmented options={['Programme overview', 'Participation']} value={view} onChange={setView} label="Company dashboard view" /><span className="micro">Across 3 example bookings</span></div>
    <div className="dashboard-metrics">{metrics.map((m, i) => <div key={m.label}><strong>{m.value}</strong><span>{m.label}</span>{i > 0 && <span className="metric-definition">of 20 delegates</span>}</div>)}</div>
    {view === 'Participation' ? <div className="participation-chart"><div><span className="eyebrow">Aggregate activity</span><h4>A view of participation,<br />with a clear boundary.</h4><p>These counts help an L&D lead see where a programme needs support. They do not measure individual competence.</p></div><div className="activity-bars">{metrics.slice(1).map(m => <div className="activity-bar" key={m.label}><div><span>{m.label}</span><strong>{m.value}<span> / 20</span></strong></div><div className="bar-track"><div style={{ width: `${m.value / 20 * 100}%` }} /></div></div>)}</div></div> : <div className="table-scroll"><table className="booking-table"><caption className="sr-only">Fictional programme bookings and attendance</caption><thead><tr><th>Booking</th><th>Programme</th><th>Delegates</th><th>Attended</th></tr></thead><tbody>{[['Cohort A',8,8],['Cohort B',6,5],['Cohort C',6,5]].map(row => <tr key={row[0]}><td>{row[0]}</td><td>Difficult Conversations</td><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody></table><p className="micro">Example bookings only. Named delegate administration would require an agreed operational purpose.</p></div>}
    <div className="dashboard-definitions"><p><strong>In this example:</strong> activated = opened a claimed learner journey; reinforcement = completed all assigned reinforcement activities; AI practice = completed at least one session.</p></div>
    <div className="privacy-line"><LockKeyhole size={20} /><p>Exactly what employers can see would need to be agreed through permissions, privacy and programme design. No private conversations or individual AI performance reports are shown. Small-group reporting also needs protection.</p></div>
  </div>;
}

export function PilotDetails() {
  const [tab, setTab] = useState('Scope');
  return <div className="pilot-details"><Segmented options={['Scope', 'Success questions', 'Decision gates']} value={tab} onChange={setTab} label="Pilot detail" />
    {tab === 'Scope' && <div className="pilot-scope"><div className="pilot-stage"><span className="eyebrow">01 · design / prototype</span><h4>Start with one small group.</h4><p>Approximately 6–8 learners. One programme, one preparation experience, three short nudges, one roleplay scenario at an approved starting level, and basic learner/reporting prototypes.</p><p className="micro">Trainer review throughout. This is the starting scope for the indicative £2k–£3.5k discussion.</p></div><div className="pilot-stage"><span className="eyebrow">02 · optional expanded test</span><h4>Broaden only when it’s useful.</h4><p>Up to 30–50 learners across suitable corporate/open cohorts; 3–4 nudges, one scenario with three difficulty levels, a basic learner record and a company dashboard.</p><p className="micro">A separate scope and cost decision. It does not imply a 30–50-person live workshop or inclusion in the prototype budget.</p></div></div>}
    {tab === 'Success questions' && <ul className="pilot-questions">{['Do learners actually use it?', 'Do they practise more than once?', 'Do trainers trust the content and feedback?', 'Does the client value the additional journey?', 'Is the work manageable for Impact Factory?', 'Is it worth offering again?'].map((q, i) => <li key={q}><span>0{i+1}</span>{q}</li>)}</ul>}
    {tab === 'Decision gates' && <div className="decision-gates"><p>Agree measures and a staff-time allowance before inviting learners. Review actual use, repeat practice, trainer quality reviews, learner/buyer feedback and delivery costs. No target percentages are proposed here.</p><ul>{['Approved content and feedback; critical quality issues resolved.', 'Agreed learner permissions and corporate reporting boundaries.', 'A named operator and manageable, measured workload.', 'A reason to continue, supported by learner and buyer evidence.'].map(t => <li key={t}><Check size={17} />{t}</li>)}</ul><div className="gate-outcomes"><span>Stop</span><span>Revise</span><span>Roll out</span></div><p className="micro">A small willing cohort can show feasibility. It cannot establish causal effectiveness or market-wide demand.</p></div>}
  </div>;
}

export function DiscussionChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  const items = ['A real programme and cohort', 'A trainer and operating owner', 'Approved material and one scenario', 'Permissions and reporting boundaries', 'Scope, budget cap and success questions'];
  return <details className="discussion-checklist"><summary>Review the pilot decisions <ArrowRight size={18} /></summary><p className="micro">A local discussion aid. Checking an item makes no commitment and sends nothing.</p>{items.map(item => <label key={item} className="check-label"><input type="checkbox" checked={checked.includes(item)} onChange={() => setChecked(prev => prev.includes(item) ? prev.filter(v => v !== item) : [...prev, item])} />{item}</label>)}<p className="micro" aria-live="polite">{checked.length} of {items.length} topics marked for discussion.</p></details>;
}
