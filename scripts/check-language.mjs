import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { research } from '../data/research.ts';
import { projects } from '../data/projects.ts';
import { notes } from '../data/notes.ts';

const base = process.argv[2] || 'http://localhost:3000';
const zh = JSON.parse(await readFile(new URL('../data/zh.json', import.meta.url), 'utf8'));
const routes = ['/', '/profile', '/research', '/projects', '/notes', '/visuals', '/contact',
  ...research.map(r => r.href), ...projects.map(r => r.href), ...notes.map(n => '/notes/' + n.slug)];
const pageTitles = {
  '/profile': 'ONE PERSON. MANY THREADS.', '/research': 'FOLLOWING THE QUESTION.',
  '/projects': 'IDEAS, PUT TO WORK.', '/notes': 'AN OPEN NOTEBOOK.',
  '/visuals': 'A WAY OF LOOKING.', '/contact': 'KEEP THE CONVERSATION OPEN.',
};
const text = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '');
for (const report of [...research, ...projects]) {
  for (const field of ['title','subtitle','description','category','status','alt','tools','role',
    'context','question','method','system','results','reflection','nextStep']) {
    assert.ok(zh[report[field]], `Missing Chinese ${report.id} / ${field}`);
  }
}
for (const note of notes) for (const sentence of [note.title,note.description,note.category,...note.tags,...note.paragraphs]) {
  assert.ok(zh[sentence], 'Missing note translation: ' + sentence);
}

for (const language of ['zh', 'en']) {
  const change = await fetch(new URL('/language?lang=' + language + '&returnTo=%2Fnotes%3Fyear%3D2026%23main', base), { redirect:'manual' });
  assert.equal(change.status, 303);
  assert.equal(change.headers.get('location'), '/notes?year=2026#main', 'Switch preserves path, query and anchor.');
  const cookie = change.headers.get('set-cookie');
  assert.ok(cookie.startsWith('archive-language=' + language + ';'));
  assert.match(cookie, /Max-Age=31536000/);
  assert.match(cookie, /HttpOnly/);
  assert.equal(change.headers.get('cache-control'), 'no-store');
  const headers = { Cookie: cookie.split(';')[0] };
  for (const route of routes) {
    const response = await fetch(new URL(route,base), { headers });
    assert.equal(response.status, 200, language + ' ' + route);
    const html = await response.text();
    assert.ok(html.includes(`<html lang="${language === 'zh' ? 'zh-CN' : 'en'}"`), route + ': document language');
    assert.match(html, /class="language-switch"/, route + ': language navigation');
    assert.match(html, /returnTo=/, route + ': switch retains current page');
    const visible = text(html);
    const report = [...research,...projects].find(r=>r.href===route);
    const note = notes.find(n=>'/notes/'+n.slug===route);
    const expected = pageTitles[route] || report?.title || note?.title;
    const heading = text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] || '');
    if (expected) assert.equal(heading, language==='zh'?zh[expected]:expected, route + ': translated heading');
    if (language === 'zh') {
      assert.ok(html.includes('HH 个人档案') || html.includes('HH / 个人档案'), route + ': translated metadata');
      if (report) {
        for (const key of ['context','question','method','system','results','reflection','nextStep']) assert.ok(visible.includes(zh[report[key]]), route + ': ' + key);
        for (const id of ['context','question','method','system','results','visuals','reflection','links']) assert.ok(html.includes(`id="${id}"`), 'Stable report anchor: ' + id);
      }
      if (note) for (const p of note.paragraphs) assert.ok(visible.includes(zh[p]), route + ': paragraph');
      if (route === '/notes') for (const label of ['全部年份','全部分类','全部标签']) assert.ok(visible.includes(label), 'Translated filter: ' + label);
    }
  }
  const missing = await fetch(new URL('/research/unknown-language-test', base), { headers });
  assert.equal(missing.status,404);
  assert.ok(text(await missing.text()).includes(language === 'zh' ? zh['AN UNCHARTED PAGE.'] : 'AN UNCHARTED PAGE.'));
}
for (const destination of ['https://example.com/','//example.com/','\\\\example.com/path','/language?lang=zh']) {
  const response = await fetch(new URL('/language?lang=zh&returnTo='+encodeURIComponent(destination),base), { redirect:'manual' });
  assert.equal(response.headers.get('location'), '/', 'Reject external redirect or redirect loop.');
}
const invalid = await fetch(new URL('/language?lang=invalid',base), { redirect:'manual' });
assert.ok(invalid.headers.get('set-cookie').startsWith('archive-language=en;'));
const defaultPage = await fetch(base);
assert.match(await defaultPage.text(), /<html lang="en"/, 'A previous Chinese request cannot affect another visitor.');
console.log(`PASS: ${routes.length} pages in both languages, translated reports/notes/metadata/filters, stable anchors, persistent cookie and safe redirects.`);
