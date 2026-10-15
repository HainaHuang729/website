import type { Note } from './types';
export function filterNotes(entries: Note[], year: string, category: string, tag: string) {
  return entries.filter(n => (year === 'all' || n.date.startsWith(year)) && (category === 'all' || n.category === category) && (tag === 'all' || n.tags.includes(tag)));
}
export const notes: Note[] = [
  { id:'NOTE-023', slug:'attention-and-temporal-structure', title:'Attention and temporal structure', date:'2026-09-08', category:'Observation', tags:['Attention','Time'], description:'On the difference between recording time and noticing it.', paragraphs:[
    'A clock divides time into equal intervals. Attention rarely does. Some moments remain distinct; others dissolve into a continuous background.',
    'This suggests a small question for an observation log: should the entry record only what happened, or also what made it noticeable? A timestamp locates the moment. A sentence about attention may explain why it matters.',
    'An experiment to try: record three moments in a day without evaluating their importance. Revisit them a week later and note which details still carry information.',
  ] },
  { id:'NOTE-022', slug:'designing-for-open-questions', title:'Designing for open questions', date:'2026-09-01', category:'Design', tags:['Systems','Tools'], description:'An interface can leave room for uncertainty.', paragraphs:[
    'Many interfaces assume that the task is already known. But exploration begins before the question becomes precise.',
    'A tool for exploration might therefore need fewer commitments: a reversible step, a visible assumption, a place to compare two interpretations. Its purpose is not always to get to a single answer quickly.',
    'The design question is how to keep that openness without making the structure vague. One possibility is to separate observations from interpretations, while leaving a clear path between them.',
  ] },
  { id:'NOTE-021', slug:'signal-noise-and-expectation', title:'Signal, noise, and expectation', date:'2026-08-24', category:'Research', tags:['Physics','Methods'], description:'What changes when the expected pattern is removed?', paragraphs:[
    'A pattern becomes easier to notice once we know what we are looking for. That same expectation can make a weak pattern seem more convincing than it is.',
    'A useful first check is to state the expected result before inspecting the output. A second is to ask which alternative explanation would produce something similar.',
    'The note to keep beside the result: what would have changed my interpretation?',
  ] },
  { id:'NOTE-020', slug:'the-value-of-a-small-model', title:'The value of a small model', date:'2026-08-12', category:'Research', tags:['Systems','Methods'], description:'A model small enough to understand in full.', paragraphs:[
    'A small model can be useful because all of its assumptions fit within attention. It offers a place to distinguish a numerical mistake from a conceptual one.',
    'Start with the simplest behaviour worth explaining. Add complexity only when the simpler model fails in an identifiable way.',
    'This is a proposed working habit rather than a universal rule. Some phenomena depend on interactions that cannot be removed without losing the question itself.',
  ] },
  { id:'NOTE-019', slug:'keeping-the-unfinished', title:'Keeping the unfinished', date:'2025-12-17', category:'Observation', tags:['Writing','Tools'], description:'An archive needs a place for fragments.', paragraphs:[
    'A finished piece explains its own boundaries. A fragment often cannot. It needs a little context to remain understandable later.',
    'A date, a source when there is one, and a sentence about the question may be enough. The goal is to preserve the conditions of the thought without turning every note into a report.',
    'Leave an open edge: what could be tried next?',
  ] },
];
