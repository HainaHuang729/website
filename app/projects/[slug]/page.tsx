import { getTranslator } from '@/lib/i18n-server';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ReportPage } from '@/components/report';
export function generateStaticParams() { return projects.map(r=>({slug:r.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) { const t = await getTranslator(); const {slug}=await params; const r=projects.find(r=>r.slug===slug); return { title:t(r?.title??"Report not found"),description:r?t(r.description):undefined }; }
export default async function Page({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const i=projects.findIndex(r=>r.slug===slug); if(i<0)notFound(); return <ReportPage entry={projects[i]} next={projects[(i+1)%projects.length]}/>; }
