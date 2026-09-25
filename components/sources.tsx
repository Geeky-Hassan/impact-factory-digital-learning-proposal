'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BookOpen, Plus, X } from 'lucide-react';
import sources from '@/lib/sources.json';

const SourceContext = createContext<(id: string) => void>(() => {});

export function SourceProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const source = sources.find(s => s.id === selected);
  useEffect(() => { if (selected && !dialog.current?.open) dialog.current?.showModal(); }, [selected]);
  function close() { dialog.current?.close(); setSelected(null); }
  return <SourceContext.Provider value={setSelected}>
    {children}
    <dialog ref={dialog} className="source-dialog" aria-labelledby="source-title" onClose={() => setSelected(null)} onClick={e => { if (e.target === e.currentTarget) close(); }}>
      {source && <div className="source-dialog-content">
        <div className="flex items-center justify-between gap-4"><span className="eyebrow">{source.category} · {source.id}</span><button className="icon-button" aria-label="Close source" onClick={close} autoFocus><X size={22} /></button></div>
        <BookOpen size={28} className="source-book" />
        <h2 id="source-title">{source.title}</h2>
        <p>{source.note}</p>
        {source.id === 'S06' && <p className="note-panel">The profile says over 5,000 a year. A separate retrospective LinkedIn post reports 4,100 individuals. Its exact reporting period was not established. Use 5,000 as a scale anchor, not a verified latest-year total.</p>}
        {source.id === 'S12' && <p className="note-panel">The form lists £3,500 + VAT for the maximum-eight one-day option and £3,750 + VAT for maximum ten. Embedded course data differs; confirm an actual quote.</p>}
        <p className="micro">{source.category === 'Calculations' || source.category === 'Discovery' || source.category === 'Proposal' ? 'Recorded' : 'Accessed'}: {source.accessed}</p>
        {source.url && <a className="text-link" href={source.url} target="_blank" rel="noreferrer">Read original source <ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></a>}
      </div>}
    </dialog>
  </SourceContext.Provider>;
}

export function SourceButton({ id, children }: { id: string; children?: React.ReactNode }) {
  const show = useContext(SourceContext);
  return <button className="source-link" onClick={() => show(id)} aria-label={`View source: ${sources.find(s => s.id === id)?.title ?? id}`}>{children ?? 'Source'} <ArrowUpRight size={12} aria-hidden="true" /></button>;
}

export function SourcesSection() {
  const [filter, setFilter] = useState('All');
  const show = useContext(SourceContext);
  const categories = ['All', 'Official website', 'LinkedIn', 'Discovery', 'Research', 'Calculations', 'Proposal'];
  return <section className="sources-section" id="sources" aria-labelledby="sources-heading">
    <details className="sources-disclosure">
      <summary><span><span className="eyebrow">The evidence behind the proposal</span><h2 id="sources-heading">Sources & assumptions</h2></span><Plus className="disclosure-icon" size={24} /></summary>
      <div className="sources-body">
        <p>Facts, discovery notes and working assumptions are kept separate. Public sources were checked on 25 September 2026; published scale figures are Impact Factory’s own claims.</p>
        <div className="filter-buttons" role="group" aria-label="Filter sources">{categories.map(c => <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>)}</div>
        <ul className="source-list">{sources.filter(s => filter === 'All' || s.category === filter).map(s => <li key={s.id}><button onClick={() => show(s.id)}><span className="source-id">{s.id}</span><span><span className="micro">{s.category}</span><strong>{s.title}</strong></span><ArrowUpRight size={18} /></button></li>)}</ul>
        <div className="source-qualifications"><h3>Two qualifications to keep in view</h3><p>The 5,000 annual learner base is an illustrative scale anchor, with a differing retrospective LinkedIn figure still to reconcile. The £3,750/eight-attendee booking is an assumed example, not the verified maximum-eight tariff.</p><h3>What remains to agree</h3><p>Actual unique learner volumes, a current programme quote, content rights, learner permissions, reporting boundaries, operating workload, usage allowances and the final pilot scope.</p></div>
      </div>
    </details>
  </section>;
}
