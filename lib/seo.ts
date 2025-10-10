import type { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Déménageurs toulouse',
  defaultTitle: 'Déménageurs toulouse - 5 devis sous 7 jours',
  description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
  canonical: 'https://www.toulouse-demenageur.fr',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.toulouse-demenageur.fr',
    siteName: 'Déménageurs toulouse',
    images: [
      {
        url: 'https://www.toulouse-demenageur.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Déménageurs toulouse - Devis IA',
      },
    ],
  },
  twitter: {
    handle: '@demenageurstoulouse',
    site: '@demenageurstoulouse',
    cardType: 'summary_large_image',
  },
};
