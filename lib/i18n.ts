import chinese from '../data/zh.json';

export type Language = 'en' | 'zh';
export const languageCookie = 'archive-language';
export function resolveLanguage(value?: string): Language { return value === 'zh' ? 'zh' : 'en'; }
export function translate(language: Language, text: string): string {
  return language === 'zh' ? (chinese as Record<string, string>)[text] ?? text : text;
}
