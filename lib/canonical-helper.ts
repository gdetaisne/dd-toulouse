/**
 * Helper centralisé pour la génération des URLs canoniques
 * 
 * Règles :
 * - Toujours ajouter un slash final
 * - Utiliser le domaine défini dans cityData.ts
 * - Une seule source de vérité
 */

import { env } from '@/lib/env';
import { getCityDataFromUrl } from '@/lib/cityData';

/**
 * Génère une URL canonique avec slash final
 * 
 * @param path - Chemin relatif (ex: 'partenaires', 'blog/prix/article')
 * @returns URL canonique complète avec slash final
 * 
 * @example
 * getCanonicalUrl() 
 * // → "https://devis-demenageur-nice.fr/"
 * 
 * getCanonicalUrl('partenaires')
 * // → "https://devis-demenageur-nice.fr/partenaires/"
 * 
 * getCanonicalUrl('/blog/prix/article')
 * // → "https://devis-demenageur-nice.fr/blog/prix/article/"
 */
export function getCanonicalUrl(path: string = ''): string {
  const city = getCityDataFromUrl(env.SITE_URL);
  
  // S'assurer que siteUrl a un slash final
  const baseUrl = city.siteUrl.endsWith('/') 
    ? city.siteUrl 
    : `${city.siteUrl}/`;
  
  // Si pas de path, retourner la homepage
  if (!path) {
    return baseUrl;
  }
  
  // Nettoyer le path
  let cleanPath = path.trim();
  
  // Retirer le slash initial si présent
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }
  
  // Retirer le slash final si présent (on le rajoutera)
  if (cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  // Construire l'URL finale avec slash final
  return `${baseUrl}${cleanPath}/`;
}

/**
 * Génère les métadonnées alternates avec canonical
 * 
 * @param path - Chemin relatif
 * @returns Objet alternates pour Next.js metadata
 * 
 * @example
 * export const metadata: Metadata = {
 *   title: "Ma Page",
 *   ...getCanonicalAlternates('partenaires'),
 * }
 */
export function getCanonicalAlternates(path: string = '') {
  return {
    alternates: {
      canonical: getCanonicalUrl(path),
    },
  };
}

/**
 * Génère les métadonnées Open Graph avec URL
 * 
 * @param path - Chemin relatif
 * @param title - Titre de la page
 * @param description - Description de la page
 * @returns Objet openGraph pour Next.js metadata
 */
export function getOpenGraphMetadata(
  path: string,
  title: string,
  description: string
) {
  const url = getCanonicalUrl(path);
  const city = getCityDataFromUrl(env.SITE_URL);
  
  return {
    openGraph: {
      title,
      description,
      url,
      type: 'website' as const,
      locale: 'fr_FR',
      siteName: `Comparateur Déménagement ${city.nameCapitalized}`,
      images: [
        {
          url: `${city.siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

/**
 * Génère les métadonnées complètes (canonical + OG)
 * 
 * @param path - Chemin relatif
 * @param title - Titre de la page
 * @param description - Description de la page
 * @returns Objet metadata complet
 * 
 * @example
 * export const metadata = getFullMetadata(
 *   'partenaires',
 *   'Nos Partenaires',
 *   'Découvrez nos partenaires déménageurs...'
 * );
 */
export function getFullMetadata(
  path: string,
  title: string,
  description: string
) {
  return {
    title,
    description,
    ...getCanonicalAlternates(path),
    ...getOpenGraphMetadata(path, title, description),
  };
}

