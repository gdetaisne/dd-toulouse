'use client';
import { env } from '@/lib/env';
import { getCityDataFromUrl } from '@/lib/cityData';

export default function StructuredSiteGraph() {
  const city = getCityDataFromUrl(env.SITE_URL);
  const email = `contact@${new URL(city.siteUrl).hostname}`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${city.siteUrl}/#organization`, name: `Déménageurs ${city.nameCapitalized} (IA)`, url: city.siteUrl, logo: { '@type': 'ImageObject', url: `${city.siteUrl}/icons/android-chrome-512x512.png`, width: 512, height: 512 }, description: 'Comparateur de devis déménagement avec estimation IA par photos. Service gratuit, 5 devis personnalisés sous 7 jours.', sameAs: [], searchIntent: 'transactional', email },
      { '@type': 'LocalBusiness', '@id': `${city.siteUrl}/#localbusiness`, name: `Déménageurs ${city.nameCapitalized} (IA)`, description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.', url: city.siteUrl, email, address: { '@type': 'PostalAddress', addressLocality: city.nameCapitalized, addressRegion: city.region, addressCountry: 'FR' }, geo: { '@type': 'GeoCoordinates', latitude: city.coordinates.latitude, longitude: city.coordinates.longitude }, areaServed: city.areaServed.map((area) => ({ '@type': 'City', name: area })), priceRange: '€€' },
    ],
  } as const;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}


