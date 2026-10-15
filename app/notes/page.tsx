import { getTranslator } from '@/lib/i18n-server';
import { PageIntro, NotesIndex } from '@/components/editorial';
export async function generateMetadata() { const t = await getTranslator(); return { title:t("Field Notes"), description:t("Observations, questions and unfinished ideas. Filter the notebook by year, category and tag.") }; }
export default async function NotesPage() { const t = await getTranslator(); return <div className="shell index-page"><PageIntro number="04" label={t("FIELD NOTES")} title={t("AN OPEN NOTEBOOK.")} description={t("Things noticed. Questions kept. Thoughts that may become something else.")}/><p className="sample-notice mono">{t("SAMPLE WRITING / DATES ARE DEMONSTRATION METADATA")}</p><NotesIndex/></div>; }
