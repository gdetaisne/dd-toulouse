'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, event as gaEvent } from '@/lib/ga4';

export default function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    pageview(url);

    if (pathname.includes('/devis-gratuits')) {
      gaEvent('inventory_ia_view');
    }
  }, [pathname, searchParams]);

  return null;
}





