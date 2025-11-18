"use client";
import React, { useEffect, useState } from "react";

export default function Hero() {
  const [stage, setStage] = useState(2);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      // Respecte les préférences de l’utilisateur : pas d’animation
      return;
    }

    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden text-white font-sans">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-hero" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/90 via-[#06263a]/80 to-[#0b3b46]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/12 via-transparent to-white/5" />
        <div className="pointer-events-none absolute -top-24 right-[-120px] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(107,207,207,0.28),_transparent_65%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Colonne gauche – texte */}
          <div
            className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left motion-safe:animate-fade-up-soft"
            style={{ animationDelay: "40ms" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Processus IA anti-arnaque
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Comparez enfin des devis de déménageurs
              <span className="text-[#6bcfcf]"> comparables</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/85 max-w-xl mx-auto lg:mx-0">
              Un seul dossier, des déménageurs contrôlés, des devis comparables.
            </p>
            <ul className="mt-6 space-y-3 text-sm md:text-base text-white/90">
              {[
                "Même volume pour tout le monde",
                "Dossier anonyme, vous décidez",
                "5+ devis fiables, 100% gratuits",
              ].map((text) => (
                <li
                  key={text}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#6bcfcf]/40 bg-white/5 text-[#6bcfcf] shadow-sm">
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 13.5L9.5 18L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-center justify-center sm:flex-row lg:justify-start">
              <a
                href="/inventaire-ia/"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3 text-base md:text-lg"
                aria-label="Comparez 5+ devis gratuitement"
              >
                Comparez 5+ devis gratuitement
                <span className="text-xl leading-none">→</span>
              </a>
            </div>
          </div>

          {/* Colonne droite – mockup comparateur style Stripe */}
          <div
            className="relative mx-auto w-full max-w-[560px] lg:mx-0 motion-safe:animate-fade-up-soft"
            style={{ animationDelay: "140ms" }}
          >
            <div className="absolute -inset-6 hidden rounded-3xl bg-black/60 blur-3xl lg:block" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/95 via-white to-[#F5FBFB] p-5 md:p-6 shadow-[0_24px_70px_rgba(15,23,42,0.55)] text-[#04163a] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.7)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#6BCFCF] via-[#4f46e5] to-[#22c55e]" />
              {/* Header minimal – baseline */}
              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b304a] px-3 py-1.5 text-[10px] font-semibold text-white/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  3 étapes · 0 spam · 5+ devis fiables
                </span>
                <span className="hidden text-[11px] font-medium text-[#64748b] md:inline">
                  ⏱️ 30 min → 5+ devis alignés
                </span>
              </div>

              {/* Pipeline en 3 étapes équilibrées */}
              <div className="mt-5 space-y-2.5 text-[11px]">
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
                    description:
                      "5+ offres alignées sur le même volume et les mêmes options.",
                  },
                ].map((step, index) => (
                  <div
                    key={step.label}
                    className={`rounded-2xl border px-4 py-3.5 md:px-5 md:py-4 transition-all duration-500 ${
                      stage === step.id
                        ? "border-[#6BCFCF] bg-white/90 shadow-md shadow-black/25 translate-y-0 scale-[1.01]"
                        : "border-white/30 bg-white/65 shadow-sm shadow-black/15 translate-y-0 hover:scale-[1.01] hover:shadow-md hover:shadow-black/25"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl border text-[11px] font-semibold transition-all duration-500 ${
                          stage === step.id
                            ? "border-[#2B7A78] bg-[#2B7A78] text-white animate-soft-pulse"
                            : "border-[#E3E5E8] bg-white text-[#7fa5a5]"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] md:text-[13px] font-semibold tracking-[0.16em] text-[#0E0E0E] uppercase">
                          {step.label}
                        </p>
                        <p className="mt-0.5 text-[11px] md:text-[12px] text-[#4b5c6b]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini comparateur – style Notion-like */}
              <div className="mt-4 rounded-2xl border border-[#E3E5E8] bg-white/95 px-4 py-3.5 md:px-5 md:py-4 shadow-sm shadow-black/10">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7b8794]">
                    Aperçu des devis
                  </span>
                  <span className="text-[10px] font-medium text-[#2B7A78]">
                    Volume et options identiques
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-[#04163a]">
                  <div className="flex flex-col gap-1 rounded-xl border border-[#E3E5E8] bg-[#F8F9FA] px-3 py-2">
                    <span className="text-[10px] font-medium text-[#7b8794]">
                      Offre A
                    </span>
                    <span className="text-[13px] font-semibold">1 040 €</span>
                    <span className="text-[10px] text-[#9aa5b1]">
                      Standard
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-xl border border-[#2B7A78] bg-[#E6FFFA] px-3 py-2 shadow-sm shadow-emerald-500/20 motion-safe:animate-soft-pulse">
                    <span className="text-[10px] font-medium text-[#0f766e]">
                      Offre recommandée
                    </span>
                    <span className="text-[13px] font-semibold text-[#0E0E0E]">
                      890 €
                    </span>
                    <span className="text-[10px] text-[#0f766e]">
                      Meilleur rapport qualité/prix
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-xl border border-[#E3E5E8] bg-[#F8F9FA] px-3 py-2">
                    <span className="text-[10px] font-medium text-[#7b8794]">
                      Offre C
                    </span>
                    <span className="text-[13px] font-semibold">920 €</span>
                    <span className="text-[10px] text-[#9aa5b1]">Premium</span>
                  </div>
                </div>
              </div>

              {/* Objectif mis en avant */}
              <div className="mt-3 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E5E8] bg-white/90 px-3 py-1.5 text-[11px] text-[#04163a] shadow-sm shadow-black/10">
                  <span className="rounded-full bg-[#6BCFCF] px-2 py-0.5 text-[10px] font-semibold text-[#043a3a]">
                    Objectif
                  </span>
                  <span>Comparer, pas se faire rappeler 10 fois.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

