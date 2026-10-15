import { ResearchGateway } from '@/components/research-network';
import { Hero, Current } from '@/components/archive';
import { Reveal, ResearchSection, ProjectsSection, NotesSection, VisualSection, ProfileSection } from '@/components/editorial';
export default function Home() { return <div className="home-page"><Hero /><Reveal><Current /></Reveal><ResearchGateway /><ResearchSection /><ProjectsSection /><NotesSection /><VisualSection /><ProfileSection /></div>; }
