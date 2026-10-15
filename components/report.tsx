import { getTranslator } from '@/lib/i18n-server';
import Link from 'next/link';
import type { Report } from '@/data/types';
import { SectionHeader, TextLink } from './archive';
import { ReportImage } from './editorial';

export async function ReportPage({ entry, next }: { entry: Report; next?: Report }) {
  const t = await getTranslator();
  const sections = [['Context', entry.context], ['Question', entry.question], ['Method', entry.method], ['System', entry.system], ['Results', entry.results], ['Visuals', ''], ['Reflection', entry.reflection], ['Links', '']];
  return <article className="shell report-page">
    <div className="report-breadcrumb mono"><Link href={entry.href.startsWith('/research') ? '/research' : '/projects'}>{t('← BACK TO INDEX')}</Link><span>{entry.id.replace('-', ' / ')}</span></div>
    <header className="report-heading"><div>
      <p className="mono">{t(entry.id.startsWith('RES') ? 'RESEARCH REPORT' : 'MISSION REPORT')}{entry.example && t(' / EXAMPLE ENTRY')}</p>
      <h1>{t(entry.title)}</h1><p className="report-subtitle">{t(entry.subtitle)}</p>
      {entry.links.length > 0 && <div className="report-actions">{entry.links.slice(0, 2).map(link => <TextLink key={link.href} href={link.href}>{t(link.label)}</TextLink>)}</div>}
    </div><dl className="report-metadata mono">{[['Type', entry.category], ['Status', entry.status], ['Year', entry.year], ['Tools', entry.tools], ['Role', entry.role]].map(([key, value]) => <div key={key}><dt>{t(key)}</dt><dd>{t(value)}</dd></div>)}</dl></header>
    <div className="report-main"><nav className="report-toc mono" aria-label={t('Report sections')}>{sections.map(([heading], i) => <a href={'#' + heading.toLowerCase()} key={heading}><span>{String(i + 1).padStart(2, '0')}</span>{t(heading)}</a>)}</nav>
      <div className="report-body">{sections.map(([heading, body], i) => <section className="report-section" id={heading.toLowerCase()} key={heading}>
        <SectionHeader number={String(i + 1).padStart(2, '0')} label={t(heading)} />
        {heading === 'Visuals' ? <figure><ReportImage entry={entry} /><figcaption className="figure-caption mono"><span>{t('FIG / ')}{entry.id}-01A</span><span>{t(entry.caption ?? 'ILLUSTRATIVE / NOT RESEARCH DATA')}</span></figcaption></figure>
          : heading === 'Links' ? entry.links.length ? <div className="report-links">{entry.links.map(link => <TextLink href={link.href} key={link.href}>{t(link.label)}</TextLink>)}</div> : <p className="muted">{t('A public project link has not been added yet.')}</p>
            : <p className={heading === 'Question' ? 'question-text' : ''}>{t(body)}</p>}
        {heading === 'Reflection' && <div className="report-next-step"><p className="mono">{t(entry.example ? 'PROPOSED NEXT EXPERIMENT' : 'PROJECT NOTES')}</p><p>{t(entry.nextStep)}</p></div>}
      </section>)}</div>
    </div>
    {next && <div className="next-report"><span className="mono muted">{t('NEXT IN THE ARCHIVE / ')}{next.id}</span><TextLink href={next.href}>{t(next.title)}</TextLink></div>}
  </article>;
}
