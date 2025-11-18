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
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-hero" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/90 via-[#06263a]/80 to-[#0b3b46]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Colonne gauche – texte */}
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
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
            <ul className="mt-6 space-y-3 text-base md:text-lg text-white/90">
              {[
                "Même volume pour tous les déménageurs",
                "Dossier anonyme jusqu’à votre choix",
                "5+ devis fiables, 100% gratuits",
              ].map((text) => (
                <li
                  key={text}
                  className="flex items-start gap-3 justify-center lg:justify-start"
                >
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#6bcfcf]/50 bg-white/5 text-[#6bcfcf] shadow-sm">
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

          {/* Colonne droite – mockup comparateur statique */}
          <div className="relative mx-auto w-full max-w-[580px] lg:mx-0">
            <div className="absolute -inset-6 hidden rounded-[32px] bg-black/60 blur-3xl lg:block" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/30 bg-white/18 p-5 shadow-[0_32px_90px_rgba(0,0,0,0.65)] backdrop-blur-2xl text-[#04163a] md:p-6">
              {/* Header minimal – uniquement le pill */}
              <div className="flex items-center justify-end">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1ad5d5] px-3 py-1.5 text-[10px] font-semibold text-[#043a3a] shadow-sm shadow-black/30">
                  3 étapes. 0 spam. 5+ devis fiables.
                </span>
              </div>

              {/* Carte process en 3 étapes – style fenêtre 2025 */}
              <div className="mt-5 space-y-3 text-[11px]">
                {/* Étape 1 : Dossier unique */}
                <div
                  className={`rounded-3xl border px-4 py-3 md:px-5 md:py-4 backdrop-blur-sm transition-all duration-500 ${
                    stage === 0
                      ? "border-white/45 bg-white/20 opacity-100 translate-y-0 shadow-lg shadow-black/40 scale-[1.01]"
                      : "border-white/10 bg-white/5 opacity-55 translate-y-0.5 shadow-sm shadow-black/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-2xl border text-[12px] font-semibold transition-all duration-500 ${
                          stage === 0
                            ? "border-[#6bcfcf] bg-white text-[#043a3a] shadow-sm shadow-black/40"
                            : "border-white/30 bg-white/12 text-[#7fa5a5]"
                        }`}
                      >
                        1
                      </div>
                      <div>
                          <p className="text-[11px] md:text-[13px] font-semibold text-white/85 tracking-[0.14em] uppercase">
                          Dossier unique
                        </p>
                          <p className="mt-0.5 text-[11px] md:text-[12px] text-white/60">
                          Un seul dossier envoyé à 5+ déménageurs contrôlés.
                        </p>
                      </div>
                    </div>
                    <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-white/12 sm:block">
                      <div className="h-full w-[72%] rounded-full bg-[#6bcfcf]/80" />
                    </div>
                  </div>
                </div>

                {/* Étape 2 : Déménageurs filtrés */}
                <div
                  className={`rounded-3xl border px-4 py-3 md:px-5 md:py-4 backdrop-blur-sm transition-all duration-500 ${
                    stage === 1
                      ? "border-white/45 bg-white/20 opacity-100 translate-y-0 shadow-lg shadow-black/40 scale-[1.01]"
                      : "border-white/10 bg-white/5 opacity-70 translate-y-0.5 shadow-sm shadow-black/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-2xl border text-[12px] font-semibold transition-all duration-500 ${
                          stage === 1
                            ? "border-[#6bcfcf] bg-white text-[#043a3a] shadow-sm shadow-black/40"
                            : "border-white/30 bg-white/12 text-[#7fa5a5]"
                        }`}
                      >
                        2
                      </div>
                      <div>
                        <p className="text-[11px] md:text-[13px] font-semibold text-white/85 tracking-[0.14em] uppercase">
                          Pros filtrés
                        </p>
                        <p className="mt-0.5 text-[11px] md:text-[12px] text-white/60">
                          On ne garde que les déménageurs fiables, bien notés et assurés.
                        </p>
                      </div>
                    </div>
                    <div className="hidden items-center gap-1.5 sm:flex">
                      {[0, 1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          className={`h-1.5 w-1.5 rounded-full ${
                            dot < 3 ? "bg-[#6bcfcf]" : "bg-white/26"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Étape 3 : Devis comparables */}
                <div
                  className={`relative overflow-hidden rounded-3xl border px-4 py-4 md:px-5 md:py-5 transition-all duration-500 ${
                    stage === 2
                      ? "border-white/60 bg-white/95 translate-y-0 shadow-[0_20px_60px_rgba(0,0,0,0.45)] scale-[1.01]"
                      : "border-white/25 bg-white/75 translate-y-0.5 shadow-lg shadow-black/25"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-2xl border text-[12px] font-semibold transition-all duration-500 ${
                            stage === 2
                              ? "border-[#34d399] bg-[#a7f3d0] text-[#064e3b] shadow-sm shadow-black/40"
                              : "border-emerald-200/60 bg-emerald-400/14 text-emerald-900/80"
                          }`}
                        >
                          3
                        </div>
                        <div>
                          <p className="text-[11px] md:text-[13px] font-semibold tracking-[0.14em] text-[#043a3a] uppercase">
                            Comparaison claire
                          </p>
                          <p className="mt-0.5 text-[11px] md:text-[12px] text-[#315a5a]">
                            5+ devis alignés sur le même volume et les mêmes options.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Mini comparateur – focus sur une offre */}
                    <div className="mt-3">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6d8f8f]">
                          Aperçu des devis
                        </span>
                        <span className="text-[10px] font-medium text-[#1fb6aa]">
                          Offre recommandée mise en avant
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[10px] text-[#315a5a]">
                        <div className="flex-1 rounded-2xl bg-white/60 px-3 py-2">
                          <p className="font-semibold">Offre A</p>
                          <p className="mt-0.5 text-[13px] md:text-[14px] font-semibold">
                            1 040 €
                          </p>
                        </div>
                        <div className="flex-1 rounded-2xl bg-white/60 px-3 py-2">
                          <p className="font-semibold">Offre recommandée</p>
                          <p className="mt-0.5 text-[13px] md:text-[14px] font-semibold">
                            890 €
                          </p>
                        </div>
                      </div>

                      {/* Carte flottante pour l'offre C */}
                      <div
                        className={`pointer-events-none absolute right-6 bottom-5 transition-transform duration-500 ${
                          stage === 2 ? "translate-y-0" : "translate-y-1"
                        }`}
                      >
                        <div className="rounded-2xl bg-white px-4 py-3 text-[11px] text-[#04163a] shadow-xl shadow-black/20">
                          <p className="text-[10px] font-semibold text-[#6d8f8f]">
                            Offre C
                          </p>
                          <p className="mt-0.5 text-[13px] md:text-[14px] font-semibold">
                            920 €
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Objectif mis en avant */}
              <div className="mt-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 px-3 py-1.5 text-[11px] text-white/85 shadow-sm shadow-black/30">
                  <span className="rounded-full bg-[#6bcfcf] px-2 py-0.5 text-[10px] font-semibold text-[#043a3a]">
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

