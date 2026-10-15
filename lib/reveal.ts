/** Observe section headers and major figures independently so long sections never delay a reveal. */
export function attachReveals(root: HTMLElement) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return () => {};

  const heading = root.querySelector<HTMLElement>('.section-kicker') ?? root;
  const targets = new Map<HTMLElement, HTMLElement>([[heading, root]]);
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => targets.set(element, element));
  const styled = [...targets.values()];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) reveal(entry.target as HTMLElement);
  }, { threshold: 0, rootMargin: '0px 0px -48px 0px' });

  function reveal(target: HTMLElement) {
    const element = targets.get(target);
    if (!element) return;
    element.dataset.entered = 'true';
    observer.unobserve(target);
    targets.delete(target);
  }

  for (const [target, element] of targets) {
    const rect = target.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight - 48) reveal(target);
    else { element.dataset.entered = 'false'; observer.observe(target); }
  }
  const onFocus = (event: FocusEvent) => {
    for (const [target, element] of targets) {
      if (event.target && element.contains(event.target as Node)) reveal(target);
    }
  };
  const onPreference = () => {
    if (preference.matches) { for (const target of targets.keys()) reveal(target); observer.disconnect(); }
  };
  root.addEventListener('focusin', onFocus);
  preference.addEventListener('change', onPreference);
  return () => {
    observer.disconnect();
    root.removeEventListener('focusin', onFocus);
    preference.removeEventListener('change', onPreference);
    styled.forEach(element => { delete element.dataset.entered; });
  };
}
