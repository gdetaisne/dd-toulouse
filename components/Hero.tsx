"use client";
import React, { useEffect, useState } from "react";

export default function Hero() {
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
              Un dossier unique, des déménageurs contrôlés, et enfin des devis vraiment comparables.
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
            <div className="relative overflow-hidden rounded-3xl border border-[#dfeaea]/70 bg-white/95 p-5 shadow-2xl text-[#04163a] md:p-6">
              {/* Header très épuré */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.23em] text-[#2b7a78]/80">
                    Votre dossier en 3 étapes
                  </p>
                  <p className="mt-1 text-xs text-[#04163a]/55">
                    3 étapes. 0 spam. 5+ devis fiables.
                  </p>
                </div>
                <span className="hidden rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700 md:inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Flow IA
                </span>
              </div>

              {/* Steps très minimalistes */}
              <div className="mt-5 space-y-3">
                {[
                  {
                    title: "Constituez votre dossier en 5 minutes",
                    caption: "Quelques infos clés, sans appels ni RDV.",
                  },
                  {
                    title: "Nous contactons des déménageurs certifiés pour vous",
                  },
                  {
                    title: "Comparez les devis et choisissez votre déménageur",
                    caption: "Des devis vraiment comparables, sur des critères objectifs.",
                  },
                ].map((step, index) => {
                  const isActive = stage === index;
                  return (
                    <div
                      key={step.title}
                      className={`flex items-center justify-between rounded-2xl border px-3.5 py-3 transition-all ${
                        isActive
                          ? "border-[#2b7a78]/70 bg-gradient-to-br from-[#e3f4f4] via-[#f5fbfb] to-white shadow-md shadow-[#c2e1e1]"
                          : "border-[#eef3f4] bg-[#f6fbfb]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                            isActive
                              ? "bg-[#2b7a78] text-white"
                              : "bg-white text-[#2b7a78] border border-[#d0e4e4]"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#04163a] md:text-sm">
                            {step.title}
                          </p>
                          {step.caption && (
                            <p className="mt-0.5 text-[11px] text-[#04163a]/70">
                              {step.caption}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}