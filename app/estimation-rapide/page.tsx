"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

// Types
type LogementType = 'studio' | 't2' | 't3' | 't4' | 't5' | 't6' | 'maison' | 'autre';

interface LogementConfig {
  surface: number;
  volume: number;
  label: string;
}

interface Ville {
  nom: string;
  latitude: number;
  longitude: number;
  population: number;
}

interface CalculResult {
  volume: number;
  distance: number;
  tarifEco: number;
  tarifStandard: number;
  tarifPremium: number;
  prixEco: { min: number; max: number };
  prixStandard: { min: number; max: number };
  prixPremium: { min: number; max: number };
}

// Configuration des logements
const LOGEMENTS: Record<LogementType, LogementConfig> = {
  studio: { surface: 25, volume: 7.5, label: "Studio" },
  t2: { surface: 37, volume: 11.1, label: "T2" },
  t3: { surface: 57, volume: 17.1, label: "T3" },
  t4: { surface: 85, volume: 25.5, label: "T4" },
  t5: { surface: 115, volume: 34.5, label: "T5" },
  t6: { surface: 150, volume: 45, label: "T6" },
  maison: { surface: 200, volume: 60, label: "Maison" },
  autre: { surface: 100, volume: 30, label: "Autre" }
};

// Base de données des villes françaises principales
const VILLES_FRANCAISES: Ville[] = [
  { nom: "Paris", latitude: 48.8566, longitude: 2.3522, population: 2161000 },
  { nom: "Marseille", latitude: 43.2965, longitude: 5.3698, population: 870000 },
  { nom: "Lyon", latitude: 45.7640, longitude: 4.8357, population: 515000 },
  { nom: "Toulouse", latitude: 43.6047, longitude: 1.4442, population: 470000 },
  { nom: "Nice", latitude: 43.7102, longitude: 7.2620, population: 340000 },
  { nom: "Nantes", latitude: 47.2184, longitude: -1.5536, population: 310000 },
  { nom: "Montpellier", latitude: 43.6110, longitude: 3.8767, population: 290000 },
  { nom: "Strasbourg", latitude: 48.5734, longitude: 7.7521, population: 280000 },
  { nom: "toulouse", latitude: 44.8378, longitude: -0.5792, population: 250000 },
  { nom: "Lille", latitude: 50.6292, longitude: 3.0573, population: 230000 },
  { nom: "Rennes", latitude: 48.1173, longitude: -1.6778, population: 220000 },
  { nom: "Reims", latitude: 49.2583, longitude: 4.0317, population: 180000 },
  { nom: "Le Havre", latitude: 49.4944, longitude: 0.1079, population: 170000 },
  { nom: "Saint-Étienne", latitude: 45.4397, longitude: 4.3872, population: 170000 },
  { nom: "Toulon", latitude: 43.1242, longitude: 5.9280, population: 170000 },
  { nom: "Angers", latitude: 47.4784, longitude: -0.5632, population: 150000 },
  { nom: "Grenoble", latitude: 45.1885, longitude: 5.7245, population: 160000 },
  { nom: "Dijon", latitude: 47.3220, longitude: 5.0415, population: 150000 },
  { nom: "Nîmes", latitude: 43.8367, longitude: 4.3601, population: 150000 },
  { nom: "Aix-en-Provence", latitude: 43.5263, longitude: 5.4454, population: 140000 }
];

// Fonction de calcul de distance entre deux points (formule de Haversine)
function calculerDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Fonction de recherche de ville
function trouverVille(nomVille: string): Ville | null {
  const ville = VILLES_FRANCAISES.find(v => 
    v.nom.toLowerCase().includes(nomVille.toLowerCase()) ||
    nomVille.toLowerCase().includes(v.nom.toLowerCase())
  );
  return ville || null;
}

// Fonction de calcul de distance intelligente
function calculerDistanceIntelligente(villeDepart: string, villeArrivee: string): number {
  const ville1 = trouverVille(villeDepart);
  const ville2 = trouverVille(villeArrivee);
  
  if (ville1 && ville2) {
    return calculerDistance(ville1.latitude, ville1.longitude, ville2.latitude, ville2.longitude);
  }
  
  // Estimation basée sur la taille des villes si non trouvées
  const pop1 = ville1?.population || 50000;
  const pop2 = ville2?.population || 50000;
  const facteurDistance = Math.log(Math.max(pop1, pop2) / 10000) * 50;
  
  return Math.max(50, Math.min(800, facteurDistance));
}

// Fonction de calcul des tarifs selon la distance
function calculerTarifs(distance: number) {
  if (distance < 100) {
    return { eco: 35, standard: 40, premium: 65 };
  } else if (distance <= 500) {
    return { eco: 60, standard: 95, premium: 130 };
  } else {
    return { eco: 110, standard: 140, premium: 160 };
  }
}

// Fonction de formatage des prix
function formaterPrix(prix: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(prix);
}

export default function EstimationRapide() {
  const [logement, setLogement] = useState<LogementType>('t3');
  const [villeDepart, setVilleDepart] = useState('');
  const [villeArrivee, setVilleArrivee] = useState('');
  const [suggestionsDepart, setSuggestionsDepart] = useState<string[]>([]);
  const [suggestionsArrivee, setSuggestionsArrivee] = useState<string[]>([]);
  const [showSuggestionsDepart, setShowSuggestionsDepart] = useState(false);
  const [showSuggestionsArrivee, setShowSuggestionsArrivee] = useState(false);

  // Calcul des résultats
  const resultats = useMemo((): CalculResult | null => {
    if (!villeDepart.trim() || !villeArrivee.trim()) return null;

    const configLogement = LOGEMENTS[logement];
    const distance = calculerDistanceIntelligente(villeDepart, villeArrivee);
    const tarifs = calculerTarifs(distance);
    
    const prixEco = configLogement.volume * tarifs.eco;
    const prixStandard = configLogement.volume * tarifs.standard;
    const prixPremium = configLogement.volume * tarifs.premium;

    return {
      volume: configLogement.volume,
      distance: Math.round(distance),
      tarifEco: tarifs.eco,
      tarifStandard: tarifs.standard,
      tarifPremium: tarifs.premium,
      prixEco: {
        min: Math.round(prixEco * 0.9),
        max: Math.round(prixEco * 1.25)
      },
      prixStandard: {
        min: Math.round(prixStandard * 0.9),
        max: Math.round(prixStandard * 1.25)
      },
      prixPremium: {
        min: Math.round(prixPremium * 0.9),
        max: Math.round(prixPremium * 1.25)
      }
    };
  }, [logement, villeDepart, villeArrivee]);

  // Gestion des suggestions de villes
  useEffect(() => {
    if (villeDepart.length > 1) {
      const suggestions = VILLES_FRANCAISES
        .filter(v => v.nom.toLowerCase().includes(villeDepart.toLowerCase()))
        .map(v => v.nom)
        .slice(0, 5);
      setSuggestionsDepart(suggestions);
      setShowSuggestionsDepart(true);
    } else {
      setSuggestionsDepart([]);
      setShowSuggestionsDepart(false);
    }
  }, [villeDepart]);

  useEffect(() => {
    if (villeArrivee.length > 1) {
      const suggestions = VILLES_FRANCAISES
        .filter(v => v.nom.toLowerCase().includes(villeArrivee.toLowerCase()))
        .map(v => v.nom)
        .slice(0, 5);
      setSuggestionsArrivee(suggestions);
      setShowSuggestionsArrivee(true);
    } else {
      setSuggestionsArrivee([]);
      setShowSuggestionsArrivee(false);
    }
  }, [villeArrivee]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Estimation Rapide de Coût de Déménagement
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Obtenez une estimation instantanée des fourchettes de prix pour votre déménagement
          </p>
        </div>

        {/* Formulaire horizontal sur desktop */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Vos informations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Type de logement */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Type de logement
              </label>
              <select
                value={logement}
                onChange={(e) => setLogement(e.target.value as LogementType)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-transparent"
              >
                {Object.entries(LOGEMENTS).map(([key, config]) => (
                  <option key={key} value={key} className="bg-gray-800 text-white">
                    {config.label} ({config.surface}m²)
                  </option>
                ))}
              </select>
            </div>

            {/* Ville de départ */}
            <div className="relative">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Ville de départ
              </label>
              <input
                type="text"
                value={villeDepart}
                onChange={(e) => setVilleDepart(e.target.value)}
                onFocus={() => setShowSuggestionsDepart(true)}
                onBlur={() => setTimeout(() => setShowSuggestionsDepart(false), 200)}
                placeholder="Ex: toulouse"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-transparent"
              />
              {showSuggestionsDepart && suggestionsDepart.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-white/20 z-10">
                  {suggestionsDepart.map((ville, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setVilleDepart(ville);
                        setShowSuggestionsDepart(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {ville}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ville d'arrivée */}
            <div className="relative">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Ville d'arrivée
              </label>
              <input
                type="text"
                value={villeArrivee}
                onChange={(e) => setVilleArrivee(e.target.value)}
                onFocus={() => setShowSuggestionsArrivee(true)}
                onBlur={() => setTimeout(() => setShowSuggestionsArrivee(false), 200)}
                placeholder="Ex: Paris"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-transparent"
              />
              {showSuggestionsArrivee && suggestionsArrivee.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-white/20 z-10">
                  {suggestionsArrivee.map((ville, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setVilleArrivee(ville);
                        setShowSuggestionsArrivee(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {ville}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Résultats avec le même format que la page services */}
        {resultats ? (
          <div className="space-y-8">
            {/* Détails du calcul */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Détails du calcul</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <span className="text-white/70 block">Volume</span>
                  <span className="text-white font-medium text-lg">{resultats.volume}m³</span>
                </div>
                <div className="text-center">
                  <span className="text-white/70 block">Distance</span>
                  <span className="text-white font-medium text-lg">{resultats.distance}km</span>
                </div>
                <div className="text-center">
                  <span className="text-white/70 block">Tarif Éco</span>
                  <span className="text-white font-medium text-lg">{resultats.tarifEco}€/m³</span>
                </div>
                <div className="text-center">
                  <span className="text-white/70 block">Tarif Standard</span>
                  <span className="text-white font-medium text-lg">{resultats.tarifStandard}€/m³</span>
                </div>
              </div>
            </div>

            {/* Cartes d'offres au format services */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Offre Économique */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">💰 Économique</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 mt-4">Déménagement Économique</h3>
                <p className="text-white/70 text-sm mb-6">Pour les budgets serrés</p>
                
                <div className="space-y-3 text-sm text-white/90 mb-6">
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Estimation IA gratuite
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Fourniture de cartons
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Assurance incluse
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Support téléphonique
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg font-medium text-green-400">
                    {formaterPrix(resultats.prixEco.min)}
                  </span>
                  <span className="text-3xl font-bold text-white">
                    {formaterPrix(Math.round((resultats.prixEco.min + resultats.prixEco.max) / 2))}
                  </span>
                  <span className="text-lg font-medium text-red-600">
                    {formaterPrix(resultats.prixEco.max)}
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-6">Local toulouse</p>
                
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                  Découvrir cette formule
                </button>
              </div>

              {/* Offre Standard */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">⭐ Standard</span>
                </div>
                <div className="absolute -top-2 -right-2">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">Recommandé</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 mt-4">Déménagement Standard</h3>
                <p className="text-white/70 text-sm mb-6">Le plus populaire</p>
                
                <div className="space-y-3 text-sm text-white/90 mb-6">
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Estimation IA gratuite
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Emballage de base
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Démontage/Remontage
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Assurance renforcée
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Support prioritaire
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg font-medium text-green-400">
                    {formaterPrix(resultats.prixStandard.min)}
                  </span>
                  <span className="text-3xl font-bold text-white">
                    {formaterPrix(Math.round((resultats.prixStandard.min + resultats.prixStandard.max) / 2))}
                  </span>
                  <span className="text-lg font-medium text-red-600">
                    {formaterPrix(resultats.prixStandard.max)}
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-6">Local toulouse</p>
                
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                  Découvrir cette formule
                </button>
              </div>

              {/* Offre Premium */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">👑 Premium</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 mt-4">Déménagement Premium</h3>
                <p className="text-white/70 text-sm mb-6">Service haut de gamme</p>
                
                <div className="space-y-3 text-sm text-white/90 mb-6">
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Estimation IA gratuite
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Emballage complet
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Déballage inclus
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Assurance tous risques
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Garde-meuble
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Support dédié 24/7
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg font-medium text-green-400">
                    {formaterPrix(resultats.prixPremium.min)}
                  </span>
                  <span className="text-3xl font-bold text-white">
                    {formaterPrix(Math.round((resultats.prixPremium.min + resultats.prixPremium.max) / 2))}
                  </span>
                  <span className="text-lg font-medium text-red-600">
                    {formaterPrix(resultats.prixPremium.max)}
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-6">Local toulouse</p>
                
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                  Découvrir cette formule
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center">
            <div className="text-white/60 text-lg">
              Remplissez les informations ci-dessus pour obtenir votre estimation
            </div>
          </div>
        )}

        {/* Note explicative */}
        <div className="mt-12 text-center">
          <p className="text-white/70 text-sm max-w-4xl mx-auto">
            * Les prix indiqués sont des estimations basées sur le volume calculé et la distance. 
            Les fourchettes incluent une marge de ±25% pour tenir compte des variations de service. 
            Pour un devis précis, contactez nos partenaires déménageurs.
          </p>
        </div>
      </div>
    </div>
  );
}
