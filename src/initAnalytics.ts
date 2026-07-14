declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Load GA4 + Cloudflare Web Analytics on public pages only (external scripts — no CSP unsafe-inline). */
export function initAnalytics(): void {
  if (typeof window === 'undefined' || window.location.pathname.startsWith('/admin')) return;

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => { window.dataLayer!.push(args); };
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-5Z456FM1D5');

  const ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-5Z456FM1D5';
  document.head.appendChild(ga);

  const cf = document.createElement('script');
  cf.defer = true;
  cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  cf.setAttribute('data-cf-beacon', '{"token": "3af3a193f01e4198872efa35532a4ea1"}');
  document.head.appendChild(cf);
}

export function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
}