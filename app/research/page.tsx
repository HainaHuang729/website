import { ResearchGateway } from '@/components/research-network';
import { getTranslator } from '@/lib/i18n-server';
import { PageIntro, ResearchList } from '@/components/editorial';
export async function generateMetadata() { const t = await getTranslator(); return { title:t("Research"), description:t("Questions at the intersection of physical and computational systems.") }; }
export default async function ResearchPage() { const t = await getTranslator(); return <div className="shell index-page"><PageIntro number="02" label={t("RESEARCH INDEX")} title={t("FOLLOWING THE QUESTION.")} description={t("From primordial fluctuations to cosmic structures: research on 21 cm signals, reionization, and dark matter halo formation.")}/><p className="sample-notice mono">{t("SIMULATIONS / INTERACTIVE ATLAS / MANUSCRIPT")}</p><ResearchGateway compact/><ResearchList/></div>; }
