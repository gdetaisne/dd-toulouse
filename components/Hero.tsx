"use client";
import React, { useEffect, useState } from "react";

export default function Hero() {
  // 0 = Photos / estimation, 1 = Dossier anonyme, 2 = 5+ devis fiables
  const [stage, setStage] = useState(0);

  useEffect(() => {
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
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Processus IA anti-arnaque
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Le seul comparateur où vous comparez
              <span className="text-[#6bcfcf]"> vraiment</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/85 max-w-xl mx-auto lg:mx-0">
              En 3 étapes : calcul de votre volume, dossier anonyme, puis 5+ devis fiables à comparer.
            </p>
            <ul className="mt-6 space-y-3 text-base md:text-lg text-white/90">
              {[
                "Volume identique pour tous les déménageurs",
                "Dossier anonyme jusqu’à votre choix",
                "5+ devis fiables à comparer (gratuit)",
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
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div className="absolute -inset-6 hidden rounded-3xl bg-black/20 blur-3xl lg:block" />
            <div className="relative rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md md:p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Votre dossier en 3 étapes
              </div>

              {/* Stepper header */}
              <div className="mt-4 flex items-center justify-between text-[11px] font-medium text-white/70">
                {["1. Calcul de volume", "2. Dossier anonyme", "3. 5+ devis fiables"].map(
                  (label, index) => (
                    <div
                      key={label}
                      className={`flex flex-1 items-center gap-2 ${
                        index === 0 ? "" : "justify-center"
                      }`}
                    >
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] transition-all ${
                          stage === index
                            ? "border-emerald-300 bg-emerald-300 text-[#04163a] shadow-lg shadow-emerald-500/40"
                            : "border-white/30 bg-white/5 text-white/80"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span
                        className={`hidden sm:inline transition-colors ${
                          stage === index ? "text-white" : "text-white/70"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="mt-4">
                {/* Carte principale : étape active uniquement, version minimaliste */}
                {stage === 0 && (
                  <div className="rounded-xl border border-white/50 bg-white/15 p-4 md:p-5 shadow-xl shadow-black/40 scale-[1.02] transition-all">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                        📷
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">Calcul de volume</div>
                        <div className="mt-1 text-xs text-white/70">
                          48 photos analysées ou estimation rapide sans photos — c’est vous qui décidez.
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white/80">
                          <span>Avec photos</span>
                          <span className="text-white/40">•</span>
                          <span>Ou estimation rapide sans photos</span>
                        </div>
                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-1.5 rounded-full bg-[#6bcfcf] transition-all duration-700"
                            style={{
                              width: "80%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {stage === 1 && (
                  <div className="rounded-xl border border-white/50 bg-white/15 p-4 md:p-5 shadow-xl shadow-black/40 scale-[1.02] transition-all">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                        🤖
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">Dossier anonyme</div>
                        <div className="mt-1 text-xs text-white/70">
                          IA calcule un inventaire unique envoyé aux pros, sans partager vos coordonnées.
                        </div>
                        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                          <span>Volume figé : 28 m³ (le même pour tous)</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {stage === 2 && (
                  <div className="rounded-xl border border-emerald-300 bg-emerald-300/15 p-4 md:p-5 shadow-xl shadow-emerald-500/30 scale-[1.02] transition-all">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-300 text-sm text-[#04163a]">
                        ✓
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">5+ devis fiables à comparer</div>
                        <div className="mt-1 text-xs text-white/70">
                          Tous les déménageurs chiffrent sur le même volume. Vous comparez enfin ligne par
                          ligne.
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                          {["Déménageur A", "Déménageur B"].map((label, index) => (
                            <div
                              key={label}
                              className={`rounded-lg border bg-white/5 px-2 py-2 ${
                                index === 1
                                  ? "border-emerald-300 bg-white text-[#04163a]"
                                  : "border-white/15 text-white/80"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-[11px]">{label}</span>
                                <span className="text-[10px] text-white/60">28 m³</span>
                              </div>
                              <div className="mt-1 text-[11px]">
                                {index === 1 ? "Économie moyenne -18%" : "Offre comparable"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}