'use client';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
const links = [['The opportunity', '#what-we-heard'], ['The journey', '#journey'], ['The business case', '#business-case'], ['A first step', '#pilot']];
export function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="nav-inner"><a href="#overview" className="wordmark" aria-label="Impact Factory proposal, back to top">Impact Factory<span className="wordmark-dot">.</span></a><span className="nav-divider" /><span className="proposal-label">A working proposal</span><nav className="desktop-nav" aria-label="Main navigation">{links.map(([text,href]) => <a key={href} href={href}>{text}</a>)}</nav><a className="nav-source" href="#sources">Sources <ArrowUpRight size={14} /></a><button className="menu-button icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>{open && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">{[...links,['Sources & assumptions','#sources']].map(([text,href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{text}<ArrowUpRight size={15} /></a>)}</nav>}</header>;
}
