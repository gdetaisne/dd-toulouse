import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function NotreOffrePage() {
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2000&auto=format&fit=crop"
            alt="Outils technologiques pour déménagement"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/90 to-[#04163a]/90"></div>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:py-32">
          <div className="text-center">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Comment ça marche", href: "/comment-ca-marche" }
              ]}
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simplifiez votre déménagement avec nos outils
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Estimez votre volume en m³ en quelques photos, comparez plusieurs devis de déménageurs 
              et réservez en toute sécurité avec 30% de dépôt (norme de marché imposée par nos partenaires déménageurs).
            </p>
          </div>
        </div>
      </section>

      {/* Introduction - Problème général */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Le déménagement, une source de stress pour tous
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Organiser un déménagement représente souvent un véritable casse-tête. Entre l'estimation 
              du volume à déménager, la recherche de déménageurs fiables, la comparaison de devis 
              incomparables et la peur des mauvaises surprises, cette étape peut vite devenir un 
              cauchemar. Nous avons créé une solution qui transforme cette expérience en un processus 
              simple, transparent et sécurisé.
            </p>
          </div>
        </div>
      </section>

      {/* Les difficultés d'un déménagement */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
              Les difficultés d'un déménagement
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Estimation du volume complexe</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Difficile d'évaluer précisément le volume en m³ de ses affaires. 
                  Les erreurs d'estimation peuvent coûter cher ou créer des surprises désagréables.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Devis incomparables</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Chaque déménageur propose des devis avec des critères différents, 
                  rendant la comparaison impossible et favorisant les mauvaises surprises.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Perte de temps</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Contacter plusieurs déménageurs, organiser des visites, attendre les devis... 
                  Un processus chronophage qui s'étale sur plusieurs semaines.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Manque de transparence</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Prix cachés, conditions floues, frais supplémentaires inattendus... 
                  L'opacité du secteur crée de la méfiance et des déceptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre solution */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Notre solution : nos outils
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Notre approche innovante couplée d'une multitude d'outils d'IA et de traitement d'image 
              pour estimer automatiquement le volume de votre déménagement à partir de simples photos. 
              Plus besoin de calculs compliqués ou de visites à domicile : quelques clichés suffisent 
              pour obtenir une estimation précise et recevoir plusieurs devis comparables de déménageurs 
              partenaires de confiance.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#04163a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Simplicité</h3>
                <p className="text-white/70 text-sm">Photos → Inventaire automatique en quelques minutes</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#04163a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Transparence</h3>
                <p className="text-white/70 text-sm">Comparaison claire et anonymat jusqu'à la validation</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#04163a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Sécurité</h3>
                <p className="text-white/70 text-sm">Paiement sécurisé en ligne, 30% de dépôt (norme de marché)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
              Comment ça marche ?
            </h2>
            
            <div className="space-y-8">
              {/* Étape 1 - VOUS */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center text-[#04163a] font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Prenez des photos de tout ce que vous voulez emporter</h3>
                  <p className="text-white/80 leading-relaxed">
                    Photographiez tous vos biens depuis votre smartphone. Il faut viser 3 à 5 photos par pièce 
                    pour une estimation optimale. Pas besoin d'être photographe professionnel !
                  </p>
                  <div className="mt-3">
                    <span className="bg-[#ff4757] text-white px-3 py-1 rounded-full text-sm font-bold">
                      15 min
                    </span>
                  </div>
                </div>
              </div>

              {/* Nous nous occupons de... */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2b7a78] flex items-center justify-center text-white font-bold text-lg">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Nous nous occupons de l'analyse de vos photos et de la préparation de l'inventaire</h3>
                  <p className="text-white/80 leading-relaxed">
                    Notre intelligence artificielle analyse vos photos et calcule le volume que représentent 
                    vos biens dans le cadre d'un déménagement, en tenant compte de l'emballage nécessaire.
                  </p>
                </div>
              </div>

              {/* Étape 2 - VOUS */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center text-[#04163a] font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Vérifiez l'inventaire et affinez selon vos besoins</h3>
                  <p className="text-white/80 leading-relaxed">
                    Consultez l'inventaire généré et indiquez-nous ce que vous prenez ou ce que vous laissez. 
                    Vous obtenez ainsi une estimation précise et fiable du volume à déménager.
                  </p>
                  <div className="mt-3">
                    <span className="bg-[#ff4757] text-white px-3 py-1 rounded-full text-sm font-bold">
                      10 min
                    </span>
                  </div>
                </div>
              </div>

              {/* Étape 3 - VOUS */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center text-[#04163a] font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Dites-nous vers où vous déménagez et le type de prestation</h3>
                  <p className="text-white/80 leading-relaxed">
                    Indiquez votre destination et précisez le type de service souhaité (économique, standard, premium) 
                    pour que nous puissions vous proposer les meilleures options.
                  </p>
                  <div className="mt-3">
                    <span className="bg-[#ff4757] text-white px-3 py-1 rounded-full text-sm font-bold">
                      5 min
                    </span>
                  </div>
                </div>
              </div>

              {/* Nous nous occupons de... */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2b7a78] flex items-center justify-center text-white font-bold text-lg">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Nous nous occupons de la sélection des déménageurs et de la collecte des devis</h3>
                  <p className="text-white/80 leading-relaxed">
                    Nous choisissons les déménageurs professionnels proches de chez vous les plus adaptés 
                    à votre demande, leur soumettons votre dossier et collectons les devis en 3 à 4 jours (max 7 jours).
                  </p>
                </div>
              </div>

              {/* Nous nous occupons de... */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2b7a78] flex items-center justify-center text-white font-bold text-lg">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Nous nous occupons de la comparaison et de la présentation des offres</h3>
                  <p className="text-white/80 leading-relaxed">
                    Nous analysons tous les devis reçus, vérifions leur cohérence avec vos besoins 
                    et vous présentons trois offres finales, claires et comparables.
                  </p>
                </div>
              </div>

              {/* Étape 4 - VOUS */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center text-[#04163a] font-bold text-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Vous sélectionnez et payez 30% d'acompte</h3>
                  <p className="text-white/80 leading-relaxed">
                    Choisissez l'offre qui vous convient et validez votre réservation en payant 
                    30% d'acompte en ligne de manière sécurisée (norme de marché imposée par nos partenaires déménageurs).
                  </p>
                  <div className="mt-3">
                    <span className="bg-[#ff4757] text-white px-3 py-1 rounded-full text-sm font-bold">
                      5 min
                    </span>
                  </div>
                </div>
              </div>

              {/* Nous nous occupons de... */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2b7a78] flex items-center justify-center text-white font-bold text-lg">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Nous nous occupons de la mise en relation avec le déménageur</h3>
                  <p className="text-white/80 leading-relaxed">
                    Nous vous mettons en relation avec le déménageur choisi pour que vous puissiez 
                    commencer votre déménagement dans les meilleures conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
              Pourquoi nous choisir ?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#04163a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Gain de temps exceptionnel</h3>
                </div>
                <p className="text-white/80">
                  Fini les visites à domicile et les calculs manuels. En 30 minutes, vous obtenez 
                  une estimation précise et recevez plusieurs devis comparables. Un processus 
                  qui prendrait normalement plusieurs semaines se fait en quelques jours.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#04163a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Transparence totale</h3>
                </div>
                <p className="text-white/80">
                  Tous les devis sont basés sur les mêmes critères, rendant la comparaison 
                  objective et équitable. Aucun prix caché, aucune surprise. Vous savez 
                  exactement ce que vous payez et ce que vous obtenez.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#04163a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Économies significatives</h3>
                </div>
                <p className="text-white/80">
                  Recevez des devis précisément adaptés à votre besoin. Plus besoin de marge de manœuvre 
                  pour un déménageur qui ne se serait pas déplacé pour prendre des mesures. Plus besoin 
                  de payer un commercial pour prendre vos mesures. Nous nous chargeons de tout, et vous 
                  faites des économies.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#04163a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Un confort exceptionnel</h3>
                </div>
                <p className="text-white/80">
                  Plus besoin de faire visiter votre maison à plusieurs déménageurs. Plus besoin 
                  d'échanger avec eux pour planifier des visites ou alors pour les relancer sur 
                  leurs devis. Tout ça, nous nous en occupons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages/Projection de valeur */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
              Rejoignez les milliers de clients satisfaits
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Notre solution a déjà permis à plus de 1 200 familles de déménager en toute sérénité. 
              Grâce à nos outils, nos clients économisent en moyenne 15 heures de recherche 
              et 20% sur leur budget déménagement tout en bénéficiant d'une transparence totale.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">15h</div>
                <p className="text-white/80 text-sm">de temps économisé en moyenne</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">20%</div>
                <p className="text-white/80 text-sm">d'économies sur le budget déménagement</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">4.9/5</div>
                <p className="text-white/80 text-sm">note moyenne de satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Prêt à simplifier votre déménagement ?
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Estimez gratuitement votre volume dès aujourd'hui et comparez plusieurs devis de 
              déménageurs en quelques minutes. Plus de stress, plus de mauvaises surprises, 
              juste une solution simple et transparente.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/inventaire-ia/"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#6bcfcf] px-8 text-lg font-semibold text-[#04163a] shadow-lg hover:bg-[#6bcfcf]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6bcfcf]/50 transition duration-300"
              >
                Estimez gratuitement votre volume
              </a>
              <a
                href="/faq"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 px-8 text-lg font-medium text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
              >
                Consultez nos FAQ
              </a>
            </div>
            
            <p className="text-sm text-white/60 mt-6">
              ⚡ Estimation en 30 minutes • 🔒 100% sécurisé • 💰 Gratuit et sans engagement
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
