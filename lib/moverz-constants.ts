/**
 * MOVERZ CONSTANTS - Source Unique de Vérité
 * 
 * Centralisation de TOUS les chiffres business Moverz.
 * Modifier ici = Changement propagé partout automatiquement.
 * 
 * ⚠️ IMPORTANT : Ces valeurs sont issues de l'existant (audit 19/11/2025).
 * Phase 2 future : Valider avec données réelles marché.
 * 
 * Créé : 19/11/2025
 * Dernière mise à jour : 19/11/2025
 */

// ============================================================================
// 1. VOLUMES & RATIOS (m² → m³)
// ============================================================================

/**
 * Ratios de conversion surface habitable → volume mobilier
 * 
 * Formule : Volume (m³) = Surface (m²) × Ratio
 * 
 * ⚠️ INCOHÉRENCE CONNUE (audit) :
 * - Ratios actuels semblent sous-estimer volume réel
 * - Ex: T2 45m² × 0.35 = 15.75m³ (calcul) vs 35-40m³ (blogs/réalité)
 * - Hypothèse : Ratios = mobilier minimal, blogs = mobilier complet
 * - À valider Phase 2 avec données réelles
 */
const VOLUME_RATIOS = {
  studio: 0.30, // Studio/T1 : 18-25m² → ~6-8m³
  t1: 0.30,     // Identique studio
  t2: 0.35,     // T2 : 30-40m² → ~11-14m³
  t3: 0.35,     // T3 : 40-50m² → ~14-18m³
  t4: 0.40,     // T4 : 55-70m² → ~22-28m³
  t5: 0.40,     // T5 : 70-90m² → ~28-36m³
  house: 0.45,  // Maison : 90-150m² → ~40-68m³
} as const;

/**
 * Coefficients d'ajustement selon densité mobilier
 */
const DENSITY_COEFFICIENTS = {
  light: 0.90,   // Sobre/Minimaliste : -10% volume
  normal: 1.00,  // Mobilier standard : baseline
  dense: 1.10,   // Bien meublé : +10% volume
} as const;

/**
 * Volumes moyens observés par type de logement (m³)
 * Source : Moyenne blogs + retours partenaires
 * 
 * Note : Ces valeurs correspondent à du mobilier complet standard.
 * Utilisées pour estimation rapide et communication client.
 */
const VOLUMES_MOYENS = {
  studio: { min: 15, max: 20, typical: 18 },
  t1: { min: 15, max: 20, typical: 18 },
  t2: { min: 30, max: 40, typical: 35 },
  t3: { min: 45, max: 55, typical: 50 },
  t4: { min: 60, max: 80, typical: 70 },
  t5: { min: 80, max: 100, typical: 90 },
  house: { min: 100, max: 150, typical: 120 },
} as const;

// ============================================================================
// 2. SURFACES LOGEMENTS (m²)
// ============================================================================

/**
 * Surfaces habitable moyennes par type de logement (m²)
 * Source : Standards marché immobilier français
 */
const SURFACES_LOGEMENTS = {
  studio: { min: 18, max: 25, typical: 20 },
  t1: { min: 18, max: 25, typical: 22 },
  t2: { min: 30, max: 40, typical: 35 },
  t3: { min: 40, max: 50, typical: 45 },
  t4: { min: 55, max: 70, typical: 62 },
  t5: { min: 70, max: 90, typical: 80 },
  house: { min: 90, max: 150, typical: 120 },
} as const;

// ============================================================================
// 3. TARIFICATION
// ============================================================================

/**
 * Coefficients de base pour calcul prix
 */
const PRICING_COEFFICIENTS = {
  /** Prix par mètre cube de mobilier (€/m³) */
  coefVolume: 80,
  
  /** Prix par kilomètre parcouru (€/km) */
  coefDistance: 1.2,
  
  /** Prix minimum absolu (socle) */
  prixMinSocle: 400,
} as const;

/**
 * Multiplicateurs par formule de déménagement
 */
const FORMULE_MULTIPLIERS = {
  ECONOMIQUE: 1.10, // +10% sur prix base
  STANDARD: 1.25,   // +25% sur prix base
  PREMIUM: 1.40,    // +40% sur prix base
} as const;

/**
 * Fourchette finale : Prix calculé ±10%
 */
const PRICE_MARGIN = {
  min: 0.90, // -10%
  max: 1.10, // +10%
} as const;

/**
 * Tarifs par distance pour estimation rapide
 * Valeurs en € (prix de base indicatif)
 * 
 * Note : Utilisés dans app/estimation-rapide/page.tsx
 */
const TARIFS_BY_DISTANCE = {
  local: {      // < 100 km
    eco: 35,
    standard: 40,
    premium: 65,
  },
  regional: {   // 100-500 km
    eco: 60,
    standard: 95,
    premium: 130,
  },
  national: {   // > 500 km
    eco: 110,
    standard: 140,
    premium: 160,
  },
} as const;

/**
 * Fourchettes prix par type logement et ville
 * 
 * ⚠️ INCOHÉRENCE CONNUE (audit) :
 * - cities-data.ts : T2 Nice 500-800€
 * - faqs-locales.ts : T2 Nice 750-1600€
 * 
 * Hypothèse actuelle :
 * - fourchettesLocales = Transport seul ou formule éco
 * - fourchettesCompletes = Formule standard/complète
 * 
 * À clarifier Phase 2.
 */

/** Fourchettes prix locaux (<10km, formule éco) par ville */
const FOURCHETTES_LOCALES = {
  nice: {
    studioT1: { min: 300, max: 500 },
    t2t3: { min: 500, max: 800 },
    maison: { min: 800, max: 1500 },
  },
  lyon: {
    studioT1: { min: 300, max: 500 },
    t2t3: { min: 500, max: 800 },
    maison: { min: 800, max: 1500 },
  },
  lille: {
    studioT1: { min: 300, max: 500 },
    t2t3: { min: 500, max: 800 },
    maison: { min: 800, max: 1500 },
  },
  bordeaux: {
    studioT1: { min: 300, max: 500 },
    t2t3: { min: 500, max: 800 },
    maison: { min: 800, max: 1500 },
  },
  marseille: {
    studioT1: { min: 300, max: 500 },
    t2t3: { min: 500, max: 800 },
    maison: { min: 800, max: 1500 },
  },
  // Autres villes : données à compléter Phase 2
} as const;

/** Fourchettes prix complètes par type logement (déménagement local) */
const FOURCHETTES_COMPLETES = {
  studio: { min: 450, max: 1000 },
  t1: { min: 450, max: 1000 },
  t2: { min: 750, max: 1600 },
  t3: { min: 1250, max: 2500 },
  t4: { min: 1850, max: 3800 },
  t5: { min: 2500, max: 5000 },
  house: { min: 3500, max: 7000 },
} as const;

/**
 * Prix "dès" affiché par ville (marketing)
 * Source : cities-data.ts
 */
const PRIX_DEPUIS = {
  lille: 275,
  rennes: 280,
  rouen: 280,
  toulouse: 285,
  bordeaux: 290,
  strasbourg: 290,
  lyon: 295,
  montpellier: 295,
  nice: 299,
  marseille: 299,
  nantes: 299,
} as const;

// ============================================================================
// 4. DISTANCES VILLES (km)
// ============================================================================

/**
 * Matrice distances routières entre villes (km)
 * Source : Audit existant (5 villes) + Google Maps (6 villes ajoutées)
 * 
 * Note : Distances = trajet routier optimal, pas à vol d'oiseau
 */
const DISTANCES_VILLES = {
  nice: {
    paris: 931,
    lyon: 472,
    marseille: 198,
    toulouse: 678,
    bordeaux: 746,
    lille: 955,
    nantes: 1043,
    strasbourg: 732,
    rennes: 1091,
    rouen: 978,
    montpellier: 330,
  },
  paris: {
    nice: 931,
    lyon: 463,
    marseille: 775,
    toulouse: 678,
    bordeaux: 584,
    lille: 225,
    nantes: 385,
    strasbourg: 489,
    rennes: 349,
    rouen: 135,
    montpellier: 748,
  },
  lyon: {
    nice: 472,
    paris: 463,
    marseille: 314,
    toulouse: 537,
    bordeaux: 550,
    lille: 692,
    nantes: 664,
    strasbourg: 488,
    rennes: 709,
    rouen: 569,
    montpellier: 330,
  },
  marseille: {
    nice: 198,
    paris: 775,
    lyon: 314,
    toulouse: 404,
    bordeaux: 635,
    lille: 1007,
    nantes: 897,
    strasbourg: 777,
    rennes: 1042,
    rouen: 896,
    montpellier: 176,
  },
  toulouse: {
    nice: 678,
    paris: 678,
    lyon: 537,
    marseille: 404,
    bordeaux: 245,
    lille: 926,
    nantes: 583,
    strasbourg: 940,
    rennes: 682,
    rouen: 733,
    montpellier: 245,
  },
  bordeaux: {
    nice: 746,
    paris: 584,
    lyon: 550,
    marseille: 635,
    toulouse: 245,
    lille: 797,
    nantes: 345,
    strasbourg: 897,
    rennes: 459,
    rouen: 577,
    montpellier: 560,
  },
  lille: {
    nice: 955,
    paris: 225,
    lyon: 692,
    marseille: 1007,
    toulouse: 926,
    bordeaux: 797,
    nantes: 632,
    strasbourg: 526,
    rennes: 579,
    rouen: 249,
    montpellier: 938,
  },
  nantes: {
    nice: 1043,
    paris: 385,
    lyon: 664,
    marseille: 897,
    toulouse: 583,
    bordeaux: 345,
    lille: 632,
    strasbourg: 897,
    rennes: 113,
    rouen: 379,
    montpellier: 828,
  },
  strasbourg: {
    nice: 732,
    paris: 489,
    lyon: 488,
    marseille: 777,
    toulouse: 940,
    bordeaux: 897,
    lille: 526,
    nantes: 897,
    rennes: 872,
    rouen: 570,
    montpellier: 755,
  },
  rennes: {
    nice: 1091,
    paris: 349,
    lyon: 709,
    marseille: 1042,
    toulouse: 682,
    bordeaux: 459,
    lille: 579,
    nantes: 113,
    strasbourg: 872,
    rouen: 296,
    montpellier: 923,
  },
  rouen: {
    nice: 978,
    paris: 135,
    lyon: 569,
    marseille: 896,
    toulouse: 733,
    bordeaux: 577,
    lille: 249,
    nantes: 379,
    strasbourg: 570,
    rennes: 296,
    montpellier: 860,
  },
  montpellier: {
    nice: 330,
    paris: 748,
    lyon: 330,
    marseille: 176,
    toulouse: 245,
    bordeaux: 560,
    lille: 938,
    nantes: 828,
    strasbourg: 755,
    rennes: 923,
    rouen: 860,
  },
} as const;

/** Distance par défaut si ville inconnue (km) */
const DISTANCE_DEFAULT = 500;

// ============================================================================
// 5. GARDE-MEUBLE / STOCKAGE
// ============================================================================

/**
 * Conversion m³ mobilier → m² box stockage
 * Formule : m² box = m³ mobilier × facteur
 * 
 * Note : Suppose hauteur box 2.5m et optimisation empilement
 */
const STORAGE_CONVERSION = {
  /** Facteur conversion m³ → m² (avec hauteur 2.5m) */
  m3ToM2Factor: 0.18,
  
  /** Hauteur standard box (m) */
  hauteurStandard: 2.5,
} as const;

/**
 * Tailles box recommandées par type logement
 */
const BOX_SIZES = {
  studio: { m2: { min: 3, max: 4 }, m3: { min: 15, max: 20 } },
  t1: { m2: { min: 3, max: 5 }, m3: { min: 15, max: 20 } },
  t2: { m2: { min: 5, max: 6 }, m3: { min: 30, max: 35 } },
  t3: { m2: { min: 7, max: 9 }, m3: { min: 45, max: 55 } },
  t4: { m2: { min: 10, max: 12 }, m3: { min: 60, max: 80 } },
  house: { m2: { min: 15, max: 20 }, m3: { min: 100, max: 150 } },
} as const;

/**
 * Prix moyens garde-meuble par ville (€/mois)
 * 
 * Note : Données partielles, à compléter Phase 2
 * Source : Blogs satellites
 */
const PRIX_GARDE_MEUBLE = {
  nice: {
    m2_3: 60,
    m2_5: 75,
    m2_7: 105,
    m2_10: 145,
  },
  lyon: {
    m2_3: 55,
    m2_5: 70,
    m2_7: 100,
    m2_10: 140,
  },
  // Autres villes : données à compléter Phase 2
} as const;

// ============================================================================
// 6. LOCATION CAMIONS
// ============================================================================

/**
 * Prix moyens location camion par ville (€/jour)
 * 
 * Note : Données partielles, à compléter Phase 2
 * Source : Blogs satellites
 */
const PRIX_LOCATION_CAMIONS = {
  nice: {
    utilitaire: { min: 65, max: 90 },
    camion20m3: { min: 110, max: 150 },
  },
  lyon: {
    utilitaire: { min: 60, max: 85 },
    camion20m3: { min: 105, max: 145 },
  },
  // Autres villes : données à compléter Phase 2
} as const;

/**
 * KM inclus standard dans location
 */
const KM_INCLUS = {
  standard: 150,      // 150 km inclus standard
  illimite: null,     // Option illimité (selon contrats)
} as const;

/**
 * Cautions standard location
 */
const CAUTIONS_LOCATION = {
  standard: 1200,     // Caution standard (€)
  reduite: 300,       // Caution réduite avec assurance (€)
} as const;

// ============================================================================
// EXPORTS & HELPERS
// ============================================================================

/**
 * Objet principal constants (immutable)
 */
export const CONSTANTS = {
  volumes: {
    ratios: VOLUME_RATIOS,
    densites: DENSITY_COEFFICIENTS,
    volumesMoyens: VOLUMES_MOYENS,
  },
  surfaces: SURFACES_LOGEMENTS,
  pricing: {
    coefficients: PRICING_COEFFICIENTS,
    formules: FORMULE_MULTIPLIERS,
    margin: PRICE_MARGIN,
    tarifsByDistance: TARIFS_BY_DISTANCE,
    fourchettesLocales: FOURCHETTES_LOCALES,
    fourchettesCompletes: FOURCHETTES_COMPLETES,
    prixDepuis: PRIX_DEPUIS,
  },
  distances: {
    villes: DISTANCES_VILLES,
    default: DISTANCE_DEFAULT,
  },
  storage: {
    conversion: STORAGE_CONVERSION,
    boxSizes: BOX_SIZES,
    prix: PRIX_GARDE_MEUBLE,
  },
  locationCamions: {
    prix: PRIX_LOCATION_CAMIONS,
    kmInclus: KM_INCLUS,
    cautions: CAUTIONS_LOCATION,
  },
} as const;

// ============================================================================
// HELPERS D'ACCÈS
// ============================================================================

/** Types pour auto-complétion */
export type HousingType = keyof typeof VOLUME_RATIOS;
export type DensityType = keyof typeof DENSITY_COEFFICIENTS;
export type FormuleType = keyof typeof FORMULE_MULTIPLIERS;
export type VilleSlug = keyof typeof DISTANCES_VILLES;

/**
 * Helper : Récupérer volume moyen par type logement
 * 
 * @example
 * getVolume('t2') // → { min: 30, max: 40, typical: 35 }
 */
export function getVolume(type: HousingType) {
  return CONSTANTS.volumes.volumesMoyens[type];
}

/**
 * Helper : Récupérer surface moyenne par type logement
 * 
 * @example
 * getSurface('t2') // → { min: 30, max: 40, typical: 35 }
 */
export function getSurface(type: HousingType) {
  return CONSTANTS.surfaces[type];
}

/**
 * Helper : Récupérer distance entre 2 villes (km)
 * 
 * @example
 * getDistance('nice', 'paris') // → 931
 * getDistance('unknown', 'paris') // → 500 (fallback)
 */
export function getDistance(from: string, to: string): number {
  const fromLower = from.toLowerCase() as VilleSlug;
  const toLower = to.toLowerCase() as VilleSlug;
  
  const distances = CONSTANTS.distances.villes[fromLower];
  if (!distances) return CONSTANTS.distances.default;
  
  return distances[toLower] ?? CONSTANTS.distances.default;
}

/**
 * Helper : Récupérer fourchette prix complète par type logement
 * 
 * @example
 * getPrixFourchette('t2') // → { min: 750, max: 1600 }
 */
export function getPrixFourchette(type: HousingType) {
  return CONSTANTS.pricing.fourchettesCompletes[type];
}

/**
 * Helper : Récupérer prix "dès" par ville
 * 
 * @example
 * getPrixDepuis('nice') // → 299
 */
export function getPrixDepuis(ville: string): number | undefined {
  const villeLower = ville.toLowerCase() as keyof typeof PRIX_DEPUIS;
  return CONSTANTS.pricing.prixDepuis[villeLower];
}

/**
 * Helper : Calculer volume avec ratio
 * 
 * @example
 * calculateVolumeWithRatio(35, 't2', 'normal') // → 12.25 m³
 */
export function calculateVolumeWithRatio(
  surfaceM2: number,
  housingType: HousingType,
  density: DensityType = 'normal'
): number {
  const ratio = CONSTANTS.volumes.ratios[housingType];
  const densityCoef = CONSTANTS.volumes.densites[density];
  const volume = surfaceM2 * ratio * densityCoef;
  return Math.round(volume * 10) / 10; // Arrondi 1 décimale
}

/**
 * Helper : Formater prix en devise
 * 
 * @example
 * formatPrice(1250) // → "1 250 €"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

