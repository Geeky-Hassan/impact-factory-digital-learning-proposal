'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Menu, X } from 'lucide-react';
import { SourcesButton } from './sources';

export const pages = [
  { href: '/', label: 'Overview', number: '01', next: 'See the learner journey' },
  { href: '/learner-journey/', label: 'Learner journey', number: '02', next: 'View the learning platform' },
  { href: '/connected-platform/', label: 'Learning platform', number: '03', next: 'Explore the business case' },
  { href: '/business-case/', label: 'Business case', number: '04', next: 'Review the pilot proposal' },
  { href: '/next-steps/', label: 'Pilot proposal', number: '05', next: '' },
];
export function Navigation() {
  const pathname = usePathname();
  const current = pathname.replace(/\/$/, '') || '/';
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return <header className="site-header" onKeyDown={event => {
    if (event.key === 'Escape' && open) { setOpen(false); trigger.current?.focus(); }
  }}>
    <div className="nav-top container">
      <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Impact Factory and MyPath proposal overview">
        <span>Impact Factory<span className="brand-dot">.</span></span><span className="brand-cross">×</span><span className="brand-partner">MyPath</span>
      </Link>
      <span className="nav-context">A working proposal<span>September 2026</span></span>
      <SourcesButton className="nav-sources" />
      <button ref={trigger} className="icon-button menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}<span>{open ? 'Close' : 'Menu'}</span></button>
    </div>
    <nav className="desktop-nav container" aria-label="Proposal pages">{pages.map(p => <Link key={p.href} href={p.href} aria-current={(p.href.replace(/\/$/, '') || '/') === current ? 'page' : undefined}><span>{p.number}</span>{p.label}</Link>)}</nav>
    {open && <nav className="mobile-navigation container" id="mobile-navigation" aria-label="Mobile navigation">{pages.map(p => <Link key={p.href} href={p.href} aria-current={(p.href.replace(/\/$/, '') || '/') === current ? 'page' : undefined} onClick={() => setOpen(false)}><span>{p.number}</span>{p.label}<ArrowRight size={16} /></Link>)}</nav>}
  </header>;
}

export function PageNavigation() {
  const pathname = usePathname();
  const current = pages.findIndex(p => (p.href.replace(/\/$/, '') || '/') === (pathname.replace(/\/$/, '') || '/'));
  if (current < 0) return null;
  const previous = pages[current - 1];
  const next = pages[current + 1];
  return <nav className="page-navigation container" aria-label="Continue through proposal">
    {previous ? <Link className="previous-page" href={previous.href}><ArrowLeft size={17} /><span>{previous.label}</span></Link> : <span className="page-count">01 / 05</span>}
    {next ? <Link className="next-page" href={next.href}><span><small>Next · {next.number} / 05</small>{pages[current].next}</span><ArrowRight size={21} /></Link> : <Link className="next-page" href="/"><span><small>Back to</small>The overview</span><ArrowRight size={21} /></Link>}
  </nav>;
}

export function Footer() {
  return <><PageNavigation /><footer className="site-footer container"><p>Following conversations with Abigail Brooks-Daw and Taylor.</p><SourcesButton /><span>For discussion · September 2026</span></footer></>;
}
