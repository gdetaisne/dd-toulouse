'use client';

import { env } from '@/lib/env';
import { getCityDataFromUrl } from '@/lib/cityData';

export default function StructuredData() {
  // Résoudre les données de ville dynamiquement
  const city = getCityDataFromUrl(env.SITE_URL);
  
  // Graph avec Organization (logo SERP) + LocalBusiness (données locales)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${city.siteUrl}/#organization`,
        "name": `Déménageurs ${city.nameCapitalized} (IA)`,
        "url": city.siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${city.siteUrl}/og-image.jpg`,
          "width": 1200,
          "height": 630
        },
        "description": "Comparateur de devis déménagement avec estimation IA par photos. Service gratuit, 5 devis personnalisés sous 7 jours.",
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "@id": `${city.siteUrl}/#localbusiness`,
        "name": `Déménageurs ${city.nameCapitalized} (IA)`,
        "description": "30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.",
        "url": city.siteUrl,
        "telephone": city.phone,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": city.nameCapitalized,
          "addressRegion": city.region,
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": city.coordinates.latitude,
          "longitude": city.coordinates.longitude
        },
        "areaServed": city.areaServed.map(area => ({
          "@type": "City",
          "name": area
        })),
        "priceRange": "€€",
        "openingHours": "Mo-Fr 09:00-18:00",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1200",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
