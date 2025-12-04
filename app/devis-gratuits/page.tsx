'use client';

export const dynamic = 'force-dynamic';

import React, { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { FormState, INITIAL_FORM_STATE, PricingResult } from '@/lib/form-types';
import { calculatePricing, calculateVolume, formatPrice, calculateDistance } from '@/lib/pricing';
import { CONSTANTS, type HousingType } from '@/lib/moverz-constants';
import { createLead, updateLead, requestLeadConfirmation, getSource, mapElevatorToBackend, mapDensityToBackend, mapFurnitureLiftToBackend } from '@/lib/api-client';
import { FRENCH_POSTCODES } from '@/lib/french-cities';
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

const HOUSING_SURFACE_TYPICAL: Record<HousingType, number> = {
  studio: CONSTANTS.surfaces.studio.typical,
  t1: CONSTANTS.surfaces.t1.typical,
  t2: CONSTANTS.surfaces.t2.typical,
  t3: CONSTANTS.surfaces.t3.typical,
  t4: CONSTANTS.surfaces.t4.typical,
  t5: CONSTANTS.surfaces.t5.typical,
  house: CONSTANTS.surfaces.house.typical,
  house_1floor: CONSTANTS.surfaces.house_1floor.typical,
  house_2floors: CONSTANTS.surfaces.house_2floors.typical,
  house_3floors: CONSTANTS.surfaces.house_3floors.typical,
};

function getHousingLabel(housingType: string): string {
  return HOUSING_LABELS[housingType] ?? housingType;
}

function getHousingSurfaceLabel(housingType: string): string {
  const key = housingType as HousingType;
  const surface = HOUSING_SURFACE_TYPICAL[key] ?? HOUSING_SURFACE_TYPICAL.t2;
  return `~${surface}m²`;
}

// Petit composant d'aide contextuelle (icône + bulle au survol)
function HelpTooltip({ text }: { text: string }) {
  return (
    <span className="relative inline-flex items-center ml-2 group" tabIndex={0}>
      <span className="w-4 h-4 flex items-center justify-center rounded-full border border-[#E3E5E8] bg-white text-[10px] font-bold text-[#04163a] group-hover:border-[#6BCFCF] group-focus-visible:border-[#6BCFCF]">
        ?
      </span>
      <div className="absolute z-20 hidden group-hover:block group-focus-within:block left-1/2 top-full mt-2 -translate-x-1/2 min-w-[220px] max-w-xs bg-white border border-[#E3E5E8] rounded-xl shadow-lg p-3 text-xs text-[#04163a]">
        {text}
      </div>
    </span>
  );
}

// Composant groupant Code postal + Ville + Adresse
function PostalCityGroup({
  postalCode,
  city,
  address,
  onPostalCodeChange,
  onCityChange,
  onAddressChange,
}: {
  postalCode: string;
  city: string;
  address: string;
  onPostalCodeChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}) {
  const [cityMode, setCityMode] = useState<'NONE' | 'LIST' | 'OTHER'>('NONE');

  const handlePostalChange = (val: string) => {
    const sanitized = val.replace(/\D/g, '').slice(0, 5);
    onPostalCodeChange(sanitized);
    // Reset ville lorsqu'on change de code postal
    setCityMode('NONE');
    onCityChange('');
  };

  const isPostcodeFormatValid = postalCode.length === 5;
  const cities =
    isPostcodeFormatValid && FRENCH_POSTCODES[postalCode]
      ? FRENCH_POSTCODES[postalCode]
      : [];
  const hasPostcodeWarning =
    isPostcodeFormatValid && cities.length === 0 && postalCode.length === 5;

  const handleCitySelectChange = (val: string) => {
    if (val === '__other__') {
      setCityMode('OTHER');
      onCityChange('');
    } else if (val) {
      setCityMode('LIST');
      onCityChange(val);
    } else {
      setCityMode('NONE');
      onCityChange('');
    }
  };

  const citySelectValue =
    cityMode === 'OTHER' ? '__other__' : city || '';

  return (
    <>
      {/* Code postal */}
      <div className="mb-4">
      <label className="block text-sm font-semibold text-[#04163a] mb-2">
          Code postal <span className="text-[#6BCFCF] ml-1">*</span>
      </label>
      <input
        type="text"
          inputMode="numeric"
          maxLength={5}
          value={postalCode}
          onChange={(e) => handlePostalChange(e.target.value)}
          className="w-full px-4 py-3.5 bg-white border-2 border-[#E3E5E8] rounded-xl text-[#04163a] placeholder-[#4b5c6b]/50 focus:outline-none focus:border-[#6BCFCF] focus:shadow-[0_0_0_4px_rgba(107,207,207,0.1),0_4px_20px_rgba(107,207,207,0.15)] transition-all duration-300"
          placeholder="Ex: 33700"
        />
        {hasPostcodeWarning && (
          <p className="mt-1 text-xs text-amber-700">
            Code postal non présent dans notre base interne. Vous pouvez continuer en
            saisissant la ville manuellement.
          </p>
        )}
      </div>

      {/* Ville */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#04163a] mb-2">
          Ville <span className="text-[#6BCFCF] ml-1">*</span>
        </label>
        <select
          value={citySelectValue}
          onChange={(e) => handleCitySelectChange(e.target.value)}
          disabled={!isPostcodeFormatValid}
          className="w-full px-4 py-3 bg-white border border-[#E3E5E8] rounded-xl text-[#04163a] focus:outline-none focus:border-[#6BCFCF] focus:ring-4 focus:ring-[#6BCFCF]/10 transition-all duration-200 cursor-pointer disabled:bg-[#F8F9FA] disabled:cursor-not-allowed"
        >
          <option value="">
            {isPostcodeFormatValid
              ? 'Sélectionnez une ville ou choisissez "Autre ville…"'
              : 'Entrez un code postal valide'}
          </option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          {isPostcodeFormatValid && (
            <option value="__other__">Autre ville…</option>
          )}
        </select>
        {cityMode === 'OTHER' && (
          <input
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="Saisissez votre ville"
            className="mt-3 w-full px-4 py-3.5 bg-white border-2 border-[#E3E5E8] rounded-xl text-[#04163a] placeholder-[#4b5c6b]/50 focus:outline-none focus:border-[#6BCFCF] focus:shadow-[0_0_0_4px_rgba(107,207,207,0.1),0_4px_20px_rgba(107,207,207,0.15)] transition-all duration-300"
          />
        )}
      </div>

      {/* Adresse détaillée (facultative) */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#04163a] mb-2 flex items-center">
          <span>Adresse (facultatif)</span>
          <HelpTooltip text="Nous n'avons pas besoin de votre adresse exacte pour obtenir des devis. Mais un dossier complet permet aux déménageurs de faire une estimation plus précise. À vous de décider." />
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="Numéro et rue, bâtiment, étage..."
          className="w-full px-4 py-3.5 bg-white border-2 border-[#E3E5E8] rounded-xl text-[#04163a] placeholder-[#4b5c6b]/50 focus:outline-none focus:border-[#6BCFCF] focus:shadow-[0_0_0_4px_rgba(107,207,207,0.1),0_4px_20px_rgba(107,207,207,0.15)] transition-all duration-300"
        />
    </div>
    </>
  );
}

// Stepper Component - Stripe-like
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
    { number: 4, label: 'Validez votre dossier' },
  ];

  return (
    <div className="mb-16">
      {/* Progress bar avec glow */}
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-1 bg-[#E3E5E8] rounded-full" />
        <div 
          className="absolute top-5 left-0 h-1 bg-gradient-to-r from-[#6BCFCF] to-[#4FB8B8] rounded-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(107,207,207,0.5)]"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        
        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.number);
            const isCurrent = step.number === currentStep;
            const isClickable = isCompleted || isCurrent;
            
            return (
            <button
                key={step.number}
              type="button"
                onClick={() => isClickable && onStepClick(step.number)}
                disabled={!isClickable}
                className={`flex flex-col items-center group ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#6BCFCF] to-[#4FB8B8] text-[#04141f] shadow-[0_0_0_8px_rgba(107,207,207,0.15),0_4px_20px_rgba(107,207,207,0.4)] scale-110 motion-safe:animate-soft-pulse'
                    : isCompleted
                    ? 'bg-[#6BCFCF] text-white group-hover:scale-110 group-hover:shadow-[0_4px_20px_rgba(107,207,207,0.3)]'
                    : 'bg-white border-2 border-[#E3E5E8] text-[#4b5c6b]'
                }`}>
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`mt-3 text-xs font-semibold transition-colors ${
                  isCurrent ? 'text-[#6BCFCF]' : isCompleted ? 'text-[#04163a]' : 'text-[#4b5c6b]'
                }`}>
              {step.label}
            </span>
              </button>
            );
          })}
          </div>
      </div>
    </div>
  );
}

// Input Component - Stripe-like
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
    <div className="mb-6">
      <label className="block text-sm font-semibold text-[#04163a] mb-2">
        {label}
        {required && <span className="text-[#6BCFCF] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-3.5 bg-white border-2 border-[#E3E5E8] rounded-xl text-[#04163a] placeholder-[#4b5c6b]/50 focus:outline-none focus:border-[#6BCFCF] focus:shadow-[0_0_0_4px_rgba(107,207,207,0.1),0_4px_20px_rgba(107,207,207,0.15)] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F8F9FA] transition-all duration-300"
      />
      {helpText && (
        <p className="mt-2 text-xs text-[#4b5c6b] bg-[#F8F9FA] border border-[#E3E5E8] rounded-lg p-3">
          {helpText}
        </p>
      )}
    </div>
  );
}

// Select Component - Stripe-like
function Select({
  label,
  help,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  help?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: { value: string | number; label: string }[];
  required?: boolean;
}) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-[#04163a] mb-2 flex items-center">
        <span>
        {label}
        {required && <span className="text-[#6BCFCF] ml-1">*</span>}
        </span>
        {help && <HelpTooltip text={help} />}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 bg-white border border-[#E3E5E8] rounded-xl text-[#04163a] focus:outline-none focus:border-[#6BCFCF] focus:ring-4 focus:ring-[#6BCFCF]/10 transition-all duration-200 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Checkbox Component - Stripe-like
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
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-5 h-5 rounded border-2 border-[#E3E5E8] text-[#6BCFCF] focus:ring-4 focus:ring-[#6BCFCF]/10 transition-all cursor-pointer"
      />
      <span className="text-sm text-[#04163a] group-hover:text-[#6BCFCF] transition-colors">{label}</span>
    </label>
  );
}

// Formule Card Component - Stripe-like
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
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative p-8 rounded-3xl transition-all duration-300 w-full text-left ${
        selected 
          ? 'bg-white border-2 border-[#6BCFCF] shadow-[0_0_0_4px_rgba(107,207,207,0.1),0_12px_40px_rgba(107,207,207,0.3)] scale-105' 
          : 'bg-white border-2 border-[#E3E5E8] hover:border-[#6BCFCF]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-2'
      }`}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6BCFCF] to-[#4FB8B8] text-[#04141f] px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_4px_20px_rgba(107,207,207,0.4)] group-hover:shadow-[0_6px_30px_rgba(107,207,207,0.5)] transition-shadow duration-300">
          Recommandé
        </div>
      )}
      
      {selected && (
        <div className="absolute top-6 right-6 w-8 h-8 bg-[#6BCFCF] rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F8F9FA] text-[#04163a] border border-[#E3E5E8] mb-4">
        {badge.replace(/💰|⭐|👑/g, '').trim()}
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-[#04163a]">{title}</h3>
      <p className="text-sm text-[#4b5c6b] mb-6">{subtitle}</p>
      
      {/* Prix principal */}
      <div className="mb-6 pb-6 border-b border-[#E3E5E8]">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-[#04163a]">{formatPrice(prixAvg)}</span>
          <span className="text-sm text-[#4b5c6b]">/déménagement</span>
        </div>
        <div className="mt-2 text-xs text-[#4b5c6b]">
          De {formatPrice(prixMin)} à {formatPrice(prixMax)}
        </div>
      </div>
      
      {/* Features */}
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-[#04163a]">
            <svg className="w-5 h-5 text-[#6BCFCF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}

function InventaireIAPageInner() {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);
  const [confirmationError, setConfirmationError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const hasInitializedFromUrlRef = useRef(false);

  const originPostcode = formState.originPostalCode || '';
  const destinationPostcode = formState.destinationPostalCode || '';

  const isOriginPostcodeValid =
    originPostcode.length === 5;
  const isDestinationPostcodeValid =
    destinationPostcode.length === 5;

  // Load from localStorage + URL query params (only once on mount)
  useEffect(() => {
    if (hasInitializedFromUrlRef.current) return;
    hasInitializedFromUrlRef.current = true;

    let baseState: FormState = { ...INITIAL_FORM_STATE };
    let baseCompletedSteps: number[] = [];

    // 1) Restaurer une éventuelle session locale
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('moverz_form_state') : null;
      if (saved) {
        const parsedRaw = JSON.parse(saved);
        const parsed: FormState = {
          ...INITIAL_FORM_STATE,
          ...parsedRaw,
        };
        // RÈGLE : Ne charger QUE si leadId existe ET step < 4
        if (parsed.leadId && parsed.currentStep < 4) {
          baseState = parsed;
          baseCompletedSteps = parsedRaw.completedSteps || [];
          console.log('📦 Session restaurée:', parsed.leadId);
        } else {
          console.log('🗑️ Session invalide supprimée');
          if (typeof window !== 'undefined') {
            localStorage.removeItem('moverz_form_state');
          }
        }
      }
    } catch (e) {
      console.error('Error loading form state:', e);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('moverz_form_state');
      }
    }

    // 2) Appliquer les query params (prioritaires sur localStorage)
    try {
      const emailParam = searchParams.get('email');
      const firstNameParam = searchParams.get('firstName');
      const lastNameParam = searchParams.get('lastName');
      const originPostalParam = searchParams.get('originPostalCode');
      const originCityParam = searchParams.get('originCity');
      const destPostalParam = searchParams.get('destPostalCode');
      const destCityParam = searchParams.get('destCity');
      const movingDateParam = searchParams.get('movingDate');
      const estimatedVolumeParam = searchParams.get('estimatedVolume');
      const surfaceM2Param = searchParams.get('surfaceM2');

      // Champs "riches" du projet (logements, étages, ascenseur, etc.)
      const originAddressParam = searchParams.get('originAddress');
      const originHousingTypeParam = searchParams.get('originHousingType');
      const originFloorParam = searchParams.get('originFloor');
      const originElevatorParam = searchParams.get('originElevator');
      const originFurnitureLiftParam = searchParams.get('originFurnitureLift');
      const originCarryDistanceParam = searchParams.get('originCarryDistance');
      const originParkingAuthParam = searchParams.get('originParkingAuth');

      const destAddressParam = searchParams.get('destAddress');
      const destHousingTypeParam = searchParams.get('destHousingType');
      const destFloorParam = searchParams.get('destFloor');
      const destElevatorParam = searchParams.get('destElevator');
      const destFurnitureLiftParam = searchParams.get('destFurnitureLift');
      const destCarryDistanceParam = searchParams.get('destCarryDistance');
      const destParkingAuthParam = searchParams.get('destParkingAuth');

      const leadIdFromUrl = searchParams.get('leadId');

      // leadId : l'URL est la source de vérité
      if (leadIdFromUrl) {
        if (baseState.leadId && baseState.leadId !== leadIdFromUrl) {
          // Nouveau lead → on repart d'un état propre et on nettoie l'ancienne session
          baseState = { ...INITIAL_FORM_STATE, leadId: leadIdFromUrl };
          baseCompletedSteps = [];
          if (typeof window !== 'undefined') {
            localStorage.removeItem('moverz_form_state');
          }
        } else {
          baseState = { ...baseState, leadId: leadIdFromUrl };
        }
      }

      let nextState: FormState = {
        ...baseState,
      };

      if (emailParam) {
        nextState = { ...nextState, email: emailParam };
      }

      if (firstNameParam || lastNameParam) {
        const combinedName = `${firstNameParam || ''}${lastNameParam ? ` ${lastNameParam}` : ''}`.trim();
        if (combinedName) {
          nextState = { ...nextState, contactName: combinedName };
        }
      }

      if (originPostalParam) {
        nextState = { ...nextState, originPostalCode: originPostalParam };
      }
      if (originCityParam) {
        nextState = { ...nextState, originCity: originCityParam };
      }
      if (destPostalParam) {
        nextState = { ...nextState, destinationPostalCode: destPostalParam };
      }
      if (destCityParam) {
        nextState = { ...nextState, destinationCity: destCityParam };
      }
      if (movingDateParam) {
        nextState = { ...nextState, movingDate: movingDateParam };
      }

      // Surface prioritaire si fournie
      if (surfaceM2Param) {
        const m2 = parseInt(surfaceM2Param, 10);
        if (!Number.isNaN(m2)) {
          nextState = { ...nextState, surfaceM2: m2 };
        }
      } else if (estimatedVolumeParam) {
        // Fallback : déduire une surface approximative du volume seulement
        const vol = parseFloat(estimatedVolumeParam);
        if (!Number.isNaN(vol) && baseState.surfaceM2 === INITIAL_FORM_STATE.surfaceM2) {
          nextState = { ...nextState, surfaceM2: Math.round(vol) };
        }
      }

      // Appliquer les champs détaillés seulement s'ils sont présents
      if (originAddressParam) {
        nextState = { ...nextState, originAddress: originAddressParam };
      }
      if (originHousingTypeParam) {
        nextState = { ...nextState, originHousingType: originHousingTypeParam as any };
      }
      if (originFloorParam) {
        const f = parseInt(originFloorParam, 10);
        if (!Number.isNaN(f)) {
          nextState = { ...nextState, originFloor: f };
        }
      }
      if (originElevatorParam) {
        nextState = { ...nextState, originElevator: originElevatorParam as any };
      }
      if (originFurnitureLiftParam) {
        nextState = { ...nextState, originFurnitureLift: originFurnitureLiftParam as any };
      }
      if (originCarryDistanceParam) {
        nextState = { ...nextState, originCarryDistance: originCarryDistanceParam as any };
      }
      if (originParkingAuthParam != null) {
        if (originParkingAuthParam === 'true' || originParkingAuthParam === '1') {
          nextState = { ...nextState, originParkingAuth: true };
        } else if (originParkingAuthParam === 'false' || originParkingAuthParam === '0') {
          nextState = { ...nextState, originParkingAuth: false };
        }
      }

      if (destAddressParam) {
        nextState = { ...nextState, destinationAddress: destAddressParam };
      }
      if (destHousingTypeParam) {
        nextState = { ...nextState, destinationHousingType: destHousingTypeParam as any };
      }
      if (destFloorParam) {
        const f = parseInt(destFloorParam, 10);
        if (!Number.isNaN(f)) {
          nextState = { ...nextState, destinationFloor: f };
        }
      }
      if (destElevatorParam) {
        nextState = { ...nextState, destinationElevator: destElevatorParam as any };
      }
      if (destFurnitureLiftParam) {
        nextState = { ...nextState, destinationFurnitureLift: destFurnitureLiftParam as any };
      }
      if (destCarryDistanceParam) {
        nextState = { ...nextState, destinationCarryDistance: destCarryDistanceParam as any };
      }
      if (destParkingAuthParam != null) {
        if (destParkingAuthParam === 'true' || destParkingAuthParam === '1') {
          nextState = { ...nextState, destinationParkingAuth: true };
        } else if (destParkingAuthParam === 'false' || destParkingAuthParam === '0') {
          nextState = { ...nextState, destinationParkingAuth: false };
        }
      }

      setFormState(nextState);
      setCompletedSteps(baseCompletedSteps);
    } catch (e) {
      console.error('Error applying query params to form state:', e);
      // En cas d'erreur, on retombe sur l'état de base (localStorage ou défaut)
      setFormState(baseState);
      setCompletedSteps(baseCompletedSteps);
    }

    setIsLoaded(true);
  }, [searchParams]);

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
      if (formState.originCity && formState.destinationCity) {
        distance = calculateDistance(
          formState.originCity || 'nice',
          formState.destinationCity || 'paris'
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
      
      await updateLead(state.leadId, {
        // Adresses
        originAddress: state.originAddress || undefined,
        originCity: state.originCity || undefined,
        originPostalCode: state.originPostalCode || undefined,
        destAddress: state.destinationAddress || undefined,  // ⚠️ Backend attend "destAddress", pas "destinationAddress"
        destCity: state.destinationCity || undefined,
        destPostalCode: state.destinationPostalCode || undefined,
        
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
      const key = formState.originHousingType as HousingType;
      const suggestedSurface = HOUSING_SURFACE_TYPICAL[key] ?? HOUSING_SURFACE_TYPICAL.t2;

      // Ne pas écraser une surface déjà connue (par ex. issue d'un lead existant /
      // d'un lien de relance). On ne remplace que si on est encore sur la valeur par défaut.
      if (formState.surfaceM2 === INITIAL_FORM_STATE.surfaceM2) {
        updateField('surfaceM2', suggestedSurface);
      }

      // On synchronise le type de logement pour le pricing, en conservant la distinction entre maisons
      updateField('housingType', formState.originHousingType as FormState['housingType']);
    }
    
    // Étape 3 → 4 : Sauvegarder + demander l'email de confirmation
    if (formState.currentStep === 3) {
    if (!formState.leadId) {
        alert('Erreur : aucun lead créé. Veuillez recommencer.');
      return;
    }
    
    try {
      setIsSaving(true);
        setConfirmationError(null);

        // S'assurer que tout est bien sauvegardé avant la demande de confirmation
        await saveToBackend({ ...formState, currentStep: 3 });

        await requestLeadConfirmation(formState.leadId);

        const emailTrimmed = formState.email.trim().toLowerCase();
        setConfirmationEmail(emailTrimmed);

        if (!completedSteps.includes(3)) {
          setCompletedSteps((prev) => [...prev, 3]);
        }
        goToStep(4);
      } catch (error: any) {
        console.error('❌ Erreur lors de la demande de confirmation email:', error);
        setConfirmationError(error?.message || 'Erreur lors de l’envoi de l’email de confirmation. Veuillez réessayer.');
        alert('Erreur lors de l’envoi de l’email de confirmation. Vos informations sont sauvegardées, vous pouvez réessayer.');
    } finally {
      setIsSaving(false);
    }
      return;
    }

    if (!completedSteps.includes(formState.currentStep)) {
      setCompletedSteps((prev) => [...prev, formState.currentStep]);
    }
    goToStep(formState.currentStep + 1);
  };

  const handleSubmit = async () => {
    // Nouvelle logique : à ce stade tout est déjà sauvegardé et
    // l'email de confirmation a été demandé. On se contente de
    // rediriger vers la page de remerciement.
    window.location.href = '/devis-gratuits/merci/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#04141f] via-[#04163a] to-[#04141f] py-16 relative overflow-hidden">
      {/* Halos décoratifs animés */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#6BCFCF]/10 rounded-full blur-3xl motion-safe:animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#4FB8B8]/10 rounded-full blur-3xl motion-safe:animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container max-w-3xl mx-auto px-4 relative z-10">
        {/* Card Stripe-like premium */}
        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/20 backdrop-blur-sm motion-safe:animate-fade-up-soft">
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
                className="text-xs text-[#4b5c6b] hover:text-[#6BCFCF] underline transition-colors"
              >
                Recommencer
              </button>
            </div>
          )}
          
          {/* Badge + Titre */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#6BCFCF]/10 to-[#4FB8B8]/10 border border-[#6BCFCF]/20 mb-6">
              <svg className="w-4 h-4 text-[#6BCFCF]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-[#04163a]">5 min · 0 spam · 5+ devis fiables</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#04163a] leading-tight">
              Demande de Devis Déménagement
            </h1>
            <p className="text-[#4b5c6b] text-lg max-w-2xl mx-auto">
              Obtenez 3 à 6 devis personnalisés sous 24h
            </p>
          </div>

          <Stepper 
            currentStep={formState.currentStep} 
            completedSteps={completedSteps} 
            onStepClick={goToStep}
          />

          {/* ÉTAPE 1 : Contact */}
          {formState.currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#04163a]">Comment souhaitez-vous être contacté ?</h2>
              
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
                className="group relative w-full bg-gradient-to-r from-[#6BCFCF] to-[#4FB8B8] text-[#04141f] py-4 rounded-xl font-bold overflow-hidden hover:shadow-[0_0_0_4px_rgba(107,207,207,0.15),0_8px_30px_rgba(107,207,207,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">
                  {isSaving ? (
                    <>
                      <span className="animate-spin">⏳</span> Sauvegarde...
                    </>
                  ) : (
                    'Suivant →'
                  )}
                </span>
              </button>
            </div>
          )}

          {/* ÉTAPE 2 : Projet */}
          {formState.currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#04163a]">Parlez-nous de votre déménagement</h2>

              {/* 2 COLONNES : Adresse actuelle et Nouvelle adresse */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                
                {/* BLOC 1 : Adresse actuelle */}
                <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-[#E3E5E8]">
                  <h3 className="font-bold mb-4 text-[#04163a] text-lg">Adresse actuelle</h3>
                  
                  <PostalCityGroup
                    postalCode={formState.originPostalCode}
                    city={formState.originCity}
                    address={formState.originAddress}
                    onPostalCodeChange={(v) => updateField('originPostalCode', v)}
                    onCityChange={(v) => updateField('originCity', v)}
                    onAddressChange={(v) => updateField('originAddress', v)}
                  />

                    <Select
                      label="Type de logement"
                      help="T1, T2, T3... correspondent au nombre de pièces principales (hors cuisine, salle de bain). Maison = logement individuel. Choisissez ce qui se rapproche le plus de votre logement."
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
                      help="Nous devons savoir si le logement est facilement accessible (escaliers, ascenseur, petit ou grand). Cela impacte le temps et le matériel nécessaires."
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
                      help="Avons-nous besoin de prévoir un monte-meuble à cette adresse ? Si vous avez des meubles volumineux à faire passer par la fenêtre ou si l'accès est compliqué, cela peut être nécessaire."
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
                      help="C'est la distance prévue entre l'arrière du camion et l'entrée de votre logement (ou du hall). Plus elle est longue, plus le déménagement demande de temps et d'efforts."
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
                <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-[#E3E5E8]">
                  <h3 className="font-bold mb-4 text-[#04163a] text-lg">Nouvelle adresse</h3>
                  
                  <PostalCityGroup
                    postalCode={formState.destinationPostalCode}
                    city={formState.destinationCity}
                    address={formState.destinationAddress}
                    onPostalCodeChange={(v) => updateField('destinationPostalCode', v)}
                    onCityChange={(v) => updateField('destinationCity', v)}
                    onAddressChange={(v) => updateField('destinationAddress', v)}
                  />

                      <Select
                        label="Type de logement"
                        help="T1, T2, T3... correspondent au nombre de pièces principales (hors cuisine, salle de bain). Maison = logement individuel. Choisissez ce qui se rapproche le plus de votre logement."
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
                          help="Nous devons savoir si le logement est facilement accessible (escaliers, ascenseur, petit ou grand). Cela impacte le temps et le matériel nécessaires."
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
                          help="Avons-nous besoin de prévoir un monte-meuble à cette adresse ? Si vous avez des meubles volumineux à faire passer par la fenêtre ou si l'accès est compliqué, cela peut être nécessaire."
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
                          help="C'est la distance prévue entre l'arrière du camion et l'entrée de votre logement (ou du hall). Plus elle est longue, plus le déménagement demande de temps et d'efforts."
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
              <div className="mb-8 p-6 bg-[#F8F9FA] rounded-2xl border border-[#E3E5E8]">
                <h3 className="font-bold mb-4 text-[#04163a] text-lg">Date de déménagement</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-[#04163a]">
                    Date souhaitée <span className="text-[#6BCFCF] ml-1">*</span>
                  </label>
                  <p className="text-xs text-[#4b5c6b] mb-2">
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
                    className="w-full px-4 py-3 bg-white border border-[#E3E5E8] rounded-xl text-[#04163a] placeholder-[#4b5c6b]/50 focus:outline-none focus:border-[#6BCFCF] focus:ring-4 focus:ring-[#6BCFCF]/10 transition-all duration-200"
                    calendarClassName="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                    inline={false}
                  />
                  {formState.movingDate && formState.movingDateEnd && (
                    <p className="mt-2 text-sm text-[#4b5c6b]">
                      · Plage sélectionnée : du {new Date(formState.movingDate).toLocaleDateString('fr-FR')} au {new Date(formState.movingDateEnd).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                  {formState.movingDate && !formState.movingDateEnd && (
                    <p className="mt-2 text-sm text-[#4b5c6b]">
                      · Date fixe : {new Date(formState.movingDate).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => goToStep(1)}
                  className="flex-1 bg-white border-2 border-[#E3E5E8] text-[#04163a] py-3 rounded-xl font-medium hover:border-[#6BCFCF] hover:text-[#6BCFCF] transition-all duration-300"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleNext}
                  disabled={
                    !isOriginPostcodeValid ||
                    !isDestinationPostcodeValid ||
                    !formState.originCity ||
                    !formState.destinationCity ||
                    !formState.movingDate
                  }
                  className="group relative flex-1 bg-gradient-to-r from-[#6BCFCF] to-[#4FB8B8] text-[#04141f] py-4 rounded-xl font-bold overflow-hidden hover:shadow-[0_0_0_4px_rgba(107,207,207,0.15),0_8px_30px_rgba(107,207,207,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Suivant →</span>
                </button>
        </div>
      </div>
          )}

          {/* ÉTAPE 3 : Volume & Services */}
          {formState.currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#04163a]">Volume et Services</h2>

              <div className="mb-6">
                <h3 className="font-bold mb-4 text-[#04163a]">Estimation du volume · Superficie</h3>
                
                {/* Type de logement sélectionné */}
                <p className="text-[#4b5c6b] mb-4">
                  Superficie moyenne d'un{' '}
                  <span className="font-bold text-[#04163a]">
                    {getHousingLabel(formState.originHousingType)}
                  </span>
                  {' '}:{' '}
                  <span className="font-bold text-[#6BCFCF]">
                    {getHousingSurfaceLabel(formState.originHousingType)}
                  </span>
                  {' '}
                  <button 
                    onClick={() => goToStep(2)} 
                    className="text-sm text-[#6BCFCF] hover:underline"
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
                  <label className="block text-sm font-semibold mb-2 text-[#04163a]">
                    Quantité de meubles et affaires
                  </label>
                  <p className="text-xs text-[#4b5c6b] mb-4">
                    Cela nous aide à estimer le volume à déménager
                  </p>
                  
                  {/* Layout Stripe : Vertical sur mobile, Horizontal sur desktop */}
                  <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-4">
                    {/* Minimaliste */}
                    <button
                      type="button"
                      onClick={() => updateField('density', 'light')}
                      className={`group relative flex items-center md:flex-col md:text-center p-4 md:p-6 border-2 rounded-xl md:rounded-2xl transition-all duration-300 ${
                        formState.density === 'light'
                          ? 'border-[#6BCFCF] bg-[#6BCFCF]/5 shadow-[0_4px_20px_rgba(107,207,207,0.2)] md:shadow-[0_8px_30px_rgba(107,207,207,0.25)] md:scale-105'
                          : 'border-[#E3E5E8] bg-white hover:border-[#6BCFCF]/50 hover:shadow-md md:hover:-translate-y-1 md:hover:shadow-lg active:scale-[0.98]'
                      }`}
                    >
                      {/* SVG à gauche sur mobile, centré sur desktop */}
                      <div className="flex-shrink-0 mr-4 md:mr-0 md:mb-3">
                        <svg width="60" height="60" viewBox="0 0 100 100" className="md:w-20 md:h-20">
                          <rect x="10" y="10" width="80" height="80" fill="none" stroke="#6BCFCF" strokeWidth="2" rx="4"/>
                          <rect x="20" y="65" width="25" height="15" fill="#6BCFCF" opacity="0.3" rx="2"/>
                          <rect x="55" y="68" width="15" height="10" fill="#6BCFCF" opacity="0.3" rx="1"/>
                          <rect x="65" y="20" width="20" height="25" fill="#6BCFCF" opacity="0.3" rx="2"/>
                        </svg>
                      </div>
                      
                      {/* Texte */}
                      <div className="flex-1 text-left md:text-center">
                        <div className="font-bold text-[#04163a] text-base md:text-lg mb-1">Minimaliste</div>
                        <div className="text-xs text-[#4b5c6b] mb-2 md:mb-3">Peu de meubles · Cartons limités</div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                          -10% volume
                        </div>
                      </div>
                    </button>

                    {/* Standard */}
                    <button
                      type="button"
                      onClick={() => updateField('density', 'normal')}
                      className={`group relative flex items-center md:flex-col md:text-center p-4 md:p-6 border-2 rounded-xl md:rounded-2xl transition-all duration-300 ${
                        formState.density === 'normal'
                          ? 'border-[#6BCFCF] bg-[#6BCFCF]/5 shadow-[0_4px_20px_rgba(107,207,207,0.2)] md:shadow-[0_8px_30px_rgba(107,207,207,0.25)] md:scale-105'
                          : 'border-[#E3E5E8] bg-white hover:border-[#6BCFCF]/50 hover:shadow-md md:hover:-translate-y-1 md:hover:shadow-lg active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex-shrink-0 mr-4 md:mr-0 md:mb-3">
                        <svg width="60" height="60" viewBox="0 0 100 100" className="md:w-20 md:h-20">
                          <rect x="10" y="10" width="80" height="80" fill="none" stroke="#6BCFCF" strokeWidth="2" rx="4"/>
                          <rect x="15" y="60" width="30" height="18" fill="#6BCFCF" opacity="0.4" rx="2"/>
                          <rect x="50" y="65" width="18" height="12" fill="#6BCFCF" opacity="0.4" rx="1"/>
                          <rect x="65" y="15" width="22" height="28" fill="#6BCFCF" opacity="0.4" rx="2"/>
                          <rect x="15" y="15" width="15" height="25" fill="#6BCFCF" opacity="0.4" rx="1"/>
                          <rect x="40" y="20" width="18" height="18" fill="#6BCFCF" opacity="0.4" rx="1"/>
                        </svg>
                      </div>
                      
                      <div className="flex-1 text-left md:text-center">
                        <div className="font-bold text-[#04163a] text-base md:text-lg mb-1">Standard</div>
                        <div className="text-xs text-[#4b5c6b] mb-2 md:mb-3">Meubles classiques · Affaires normales</div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                          Volume normal
                        </div>
                      </div>
                    </button>

                    {/* Bien rempli */}
                    <button
                      type="button"
                      onClick={() => updateField('density', 'dense')}
                      className={`group relative flex items-center md:flex-col md:text-center p-4 md:p-6 border-2 rounded-xl md:rounded-2xl transition-all duration-300 ${
                        formState.density === 'dense'
                          ? 'border-[#6BCFCF] bg-[#6BCFCF]/5 shadow-[0_4px_20px_rgba(107,207,207,0.2)] md:shadow-[0_8px_30px_rgba(107,207,207,0.25)] md:scale-105'
                          : 'border-[#E3E5E8] bg-white hover:border-[#6BCFCF]/50 hover:shadow-md md:hover:-translate-y-1 md:hover:shadow-lg active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex-shrink-0 mr-4 md:mr-0 md:mb-3">
                        <svg width="60" height="60" viewBox="0 0 100 100" className="md:w-20 md:h-20">
                          <rect x="10" y="10" width="80" height="80" fill="none" stroke="#6BCFCF" strokeWidth="2" rx="4"/>
                          <rect x="12" y="55" width="35" height="20" fill="#6BCFCF" opacity="0.5" rx="2"/>
                          <rect x="12" y="55" width="20" height="33" fill="#6BCFCF" opacity="0.5" rx="2"/>
                          <rect x="50" y="62" width="20" height="15" fill="#6BCFCF" opacity="0.5" rx="1"/>
                          <rect x="65" y="12" width="23" height="30" fill="#6BCFCF" opacity="0.5" rx="2"/>
                          <rect x="12" y="12" width="18" height="28" fill="#6BCFCF" opacity="0.5" rx="1"/>
                          <rect x="33" y="12" width="15" height="25" fill="#6BCFCF" opacity="0.5" rx="1"/>
                          <rect x="50" y="14" width="12" height="25" fill="#6BCFCF" opacity="0.5" rx="1"/>
                          <rect x="73" y="45" width="15" height="8" fill="#6BCFCF" opacity="0.5" rx="1"/>
                        </svg>
                      </div>
                      
                      <div className="flex-1 text-left md:text-center">
                        <div className="font-bold text-[#04163a] text-base md:text-lg mb-1">Bien rempli</div>
                        <div className="text-xs text-[#4b5c6b] mb-2 md:mb-3">Nombreux meubles · Beaucoup de cartons</div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold border border-orange-200">
                          +10% volume
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-4 text-[#04163a]">Choisissez votre formule <span className="text-[#6BCFCF]">*</span></h3>
                
                {pricing && (
                  <p className="text-[#4b5c6b] mb-4">
                    Volume moyen pour un{' '}
                    <span className="font-bold text-[#04163a]">
                      {getHousingLabel(formState.originHousingType)}
                    </span>
                    {' '}de{' '}
                    <span className="font-bold text-[#04163a]">{formState.surfaceM2} m²</span>
                    {' '}
                    <span className="font-bold text-[#04163a]">
                      {formState.density === 'light' ? 'sobre' : 
                       formState.density === 'normal' ? 'normalement meublé' : 
                       'densément meublé'}
                    </span>
                    {' '}:{' '}
                    <span className="font-bold text-[#6BCFCF] text-xl">{pricing.volumeM3} m³</span>
                  </p>
                )}
                
                <p className="text-sm text-[#4b5c6b] mb-4">Sélectionnez la formule qui correspond le mieux à vos besoins</p>
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
                  className="flex-1 bg-white border-2 border-[#E3E5E8] text-[#04163a] py-3 rounded-xl font-medium hover:border-[#6BCFCF] hover:text-[#6BCFCF] transition-all duration-300"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleNext}
                  disabled={!pricing}
                  className="group relative flex-1 bg-gradient-to-r from-[#6BCFCF] to-[#4FB8B8] text-[#04141f] py-4 rounded-xl font-bold overflow-hidden hover:shadow-[0_0_0_4px_rgba(107,207,207,0.15),0_8px_30px_rgba(107,207,207,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Suivant →</span>
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 4 : Validation & confirmation email */}
          {formState.currentStep === 4 && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-center text-[#04163a]">
                Confirmez votre demande en 1 clic
              </h2>
              <p className="text-center text-[#4b5c6b] mb-2 text-lg">
                Nous venons d&apos;envoyer un mail à{' '}
                <span className="font-bold">
                  {(confirmationEmail || formState.email || '').trim()}
                </span>
                . Sans cette validation, nous ne pourrons pas traiter votre demande.
              </p>
              {confirmationError && (
                <p className="text-center text-sm text-red-600 mb-6">
                  {confirmationError}
                </p>
              )}
              <p className="text-center text-sm text-[#4b5c6b] mb-6">
                Une fois que vous avez cliqué sur le lien dans votre mail, votre demande est validée.
                Vous pouvez alors fermer cette page.
              </p>

              {/* Lien secondaire : pas de mail reçu */}
              <div className="mb-6 text-center">
                <details className="inline-block text-left">
                  <summary className="text-sm text-[#4b5c6b] cursor-pointer hover:text-[#04163a]">
                    Je n&apos;ai pas reçu le mail de validation
                  </summary>
                  <div className="mt-4 p-4 bg-[#F8F9FA] border border-[#E3E5E8] rounded-2xl max-w-xl mx-auto">
                <p className="text-sm text-[#4b5c6b] mb-3">
                      Vérifiez ou corrigez votre adresse ci-dessous, puis renvoyez le mail de validation.
                </p>
                    <div className="grid md:grid-cols-[2fr,1fr] gap-4 items-end">
                <Input
                  label=""
                  type="email"
                  value={formState.email}
                  onChange={(v) => updateField('email', v)}
                  placeholder="votre@email.com"
                />
                  <button 
                        type="button"
                        onClick={async () => {
                          if (!formState.leadId) {
                            alert('Erreur : aucun lead créé. Veuillez recommencer.');
                            return;
                          }
                          const emailTrimmed = formState.email.trim();
                          if (!emailTrimmed || !emailTrimmed.includes('@') || !emailTrimmed.includes('.')) {
                            alert('Veuillez renseigner une adresse email valide.');
                            return;
                          }
                          try {
                            setIsSaving(true);
                            setConfirmationError(null);
                            await updateLead(formState.leadId, {
                              email: emailTrimmed.toLowerCase(),
                            });
                            await requestLeadConfirmation(formState.leadId);
                            setConfirmationEmail(emailTrimmed.toLowerCase());
                          } catch (error: any) {
                            console.error('❌ Erreur mise à jour email / nouvelle confirmation:', error);
                            setConfirmationError(error?.message || 'Erreur lors de l’envoi de l’email de confirmation. Veuillez réessayer.');
                            alert('Erreur lors de l’envoi de l’email de confirmation. Vos informations sont sauvegardées, vous pouvez réessayer.');
                          } finally {
                            setIsSaving(false);
                          }
                        }}
                        className="w-full bg-gradient-to-r from-[#6BCFCF] to-[#4FB8B8] text-[#04141f] py-3.5 rounded-xl font-semibold hover:shadow-[0_0_0_4px_rgba(107,207,207,0.15),0_8px_30px_rgba(107,207,207,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        disabled={isSaving}
                      >
                        {isSaving ? 'Envoi…' : 'Renvoyer le mail de validation'}
                  </button>
                </div>
                  </div>
                </details>
              </div>

              {/* Ce qui va se passer */}
              <div className="mb-8 p-6 bg-gradient-to-br from-[#6BCFCF]/5 to-[#4FB8B8]/5 border border-[#6BCFCF]/20 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 text-[#04163a] flex items-center gap-2">
                  Voici ce qui va se passer maintenant
                </h3>
                <ol className="space-y-5">
                  {[
                    {
                      num: 1,
                      title: 'Vous confirmez votre adresse email',
                      desc: "Vous recevez un email de confirmation dans les 2 minutes. Cliquez sur le lien de validation dans ce mail pour que nous puissions lancer l'envoi de vos devis.",
                    },
                    {
                      num: 2,
                      title: 'Nous contactons les déménageurs',
                      desc: "Nous contactons une dizaine de déménageurs et vous tenons informé de l'évolution de votre dossier à chaque étape. Rassurez-vous, rien à faire de votre côté.",
                    },
                    {
                      num: 3,
                      title: 'Nous vous présentons les devis',
                      desc: 'Dès que nous avons obtenu suffisamment de devis qualifiés, nous vous les présentons dans une grille de lecture simplifiée. Notre objectif : vous proposer entre 3 et 5 devis sous 5 à 7 jours.',
                    },
                    {
                      num: 4,
                      title: 'Vous choisissez en toute sérénité',
                      desc: 'Aucune obligation, vous choisissez le meilleur rapport qualité-prix.',
                    },
                  ].map((step) => (
                    <li key={step.num} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#6BCFCF] text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#04163a] mb-1">{step.title}</h4>
                        <p className="text-sm text-[#4b5c6b]">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                {/* Garanties */}
                <div className="mt-6 pt-6 border-t border-[#6BCFCF]/20">
                  <h4 className="font-bold mb-3 text-[#04163a]">Nos garanties</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm text-[#04163a]">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#6BCFCF]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      100% gratuit, sans engagement
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#6BCFCF]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Déménageurs vérifiés
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#6BCFCF]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Aucun harcèlement
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#6BCFCF]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Données confidentielles (RGPD)
                    </div>
                  </div>
                </div>
              </div>

              {/* Boutons */}
              {/* Pas de boutons de navigation supplémentaires : tout passe par le mail */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InventaireIAPage() {
  return (
    <Suspense fallback={null}>
      <InventaireIAPageInner />
    </Suspense>
  );
}
