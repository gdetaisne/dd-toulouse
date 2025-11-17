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
            <div className="relative rounded-3xl border border-[#dfeaea]/70 bg-white/95 p-5 shadow-2xl text-[#04163a] md:p-6">
              {/* Header */}
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2b7a78]/80">
                  Votre dossier en 3 étapes
                </p>
                <p className="text-sm text-[#04163a]/80">
                  Photos, infos, puis 5+ devis comparables, sans appels indésirables.
                </p>
              </div>

              {/* Steps row */}
              <div className="mt-5 grid gap-3 md:grid-cols-3 text-xs md:text-[11px] text-[#04163a]/80">
                {[
                  {
                    icon: "📂",
                    title: "Dossier",
                    desc: "Photos ou infos rapides, dossier prêt pour devis.",
                  },
                  {
                    icon: "📞",
                    title: "Pros contactés",
                    desc: "Dossier anonyme envoyé à des déménageurs contrôlés.",
                  },
                  {
                    icon: "✓",
                    title: "Devis comparables",
                    desc: "Même dossier pour tous, comparaison ligne par ligne.",
                  },
                ].map((step, index) => {
                  const isActive = stage === index;
                  return (
                    <div
                      key={step.title}
                      className={`flex flex-col gap-2 rounded-2xl border px-3 py-2.5 transition-all ${
                        isActive
                          ? "border-[#2b7a78]/60 bg-gradient-to-br from-[#e3f4f4] to-[#f5fbfb] shadow-md shadow-[#b6dede]"
                          : "border-[#eef3f4] bg-[#f6fbfb]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2b7a78]">
                          {step.title}
                        </span>
                        <span className="text-sm">{step.icon}</span>
                      </div>
                      <p className="text-[11px] leading-snug">{step.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Summary bar */}
              <div className="mt-5 rounded-xl border border-[#eef3f4] bg-[#f6fbfb] px-3 py-2 text-[11px] text-[#04163a]/75">
                <span className="font-semibold">En résumé :</span> un seul dossier bien structuré, 5+ devis
                filtrés, et un comparatif clair pour choisir votre déménageur.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}