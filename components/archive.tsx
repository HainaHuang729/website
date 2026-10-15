'use client';
import { useLanguage, LanguageSwitch } from '@/components/language';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation, site } from '@/data/site';

export function ArchiveHeader() { const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { const scroll = () => setCompact(window.scrollY > 60); scroll(); window.addEventListener('scroll', scroll, { passive: true }); return () => window.removeEventListener('scroll', scroll); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  return <header className={`archive-header ${compact ? 'compact' : ''}`} onKeyDown={e => { if(e.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } }}>
    <Link href="/" className="brand" aria-label={t("HH Personal Archive home")}><span className="brand-symbol" aria-hidden="true">H<span>H</span></span><span>{t("PERSONAL")}<br />{t("ARCHIVE")}</span></Link>
    <nav className="desktop-nav" aria-label={t("Main navigation")}>{navigation.map(n => <Link key={n.href} href={n.href} aria-current={(n.href === '/' ? pathname === '/' : pathname.startsWith(n.href)) ? 'page' : undefined}><span>{n.number}</span> {t(n.title)}</Link>)}</nav>
    <div className="header-actions"><LanguageSwitch/><Link href="/contact" className="header-info">{t("INFO")}<span>↗</span></Link>
    <button ref={menuButton} className="index-toggle" aria-expanded={open} aria-controls="mobile-index" onClick={() => setOpen(!open)}>{t("INDEX")}<span>{open ? '−' : '+'}</span></button></div>
    <nav id="mobile-index" className="mobile-nav" hidden={!open} aria-label={t("Mobile navigation")}>{[...navigation, { number: '06', title: 'Contact', href: '/contact' }].map(n => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={pathname === n.href ? 'page' : undefined}><span>{n.number}</span>{t(n.title)}<span>↗</span></Link>)}</nav>
  </header>;
}
export function TextLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) { const { t } = useLanguage();
  return <Link className={`text-link mono ${className}`} href={href}>{typeof children === 'string' ? t(children) : children}<span aria-hidden="true">↗</span></Link>;
}
export function Hero() { const { t, language } = useLanguage();
  const lines = language === 'zh' ? [site.hero[0], site.hero[1], 'IN THE UNKNOWN.'] : site.hero;
  return <section className="hero shell" aria-labelledby="hero-title">
    <div className="archive-ribbon" aria-hidden="true"><span /><span /><span /></div>
    <div className="hero-top mono"><span>{t("INDEPENDENT EXPLORATION RECORD")}</span><span className="hero-state"><i className="status-dot" />{t("ARCHIVE / ACTIVE")}<span>{t("REV / ")}{site.revision}</span></span></div>
    <div className="hero-body"><h1 id="hero-title">{lines.map((line,i) => <span key={line} style={{ animationDelay: `${240 + i * 100}ms` }}>{t(line)}</span>)}</h1>
      <div className="orbit-field" aria-hidden="true"><svg viewBox="0 0 720 720"><g fill="none" stroke="currentColor" strokeWidth="1"><circle className="orbit-stroke" pathLength="1" cx="360" cy="360" r="286" /><ellipse className="orbit-stroke orbit-ellipse" pathLength="1" cx="360" cy="360" rx="286" ry="88" transform="rotate(-35 360 360)" /><path d="M360 28V692M28 360H692" /><circle cx="360" cy="360" r="7" /><path d="M350 74h20M350 646h20M74 350v20M646 350v20" /></g></svg><span className="orbit-label mono">{t("OBSERVATION → UNDERSTANDING")}</span></div>
      <div className="hero-aside mono"><span>{t("OBSERVE / BUILD / REVISE")}</span><p>{t(site.heroNote)}</p><span className="tiny-cross" aria-hidden="true">+</span></div>
    </div>
    <div className="hero-bottom"><p className="mono disciplines">{site.disciplines.map((d,i) => <span key={d}>{i > 0 && <b aria-hidden="true">·</b>}{t(d)}</span>)}</p><a href="#current" className="scroll-link mono">{t("SCROLL / EXPLORE ")}<span aria-hidden="true">↓</span></a></div>
    <div className="hero-foot mono"><span>{t("00 / INDEX")}</span><span>{t("DIFFERENT EXPLORATIONS. THE SAME PERSON.")}</span><span>{t("AN ONGOING RECORD")}</span></div>
  </section>;
}
export function SectionHeader({ number, label, meta }: { number: string; label: string; meta?: string }) { const { t } = useLanguage();
  return <div className="section-kicker mono"><span><b>{number}</b> / {t(label)}</span>{meta && <span>{t(meta)}</span>}</div>;
}
export function Current() { const { t } = useLanguage();
  return <section id="current" className="shell current section"><SectionHeader number="01" label={t("CURRENT EXPLORATION")} meta={t("IN PROGRESS / ALWAYS")} /><div className="current-grid"><h2>{t("On the")}<br />{t("workbench.")}</h2><div className="current-list">{site.current.map((c,i) => <Link href={i === 0 ? '/research/21cmfast-parameter-atlas' : i === 1 ? '/research/small-scale-power-halo-formation' : '/research'} key={c}><span className="mono">0{i+1}</span><span>{t(c)}</span><span aria-hidden="true">↗</span></Link>)}</div><div className="current-status"><span className="mono"><i className="status-dot" />{t(" WORKING METHOD")}</span><p>{t(site.workingNote)}</p><span className="mono muted">{t("COSMOLOGY / RESEARCH IN PROGRESS")}</span></div></div></section>;
}
export function ArchiveFooter() { const { t } = useLanguage();
  const isHome = usePathname() === '/';
  return <footer className={`archive-footer shell ${isHome ? 'closing-footer' : ''}`}><div className="footer-top mono"><span>{site.initials}{t(" / PERSONAL ARCHIVE")}</span><span>{t("06 / CONTACT")}</span></div><div className="footer-main"><p>{t("There is always")}<br />{t("more to understand.")}</p><TextLink href="/contact">{t("GET IN TOUCH")}</TextLink></div><div className="footer-bottom mono"><span>© 2026 {site.initials}{t(" — AN ONGOING EXPLORATION")}</span><span>{t("LAST UPDATE / ")}{site.revision}</span><a href="#main">{t("BACK TO TOP ↑")}</a></div></footer>;
}
