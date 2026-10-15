export type Report = {
  id: string; slug: string; title: string; subtitle: string; year: string; status: string;
  category: string; description: string; tags: string[]; image: string; alt: string;
  figure: 'spectrum' | 'phase' | 'system' | 'orbit' | 'atlas' | 'shuttle'; caption?: string; example?: boolean; href: string; tools: string; role: string;
  context: string; question: string; method: string; system: string; results: string;
  reflection: string; nextStep: string; links: { label: string; href: string }[];
};
export type Note = { id: string; slug: string; title: string; date: string; category: string; tags: string[]; description: string; paragraphs: string[] };
