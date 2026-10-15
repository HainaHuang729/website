import { getTranslator } from '@/lib/i18n-server';
import { PageIntro, VisualGrid } from '@/components/editorial';
export async function generateMetadata() { const t = await getTranslator(); return { title:t("Visual Archive"), description:t("A place for photography, field images, sketches and visual experiments.") }; }
export default async function VisualsPage() { const t = await getTranslator(); return <div className="shell index-page"><PageIntro number="05" label={t("VISUAL ARCHIVE")} title={t("A WAY OF LOOKING.")} description={t("An image can hold a question that words have not yet found. A place for field observations, photographs and sketches.")}/><p className="sample-notice mono">{t("RESERVED FIGURES / ORIGINAL IMAGES HAVE NOT YET BEEN ADDED")}</p><VisualGrid full/></div>; }
