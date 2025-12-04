// Algorithme de calcul du pricing pour le formulaire
// Utilise moverz-constants.ts pour source unique de vérité

import { CONSTANTS, type HousingType, type DensityType, type FormuleType } from './moverz-constants';

// Références aux constants pour compatibilité
const TYPE_COEFFICIENTS = CONSTANTS.volumes.ratios;
const DENSITY_COEFFICIENTS = CONSTANTS.volumes.densites;
const FORMULE_MULTIPLIERS = CONSTANTS.pricing.formules;
const COEF_VOLUME = CONSTANTS.pricing.coefficients.coefVolume;
const COEF_DISTANCE = CONSTANTS.pricing.coefficients.coefDistance;
const PRIX_MIN_SOCLE = CONSTANTS.pricing.coefficients.prixMinSocle;

export function calculateVolume(
  surfaceM2: number,
  housingType: HousingType,
  density: DensityType = 'normal'
): number {
  const baseVolume = surfaceM2 * TYPE_COEFFICIENTS[housingType];
  const adjustedVolume = baseVolume * DENSITY_COEFFICIENTS[density];
  return Math.round(adjustedVolume * 10) / 10;
}

export function calculateDistance(
  originCity: string,
  destCity: string
): number {
  // Utilise matrice complète 11×11 villes depuis moverz-constants
  const origin = originCity.toLowerCase();
  const dest = destCity.toLowerCase();
  
  const distances = CONSTANTS.distances.villes[origin as keyof typeof CONSTANTS.distances.villes];
  if (!distances) return CONSTANTS.distances.default;
  
  return distances[dest as keyof typeof distances] ?? CONSTANTS.distances.default;
}

export function calculatePricing(
  surfaceM2: number,
  housingType: HousingType,
  density: DensityType,
  distanceKm: number,
  formule: FormuleType
) {
  // 1. Calcul volume
  const volumeM3 = calculateVolume(surfaceM2, housingType, density);
  
  // 2. Prix base
  const prixBase = Math.max(
    (volumeM3 * COEF_VOLUME) + (distanceKm * COEF_DISTANCE),
    PRIX_MIN_SOCLE
  );
  
  // 3. Multiplicateur formule
  const formuleMultiplier = FORMULE_MULTIPLIERS[formule];
  
  // 4. Prix avec formule
  const prixAvg = Math.round(prixBase * formuleMultiplier);
  
  // 5. Fourchette (depuis constants)
  const prixMin = Math.round(prixAvg * CONSTANTS.pricing.margin.min);
  const prixMax = Math.round(prixAvg * CONSTANTS.pricing.margin.max);
  
  return {
    volumeM3,
    distanceKm,
    prixMin,
    prixAvg,
    prixMax,
  };
}

// Réexporte helper depuis constants pour compatibilité
export { formatPrice } from './moverz-constants';

