import React from "react";
import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Comment ça marche | Déménagement ${city.nameCapitalized} | 3 étapes`,
    description: `3 étapes : 1) Dossier 5 min, 2) 5+ devis en 48h, 3) Choix déménageur à ${city.nameCapitalized}. Dès 280€. Anonyme, 0 spam. Déménageurs contrôlés. Gratuit.`,
    alternates: {
      canonical: getCanonicalUrl("comment-ca-marche"),
    },
    openGraph: {
      title: `Comment ça marche | Déménagement ${city.nameCapitalized} | 3 étapes`,
      description: `3 étapes : Dossier 5 min → 5+ devis 48h → Choix. Dès 280€. Gratuit.`,
      url: getCanonicalUrl("comment-ca-marche"),
      type: "website",
    },
  };
})();

export default function CommentCaMarchePage() {
  const city = getCityDataFromUrl(env.SITE_URL);

  const steps = [
    {
      number: "1",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Créez votre dossier unique",
      description:
        "Quelques infos clés sur votre déménagement (adresses, accès, volume estimé, contraintes). Un seul dossier pour tous les déménageurs.",
    },
    {
      number: "2",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      ),
      title: "Nous filtrons les déménageurs",
      description:
        "On ne garde que les pros fiables, bien notés et assurés. Votre dossier reste anonyme : vous gardez la main.",
    },
    {
      number: "3",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Vous comparez 5+ devis fiables",
      description:
        "Même base, mêmes options, même volume estimé : des devis enfin comparables, sans appels commerciaux non souhaités.",
    },
  ];

  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* Hero Stripe-like */}
      <section className="section section-contrast relative overflow-hidden">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Comment ça marche", href: "/comment-ca-marche" },
              ]}
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
              Processus en 3 étapes
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Comment fonctionne le comparateur de devis ?
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              L'objectif est simple :{" "}
              <span className="font-semibold text-white">
                comparer des devis vraiment comparables
              </span>{" "}
              pour votre déménagement à {city.nameCapitalized},{" "}
              <span className="font-semibold text-[#6BCFCF]">
                sans spam ni appels commerciaux
              </span>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Étapes en 3 cartes - Version Stripe */}
      <section className="section section-light">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B7A78]">
              Le processus
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#04163a] leading-tight">
              Les 3 étapes, concrètement
            </h2>
            <p className="text-base md:text-lg text-[#4b5c6b] max-w-2xl mx-auto leading-relaxed font-light">
              Un seul fil conducteur : vous gardez la main sur votre dossier,
              nous gérons la partie compliquée.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative flex flex-col gap-4 rounded-3xl border border-[#E3E5E8] bg-white p-6 md:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-[#6BCFCF]/40 motion-safe:animate-fade-up-soft"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow effect au hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6BCFCF]/0 to-[#4FB8B8]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
                
                <div className="relative flex flex-col items-center gap-4">
                  {/* Numéro + Pictogramme */}
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/20 to-[#4FB8B8]/30 border-2 border-[#6BCFCF]/30 text-[#2B7A78] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_20px_rgba(107,207,207,0.4)]">
                      {step.icon}
                    </div>
                    {/* Badge numéro */}
                    <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#2B7A78] text-xs font-bold text-white shadow-lg">
                      {step.number}
                </div>
                  </div>
                  
                  <div className="space-y-2 text-center">
                    <h3 className="text-lg md:text-xl font-bold text-[#04163a] leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#4b5c6b] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
                </div>
      </section>

      {/* Ce que vous gagnez / évitez / reste - Version Stripe */}
      <section className="section section-contrast">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              Bénéfices concrets
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ce que ça change pour vous
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-6">
            {/* Ce que vous gagnez */}
            <div className="group rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-white/30 hover:bg-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/30 to-[#4FB8B8]/40 border-2 border-[#6BCFCF]/40 mb-4 transition-all duration-300 group-hover:scale-110">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                Ce que vous gagnez
              </h3>
              <ul className="space-y-2 text-sm md:text-base text-white/80">
                      <li className="flex items-start gap-2">
                  <span className="text-[#6BCFCF] mt-0.5">·</span>
                  <span><span className="font-semibold text-white">30 minutes</span> pour créer un dossier propre</span>
                      </li>
                      <li className="flex items-start gap-2">
                  <span className="text-[#6BCFCF] mt-0.5">·</span>
                  <span><span className="font-semibold text-white">5+ devis</span> reçus sans relances ni visites</span>
                      </li>
                    </ul>
                  </div>
                  
            {/* Ce que l'on évite */}
            <div className="group rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-white/30 hover:bg-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/30 to-red-600/40 border-2 border-red-500/40 mb-4 transition-all duration-300 group-hover:scale-110">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                Ce que l'on évite
              </h3>
              <ul className="space-y-2 text-sm md:text-base text-white/80">
                      <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">·</span>
                  <span><span className="font-semibold text-white">Devis incomparables</span>, formats différents</span>
                      </li>
                      <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">·</span>
                  <span><span className="font-semibold text-white">Appels commerciaux</span> non sollicités</span>
                      </li>
                    </ul>
                  </div>
                  
            {/* Ce que ça reste */}
            <div className="group rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-white/30 hover:bg-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/30 to-[#4FB8B8]/40 border-2 border-[#6BCFCF]/40 mb-4 transition-all duration-300 group-hover:scale-110">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                Ce que ça reste
              </h3>
              <ul className="space-y-2 text-sm md:text-base text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#6BCFCF] mt-0.5">·</span>
                  <span><span className="font-semibold text-white">Gratuit</span>, sans engagement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6BCFCF] mt-0.5">·</span>
                  <span>Dossier <span className="font-semibold text-white">anonyme</span> jusqu'à votre choix final</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Qui fait quoi ? - Version Stripe */}
      <section className="section section-light">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B7A78]">
              Répartition des rôles
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#04163a] leading-tight">
              Qui fait quoi dans le process ?
            </h2>
            <p className="text-base md:text-lg text-[#4b5c6b] max-w-2xl mx-auto leading-relaxed font-light">
              Vous vous concentrez sur vos critères et votre calendrier, nous
              gérons la partie technique et la mise en forme des devis.
                </p>
              </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {/* Votre rôle */}
            <div className="group rounded-3xl border border-[#E3E5E8] bg-white p-6 md:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-[#6BCFCF]/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F9FA] border-2 border-[#E3E5E8] transition-all duration-300 group-hover:border-[#6BCFCF]/40">
                  <svg className="h-6 w-6 text-[#4b5c6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4b5c6b]">
                    Votre rôle
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-[#04163a]">
                    Ce que vous faites
                  </h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm md:text-base text-[#4b5c6b]">
                <li className="flex items-start gap-2">
                  <span className="text-[#2B7A78] mt-0.5">·</span>
                  <span>Remplir <span className="font-semibold text-[#04163a]">un seul dossier</span> avec vos infos et contraintes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2B7A78] mt-0.5">·</span>
                  <span>Préciser vos <span className="font-semibold text-[#04163a]">préférences</span> (budget, dates, niveau de service)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2B7A78] mt-0.5">·</span>
                  <span>Choisir le déménageur qui vous convient parmi les offres</span>
                </li>
              </ul>
              </div>

            {/* Notre rôle */}
            <div className="group rounded-3xl border border-[#6BCFCF]/40 bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-6 md:p-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_90px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/30 to-[#4FB8B8]/40 border-2 border-[#6BCFCF]/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(107,207,207,0.4)]">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6BCFCF]">
                    Notre rôle
                  </p>
                  <h3 className="text-lg md:text-xl font-bold">
                    Ce que fait le comparateur
                  </h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm md:text-base text-white/85">
                <li className="flex items-start gap-2">
                  <span className="text-[#6BCFCF] mt-0.5">·</span>
                  <span><span className="font-semibold text-white">Filtrer les déménageurs fiables</span> et adaptés à votre dossier</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6BCFCF] mt-0.5">·</span>
                  <span>Aligner les devis sur la même base pour les rendre lisibles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6BCFCF] mt-0.5">·</span>
                  <span>Vous accompagner jusqu'au choix final si besoin</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section section-contrast">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-8 md:p-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
              <div className="relative space-y-6">
                <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
                  Sans engagement · 0 spam · 5+ devis fiables
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Lancer mon comparateur de devis
            </h2>
                <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
                  Pour votre déménagement à {city.nameCapitalized}, obtenez des
                  devis alignés sur la même base, sans appels commerciaux non
                  souhaités.
                </p>
                <a 
                  href="/devis-gratuits/" 
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative">Lancer mon comparateur de devis</span>
                  <span className="relative text-xl leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
