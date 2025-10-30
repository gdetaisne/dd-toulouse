import type { WithContext, BreadcrumbList } from 'schema-dts';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem' as const,
    position: index + 1,
    name: item.label,
    item: item.href,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

