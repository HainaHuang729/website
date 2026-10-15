'use client';
import { useLanguage } from '@/components/language';
import links from '@/data/site-network.json';

export function ResearchNetwork() {
  const { language } = useLanguage();
  const zh = language === 'zh';
  return <nav className="research-network" aria-label={zh ? '研究站点导航' : 'Research websites'}>
    <span className="network-label">Haina Huang</span>
    <div className="network-links">{links.map(link => <a key={link.id} href={link.id === 'personal' ? '/' : link.url} aria-current={link.id === 'personal' ? 'location' : undefined}>
      {zh ? link.zh : link.en}{link.private && link.id !== 'personal' && <small className="access-note">{zh ? '需登录' : 'Sign-in'}</small>}
    </a>)}</div>
  </nav>;
}

export function ResearchGateway({ compact = false }: { compact?: boolean }) {
  const { language } = useLanguage();
  const zh = language === 'zh';
  return <section className={`research-gateway${compact ? '' : ' shell'}`} aria-label={zh ? '研究网站入口' : 'Research website directory'}>
    <h2>{zh ? '从这里进入我的研究' : 'Explore my research'}</h2>
    <p>{zh ? '先读研究档案了解主线，再打开项目网站查看图表、参数和验证。宇宙演化图提供领域背景。' : 'Start with the research archive, then explore the project websites for figures, parameters and validation. The cosmic history map provides the broader context.'}</p>
    <div className="gateway-links">{links.filter(link => link.id !== 'personal').map(link => <a key={link.id} href={link.url}>
      <strong>{zh ? link.zh : link.en}</strong><small>{link.private ? (zh ? '需要登录' : 'Sign-in required') : (zh ? '公开网页' : 'Public website')}</small>
      <p>{zh ? link.descriptionZh : link.description}</p>
    </a>)}</div>
  </section>;
}
