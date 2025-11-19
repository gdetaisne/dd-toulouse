"use client";
import React, { useEffect, useState } from "react";

export default function Hero() {
  const [stage, setStage] = useState(2);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden text-white font-sans">
      {/* Background ultra-profond avec halos multiples */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-hero" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/95 via-[#04141f]/90 to-[#0b3b46]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/8 via-transparent to-white/4" />
        
        {/* Halos lumineux multiples (comme Stripe) avec parallax */}
        <div 
          className="pointer-events-none absolute -top-32 right-[-180px] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(107,207,207,0.35),_transparent_70%)] blur-3xl transition-transform duration-100"
          style={{ transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.1}px)` }}
        />
        <div 
          className="pointer-events-none absolute top-1/2 left-[-120px] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.15),_transparent_70%)] blur-3xl transition-transform duration-100"
          style={{ transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.08}px)` }}
        />
      </div>

      {/* Espacement généreux (Stripe-like) */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
          
          {/* ========== COLONNE GAUCHE – TEXTE ========== */}
          <div
            className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left motion-safe:animate-fade-up-soft"
            style={{ animationDelay: "60ms" }}
          >
            {/* Badge avec shimmer subtil */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm shadow-lg shadow-black/20 hover:border-white/20 hover:bg-white/8 transition-all duration-300">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse shadow-[0_0_8px_rgba(110,231,183,0.6)]" />
              Processus IA anti-arnaque
            </div>

            {/* Titre massif avec gradient text (Stripe-style) */}
            <h1 className="mt-6 text-5xl font-bold tracking-tight leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl">
              Comparez enfin des devis de déménageurs
              <span className="block mt-2 bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] bg-clip-text text-transparent">
                comparables
              </span>
            </h1>

            {/* Sous-titre aéré */}
            <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white/75 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Un seul dossier, des déménageurs contrôlés, des devis comparables.
            </p>

            {/* Liste avec hover effects */}
            <ul className="mt-8 space-y-4 text-base md:text-lg text-white/85">
              {[
                "Même volume pour tout le monde",
                "Dossier anonyme, vous décidez",
                "5+ devis fiables, 100% gratuits",
              ].map((text) => (
                <li
                  key={text}
                  className="group flex items-center gap-3 justify-center lg:justify-start hover:translate-x-1 transition-transform duration-300"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6bcfcf]/30 bg-white/5 text-[#6bcfcf] shadow-sm group-hover:border-[#6bcfcf]/50 group-hover:bg-white/10 group-hover:shadow-[0_0_16px_rgba(107,207,207,0.4)] transition-all duration-300">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 13.5L9.5 18L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-medium">{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA avec gradient + glow (Stripe-style) */}
            <div className="mt-10 flex flex-col items-center justify-center sm:flex-row lg:justify-start">
              <a
                href="/inventaire-ia/"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg md:text-xl font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                aria-label="Comparez 5+ devis gratuitement"
              >
                {/* Shimmer effect au hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative">Comparez 5+ devis gratuitement</span>
                <span className="relative text-2xl leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>

          {/* ========== COLONNE DROITE – MOCKUP PRODUIT ========== */}
          <div
            className="relative mx-auto w-full max-w-[600px] lg:mx-0 motion-safe:animate-fade-up-soft"
            style={{ animationDelay: "180ms" }}
          >
            {/* Halo ultra-profond derrière la carte (Stripe signature) */}
            <div className="absolute -inset-12 hidden rounded-3xl bg-gradient-radial from-[#6BCFCF]/25 via-[#4FB8B8]/10 to-transparent blur-3xl lg:block" />
            
            {/* Carte produit avec depth maximale */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-white/98 via-white/95 to-[#F5FBFB]/95 p-6 md:p-8 shadow-[0_32px_90px_rgba(15,23,42,0.6)] text-[#04163a] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_120px_rgba(15,23,42,0.75)] hover:border-white/12">
              
              {/* Filament lumineux en haut (Stripe-style) */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#6BCFCF] via-[#4f46e5] to-[#22c55e] opacity-90" />
              
              {/* Header minimal */}
              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1929] px-3.5 py-2 text-[11px] font-semibold text-white/90 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  3 étapes · 0 spam · 5+ devis fiables
                </span>
                <span className="hidden text-xs font-medium text-[#64748b] md:inline">
                  ⏱️ 30 min → 5+ devis alignés
                </span>
              </div>

              {/* Pipeline en 3 étapes (avec micro-animations) */}
              <div className="mt-6 space-y-3">
                {[
                  {
                    id: 0,
                    label: "Dossier unique",
                    description: "Vous décrivez votre besoin une seule fois.",
                  },
                  {
                    id: 1,
                    label: "Pros filtrés",
                    description: "On ne garde que les déménageurs sérieux.",
                  },
                  {
                    id: 2,
                    label: "Comparaison claire",
                    description: "5+ offres alignées sur le même volume et les mêmes options.",
                  },
                ].map((step, index) => (
                  <div
                    key={step.label}
                    className={`rounded-2xl border px-5 py-4 transition-all duration-500 ${
                      stage === step.id
                        ? "border-[#6BCFCF] bg-white shadow-[0_8px_24px_rgba(107,207,207,0.25)] scale-[1.02]"
                        : "border-white/40 bg-white/70 shadow-sm hover:scale-[1.01] hover:shadow-md hover:border-[#6BCFCF]/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-500 ${
                          stage === step.id
                            ? "border-[#2B7A78] bg-[#2B7A78] text-white shadow-[0_0_16px_rgba(43,122,120,0.5)] animate-soft-pulse"
                            : "border-[#E3E5E8] bg-white text-[#7fa5a5] group-hover:border-[#6BCFCF]/30"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm md:text-base font-bold tracking-wide text-[#0E0E0E] uppercase">
                          {step.label}
                        </p>
                        <p className="mt-1 text-xs md:text-sm text-[#4b5c6b] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini comparateur – Notion-like avec hover effects */}
              <div className="mt-5 rounded-2xl border border-[#E3E5E8] bg-white px-5 py-4 shadow-sm hover:shadow-md hover:border-[#6BCFCF]/30 transition-all duration-300">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b8794]">
                    Aperçu des devis
                  </span>
                  <span className="text-xs font-semibold text-[#2B7A78]">
                    Volume et options identiques
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  {/* Offre A */}
                  <div className="group/card flex flex-col gap-1.5 rounded-xl border border-[#E3E5E8] bg-[#F8F9FA] px-3 py-3 hover:border-[#6BCFCF]/40 hover:shadow-md transition-all duration-300">
                    <span className="text-xs font-medium text-[#7b8794]">Offre A</span>
                    <span className="text-lg font-bold text-[#0E0E0E]">1 040 €</span>
                    <span className="text-xs text-[#9aa5b1]">Standard</span>
                  </div>

                  {/* Offre recommandée (highlight) */}
                  <div className="group/card flex flex-col gap-1.5 rounded-xl border-2 border-[#2B7A78] bg-gradient-to-br from-[#E6FFFA] to-white px-3 py-3 shadow-[0_4px_16px_rgba(43,122,120,0.2)] hover:shadow-[0_8px_24px_rgba(43,122,120,0.35)] hover:scale-[1.03] motion-safe:animate-soft-pulse transition-all duration-300">
                    <span className="text-xs font-bold text-[#0f766e]">Offre recommandée</span>
                    <span className="text-lg font-bold text-[#0E0E0E]">890 €</span>
                    <span className="text-xs font-medium text-[#0f766e]">Meilleur rapport qualité/prix</span>
                  </div>

                  {/* Offre C */}
                  <div className="group/card flex flex-col gap-1.5 rounded-xl border border-[#E3E5E8] bg-[#F8F9FA] px-3 py-3 hover:border-[#6BCFCF]/40 hover:shadow-md transition-all duration-300">
                    <span className="text-xs font-medium text-[#7b8794]">Offre C</span>
                    <span className="text-lg font-bold text-[#0E0E0E]">920 €</span>
                    <span className="text-xs text-[#9aa5b1]">Premium</span>
                  </div>
                </div>
              </div>

              {/* Objectif (badge final) */}
              <div className="mt-4 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E5E8] bg-white px-4 py-2 text-xs md:text-sm text-[#04163a] shadow-sm hover:shadow-md hover:border-[#6BCFCF]/40 transition-all duration-300">
                  <span className="rounded-full bg-gradient-to-r from-[#6BCFCF] to-[#4FB8B8] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                    Objectif
                  </span>
                  <span className="font-medium">Comparer, pas se faire rappeler 10 fois.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
