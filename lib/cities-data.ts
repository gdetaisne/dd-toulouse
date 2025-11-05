/**
 * Données réelles par ville (extraites des layouts existants)
 * Source unique pour prix/promesses SEO
 * 
 * RÈGLE: Ne pas inventer de données.
 * Reprendre uniquement les mentions existantes dans layouts/contenus.
 */

export interface CityData {
  slug: string;
  name: string;
  /** Prix "dès XXX€" mentionné dans layout actuel */
  priceFrom?: string;
  /** Département */
  department?: string;
  /** Fourchettes prix par type logement (source: LocalPage templates) */
  priceRanges?: {
    studioT1: string;
    t2t3: string;
    maison: string;
  };
}

/**
 * Données par ville (source: layouts existants par ville)
 * Dernière mise à jour: 30 octobre 2025
 */
export const CITIES_DATA: Record<string, CityData> = {
  nice: {
    slug: 'nice',
    name: 'Nice',
    priceFrom: '299€',
    department: 'Alpes-Maritimes',
    priceRanges: {
      studioT1: '300-500€',
      t2t3: '500-800€',
      maison: '800-1500€',
    },
  },
  lyon: {
    slug: 'lyon',
    name: 'Lyon',
    priceFrom: '295€',
    department: 'Rhône',
    priceRanges: {
      studioT1: '300-500€',
      t2t3: '500-800€',
      maison: '800-1500€',
    },
  },
  lille: {
    slug: 'lille',
    name: 'Lille',
    priceFrom: '275€',
    department: 'Nord',
    priceRanges: {
      studioT1: '300-500€',
      t2t3: '500-800€',
      maison: '800-1500€',
    },
  },
  bordeaux: {
    slug: 'bordeaux',
    name: 'Bordeaux',
    priceFrom: '290€',
    department: 'Gironde',
    priceRanges: {
      studioT1: '300-500€',
      t2t3: '500-800€',
      maison: '800-1500€',
    },
  },
  rennes: {
    slug: 'rennes',
    name: 'Rennes',
    priceFrom: '280€',
    department: 'Ille-et-Vilaine',
  },
  marseille: {
    slug: 'marseille',
    name: 'Marseille',
    priceFrom: '299€',
    department: 'Bouches-du-Rhône',
    priceRanges: {
      studioT1: '300-500€',
      t2t3: '500-800€',
      maison: '800-1500€',
    },
  },
  toulouse: {
    slug: 'toulouse',
    name: 'Toulouse',
    priceFrom: '285€',
    department: 'Haute-Garonne',
  },
  nantes: {
    slug: 'nantes',
    name: 'Nantes',
    priceFrom: '299€',
    department: 'Loire-Atlantique',
  },
  strasbourg: {
    slug: 'strasbourg',
    name: 'Strasbourg',
    priceFrom: '290€',
    department: 'Bas-Rhin',
  },
  montpellier: {
    slug: 'montpellier',
    name: 'Montpellier',
    priceFrom: '295€',
    department: 'Hérault',
  },
  rouen: {
    slug: 'rouen',
    name: 'Rouen',
    priceFrom: '280€',
    department: 'Seine-Maritime',
  },
};

/**
 * Helper: récupérer données ville par slug
 */
export function getCityData(slug: string): CityData | undefined {
  return CITIES_DATA[slug.toLowerCase()];
}

