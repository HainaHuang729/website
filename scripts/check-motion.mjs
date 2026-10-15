import assert from 'node:assert/strict';
import { attachReveals } from '../lib/reveal.ts';

// A tiny DOM boundary exercises visibility and lifecycle without a browser dependency.
function fixture({ reduced = false, observerAvailable = true, top = 1200, figureHidden = false } = {}) {
  const listeners = new Map();
  const preference = {
    matches: reduced,
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: name => listeners.delete(name),
  };
  const element = (y, hidden = false) => ({
    dataset: {}, children: [],
    getBoundingClientRect: () => ({ top: hidden ? 0 : y, width: hidden ? 0 : 200, height: hidden ? 0 : 100 }),
    contains(target) { return this === target || this.children.some(child => child.contains(target)); },
  });
  const root = element(0);
  const heading = element(top);
  const figure = element(top + 800, figureHidden);
  const link = element(top + 800);
  figure.children.push(link);
  root.children.push(heading, figure);
  root.querySelector = () => heading;
  root.querySelectorAll = () => [figure];
  const rootListeners = new Map();
  root.addEventListener = (name, fn) => rootListeners.set(name, fn);
  root.removeEventListener = name => rootListeners.delete(name);
  let observer;
  class FakeObserver {
    observed = new Set();
    disconnected = false;
    constructor(callback) { this.callback = callback; observer = this; }
    observe(target) { this.observed.add(target); }
    unobserve(target) { this.observed.delete(target); }
    disconnect() { this.disconnected = true; this.observed.clear(); }
    enter(target) { this.callback([{ target, isIntersecting: true }]); }
  }
  globalThis.window = { innerHeight: 900, matchMedia: () => preference };
  if (observerAvailable) window.IntersectionObserver = FakeObserver;
  globalThis.IntersectionObserver = FakeObserver;
  const cleanup = attachReveals(root);
  return {
    root, heading, figure, link, observer, cleanup, listeners, rootListeners,
    focus(target) { rootListeners.get('focusin')?.({ target }); },
    reduce(value) { preference.matches = value; listeners.get('change')?.(); },
  };
}

{
  const f = fixture();
  assert.equal(f.root.dataset.entered, 'false');
  assert.equal(f.figure.dataset.entered, 'false');
  assert.ok(f.observer.observed.has(f.heading), 'The small heading is observed, not a tall section.');
  assert.ok(!f.observer.observed.has(f.root));
  f.observer.enter(f.heading);
  assert.equal(f.root.dataset.entered, 'true');
  assert.equal(f.figure.dataset.entered, 'false', 'A later figure must wait for its own intersection.');
  assert.ok(!f.observer.observed.has(f.heading), 'Reveals run once.');
  f.observer.enter(f.figure);
  assert.equal(f.figure.dataset.entered, 'true');
  f.cleanup();
  assert.equal(f.root.dataset.entered, undefined);
  assert.equal(f.figure.dataset.entered, undefined);
  assert.equal(f.listeners.size + f.rootListeners.size, 0, 'Unmount removes event listeners.');
  assert.equal(f.observer.disconnected, true);
}
{
  const f = fixture();
  f.focus(f.link);
  assert.equal(f.root.dataset.entered, 'true', 'Keyboard focus reveals the section heading.');
  assert.equal(f.figure.dataset.entered, 'true', 'Keyboard focus reveals its figure immediately.');
  assert.equal(f.observer.observed.size, 0);
  f.cleanup();
}
{
  const f = fixture();
  f.reduce(true);
  assert.equal(f.root.dataset.entered, 'true');
  assert.equal(f.figure.dataset.entered, 'true');
  assert.equal(f.observer.disconnected, true);
  f.reduce(false);
  assert.equal(f.figure.dataset.entered, 'true', 'Changing back must never hide revealed content.');
  f.cleanup();
}
{
  const f = fixture({ top: -500 });
  assert.equal(f.root.dataset.entered, 'true', 'Deep links preserve preceding content.');
  assert.equal(f.figure.dataset.entered, 'true', 'Already visible figures need no observer callback.');
  f.cleanup();
}
{
  const f = fixture({ top: -1000, figureHidden: true });
  assert.equal(f.figure.dataset.entered, 'false', 'A hidden responsive preview must not consume its reveal.');
  assert.ok(f.observer.observed.has(f.figure));
  f.observer.enter(f.figure);
  assert.equal(f.figure.dataset.entered, 'true', 'It reveals when visible after a layout change.');
  f.cleanup();
}
for (const options of [{ reduced: true }, { observerAvailable: false }]) {
  const f = fixture(options);
  assert.equal(f.root.dataset.entered, undefined, 'Fallback leaves server-rendered content visible.');
  assert.equal(f.figure.dataset.entered, undefined);
  assert.equal(f.observer, undefined);
  assert.equal(f.listeners.size + f.rootListeners.size, 0);
  f.cleanup();
}
delete globalThis.window;
delete globalThis.IntersectionObserver;
console.log('PASS: independent reveals, keyboard focus, live reduced motion, deep links, responsive previews, fallback, cleanup.');
