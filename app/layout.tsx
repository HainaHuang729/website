import type { Metadata } from 'next';
import { ArchiveHeader, ArchiveFooter } from '@/components/archive';
import { LanguageProvider } from '@/components/language';
import { getLanguage } from '@/lib/i18n-server';
import { translate } from '@/lib/i18n';
import './globals.css';
import { ResearchNetwork } from '@/components/research-network';
export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage();
  return {
    title: { default: translate(language, 'Haina Huang / Personal Archive'), template: language === 'zh' ? '%s — HH 个人档案' : '%s — HH Archive' },
    description: translate(language, 'Haina Huang’s research archive: computational cosmology, 21 cm signals, dark matter halos, and scientific visualisation.'),
    icons: { icon: '/archive-mark.svg' },
  };
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const language = await getLanguage();
  return <html lang={language === 'zh' ? 'zh-CN' : 'en'}><head><link rel="preload" href="/fonts/jost-latin-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body><LanguageProvider language={language}><a className="skip-link" href="#main">{translate(language, 'Skip to content')}</a><ResearchNetwork /><ArchiveHeader /><main id="main">{children}</main><ArchiveFooter /></LanguageProvider></body></html>;
}
