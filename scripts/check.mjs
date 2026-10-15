import assert from 'node:assert/strict';
import { notes, filterNotes } from '../data/notes.ts';
import { research } from '../data/research.ts';
import { projects } from '../data/projects.ts';

assert.equal(filterNotes(notes, 'all', 'all', 'all').length, notes.length);
assert.deepEqual(filterNotes(notes, '2025', 'Observation', 'Writing').map(n => n.id), ['NOTE-019']);
assert.equal(filterNotes(notes, '2025', 'Research', 'Physics').length, 0);
assert.deepEqual(filterNotes(notes, '2026', 'Research', 'Methods').map(n => n.id), ['NOTE-021', 'NOTE-020']);
for (const entries of [research, projects, notes]) {
  assert.equal(new Set(entries.map(e => e.id)).size, entries.length, 'Duplicate archive IDs');
  assert.equal(new Set(entries.map(e => e.slug)).size, entries.length, 'Duplicate slugs');
}
for (const entry of [...research, ...projects]) {
  for (const key of ['context', 'question', 'method', 'system', 'results', 'reflection', 'nextStep']) assert.ok(entry[key], `${entry.id}: missing ${key}`);
}
const base = process.argv[2] || 'http://localhost:3000';
const routes = new Set(['/', '/profile', '/research', '/projects', '/notes', '/visuals', '/contact', ...research.map(r => r.href), ...projects.map(p => p.href), ...notes.map(n => `/notes/${n.slug}`)]);
const links = new Set();
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `${route}: failed request`);
  const html = await response.text();
  assert.match(html, /<h1[\s>]/, `${route}: missing primary heading`);
  assert.match(html, /<title>[^<]+<\/title>/, `${route}: missing title`);
  assert.ok(!html.includes('Untitled site'), `${route}: starter metadata`);
  if (route === '/') {
    assert.match(html, /class="archive-closing"/, 'Home is missing its closing section');
    assert.match(html, /class="archive-footer shell closing-footer"/, 'Home footer should continue the closing theme');
    assert.match(html, /class="archive-ribbon"/, 'The requested ribbon must remain on the homepage');
  } else {
    assert.ok(!html.includes('class="archive-footer shell closing-footer"'), 'Closing footer should only appear on the homepage');
  }
  const report = [...research, ...projects].find(entry => entry.href === route);
  if (report) {
    assert.ok(html.includes(report.nextStep), `${route}: proposed next experiment missing from report`);
  }
  for (const [,href] of html.matchAll(/<a\b[^>]*href="(\/[^"?#]*)"/g)) links.add(href.replace(/\/$/, '') || '/');
}
for (const link of links) assert.ok(routes.has(link), `Unresolved internal link: ${link}`);
const missing = await fetch(new URL('/research/missing-entry', base));
assert.equal(missing.status, 404, 'Unknown report must return 404');
for (const file of ['jost-latin-variable.woff2', 'ibm-plex-mono-latin-400.woff2']) {
  const font = await fetch(new URL(`/fonts/${file}`, base));
  assert.equal(font.status, 200, `${file}: font asset unavailable`);
  const bytes = new Uint8Array(await font.arrayBuffer());
  assert.equal(String.fromCharCode(...bytes.slice(0,4)), 'wOF2', `${file}: invalid WOFF2 response`);
}
console.log(`Passed: ${routes.size} routes, internal links, report next steps, homepage closing, local fonts, unique IDs and note filters.`);
