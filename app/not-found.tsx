import { getTranslator } from '@/lib/i18n-server';
import { TextLink } from '@/components/archive';
export default async function NotFound() { const t = await getTranslator(); return <div className="shell index-page"><div className="page-intro"><p className="mono">{t("404 / ENTRY NOT FOUND")}</p><h1 className="display-title">{t("AN UNCHARTED PAGE.")}</h1><p>{t("This entry is not in the archive. Return to the index to continue exploring.")}</p><TextLink href="/">{t("RETURN TO INDEX")}</TextLink></div></div>; }
