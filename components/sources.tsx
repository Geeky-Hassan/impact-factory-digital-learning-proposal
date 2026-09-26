'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, BookOpen, ChevronRight, Search, X } from 'lucide-react';
import sources from '@/lib/sources.json';
import { EvidenceTag, type EvidenceKind } from './evidence-tag';

const SourceContext = createContext<(id: string) => void>(() => {});
function kind(source: typeof sources[number]): EvidenceKind {
  if (source.id === 'P01') return 'INDICATIVE ESTIMATE';
  if (source.category === 'Proposal') return 'PROPOSED CONCEPT';
  if (source.category === 'Discovery') return 'DISCOVERY-CALL FACT';
  if (source.category === 'Calculations') return 'ILLUSTRATIVE CALCULATION';
  return 'VERIFIED PUBLIC FACT';
}
const filters = ['All', 'Public facts', 'Discovery', 'Research', 'Technology', 'Calculations', 'Proposals'];
export function SourceProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const source = sources.find(s => s.id === selected);
  useEffect(() => { if (selected && !dialog.current?.open) dialog.current?.showModal(); }, [selected]);
  function close() { dialog.current?.close(); setSelected(null); }
  const visible = sources.filter(s => {
    const categoryMatches = filter === 'All'
      || (filter === 'Public facts' && ['Official website', 'LinkedIn'].includes(s.category))
      || (filter === 'Technology' && s.category === 'Technology reference')
      || (filter === 'Proposals' && s.category === 'Proposal')
      || s.category === filter;
    return categoryMatches && (s.title + ' ' + s.note + ' ' + s.id).toLowerCase().includes(query.toLowerCase());
  });
  return <SourceContext.Provider value={setSelected}>{children}
    <dialog ref={dialog} className="source-dialog" aria-labelledby="source-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="drawer-top"><span className="eyebrow">The basis for this proposal</span><button className="icon-button" onClick={close} aria-label="Close sources" autoFocus><X size={21} /></button></div>
      {source ? <div className="source-detail"><button className="text-link" onClick={() => setSelected('all')}><ArrowLeft size={15} />All sources</button><EvidenceTag kind={kind(source)} /><h2 id="source-title">{source.title}</h2><p>{source.note}</p>
        {source.id === 'S06' && <p className="note-panel">A separate retrospective LinkedIn post mentions 4,100 individuals. Its reporting period needs confirmation. Use 5,000 as a scale anchor, not a verified latest-year total.</p>}
        {source.id === 'S12' && <p className="note-panel">The published form pairs £3,500 + VAT with maximum eight and £3,750 + VAT with maximum ten. A £3,750 booking with eight actual attendees is an illustration, not a published maximum-eight tariff.</p>}
        <p className="micro">{source.url ? 'Accessed' : 'Recorded'}: {source.accessed}</p>{source.url && <a className="text-link" href={source.url} target="_blank" rel="noreferrer">Read original source <ArrowUpRight size={15} /><span className="sr-only"> (opens in a new tab)</span></a>}
      </div> : <div className="source-browser"><h2 id="source-title">Sources & assumptions</h2><p>Public statements, discovery notes and proposals are kept separate. “Verified” confirms what a source publishes, not an independent audit.</p><label className="source-search"><Search size={17} /><span className="sr-only">Search sources</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a source or assumption" /></label>
        <div className="filter-buttons" role="group" aria-label="Filter sources">{filters.map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <ul className="source-list">{visible.map(s => <li key={s.id}><button onClick={() => setSelected(s.id)}><span className="source-id">{s.id}</span><span><small>{s.category}</small><strong>{s.title}</strong></span><ChevronRight size={16} /></button></li>)}</ul>
        {visible.length === 0 && <p role="status">No matching sources. Try a different term or filter.</p>}
        <details className="disclosure"><summary>How to read the evidence</summary><div className="disclosure-body">
          <EvidenceTag kind="VERIFIED PUBLIC FACT" detail="Attributed public statements and research." />
          <EvidenceTag kind="DISCOVERY-CALL FACT" detail="Supplied conversation notes; estimates remain estimates." />
          <EvidenceTag kind="ILLUSTRATIVE CALCULATION" detail="Arithmetic from assumptions, not a forecast." />
          <EvidenceTag kind="PROPOSED CONCEPT" detail="Suggested experience or fictional example." />
          <EvidenceTag kind="INDICATIVE ESTIMATE" detail="Working costs and timelines; scope to agree." />
        </div></details><p className="micro">Public sources rechecked 26 September 2026. Current quotes, annual learner volumes and operating assumptions still need confirmation.</p>
      </div>}
    </dialog>
  </SourceContext.Provider>;
}
export function SourceButton({ id, children }: { id: string; children?: React.ReactNode }) {
  const show = useContext(SourceContext);
  return <button type="button" className="source-link" aria-haspopup="dialog" onClick={() => show(id)} aria-label={'View source: ' + (sources.find(s => s.id === id)?.title ?? id)}>{children ?? 'Source'}<BookOpen size={12} aria-hidden="true" /></button>;
}
export function SourcesButton({ className = '' }: { className?: string }) {
  const show = useContext(SourceContext);
  return <button type="button" className={'sources-button ' + className} aria-label="Sources & assumptions" aria-haspopup="dialog" onClick={() => show('all')}><BookOpen size={15} aria-hidden="true" /><span className="sources-full-label">Sources & assumptions</span><span className="sources-short-label" aria-hidden="true">Sources</span></button>;
}
