'use client';
import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { translate, type Language } from '@/lib/i18n';

const LanguageContext = createContext<Language>('en');
export function LanguageProvider({ language, children }: { language: Language; children: React.ReactNode }) {
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const language = useContext(LanguageContext);
  return { language, t: (text: string) => translate(language, text) };
}
export function LanguageSwitch() {
  const { language, t } = useLanguage();
  const pathname = usePathname();
  return <nav className="language-switch" aria-label={t('Language')}>
    {(['zh', 'en'] as const).map(option => <a
      key={option}
      href={`/language?lang=${option}&returnTo=${encodeURIComponent(pathname)}`}
      lang={option === 'zh' ? 'zh-CN' : 'en'}
      aria-current={language === option ? 'true' : undefined}
      aria-label={option === 'zh' ? '切换为中文' : 'Switch to English'}
      onClick={event => {
        // Preserve an article anchor or query when JavaScript is available.
        const destination = new URL(event.currentTarget.href);
        destination.searchParams.set('returnTo', window.location.pathname + window.location.search + window.location.hash);
        event.currentTarget.href = destination.href;
      }}
    >{option === 'zh' ? '中文' : 'EN'}</a>)}
  </nav>;
}
