import type { WithContext, Service, PostalAddress } from 'schema-dts';

export interface ServiceInput {
  name: string;
  serviceType: string;
  url: string;
  telephone?: string;
  areaServed?: string[];
  priceRange?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

export function buildServiceSchema(input: ServiceInput): WithContext<Service> {
  const address: PostalAddress | undefined = input.address
    ? {
        '@type': 'PostalAddress',
        streetAddress: input.address.streetAddress,
        addressLocality: input.address.addressLocality,
        postalCode: input.address.postalCode,
        addressCountry: input.address.addressCountry,
      }
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    serviceType: input.serviceType,
    url: input.url,
    telephone: input.telephone,
    areaServed: input.areaServed,
    priceRange: input.priceRange,
    provider: address
      ? {
          '@type': 'LocalBusiness',
          address,
        }
      : undefined,
  };
}

