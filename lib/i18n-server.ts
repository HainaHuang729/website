import { cookies } from 'next/headers';
import { languageCookie, resolveLanguage, translate } from './i18n';

export async function getLanguage() {
  return resolveLanguage((await cookies()).get(languageCookie)?.value);
}
export async function getTranslator() {
  const language = await getLanguage();
  return (text: string) => translate(language, text);
}
