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
    // Intent transactionnel (homepages / pages money)
    // Wording aligné avec LEADGEN-01 : 5+ devis fiables, pros contrôlés, 0 spam
    defaultTitle =
      customTitle ||
      `Déménagement à ${city.nameCapitalized} | 5+ devis fiables | Pros contrôlés`;
    templateTitle = customTemplate || `%s | Déménageurs ${city.nameCapitalized}`;
    defaultDescription =
      customDescription ||
      `Recevez 5+ devis de déménageurs contrôlés à ${city.nameCapitalized}, comparables entre eux et sans spam. Plateforme indépendante, 100% gratuit.`;
  } else {
    // Wording par défaut (autres pages)
    // Focalisé sur 5+ devis fiables, sans IA ni promesse floue
    defaultTitle =
      customTitle ||
      `Devis déménagement ${city.nameCapitalized} gratuits — 5+ devis fiables`;
    templateTitle = customTemplate || `%s | Déménagement ${city.nameCapitalized}`;
    defaultDescription =
      customDescription ||
      `Décrivez votre déménagement à ${city.nameCapitalized} et recevez 5+ devis fiables sans appels indésirables. Déménageurs contrôlés, service 100% gratuit.`;
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

