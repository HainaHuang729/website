'use client';
import { useLanguage } from '@/components/language';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SectionHeader, TextLink } from './archive';
import { research } from '@/data/research';
import { projects } from '@/data/projects';
import { notes, filterNotes } from '@/data/notes';
import { visuals, type Visual } from '@/data/visuals';
import { site } from '@/data/site';
import type { Report, Note } from '@/data/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { attachReveals } from '@/lib/reveal';

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (element) return attachReveals(element);
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Diagram({ type = 'phase', className = '' }: { type?: Report['figure']; className?: string }) { const { t } = useLanguage();
  if (type === 'shuttle') return <div className="diagram atlas-workflow shuttle-workflow">
    <p className="mono">{t('CAMPUS SHUTTLE / PRODUCT STRUCTURE')}</p>
    <dl className="shuttle-coverage"><div><dt>{t('Routes')}</dt><dd>14</dd></div><div><dt>{t('Stops')}</dt><dd>30</dd></div></dl>
    <ol>{[
      ['Find a route', 'Campus places, stops, and timetables'],
      ['Plan a journey', 'Route options and estimated arrival times'],
      ['Keep the day connected', 'Ride records, academic calendar, and class schedules'],
    ].map(([title, description], i) => <li key={title}><span className="mono">0{i + 1}</span><div><h4>{t(title)}</h4><p>{t(description)}</p></div></li>)}</ol>
    <p className="mono">{t('CODEX-ASSISTED / FIELD-TESTED PROTOTYPE')}</p>
  </div>;
  if (type === 'atlas') return <div className="diagram atlas-workflow">
    <p className="mono">{t('21cmFAST / ANALYSIS WORKFLOW')}</p>
    <ol>{[
      ['Initial conditions', 'Primordial power spectrum + astrophysical parameters'],
      ['Precomputed simulations', '21cmFAST · stored fields and histories'],
      ['Observable predictions', '21 cm signal · reionization · UV luminosity functions'],
    ].map(([title, description], i) => <li key={title}><span className="mono">0{i + 1}</span><div><h4>{t(title)}</h4><p>{t(description)}</p></div></li>)}</ol>
    <p className="mono">{t('MODEL INPUTS → SIMULATIONS → COMPARISONS')}</p>
  </div>;
  const phasePath = Array.from({length:361},(_,i) => { const t=i/18, r=158*Math.exp(-t*.065); return `${i ? 'L':'M'}${(360+r*Math.cos(t)).toFixed(2)},${(215-r*(-.065*Math.cos(t)-Math.sin(t))).toFixed(2)}`; }).join(' ');
  const curve = (center: number) => Array.from({length:481},(_,i) => `${i?'L':'M'}${120+i},${(315-200*Math.exp(-(((i-center)/45)**2))).toFixed(2)}`).join(' ');
  return <div className={`diagram diagram-${type} ${className}`}><div className="diagram-top mono"><span>{t(type === 'phase' ? 'PHASE SPACE / DAMPED OSCILLATOR' : type === 'spectrum' ? 'LINE PROFILE / WAVELENGTH SHIFT' : 'OBSERVATION / ITERATION')}</span><span>{t("ILLUSTRATIVE")}</span></div>
    <svg viewBox="0 0 720 440" role="img" aria-label={t(type === 'phase' ? 'Illustrative damped spiral in position and velocity coordinates.' : type === 'spectrum' ? 'Two illustrative Gaussian peaks at different wavelengths.' : 'A conceptual cycle from observation to reflection.')}>
      {type === 'system' ? <g fill="none" stroke="currentColor" strokeWidth="1"><path className="diagram-trace" pathLength="1" d="M130 220H590M240 220V115H480V220M480 220V325H240V220" opacity=".3" />{[{x:130,y:220,t:'OBSERVE'},{x:360,y:115,t:'QUESTION'},{x:590,y:220,t:'EXPERIMENT'},{x:360,y:325,t:'REFLECT'}].map(p=><g key={p.t}><circle cx={p.x} cy={p.y} r="42" fill="var(--diagram-bg)" /><text x={p.x} y={p.y+4} stroke="none" fill="currentColor" textAnchor="middle" fontSize="10" fontFamily="monospace">{t(p.t)}</text></g>)}<path d="m474 211 6 9 6-9" stroke="var(--orange)" /></g> : <>
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".16">{[120,240,360,480,600].map(x=><path key={x} d={`M${x} 70V365`}/>)}{[115,215,315].map(y=><path key={y} d={`M90 ${y}H630`}/>)}<path d="M90 365H630M90 365V65" /></g>
      {type === 'spectrum' ? <g fill="none" strokeWidth="1.7"><path className="diagram-trace" pathLength="1" d={curve(150)} stroke="currentColor" opacity=".55"/><path className="diagram-trace trace-secondary" pathLength="1" d={curve(315)} stroke="var(--orange)"/><path d="M286 89H410m-8-5 8 5-8 5" stroke="currentColor" opacity=".6" /></g> : <g fill="none"><circle cx="360" cy="215" r="160" stroke="currentColor" opacity=".1"/><path className="diagram-trace" pathLength="1" d={phasePath} stroke="currentColor" strokeWidth="1.2"/><circle cx="518" cy="225.27" r="4" fill="var(--orange)"/><circle cx="360" cy="215" r="3" fill="var(--orange)"/></g>}
      <g fill="currentColor" fontSize="10" fontFamily="monospace"><text x={type === 'phase' ? 369 : 94} y={type === 'phase' ? 231 : 390}>0</text><text x="580" y="390">{t(type === 'spectrum' ? 'λ / a.u.' : 'x / a.u.')}</text><text x="90" y="50">{t(type === 'spectrum' ? 'INTENSITY / a.u.' : 'v / a.u.')}</text></g></>}
    </svg><div className="diagram-bottom mono"><span>{t(type === 'phase' ? 'x(t) = e⁻ᵞᵗ cos(t)' : type === 'spectrum' ? 'SYNTHETIC PROFILES / NO OBSERVATIONAL DATA' : 'A QUESTION IS A PLACE TO BEGIN.')}</span><span>+</span></div>
    <div className="diagram-spec mono">{(type === 'phase' ? ['γ / 0.065', 't / 0–20', 'NORMALISED MODEL'] : type === 'spectrum' ? ['GAUSSIAN PROFILES', 'FIXED WIDTH', 'ARBITRARY UNITS'] : ['OBSERVATION', 'EXPERIMENT', 'REFLECTION']).map(label=><span key={label}>{t(label)}</span>)}</div></div>;
}

export function ReportImage({ entry }: { entry: Report }) { const { t } = useLanguage();
  return entry.image ? <img className="report-image research-image" src={entry.image} alt={t(entry.alt)} loading="lazy" width="3989" height="4009" /> : <Diagram type={entry.figure} />;
}

export function ResearchList() { const { t } = useLanguage();
  const [active,setActive]=useState(0);
  return <div className="research-layout"><div className="research-list">{research.map((r,i)=><Link href={r.href} key={r.id} className="research-entry" onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)}><div className="entry-top mono"><span>{r.id.replace('-', ' / ')}</span><span>{t(r.status)} / {r.year}</span></div><h3>{t(r.title)}<span aria-hidden="true">↗</span></h3><p>{t(r.description)}</p><div className="entry-bottom mono"><span>{t(r.category)}</span><span>{t("VIEW REPORT →")}</span></div><div className="mobile-preview" data-reveal><ReportImage entry={r}/></div></Link>)}</div><div className="research-preview" data-reveal aria-hidden="true">{research.map((r,i)=><div key={r.id} className={`preview-layer ${active===i?'active':''}`}><ReportImage entry={r}/><p className="mono">{r.id.replace('-',' / ')}{' / '}{t(r.image ? 'SIMULATION RESULTS' : 'ANALYSIS WORKFLOW')}</p></div>)}</div></div>;
}

export function ResearchSection() { const { t } = useLanguage(); return <Reveal><section className="section shell research-section"><SectionHeader number="02" label={t("SELECTED RESEARCH")} meta={`${t("ENTRIES")} / 0${research.length}`} /><div className="section-title-row"><h2 className="display-title">{t("SELECTED")}<br />{t("RESEARCH")}<span className="accent-period">.</span></h2><p>{t("Questions at the intersection")}<br />{t("of physical and computational systems.")}</p></div><ResearchList/><div className="section-end"><span className="mono muted">{t("RESEARCH / CODE / METHODS")}</span><TextLink href="/research">{t("RESEARCH INDEX")}</TextLink></div></section></Reveal>; }

export function ProjectList() { const { t } = useLanguage();
  return <div className="project-list">{projects.map((p,i)=><article key={p.id} className={`project-entry ${i%2?'reverse':''}`}>
    <div className="project-copy"><span className="mono">{p.id.replace('-',' / ')}<span className="project-index">0{i+1}</span></span><h3><Link href={p.href}>{t(p.title)}</Link></h3><p>{t(p.description)}</p>
      <dl className="project-meta mono"><div><dt>{t("TYPE")}</dt><dd>{t(p.category)}</dd></div><div><dt>{t("STATUS")}</dt><dd>{t(p.status)}</dd></div><div><dt>{t("PERIOD")}</dt><dd>{p.year}</dd></div><div><dt>{t("TOOLS")}</dt><dd>{t(p.tools)}</dd></div></dl><TextLink href={p.href}>{t("EXPLORE PROJECT")}</TextLink>
    </div>
    <Link href={p.href} className="project-figure" data-reveal aria-label={`${t("View")} ${t(p.title)}`}><ReportImage entry={p}/><div className="figure-caption mono"><span>{t("FIG / 0")}{i+1} — {t(p.caption ?? 'ANALYSIS WORKFLOW')}</span><span>{t(p.status)}</span></div></Link>
    <div className="project-working-notes"><div><p className="mono">{t("MY CONTRIBUTION")}</p><p>{t(p.role)}</p></div><div><p className="mono">{t("PROJECT OUTCOME")}</p><p>{t(p.results)}</p></div></div>
  </article>)}</div>;
}
export function ProjectsSection() { const { t } = useLanguage(); return <Reveal><section className="section shell projects-section"><SectionHeader number="03" label={t("SELECTED PROJECTS")} meta={t("IDEAS → EXPERIMENTS")}/><div className="section-title-row"><h2 className="display-title">{t("MAKING")}<br />{t("IDEAS TANGIBLE.")}</h2><p>{t("Tools for research")}<br />{t("and everyday campus life.")}</p></div><ProjectList/><div className="section-end"><span className="mono muted">{t("WORKING TOOLS / PROTOTYPES")}</span><TextLink href="/projects">{t("PROJECT INDEX")}</TextLink></div></section></Reveal>; }

export function NoteList({ entries, descriptions=false }: { entries: Note[]; descriptions?: boolean }) { const { t } = useLanguage(); return <div className="note-list">{entries.map(n=><Link key={n.id} href={`/notes/${n.slug}`} className="note-entry"><time className="mono" dateTime={n.date}>{n.date.replaceAll('-','.')}</time><span className="mono note-id">{n.id.replace('-',' / ')}</span><div><h3>{t(n.title)}</h3>{descriptions && <p>{t(n.description)}</p>}</div><span className="note-arrow" aria-hidden="true">↗</span></Link>)}</div>; }
export function NotesSection() { const { t } = useLanguage(); return <Reveal><section className="section shell notes-section"><SectionHeader number="04" label={t("FIELD NOTES")} meta={t("THOUGHTS / OBSERVATIONS / FRAGMENTS")}/><div className="notes-intro"><h2 className="display-title">{t("THINGS I AM")}<br />{t("STILL TRYING")}<br />{t("TO UNDERSTAND.")}</h2><div><span className="large-asterisk" aria-hidden="true">✳</span><p>{t("Not everything needs")}<br />{t("to be a finished thought.")}</p></div></div><NoteList entries={notes.slice(0,3)}/><div className="section-end"><span className="mono muted">{t("SAMPLE NOTES / AN OPEN NOTEBOOK")}</span><TextLink href="/notes">{t("VIEW ALL NOTES")}</TextLink></div></section></Reveal>; }

export function VisualFigure({ visual }: { visual: Visual }) { const { t } = useLanguage(); return <figure className={`visual-figure ${visual.orientation}`} data-reveal>{visual.image ? <img src={visual.image} alt={t(visual.alt)} width={visual.orientation==='portrait'?700:1000} height={visual.orientation==='portrait'?900:650} loading="lazy" /> : <div className="image-placeholder" role="img" aria-label={t(visual.alt)}><span className="placeholder-index mono">{visual.id.replace('-',' / ')}</span><div className="placeholder-center"><span className="placeholder-cross" aria-hidden="true">+</span><span className="mono">{t("IMAGE TO BE ADDED")}</span></div><span className="placeholder-type mono">{t(visual.type)}{t(" / RESERVED")}</span></div>}<figcaption><span className="mono">{visual.id.replace('-',' / ')}</span><div><p>{t(visual.title)}</p><span className="mono muted">{t(visual.type)}{visual.location && ` / ${t(visual.location)}`}{visual.date && ` / ${visual.date}`}</span></div></figcaption></figure>; }
export function VisualGrid({ full=false }: { full?: boolean }) { return <div className="visual-grid">{visuals.slice(0, full ? undefined : 2).map(v=><VisualFigure key={v.id} visual={v}/>)}</div>; }
export function VisualSection() { const { t } = useLanguage(); return <Reveal><section className="section shell visuals-section"><SectionHeader number="05" label={t("VISUAL ARCHIVE")} meta={t("A DIFFERENT WAY OF LOOKING")}/><div className="visual-heading"><h2 className="display-title">{t("COLLECTED")}<br />{t("OBSERVATIONS.")}</h2><p>{t("Light, places, forms.")}<br />{t("A record beyond words.")}</p></div><VisualGrid/><div className="section-end"><span className="mono muted">{t("PHOTOGRAPHS & SKETCHES / AWAITING IMAGES")}</span><TextLink href="/visuals">{t("VISUAL INDEX")}</TextLink></div></section></Reveal>; }
export function ProfileSection() { const { t } = useLanguage();
  return <div className="archive-closing"><Reveal><section className="section shell profile-section" aria-labelledby="closing-title">
    <SectionHeader number="06" label={t("ABOUT THIS ARCHIVE")} meta={t("A PERSON / MANY THREADS")}/>
    <div className="closing-space" data-reveal aria-hidden="true"><svg viewBox="0 0 700 400"><path className="closing-trace" pathLength="1" d="M-50 368C140 362 210 245 365 185S585 149 700 40" fill="none" stroke="currentColor" strokeWidth="1"/><circle cx="365" cy="185" r="3" fill="var(--orange)"/><path d="M351 185h28M365 171v28" fill="none" stroke="currentColor" strokeWidth=".8" opacity=".4"/></svg></div>
    <div className="closing-grid"><div className="closing-identity" data-reveal><span className="mono">{site.initials}{t(" / INDEPENDENT EXPLORATION")}</span><div className="archive-ribbon closing-ribbon" aria-hidden="true"><span/><span/><span/></div></div>
      <div className="closing-copy" data-reveal><h2 id="closing-title">{site.closing.title.map(line=><span key={line}>{t(line)}</span>)}</h2><p>{t(site.closing.text)}</p><p className="closing-note">{t(site.closing.note)}</p><div className="profile-bottom"><span className="mono">{t("HAINA HUANG / ASTROPHYSICS")}</span><TextLink href="/profile">{t("THE PERSON BEHIND THE ARCHIVE")}</TextLink></div></div>
    </div>
  </section></Reveal></div>;
}

export function PageIntro({ number, label, title, description }: { number:string; label:string; title:string; description:string }) { const { t } = useLanguage(); return <div className="page-intro"><SectionHeader number={number} label={t(label)} meta={t("HH / PERSONAL ARCHIVE")}/><h1 className="display-title">{t(title)}</h1><p>{t(description)}</p></div>; }

export function NotesIndex() { const { t } = useLanguage();
  const [year,setYear]=useState('all'),[category,setCategory]=useState('all'),[tag,setTag]=useState('all');
  const filtered=filterNotes(notes,year,category,tag);
  const filters=[{label:'Year',value:year,set:setYear,options:[...new Set(notes.map(n=>n.date.slice(0,4)))]},{label:'Category',value:category,set:setCategory,options:[...new Set(notes.map(n=>n.category))]},{label:'Tag',value:tag,set:setTag,options:[...new Set(notes.flatMap(n=>n.tags))].sort()}];
  return <><div className="note-filters">{filters.map(f=><div className="filter-field" key={f.label}><label className="mono" id={`label-${f.label}`}>{t(f.label)}</label><Select value={f.value} onValueChange={value=>f.set(value ?? 'all')} items={[{value:'all',label:t(`All ${f.label === 'Category' ? 'categories' : f.label.toLowerCase() + 's'}`)},...f.options.map(o=>({value:o,label:t(o)}))]}><SelectTrigger aria-labelledby={`label-${f.label}`} className="archive-select"><SelectValue/></SelectTrigger><SelectContent className="archive-options"><SelectItem value="all">{t(`All ${f.label === 'Category' ? 'categories' : f.label.toLowerCase() + 's'}`)}</SelectItem>{f.options.map(o=><SelectItem key={o} value={o}>{t(o)}</SelectItem>)}</SelectContent></Select></div>)}<button className="filter-reset mono" onClick={()=>{setYear('all');setCategory('all');setTag('all');}} disabled={year==='all'&&category==='all'&&tag==='all'}>{t("RESET ↺")}</button></div><p className="filter-count mono muted" role="status">{String(filtered.length).padStart(2,'0')} / {String(notes.length).padStart(2,'0')}{t(" NOTES")}</p>{filtered.length ? <NoteList entries={filtered} descriptions/> : <div className="empty-notes"><h2>{t("No notes in this intersection.")}</h2><p>{t("Try another category, year or tag, or reset the filters to see every note.")}</p><button className="text-link mono" onClick={()=>{setYear('all');setCategory('all');setTag('all');}}>{t("RESET FILTERS ")}<span>→</span></button></div>}</>;
}
