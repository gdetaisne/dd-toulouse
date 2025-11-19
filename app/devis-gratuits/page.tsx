'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FormState, INITIAL_FORM_STATE, PricingResult } from '@/lib/form-types';
import { calculatePricing, calculateVolume, formatPrice, calculateDistance } from '@/lib/pricing';
import { CONSTANTS, type HousingType } from '@/lib/moverz-constants';
import { createLead, updateLead, parseAddress, getSource, mapElevatorToBackend, mapDensityToBackend, mapFurnitureLiftToBackend } from '@/lib/api-client';
import { searchPostcode } from '@/lib/french-cities';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// ============================================================================
// MAPPINGS LOGEMENT ↔ CONSTANTS (Surface & Libellés)
// ============================================================================

const HOUSING_LABELS: Record<string, string> = {
  studio: 'studio',
  t1: 'T1',
  t2: 'T2',
  t3: 'T3',
  t4: 'T4',
  t5: 'T5',
  house: 'maison plain-pied',
  house_1floor: 'maison avec 1 étage',
  house_2floors: 'maison avec 2 étages',
  house_3floors: 'maison avec 3 étages ou plus',
};

const HOUSING_TYPE_MAPPING: Record<string, HousingType> = {
  studio: 'studio',
  t1: 't1',
  t2: 't2',
  t3: 't3',
  t4: 't4',
  t5: 't5',
  house: 'house',
  // Variantes UI de maison → même base `house` pour les calculs
  house_1floor: 'house',
  house_2floors: 'house',
  house_3floors: 'house',
};

const HOUSING_SURFACE_TYPICAL: Record<HousingType, number> = {
  studio: CONSTANTS.surfaces.studio.typical,
  t1: CONSTANTS.surfaces.t1.typical,
  t2: CONSTANTS.surfaces.t2.typical,
  t3: CONSTANTS.surfaces.t3.typical,
  t4: CONSTANTS.surfaces.t4.typical,
  t5: CONSTANTS.surfaces.t5.typical,
  house: CONSTANTS.surfaces.house.typical,
};

function getBaseHousingType(housingType: string): HousingType {
  return HOUSING_TYPE_MAPPING[housingType] ?? 't2';
}

function getHousingLabel(housingType: string): string {
  return HOUSING_LABELS[housingType] ?? housingType;
}

function getHousingSurfaceLabel(housingType: string): string {
  const base = getBaseHousingType(housingType);
  const surface = HOUSING_SURFACE_TYPICAL[base];
  return `~${surface}m²`;
}

// Types pour l'autocomplete
interface AddressSuggestion {
  label: string;
  postcode: string;
  city: string;
}

// Composant AddressInput avec autocomplete français
function AddressInput({
  label,
  value,
  onChange,
  required = false,
  placeholder = '',
  helpText = '',
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  disabled?: boolean;
}) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = async (query: string) => {
    // Minimum 5 caractères pour avoir des résultats fiables
    if (query.length < 5) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    
    // Recherche locale INSTANTANÉE (pas d'API)
    const results = searchPostcode(query);
    
    setSuggestions(results);
    setShowSuggestions(results.length > 0);
    setIsLoading(false);
  };

  const handleInputChange = (val: string) => {
    onChange(val);
    
    // Appeler l'API SEULEMENT quand on atteint exactement 5 caractères
    if (val.length === 5) {
      // Debounce très court juste pour éviter les doubles appels
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(val);
      }, 50);
    } else if (val.length < 5) {
      // Cacher les suggestions si < 5 caractères
      setSuggestions([]);
      setShowSuggestions(false);
    }
    // Si > 5 caractères, on garde les suggestions affichées (pas de nouvel appel)
  };

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange(suggestion.label);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium mb-2 text-white">
        {label}
        {required && <span className="text-brand-secondary ml-1">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => value && suggestions.length > 0 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ color: '#ffffff' }}
        autoComplete="off"
      />
      
      {/* Dropdown suggestions - Style cohérent avec le site */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 overflow-hidden">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-0"
            >
              <div className="font-semibold" style={{ color: '#04163a' }}>{suggestion.city}</div>
            </button>
          ))}
        </div>
      )}
      
      {isLoading && (
        <div className="absolute right-3 top-11 text-white/50 text-sm">⏳</div>
      )}
      
      {helpText && (
        <p className="mt-2 text-xs text-white/70 bg-white/5 border border-white/10 rounded p-2">
          {helpText}
        </p>
      )}
    </div>
  );
}

// Stepper Component
function Stepper({ 
  currentStep, 
  completedSteps, 
  onStepClick 
}: { 
  currentStep: number; 
  completedSteps: number[];
  onStepClick: (step: number) => void;
}) {
  const steps = [
    { number: 1, label: 'Contact' },
    { number: 2, label: 'Projet' },
    { number: 3, label: 'Services' },
    { number: 4, label: 'Récapitulatif' },
  ];

  return (
    <div className="flex items-center justify-between mb-8 px-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onStepClick(step.number)}
              disabled={step.number > currentStep && !completedSteps.includes(step.number)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all cursor-pointer hover:scale-110 disabled:cursor-not-allowed ${
                step.number === currentStep
                  ? 'bg-blue-600 text-white'
                  : completedSteps.includes(step.number)
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {completedSteps.includes(step.number) ? '✓' : step.number}
            </button>
            <span className={`mt-2 text-xs font-medium ${step.number === currentStep ? 'text-brand-secondary' : 'text-white/70'}`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 rounded ${
                completedSteps.includes(step.number) ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Input Component
function Input({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = '',
  helpText = '',
  disabled = false,
  onEnter,
}: {
  label: string;
  type?: string;
  value: string | number;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  disabled?: boolean;
  onEnter?: () => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-white">
        {label}
        {required && <span className="text-brand-secondary ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ color: '#ffffff' }}
      />
      {helpText && (
        <p className="mt-2 text-xs text-white/70 bg-white/5 border border-white/10 rounded p-2">
          {helpText}
        </p>
      )}
    </div>
  );
}

// Select Component
function Select({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: { value: string | number; label: string }[];
  required?: boolean;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-white">
        {label}
        {required && <span className="text-brand-secondary ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary"
        style={{ color: '#ffffff' }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ color: '#000000' }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Checkbox Component
function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-4 h-4 accent-brand-secondary"
      />
      <span className="text-sm text-white/90">{label}</span>
    </label>
  );
}

// Formule Card Component
function FormuleCard({
  id,
  badge,
  title,
  subtitle,
  features,
  prixMin,
  prixAvg,
  prixMax,
  recommended = false,
  selected,
  onSelect,
}: {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  prixMin: number;
  prixAvg: number;
  prixMax: number;
  recommended?: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  // Couleurs selon la formule
  const colors = {
    economique: {
      badge: 'bg-green-500',
      button: 'bg-green-500 hover:bg-green-600',
      bullet: 'text-green-400',
    },
    standard: {
      badge: 'bg-blue-500',
      button: 'bg-blue-500 hover:bg-blue-600',
      bullet: 'text-blue-400',
    },
    premium: {
      badge: 'bg-purple-500',
      button: 'bg-purple-500 hover:bg-purple-600',
      bullet: 'text-purple-400',
    },
  };

  const colorScheme = colors[id as keyof typeof colors] || colors.standard;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative p-6 rounded-2xl transition-all w-full text-left ${
        selected 
          ? 'bg-white/20 border-4 border-brand-secondary shadow-2xl scale-105' 
          : 'bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/40'
      }`}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-xs font-bold">
          Recommandé
        </div>
      )}
      
      {selected && (
        <div className="absolute top-4 right-4 w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <span className="text-white text-2xl font-bold">✓</span>
        </div>
      )}

      <div className={`inline-block ${colorScheme.badge} text-white px-3 py-1 rounded-full text-xs font-bold mb-4`}>
        {badge}
      </div>
      
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-sm text-white/70 mb-6">{subtitle}</p>
      
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/90">
            <span className={`${colorScheme.bullet} mt-0.5`}>●</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex items-end justify-center gap-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <div className="text-xs text-green-400 mb-1">min</div>
          <div className="text-lg text-green-400 font-semibold">{formatPrice(prixMin)}</div>
        </div>
        <span className="text-4xl font-bold text-white leading-none">{formatPrice(prixAvg)}</span>
        <div className="text-center">
          <div className="text-xs text-red-400 mb-1">max</div>
          <div className="text-lg text-red-400 font-semibold">{formatPrice(prixMax)}</div>
        </div>
      </div>
    </button>
  );
}

export default function InventaireIAPage() {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage (only once on mount)
  useEffect(() => {
    const saved = localStorage.getItem('moverz_form_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // RÈGLE : Ne charger QUE si leadId existe ET step < 4
        // Si session corrompue (step > 1 sans leadId) → ignorer
        if (parsed.leadId && parsed.currentStep < 4) {
          setFormState(parsed);
          setCompletedSteps(parsed.completedSteps || []);
          console.log('📦 Session restaurée:', parsed.leadId);
        } else {
          // Session invalide → nettoyer
          console.log('🗑️ Session invalide supprimée');
          localStorage.removeItem('moverz_form_state');
        }
      } catch (e) {
        console.error('Error loading form state:', e);
        localStorage.removeItem('moverz_form_state');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage - SEULEMENT quand on passe à l'étape suivante
  useEffect(() => {
    if (isLoaded && formState.leadId && formState.currentStep > 1) {
      // Sauvegarder uniquement si on a un leadId ET qu'on est passé à l'étape 2+
      localStorage.setItem('moverz_form_state', JSON.stringify(formState));
    }
  }, [formState.currentStep, formState.leadId, isLoaded]); // Retirer formState complet

  // Calculate pricing whenever relevant fields change
  useEffect(() => {
    if (formState.surfaceM2) {
      // Calculer la distance (ou utiliser une distance par défaut de 50km si pas encore renseignée)
      let distance = 50; // Distance par défaut
      if (formState.originAddress && formState.destinationAddress) {
        distance = calculateDistance(
          formState.originAddress.split(',')[0] || 'nice',
          formState.destinationAddress.split(',')[0] || 'paris'
        );
      }
      
      // Calculer le pricing avec la formule STANDARD par défaut
      // Les coefficients (économique/premium) sont appliqués dans l'affichage
      const result = calculatePricing(
        formState.surfaceM2,
        formState.housingType,
        formState.density,
        distance,
        'STANDARD' // Toujours calculer sur base STANDARD
      );
      
      setPricing(result);
    }
  }, [
    formState.surfaceM2,
    formState.housingType,
    formState.density,
    formState.originAddress,
    formState.destinationAddress,
    // NE PAS inclure formState.formule ici !
  ]);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  // Sauvegarder le Lead dans le backend (debounced) - PRODUCTION ACTIVÉE
  const saveToBackend = useCallback(async (state: FormState) => {
    if (state.currentStep === 1 && !state.leadId) return;
    
    // ⚠️ Ne pas sauvegarder si leadId est un demo ID (ne devrait plus arriver)
    if (state.leadId && state.leadId.startsWith('demo-')) {
      console.warn('⚠️ Tentative de sauvegarde avec demo ID, ignorée:', state.leadId);
      return;
    }
    
    if (!state.leadId) return;
    
    // 🔍 DEBUG: Log de l'ID utilisé pour le PATCH
    console.log('🔄 Tentative PATCH lead:', state.leadId);
    
    try {
      setIsSaving(true);
      
      const originParsed = state.originAddress ? parseAddress(state.originAddress) : { city: '', postalCode: '' };
      const destParsed = state.destinationAddress ? parseAddress(state.destinationAddress) : { city: '', postalCode: '' };
      
      await updateLead(state.leadId, {
        // Adresses
        originAddress: state.originAddress || undefined,
        originCity: originParsed.city || undefined,
        originPostalCode: originParsed.postalCode || undefined,
        destAddress: state.destinationAddress || undefined,  // ⚠️ Backend attend "destAddress", pas "destinationAddress"
        destCity: destParsed.city || undefined,
        destPostalCode: destParsed.postalCode || undefined,
        
        // Dates
        movingDate: state.movingDate || undefined,
        movingDateEnd: state.movingDateEnd || undefined,
        dateFlexible: state.dateFlexible,
        
        // Volume & Surface
        surfaceM2: state.surfaceM2 || undefined,
        estimatedVolume: pricing?.volumeM3,
        density: mapDensityToBackend(state.density),  // ⚠️ Mapping: 'normal' → 'MEDIUM'
        
        // Formule & Prix
        formule: state.formule,
        estimatedPriceMin: pricing?.prixMin,
        estimatedPriceAvg: pricing?.prixAvg,
        estimatedPriceMax: pricing?.prixMax,
        
        // Détails logement origine
        originHousingType: state.originHousingType,
        originFloor: state.originFloor,
        originElevator: mapElevatorToBackend(state.originElevator),  // ⚠️ Mapping: 'none'/'small'/'medium'/'large' → 'OUI'/'NON'/'PARTIEL'
        originFurnitureLift: mapFurnitureLiftToBackend(state.originFurnitureLift),
        originCarryDistance: state.originCarryDistance,
        originParkingAuth: state.originParkingAuth,
        
        // Détails logement destination
        destHousingType: state.destinationHousingType,
        destFloor: state.destinationFloor,
        destElevator: mapElevatorToBackend(state.destinationElevator),  // ⚠️ Mapping
        destFurnitureLift: mapFurnitureLiftToBackend(state.destinationFurnitureLift),
        destCarryDistance: state.destinationCarryDistance,
        destParkingAuth: state.destinationParkingAuth,
        
        // Métadonnées (tracking interne uniquement)
        metadata: {
          currentStep: state.currentStep,
          completedSteps,
          pricing: pricing || undefined,
        },
      });
      
      console.log('✅ Lead mis à jour:', state.leadId);
    } catch (error) {
      console.error('❌ Erreur sauvegarde backend:', error);
    } finally {
      setIsSaving(false);
    }
  }, [completedSteps, pricing]);

  // Debounce save (3s après dernière modif)
  useEffect(() => {
    // ⚠️ Ne pas sauvegarder automatiquement sur l'étape 4 (dernière étape)
    // L'utilisateur va soumettre manuellement, pas besoin de save auto
    if (formState.currentStep === 4) {
      return;
    }
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // ✅ Backend confirme : lead disponible immédiatement après POST
    // Pas besoin de délai supplémentaire
    saveTimeoutRef.current = setTimeout(() => {
      saveToBackend(formState);
    }, 3000);
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formState, saveToBackend]);

  const goToStep = (step: number) => {
    if (step < formState.currentStep && !completedSteps.includes(formState.currentStep)) {
      setCompletedSteps((prev) => [...prev, formState.currentStep]);
    }
    updateField('currentStep', step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = async () => {
    // Étape 1 : Créer le lead (PRODUCTION ACTIVÉE)
    if (formState.currentStep === 1 && !formState.leadId) {
      // Validation avant création
      if (!formState.contactName || !formState.contactName.trim()) {
        alert('Veuillez renseigner votre nom.');
        return;
      }
      if (!formState.email || !formState.email.trim()) {
        alert('Veuillez renseigner votre email.');
        return;
      }
      
      try {
        setIsSaving(true);
        
        // ✅ PAYLOAD MINIMAL selon backend : firstName + email uniquement
        // lastName et adresses sont optionnels (seront ajoutés via PATCH)
        const source = getSource();
        
        // Validation email avant envoi
        const emailTrimmed = formState.email.trim();
        if (!emailTrimmed.includes('@') || !emailTrimmed.includes('.')) {
          alert('Veuillez renseigner une adresse email valide.');
          return;
        }
        
        const payload: any = {
          // Champs REQUIS uniquement
          firstName: formState.contactName.trim(),
          email: emailTrimmed.toLowerCase(), // Normaliser en lowercase
        };
        
        // Champs optionnels (ajoutés si disponibles)
        if (source && source.trim()) {
          payload.source = source.trim();
        }
        
        // Note: lastName et adresses seront ajoutés via PATCH lors des étapes suivantes
        
        const { id } = await createLead(payload);
        setFormState((prev) => ({ ...prev, leadId: id }));
        console.log('✅ Lead créé dans backend:', id);
      } catch (error) {
        console.error('❌ Erreur création lead:', error);
        // Afficher erreur à l'utilisateur au lieu de fallback demo
        alert('Erreur lors de la création de votre demande. Veuillez réessayer ou nous contacter.');
        // Ne pas continuer si création échoue
        return;
      } finally {
        setIsSaving(false);
      }
    }
    
    // Étape 2 → 3 : Pré-remplir la superficie moyenne selon le type de logement
    if (formState.currentStep === 2) {
      const baseType = getBaseHousingType(formState.originHousingType);
      const suggestedSurface = HOUSING_SURFACE_TYPICAL[baseType];
      updateField('surfaceM2', suggestedSurface);
      // ⚠️ Important : pour le pricing on utilise uniquement les types supportés par moverz-constants
      updateField('housingType', baseType as FormState['housingType']);
    }
    
    if (!completedSteps.includes(formState.currentStep)) {
      setCompletedSteps((prev) => [...prev, formState.currentStep]);
    }
    goToStep(formState.currentStep + 1);
  };

  const handleSubmit = async () => {
    if (!formState.leadId) {
      alert('Erreur: Aucun lead créé. Veuillez recommencer.');
      return;
    }
    
    // ⚠️ Ne pas soumettre si leadId est un demo ID
    if (formState.leadId.startsWith('demo-')) {
      alert('Erreur: Votre demande n\'a pas pu être créée. Veuillez recommencer depuis le début.');
      return;
    }
    
    try {
      setIsSaving(true);
      
      const originParsed = parseAddress(formState.originAddress);
      const destParsed = parseAddress(formState.destinationAddress);
      
      await updateLead(formState.leadId, {
        // Adresses
        originAddress: formState.originAddress || undefined,
        originCity: originParsed.city || undefined,
        originPostalCode: originParsed.postalCode || undefined,
        destAddress: formState.destinationAddress || undefined,  // ⚠️ Backend attend "destAddress", pas "destinationAddress"
        destCity: destParsed.city || undefined,
        destPostalCode: destParsed.postalCode || undefined,
        
        // Dates
        movingDate: formState.movingDate || undefined,
        movingDateEnd: formState.movingDateEnd || undefined,
        dateFlexible: formState.dateFlexible,
        
        // Volume & Surface
        surfaceM2: formState.surfaceM2 || undefined,
        estimatedVolume: pricing?.volumeM3,
        density: mapDensityToBackend(formState.density),  // ⚠️ Mapping: 'normal' → 'MEDIUM'
        
        // Formule & Prix
        formule: formState.formule,
        estimatedPriceMin: pricing?.prixMin,
        estimatedPriceAvg: pricing?.prixAvg,
        estimatedPriceMax: pricing?.prixMax,
        
        // Détails logement origine
        originHousingType: formState.originHousingType,
        originFloor: formState.originFloor,
        originElevator: mapElevatorToBackend(formState.originElevator),  // ⚠️ Mapping
        originFurnitureLift: mapFurnitureLiftToBackend(formState.originFurnitureLift),
        originCarryDistance: formState.originCarryDistance,
        originParkingAuth: formState.originParkingAuth,
        
        // Détails logement destination
        destHousingType: formState.destinationHousingType,
        destFloor: formState.destinationFloor,
        destElevator: mapElevatorToBackend(formState.destinationElevator),  // ⚠️ Mapping
        destFurnitureLift: mapFurnitureLiftToBackend(formState.destinationFurnitureLift),
        destCarryDistance: formState.destinationCarryDistance,
        destParkingAuth: formState.destinationParkingAuth,
        
        // Status (marquer comme complété)
        status: 'CONVERTED',
        
        // Métadonnées (tracking interne uniquement)
        metadata: {
          currentStep: 4,
          completedSteps: [1, 2, 3, 4],
          completedAt: new Date().toISOString(),
          pricing: pricing || undefined,
        },
      });
      
      localStorage.setItem('moverz_completed_lead', JSON.stringify({
        ...formState,
        pricing,
      }));
      
      console.log('✅ Lead finalisé et sauvegardé dans backend:', formState.leadId);
      window.location.href = '/devis-gratuits/merci/';
    } catch (error) {
      console.error('❌ Erreur finalisation:', error);
      alert('Erreur lors de l\'envoi final. Vos données sont sauvegardées. Contactez-nous si le problème persiste.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero py-12">
      {/* Halo effect comme sur la home */}
      <div className="glow absolute top-0 right-0 w-96 h-96 pointer-events-none" />
      
      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        {/* Card avec glassmorphism */}
        <div className="card-glass rounded-3xl p-8 shadow-2xl">
          {/* Bouton Recommencer (si session en cours) */}
          {formState.leadId && (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  if (confirm('Êtes-vous sûr de vouloir recommencer ? Vos données seront perdues.')) {
                    localStorage.removeItem('moverz_form_state');
                    window.location.reload();
                  }
                }}
                className="text-xs text-white/50 hover:text-white/80 underline"
              >
                🔄 Recommencer
              </button>
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
            Demande de Devis Déménagement
          </h1>
          <p className="text-center text-white/80 mb-8 text-lg">
            Obtenez 3 à 6 devis personnalisés sous 24h
          </p>

          <Stepper 
            currentStep={formState.currentStep} 
            completedSteps={completedSteps} 
            onStepClick={goToStep}
          />

          {/* ÉTAPE 1 : Contact */}
          {formState.currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Comment souhaitez-vous être contacté ?</h2>
              
              <Input
                label="Nom que vous souhaitez que nous utilisions"
                value={formState.contactName}
                onChange={(v) => updateField('contactName', v)}
                onEnter={handleNext}
                required
                placeholder="Ex: Jean, M. Dupont, JD..."
                helpText="Nous n'avons pas besoin de votre vrai nom si vous préférez rester anonyme à ce stade."
              />

              <Input
                label="Email de contact"
                type="email"
                value={formState.email}
                onChange={(v) => updateField('email', v)}
                onEnter={handleNext}
                required
                placeholder="votre@email.fr"
                helpText="Cette information reste confidentielle vis-à-vis des déménageurs. Nous en avons besoin pour vous tenir informé de l'évolution de votre dossier."
              />

              <button
                onClick={handleNext}
                disabled={!formState.contactName || !formState.email || isSaving}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <span className="animate-spin">⏳</span> Sauvegarde...
                  </>
                ) : (
                  'Suivant →'
                )}
              </button>
            </div>
          )}

          {/* ÉTAPE 2 : Projet */}
          {formState.currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Parlez-nous de votre déménagement</h2>

              {/* 2 COLONNES : Adresse actuelle et Nouvelle adresse */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                
                {/* BLOC 1 : Adresse actuelle */}
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="font-bold mb-4 text-white text-lg">📦 Adresse actuelle</h3>
                  
                  <AddressInput
                    label="Code postal + Ville"
                    value={formState.originAddress}
                    onChange={(v) => updateField('originAddress', v)}
                    required
                    placeholder="Ex: 17290"
                    helpText=""
                  />

                    <Select
                      label="Type de logement"
                      value={formState.originHousingType}
                      onChange={(v) => updateField('originHousingType', v as any)}
                      options={[
                        { value: 'studio', label: 'Studio' },
                        { value: 't1', label: 'T1' },
                        { value: 't2', label: 'T2' },
                        { value: 't3', label: 'T3' },
                        { value: 't4', label: 'T4' },
                        { value: 't5', label: 'T5+' },
                        { value: 'house', label: 'Maison plain-pied' },
                        { value: 'house_1floor', label: 'Maison 1 étage' },
                        { value: 'house_2floors', label: 'Maison 2 étages' },
                        { value: 'house_3floors', label: 'Maison 3+ étages' },
                      ]}
                      required
                    />

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Étage"
                      value={formState.originFloor}
                      onChange={(v) => updateField('originFloor', parseInt(v))}
                      options={[
                        { value: 0, label: 'RdC' },
                        { value: 1, label: '1er' },
                        { value: 2, label: '2e' },
                        { value: 3, label: '3e' },
                        { value: 4, label: '4e' },
                        { value: 5, label: '5e' },
                        { value: 6, label: '6e+' },
                      ]}
                      required
                    />
                    <Select
                      label="Ascenseur"
                      value={formState.originElevator}
                      onChange={(v) => updateField('originElevator', v as any)}
                      options={[
                        { value: 'none', label: "Pas d'ascenseur" },
                        { value: 'small', label: 'Petit (1-3 pers)' },
                        { value: 'medium', label: 'Moyen (4-6 pers)' },
                        { value: 'large', label: 'Grand (> 6 pers)' },
                      ]}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Monte-meuble"
                      value={formState.originFurnitureLift}
                      onChange={(v) => updateField('originFurnitureLift', v as any)}
                      options={[
                        { value: 'unknown', label: 'Ne sait pas' },
                        { value: 'no', label: 'Non' },
                        { value: 'yes', label: 'Oui' },
                      ]}
                      required
                    />
                    <Select
                      label="Distance de portage"
                      value={formState.originCarryDistance}
                      onChange={(v) => updateField('originCarryDistance', v as any)}
                      options={[
                        { value: '0-10', label: '0-10 m' },
                        { value: '10-20', label: '10-20 m' },
                        { value: '20-30', label: '20-30 m' },
                        { value: '30-40', label: '30-40 m' },
                        { value: '40-50', label: '40-50 m' },
                        { value: '50-60', label: '50-60 m' },
                        { value: '60-70', label: '60-70 m' },
                        { value: '70-80', label: '70-80 m' },
                        { value: '80-90', label: '80-90 m' },
                        { value: '90-100', label: '90-100 m' },
                      ]}
                      required
                    />
                  </div>

                  <Checkbox
                    label="Autorisation de stationnement nécessaire ?"
                    checked={formState.originParkingAuth}
                    onChange={(v) => updateField('originParkingAuth', v)}
                  />
                </div>

                {/* BLOC 2 : Nouvelle adresse */}
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="font-bold mb-4 text-white text-lg">🏠 Nouvelle adresse</h3>
                  
                  <AddressInput
                    label="Code postal + Ville"
                    value={formState.destinationAddress}
                    onChange={(v) => updateField('destinationAddress', v)}
                    required
                    placeholder="Ex: 75001"
                    helpText=""
                  />

                      <Select
                        label="Type de logement"
                        value={formState.destinationHousingType}
                        onChange={(v) => updateField('destinationHousingType', v as any)}
                        options={[
                          { value: 'studio', label: 'Studio' },
                          { value: 't1', label: 'T1' },
                          { value: 't2', label: 'T2' },
                          { value: 't3', label: 'T3' },
                          { value: 't4', label: 'T4' },
                          { value: 't5', label: 'T5+' },
                          { value: 'house', label: 'Maison plain-pied' },
                          { value: 'house_1floor', label: 'Maison 1 étage' },
                          { value: 'house_2floors', label: 'Maison 2 étages' },
                          { value: 'house_3floors', label: 'Maison 3+ étages' },
                        ]}
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Select
                          label="Étage"
                          value={formState.destinationFloor}
                          onChange={(v) => updateField('destinationFloor', parseInt(v))}
                          options={[
                            { value: 0, label: 'RdC' },
                            { value: 1, label: '1er' },
                            { value: 2, label: '2e' },
                            { value: 3, label: '3e' },
                            { value: 4, label: '4e' },
                            { value: 5, label: '5e' },
                            { value: 6, label: '6e+' },
                          ]}
                          required
                        />
                        <Select
                          label="Ascenseur"
                          value={formState.destinationElevator}
                          onChange={(v) => updateField('destinationElevator', v as any)}
                          options={[
                            { value: 'none', label: "Pas d'ascenseur" },
                            { value: 'small', label: 'Petit (1-3 pers)' },
                            { value: 'medium', label: 'Moyen (4-6 pers)' },
                            { value: 'large', label: 'Grand (> 6 pers)' },
                          ]}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Select
                          label="Monte-meuble"
                          value={formState.destinationFurnitureLift}
                          onChange={(v) => updateField('destinationFurnitureLift', v as any)}
                          options={[
                            { value: 'unknown', label: 'Ne sait pas' },
                            { value: 'no', label: 'Non' },
                            { value: 'yes', label: 'Oui' },
                          ]}
                          required
                        />
                        <Select
                          label="Distance de portage"
                          value={formState.destinationCarryDistance}
                          onChange={(v) => updateField('destinationCarryDistance', v as any)}
                          options={[
                            { value: '0-10', label: '0-10 m' },
                            { value: '10-20', label: '10-20 m' },
                            { value: '20-30', label: '20-30 m' },
                            { value: '30-40', label: '30-40 m' },
                            { value: '40-50', label: '40-50 m' },
                            { value: '50-60', label: '50-60 m' },
                            { value: '60-70', label: '60-70 m' },
                            { value: '70-80', label: '70-80 m' },
                            { value: '80-90', label: '80-90 m' },
                            { value: '90-100', label: '90-100 m' },
                          ]}
                          required
                        />
                      </div>

                      <Checkbox
                        label="Autorisation de stationnement nécessaire ?"
                        checked={formState.destinationParkingAuth}
                        onChange={(v) => updateField('destinationParkingAuth', v)}
                      />
                </div>
              </div>

              {/* BLOC 3 : Date de déménagement (pleine largeur) */}
              <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="font-bold mb-4 text-white text-lg">📅 Date de déménagement</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-white">
                    Date souhaitée <span className="text-brand-secondary ml-1">*</span>
                  </label>
                  <p className="text-xs text-white/60 mb-2">
                    Cliquez sur une date (ou sélectionnez une plage en cliquant sur 2 dates)
                  </p>
                  <DatePicker
                    selected={formState.movingDate ? new Date(formState.movingDate) : null}
                    onChange={(dates: Date | [Date | null, Date | null] | null) => {
                      if (Array.isArray(dates)) {
                        const [start, end] = dates;
                        updateField('movingDate', start ? start.toISOString().split('T')[0] : '');
                        updateField('movingDateEnd', end ? end.toISOString().split('T')[0] : '');
                        // Si end existe, on est flexible
                        updateField('dateFlexible', !!end);
                      } else if (dates) {
                        // Clic simple = date unique
                        updateField('movingDate', dates.toISOString().split('T')[0]);
                        updateField('movingDateEnd', '');
                        updateField('dateFlexible', false);
                      }
                    }}
                    startDate={formState.movingDate ? new Date(formState.movingDate) : null}
                    endDate={formState.movingDateEnd ? new Date(formState.movingDateEnd) : null}
                    selectsRange
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Sélectionnez une date ou une plage"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary text-white placeholder-white/50"
                    calendarClassName="bg-white rounded-lg shadow-xl"
                    inline={false}
                  />
                  {formState.movingDate && formState.movingDateEnd && (
                    <p className="mt-2 text-sm text-white/70">
                      📅 Plage sélectionnée : du {new Date(formState.movingDate).toLocaleDateString('fr-FR')} au {new Date(formState.movingDateEnd).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                  {formState.movingDate && !formState.movingDateEnd && (
                    <p className="mt-2 text-sm text-white/70">
                      📅 Date fixe : {new Date(formState.movingDate).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => goToStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formState.originAddress || !formState.movingDate}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  Suivant →
                </button>
        </div>
      </div>
          )}

          {/* ÉTAPE 3 : Volume & Services */}
          {formState.currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Volume et Services</h2>

              <div className="mb-6">
                <h3 className="font-bold mb-4 text-white">📦 Estimation du volume → Superficie</h3>
                
                {/* Type de logement sélectionné */}
                <p className="text-white/80 mb-4">
                  Superficie moyenne d'un{' '}
                  <span className="font-bold text-white">
                    {getHousingLabel(formState.originHousingType)}
                  </span>
                  {' '}:{' '}
                  <span className="font-bold text-brand-secondary">
                    {getHousingSurfaceLabel(formState.originHousingType)}
                  </span>
                  {' '}
                  <button 
                    onClick={() => goToStep(2)} 
                    className="text-sm text-brand-secondary hover:underline"
                  >
                    (modifier le type)
                  </button>
                </p>

                <Input
                  label="Votre superficie"
                  type="number"
                  value={formState.surfaceM2}
                  onChange={(v) => updateField('surfaceM2', parseInt(v) || 0)}
                  required
                  placeholder="65"
                />

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-3 text-white">
                    Comment décririez-vous votre logement ?
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => updateField('density', 'light')}
                      className={`p-4 border-2 rounded-xl text-center transition ${
                        formState.density === 'light'
                          ? 'border-brand-secondary bg-white/20'
                          : 'border-white/20 bg-white/10 hover:border-white/40'
                      }`}
                    >
                      <div className="flex justify-center mb-3">
                        <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto">
                          {/* Pièce vide/sobre */}
                          <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60" rx="4"/>
                          {/* Canapé */}
                          <rect x="20" y="65" width="25" height="15" fill="currentColor" className="text-white/50" rx="2"/>
                          {/* Table basse */}
                          <rect x="50" y="68" width="15" height="10" fill="currentColor" className="text-white/50" rx="1"/>
                          {/* Lit */}
                          <rect x="65" y="20" width="20" height="25" fill="currentColor" className="text-white/50" rx="2"/>
                        </svg>
                      </div>
                      <div className="font-bold text-white">Sobre</div>
                      <div className="text-xs text-white/70 mt-1">Peu meublé • -10%</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('density', 'normal')}
                      className={`p-4 border-2 rounded-xl text-center transition ${
                        formState.density === 'normal'
                          ? 'border-brand-secondary bg-white/20'
                          : 'border-white/20 bg-white/10 hover:border-white/40'
                      }`}
                    >
                      <div className="flex justify-center mb-3">
                        <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto">
                          {/* Pièce normale */}
                          <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70" rx="4"/>
                          {/* Canapé */}
                          <rect x="15" y="60" width="30" height="18" fill="currentColor" className="text-white/60" rx="2"/>
                          {/* Table basse */}
                          <rect x="50" y="65" width="18" height="12" fill="currentColor" className="text-white/60" rx="1"/>
                          {/* Lit */}
                          <rect x="65" y="15" width="22" height="28" fill="currentColor" className="text-white/60" rx="2"/>
                          {/* Armoire */}
                          <rect x="15" y="15" width="15" height="25" fill="currentColor" className="text-white/60" rx="1"/>
                          {/* Table à manger */}
                          <rect x="40" y="20" width="18" height="18" fill="currentColor" className="text-white/60" rx="1"/>
                          {/* Chaises (petits carrés) */}
                          <rect x="37" y="18" width="5" height="5" fill="currentColor" className="text-white/60"/>
                          <rect x="61" y="18" width="5" height="5" fill="currentColor" className="text-white/60"/>
                        </svg>
                      </div>
                      <div className="font-bold text-white">Normal</div>
                      <div className="text-xs text-white/70 mt-1">Bien meublé • Standard</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('density', 'dense')}
                      className={`p-4 border-2 rounded-xl text-center transition ${
                        formState.density === 'dense'
                          ? 'border-brand-secondary bg-white/20'
                          : 'border-white/20 bg-white/10 hover:border-white/40'
                      }`}
                    >
                      <div className="flex justify-center mb-3">
                        <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto">
                          {/* Pièce dense */}
                          <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80" rx="4"/>
                          {/* Canapé d'angle */}
                          <rect x="12" y="55" width="35" height="20" fill="currentColor" className="text-white/70" rx="2"/>
                          <rect x="12" y="55" width="20" height="33" fill="currentColor" className="text-white/70" rx="2"/>
                          {/* Table basse */}
                          <rect x="50" y="62" width="20" height="15" fill="currentColor" className="text-white/70" rx="1"/>
                          {/* Lit */}
                          <rect x="65" y="12" width="23" height="30" fill="currentColor" className="text-white/70" rx="2"/>
                          {/* Armoire 1 */}
                          <rect x="12" y="12" width="18" height="28" fill="currentColor" className="text-white/70" rx="1"/>
                          {/* Armoire 2 */}
                          <rect x="33" y="12" width="15" height="25" fill="currentColor" className="text-white/70" rx="1"/>
                          {/* Table à manger */}
                          <rect x="50" y="14" width="12" height="25" fill="currentColor" className="text-white/70" rx="1"/>
                          {/* Chaises */}
                          <rect x="47" y="12" width="4" height="4" fill="currentColor" className="text-white/70"/>
                          <rect x="47" y="40" width="4" height="4" fill="currentColor" className="text-white/70"/>
                          <rect x="63" y="12" width="4" height="4" fill="currentColor" className="text-white/70"/>
                          <rect x="63" y="40" width="4" height="4" fill="currentColor" className="text-white/70"/>
                          {/* Étagères/rangements */}
                          <rect x="73" y="45" width="15" height="8" fill="currentColor" className="text-white/70" rx="1"/>
                          <rect x="73" y="56" width="15" height="8" fill="currentColor" className="text-white/70" rx="1"/>
                        </svg>
                      </div>
                      <div className="font-bold text-white">Dense</div>
                      <div className="text-xs text-white/70 mt-1">Très meublé • +10%</div>
                    </button>
        </div>
      </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-4 text-white">🎯 Choisissez votre formule <span className="text-brand-secondary">*</span></h3>
                
                {pricing && (
                  <p className="text-white/80 mb-4">
                    Volume moyen pour un{' '}
                    <span className="font-bold text-white">
                      {getHousingLabel(formState.originHousingType)}
                    </span>
                    {' '}de{' '}
                    <span className="font-bold text-white">{formState.surfaceM2} m²</span>
                    {' '}
                    <span className="font-bold text-white">
                      {formState.density === 'light' ? 'sobre' : 
                       formState.density === 'normal' ? 'normalement meublé' : 
                       'densément meublé'}
                    </span>
                    {' '}:{' '}
                    <span className="font-bold text-brand-secondary text-xl">{pricing.volumeM3} m³</span>
                  </p>
                )}
                
                <p className="text-sm text-white/70 mb-4">Sélectionnez la formule qui correspond le mieux à vos besoins</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pricing && (
                    <>
                      <FormuleCard
                        id="economique"
                        badge="💰 Économique"
                        title="Déménagement Économique"
                        subtitle="Pour les budgets serrés"
                        features={[
                          'Chargement, déchargement et transport',
                          'Mobilier et cartons',
                          'Assurance incluse',
                          'Support téléphonique',
                        ]}
                        prixMin={Math.round(pricing.prixMin * 0.91)}
                        prixAvg={Math.round(pricing.prixAvg * 0.88)}
                        prixMax={Math.round(pricing.prixMax * 0.85)}
                        selected={formState.formule === 'ECONOMIQUE'}
                        onSelect={() => updateField('formule', 'ECONOMIQUE')}
                      />
                      <FormuleCard
                        id="standard"
                        badge="⭐ Standard"
                        title="Déménagement Standard"
                        subtitle="Le plus populaire"
                        features={[
                          'Chargement et déplacement',
                          'Objets précieux et fragiles',
                          'Montage et démontage mobilier',
                          'Assurance renforcée',
                          'Support prioritaire',
                        ]}
                        prixMin={pricing.prixMin}
                        prixAvg={pricing.prixAvg}
                        prixMax={pricing.prixMax}
                        recommended
                        selected={formState.formule === 'STANDARD'}
                        onSelect={() => updateField('formule', 'STANDARD')}
                      />
                      <FormuleCard
                        id="premium"
                        badge="👑 Premium"
                        title="Déménagement Premium"
                        subtitle="Service haut de gamme"
                        features={[
                          'Transport et chargement',
                          'Objets fragiles',
                          'Emballage de vos biens',
                          'Montage et démontage',
                          'Assurance tous risques',
                          'Support dédié 24/7',
                        ]}
                        prixMin={Math.round(pricing.prixMin * 1.12)}
                        prixAvg={Math.round(pricing.prixAvg * 1.12)}
                        prixMax={Math.round(pricing.prixMax * 1.12)}
                        selected={formState.formule === 'PREMIUM'}
                        onSelect={() => updateField('formule', 'PREMIUM')}
                      />
                    </>
                  )}
                </div>
            </div>
            
              <div className="flex gap-4">
                <button
                  onClick={() => goToStep(2)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleNext}
                  disabled={!pricing}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  Suivant →
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 4 : Récapitulatif */}
          {formState.currentStep === 4 && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-center text-white">
                🎉 Bravo ! Nous avons toutes les informations
              </h2>
              <p className="text-center text-white/80 mb-8 text-lg">
                Nous avons tout ce qu'il faut pour demander vos devis personnalisés
              </p>

              {/* Vérification email */}
              <div className="mb-8 p-6 bg-white/10 border border-white/20 rounded-xl">
                <h3 className="font-bold mb-3 text-white">📧 Vérifiez votre email</h3>
                <p className="text-sm text-white/70 mb-3">
                  Assurez-vous que votre adresse est correcte pour ne pas perdre contact :
                </p>
                <Input
                  label=""
                  type="email"
                  value={formState.email}
                  onChange={(v) => updateField('email', v)}
                  placeholder="votre@email.com"
                />
              </div>

              {/* Récapitulatif */}
              <div className="mb-8 p-6 bg-white/10 border border-white/20 rounded-xl">
                <h3 className="font-bold mb-4 text-white flex items-center justify-between">
                  📋 Récapitulatif de votre demande
                  <button 
                    onClick={() => goToStep(2)} 
                    className="text-sm text-brand-secondary hover:underline font-normal"
                  >
                    Modifier
                  </button>
                </h3>
                <p className="text-white/90 text-base leading-relaxed">
                  Vous déménagez un <span className="font-bold text-white">{formState.housingType.toUpperCase()} de {formState.surfaceM2} m²</span> ({formState.density === 'light' ? 'sobre' : formState.density === 'normal' ? 'normalement meublé' : 'densément meublé'})
                  {' '}de <span className="font-bold text-white">{formState.originAddress || '[Point de départ]'}</span>
                  {' '}à <span className="font-bold text-white">{formState.destinationAddress || '[Point d\'arrivée]'}</span>
                  {formState.movingDate && (
                    <>
                      {' '}le <span className="font-bold text-white">{new Date(formState.movingDate).toLocaleDateString('fr-FR')}</span>
                      {formState.dateFlexible && formState.movingDateEnd && (
                        <> au <span className="font-bold text-white">{new Date(formState.movingDateEnd).toLocaleDateString('fr-FR')}</span></>
                      )}
                    </>
                  )}.
                </p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-white/90">
                    Vous souhaitez un accompagnement <span className="font-bold text-brand-secondary">{formState.formule}</span>
                  </p>
                </div>
              </div>

              {/* Ce qui va se passer */}
              <div className="mb-8 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-brand-secondary/30 rounded-xl">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  🚀 Voici ce qui va se passer maintenant
                </h3>
                <ol className="space-y-5">
                  {[
                    {
                      num: 1,
                      title: 'Confirmation immédiate',
                      desc: 'Vous recevrez un email de confirmation dans les 2 minutes.',
                    },
                    {
                      num: 2,
                      title: 'Transmission aux déménageurs',
                      desc: 'Votre demande est envoyée à 3 à 6 déménageurs qualifiés.',
                    },
                    {
                      num: 3,
                      title: 'Réception des devis',
                      desc: 'Sous 24 à 48h, vous recevez vos devis détaillés par email.',
                    },
                    {
                      num: 4,
                      title: 'Vous comparez et choisissez',
                      desc: 'Aucune obligation, vous choisissez le meilleur rapport qualité-prix.',
                    },
                  ].map((step) => (
                    <li key={step.num} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-brand-secondary text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-sm text-white/80">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                {/* Garanties */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <h4 className="font-bold mb-3 text-white">✅ Nos garanties</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      100% gratuit, sans engagement
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Déménageurs vérifiés
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Aucun harcèlement
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Données confidentielles (RGPD)
                    </div>
                  </div>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-4">
                <button
                  onClick={() => goToStep(3)}
                  className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSaving ? (
                    <>
                      <span className="animate-spin">⏳</span> Envoi en cours...
                    </>
                  ) : (
                    <>
                      🚀 Obtenir mes devis gratuits
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
