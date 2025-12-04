export const GA_ID: string = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

export function getSite(): string {
  if (process.env.NEXT_PUBLIC_SITE) return process.env.NEXT_PUBLIC_SITE;
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const firstLabel = hostname.split('.')[0] || 'unknown';
    return firstLabel.toLowerCase();
  }
  return 'unknown';
}

export function hasGA(): boolean {
  return typeof window !== 'undefined' && !!(window as any).gtag && !!GA_ID;
}

export function pageview(url: string): void {
  if (!hasGA()) return;
  (window as any).gtag('event', 'page_view', {
    page_location: url,
    site: getSite(),
  });
}

export function event(name: string, params: Record<string, unknown> = {}): void {
  if (!hasGA()) return;
  (window as any).gtag('event', name, { ...params, site: getSite() });
}





