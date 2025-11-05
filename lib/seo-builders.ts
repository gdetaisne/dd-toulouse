import type { Metadata } from 'next';
import { env } from '@/lib/env';
import { getCityDataFromUrl } from '@/lib/cityData';
import { getCityData, type CityData } from '@/lib/cities-data';

type SeoIntent = 'default';

interface SiteMetadataOptions {
  /** Intent SEO (défaut: 'default') */
  intent?: SeoIntent;
  /** Override du title par défaut (optionnel, pour layouts ville spécifiques) */
  customTitle?: string;
  /** Override de la description (optionnel) */
  customDescription?: string;
  /** Override du template de title (optionnel) */
  customTemplate?: string;
  /** Flag page money (landing conversion) → permettra intent-first dynamique futur */
  isMoneyPage?: boolean;
}

export function buildSiteMetadata(options: SiteMetadataOptions = {}): Metadata {
  const { intent = 'default', customTitle, customDescription, customTemplate, isMoneyPage = false } = options;
  const city = getCityDataFromUrl(env.SITE_URL);
  const cityData = getCityData(city.slug);

  // Wording intent-first selon type de page
  let defaultTitle: string;
  let templateTitle: string;
  let defaultDescription: string;

  if (isMoneyPage) {
    // Intent Transactionnel (Homepages, services, quartiers)
    // Pain point: Devis incomparables, process long (appels/RDV)
    // USP: Cahier des charges standardisé, sélection minutieuse, 100% en ligne
    // Optimisé CTR: 50-60 car + bénéfice clair + chiffre
    defaultTitle = customTitle || `Déménagement ${city.nameCapitalized} : 5 Devis en 7j | 2025`;
    templateTitle = customTemplate || `%s | Déménageurs ${city.nameCapitalized}`;
    defaultDescription =
      customDescription ||
      `Comparez 5 devis de déménageurs ${city.nameCapitalized} en 7 jours. Cahier des charges en ligne, sélection rigoureuse, 100% gratuit. Économisez jusqu'à 40% sur votre déménagement.`;
  } else {
    // Wording par défaut (racine, autres pages)
    // Optimisé CTR: 50-60 car + formule claire
    defaultTitle = customTitle || `Déménagement ${city.nameCapitalized} : 5 Devis Gratuits`;
    templateTitle = customTemplate || `%s | Déménagement ${city.nameCapitalized}`;
    defaultDescription =
      customDescription ||
      `5 devis de déménageurs ${city.nameCapitalized} en 7 jours. Estimation par photos en 30 min, 100% gratuit. Économisez jusqu'à 40% avec des professionnels sélectionnés.`;
  }

  return {
    title: {
      default: defaultTitle,
      template: templateTitle,
    },
    description: defaultDescription,
    metadataBase: new URL(city.siteUrl),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: city.siteUrl,
      siteName: `Comparateur Déménagement ${city.nameCapitalized}`,
      title: defaultTitle,
      description: defaultDescription,
      images: [
        {
          url: `${city.siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `Comparateur Déménagement ${city.nameCapitalized} - 5 Devis Gratuits`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDescription,
      images: [`${city.siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: city.siteUrl.endsWith('/') ? city.siteUrl : `${city.siteUrl}/`,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/icons/apple-touch-icon.png',
    },
  } satisfies Metadata;
}

