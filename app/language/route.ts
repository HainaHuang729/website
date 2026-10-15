// A normal link and redirect also work when JavaScript is disabled.
export function GET(request: Request) {
  const url = new URL(request.url);
  const language = url.searchParams.get('lang') === 'zh' ? 'zh' : 'en';
  let destination = new URL('/', url);
  try {
    const candidate = new URL(url.searchParams.get('returnTo') || '/', url);
    if (candidate.origin === url.origin && candidate.pathname !== '/language') destination = candidate;
  } catch { /* Invalid destinations return to the archive index. */ }
  return new Response(null, { status: 303, headers: {
    Location: destination.pathname + destination.search + destination.hash,
    'Set-Cookie': `archive-language=${language}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly${url.protocol === 'https:' ? '; Secure' : ''}`,
    'Cache-Control': 'no-store',
  } });
}
