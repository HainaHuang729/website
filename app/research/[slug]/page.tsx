import { getTranslator } from '@/lib/i18n-server';
import { notFound } from 'next/navigation';
import { research } from '@/data/research';
import { ReportPage } from '@/components/report';
export function generateStaticParams() { return research.map(r=>({slug:r.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) { const t = await getTranslator(); const {slug}=await params; const r=research.find(r=>r.slug===slug); return { title:t(r?.title??"Report not found"),description:r?t(r.description):undefined }; }
export default async function Page({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const i=research.findIndex(r=>r.slug===slug); if(i<0)notFound(); return <ReportPage entry={research[i]} next={research[(i+1)%research.length]}/>; }
