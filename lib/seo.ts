import type { DefaultSeoProps } from 'next-seo';
import { env } from '@/lib/env';
import { getCityDataFromUrl } from '@/lib/cityData';

// Résoudre les données de ville dynamiquement
const city = getCityDataFromUrl(env.SITE_URL);

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: `%s | Déménageurs ${city.nameCapitalized}`,
  defaultTitle: `Déménageurs ${city.nameCapitalized} - 5 devis sous 7 jours`,
  description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
  canonical: env.SITE_URL,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: env.SITE_URL,
    siteName: `Déménageurs ${city.nameCapitalized}`,
    images: [
      {
        url: `${env.SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `Déménageurs ${city.nameCapitalized} - Devis IA`,
      },
    ],
  },
  twitter: {
    handle: `@demenageurs${city.slug}`,
    site: `@demenageurs${city.slug}`,
    cardType: 'summary_large_image',
  },
};
