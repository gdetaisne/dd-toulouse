// Types pour le formulaire de lead generation
export interface FormState {
  // Étape 1 : Contact
  contactName: string;
  email: string;
  
  // Étape 2 : Projet
  originPostalCode: string;
  originCity: string;
  originAddress: string; // Adresse détaillée (facultative)
  originHousingType: 'studio' | 't1' | 't2' | 't3' | 't4' | 't5' | 'house' | 'house_1floor' | 'house_2floors' | 'house_3floors';
  originFloor: number;
  originElevator: 'none' | 'small' | 'medium' | 'large';
  originFurnitureLift: 'unknown' | 'no' | 'yes';
  originCarryDistance: '0-10' | '10-20' | '20-30' | '30-40' | '40-50' | '50-60' | '60-70' | '70-80' | '80-90' | '90-100';
  originParkingAuth: boolean;
  
  destinationPostalCode: string;
  destinationCity: string;
  destinationAddress: string; // Adresse détaillée (facultative)
  destinationHousingType: 'studio' | 't1' | 't2' | 't3' | 't4' | 't5' | 'house' | 'house_1floor' | 'house_2floors' | 'house_3floors';
  destinationFloor: number;
  destinationElevator: 'none' | 'small' | 'medium' | 'large';
  destinationFurnitureLift: 'unknown' | 'no' | 'yes';
  destinationCarryDistance: '0-10' | '10-20' | '20-30' | '30-40' | '40-50' | '50-60' | '60-70' | '70-80' | '80-90' | '90-100';
  destinationParkingAuth: boolean;
  destinationUnknown: boolean;
  
  movingDate: string; // ISO date
  movingDateEnd: string; // ISO date (pour plage)
  dateFlexible: boolean;
  
  // Étape 3 : Volume & Services
  housingType: 'studio' | 't1' | 't2' | 't3' | 't4' | 't5' | 'house' | 'house_1floor' | 'house_2floors' | 'house_3floors';
  surfaceM2: number;
  density: 'light' | 'normal' | 'dense';
  formule: 'ECONOMIQUE' | 'STANDARD' | 'PREMIUM';
  
  // Métadonnées
  currentStep: number;
  leadId: string | null;
}

export interface PricingResult {
  volumeM3: number;
  distanceKm: number;
  prixMin: number;
  prixAvg: number;
  prixMax: number;
}

export const INITIAL_FORM_STATE: FormState = {
  contactName: '',
  email: '',
  originPostalCode: '',
  originCity: '',
  originAddress: '',
  originHousingType: 't2',
  originFloor: 0,
  originElevator: 'none',
  originFurnitureLift: 'unknown',
  originCarryDistance: '0-10',
  originParkingAuth: false,
  destinationPostalCode: '',
  destinationCity: '',
  destinationAddress: '',
  destinationHousingType: 't2',
  destinationFloor: 0,
  destinationElevator: 'none',
  destinationFurnitureLift: 'unknown',
  destinationCarryDistance: '0-10',
  destinationParkingAuth: false,
  destinationUnknown: false,
  movingDate: '',
  movingDateEnd: '',
  dateFlexible: false,
  housingType: 't2',
  surfaceM2: 45,
  density: 'normal',
  formule: 'STANDARD',
  currentStep: 1,
  leadId: null,
};

