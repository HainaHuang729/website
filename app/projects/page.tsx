import { getTranslator } from '@/lib/i18n-server';
import { PageIntro, ProjectList } from '@/components/editorial';
export async function generateMetadata() { const t = await getTranslator(); return { title:t("Projects"), description:t("Tools for scientific exploration and campus travel.") }; }
export default async function ProjectsPage() { const t = await getTranslator(); return <div className="shell index-page"><PageIntro number="03" label={t("PROJECT INDEX")} title={t("IDEAS, PUT TO WORK.")} description={t("A campus shuttle mini-program and an interactive simulation atlas. Tools built around practical questions, usable information, and careful validation.")}/><p className="sample-notice mono">{t("PRODUCT WORK / SCIENTIFIC TOOLS")}</p><ProjectList/></div>; }
