'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MerciPage() {
  const [leadData, setLeadData] = useState<any>(null);

  useEffect(() => {
    // Récupérer les données du lead depuis localStorage
    const saved = localStorage.getItem('moverz_completed_lead');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLeadData(parsed);
      } catch (e) {
        console.error('Error loading lead data:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-hero py-12">
      {/* Halo effect comme sur la home */}
      <div className="glow absolute top-0 right-0 w-96 h-96 pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          {/* Icône de succès */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Merci pour votre demande !
          </h1>

          {/* Sous-titre */}
          <p className="text-xl text-center text-white/80 mb-8">
            Votre dossier de déménagement a été créé avec succès.
          </p>

          {/* Message principal */}
          <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
            <p className="text-white/90 text-lg mb-4">
              Nous avons bien reçu votre demande de devis. Notre équipe va l'analyser et vous contacter sous <strong className="text-white">24 heures</strong>.
            </p>
            
            <div className="space-y-3 mt-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Vous recevrez <strong className="text-white">5+ devis personnalisés</strong> de déménageurs vérifiés</span>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Comparaison <strong className="text-white">gratuite et sans engagement</strong></span>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Accompagnement personnalisé par notre équipe</span>
              </div>
            </div>
          </div>

          {/* Détails du lead (si disponibles) */}
          {leadData && leadData.pricing && (
            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Récapitulatif de votre demande</h2>
              <div className="space-y-2 text-white/80">
                {leadData.originAddress && (
                  <p><strong className="text-white">Départ :</strong> {leadData.originAddress}</p>
                )}
                {leadData.destinationAddress && (
                  <p><strong className="text-white">Arrivée :</strong> {leadData.destinationAddress}</p>
                )}
                {leadData.pricing.volumeM3 && (
                  <p><strong className="text-white">Volume estimé :</strong> {leadData.pricing.volumeM3.toFixed(1)} m³</p>
                )}
                {leadData.pricing.prixAvg && (
                  <p><strong className="text-white">Prix estimé :</strong> {leadData.pricing.prixAvg.toLocaleString('fr-FR')} €</p>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-[#2b7a78] to-[#6bcfcf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-center"
            >
              Retour à l'accueil
            </Link>
            
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-center border border-white/20"
            >
              Nous contacter
            </Link>
          </div>

          {/* Note */}
          <p className="text-center text-white/60 text-sm mt-8">
            Un email de confirmation vous a été envoyé à {leadData?.email || 'votre adresse email'}.
          </p>
        </div>
      </div>
    </div>
  );
}

