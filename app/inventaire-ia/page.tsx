'use client';

import React from 'react';
import { getBuildInfo } from '@/lib/buildInfo';
import { event as gaEvent } from '@/lib/ga4';
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';
import PhotoGuidelines from '@/components/PhotoGuidelines';

export default function InventaireIAPage() {
  const city = getCityDataFromUrl(env.SITE_URL);
  
  const handleEstimateClick = () => {
    gaEvent('estimate_cost_click', {
      button_text: 'Calculer mon devis gratuit',
      destination: '/estimation-rapide/',
    });
  };

  const handleIaToolClick = () => {
    gaEvent('access_ia_tool_click', {
      button_text: 'Accéder à l\'outil',
      destination: 'https://movers-test.gslv.cloud/',
    });
  };

  return (
    <div className="min-h-screen bg-[#04163a]">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur border-b border-white/10">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Calcul de volume en photos
              </h1>
              <p className="mt-2 text-lg text-white/80">
                Analyse automatique de vos objets pour un déménagement optimisé
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-white/70">Propulsé par</span>
                  <span className="text-lg font-semibold text-[#6bcfcf]">Moverz AI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/60">
                    {getBuildInfo()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation breadcrumb */}
      <div className="bg-white/5 border-b border-white/10">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <a href="/" className="text-white/60 hover:text-white/80 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-white/80">Calcul de volume en photos</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Bloc 1: Estimation rapide */}
          <div className="bg-white/5 backdrop-blur rounded-2xl shadow-marketing-xl overflow-hidden border border-white/10">
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#6bcfcf]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Estimer rapidement le coût de mon déménagement
                </h2>
                <p className="text-white/80 mb-6">
                  Obtenez une estimation personnalisée en quelques clics grâce à notre calculateur intelligent.
                </p>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="/estimation-rapide/"
                  onClick={handleEstimateClick}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6bcfcf] px-6 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
                >
                  Calculer mon devis gratuit
                </a>
                
                <div className="text-sm text-white/60">
                  <p>Estimation en 2 minutes • 100% gratuit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bloc 2: Calcul de volume en photos */}
          <div className="bg-white/5 backdrop-blur rounded-2xl shadow-marketing-xl overflow-hidden border border-white/10">
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#6bcfcf]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Calcul de volume en photos
                </h2>
                <p className="text-white/80 mb-6">
                  Analyse automatique de vos objets pour un inventaire précis et optimisé.
                </p>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="https://movers-test.gslv.cloud/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleIaToolClick}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6bcfcf] px-6 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
                >
                  Accéder à l'outil (nouvelle fenêtre)
                </a>
                
                <div className="text-sm text-white/60">
                  <p>Version beta disponible</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Features section */}
      <div className="bg-white/5 py-16">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-white/80 mb-12">
              Une solution simple et efficace pour votre inventaire de déménagement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#6bcfcf]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                1. Prenez des photos
              </h3>
              <p className="text-white/80">
                Photographiez vos pièces et objets depuis votre smartphone
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#6bcfcf]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                2. Analyse IA
              </h3>
              <p className="text-white/80">
                Notre IA détecte et analyse automatiquement tous vos objets
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#6bcfcf]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                3. Inventaire complet
              </h3>
              <p className="text-white/80">
                Obtenez un inventaire détaillé avec dimensions et volumes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conseils photos */}
      <div className="bg-white/5 border-t border-white/10">
        <div className="container max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <PhotoGuidelines />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#2b7a78] to-[#6bcfcf] py-16">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt pour votre inventaire IA ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Commencez dès maintenant votre analyse automatique
          </p>
          <a 
            href={`/devis-demenagement-${city.slug}/`}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2b7a78] px-5 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
          >
            Créer mon dossier
          </a>
        </div>
      </div>
    </div>
  );
}
