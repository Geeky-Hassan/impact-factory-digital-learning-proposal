'use client';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function TabBar({ id, label, items, value, onChange, className = '' }: {
  id: string; label: string; items: { value: string; label: string; detail?: string; price?: string }[];
  value: string; onChange: (value: string) => void; className?: string;
}) {
  return <div className={'tab-bar ' + className} role="tablist" aria-label={label}>
    {items.map((item, index) => <button key={item.value} id={id + '-' + item.value}
      role="tab" type="button" aria-selected={value === item.value} aria-controls={id + '-panel'}
      tabIndex={value === item.value ? 0 : -1}
      onClick={() => onChange(item.value)}
      onKeyDown={event => {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % items.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = items.length - 1;
        else return;
        event.preventDefault();
        onChange(items[next].value);
        document.getElementById(id + '-' + items[next].value)?.focus();
      }}><span>{item.label}</span>{item.price && <strong className="option-price">{item.price}</strong>}{item.detail && <small>{item.detail}</small>}</button>)}
  </div>;
}

export function Segmented({ options, value, onChange, label }: { options: string[]; value: string; onChange: (value: string) => void; label: string }) {
  return <div className="segmented" role="group" aria-label={label}>{options.map(option =>
    <button type="button" key={option} aria-pressed={value === option} onClick={() => onChange(option)}>{option}</button>
  )}</div>;
}

export function PageIntro({ number, label, title, children }: { number: string; label: string; title: string; children: ReactNode }) {
  return <header className="page-intro"><div className="eyebrow"><span className="page-number">{number}</span>{label}</div><h1>{title}</h1><p>{children}</p></header>;
}

export function Disclosure({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return <details className={'disclosure ' + className}><summary>{title}<ChevronDown size={17} aria-hidden="true" /></summary><div className="disclosure-body">{children}</div></details>;
}

export function SmallArrow() { return <ArrowRight size={17} aria-hidden="true" />; }

export function Select({ children, ...props }: ComponentPropsWithoutRef<'select'>) {
  return <div className="select-control"><select {...props}>{children}</select><ChevronDown size={17} aria-hidden="true" /></div>;
}
