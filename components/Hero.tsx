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
              {/* Header mockup comparateur */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.23em] text-[#2b7a78]/80">
                    Aperçu de votre comparateur
                  </p>
                </div>
              </div>

              {/* Timeline 1 → 2 → 3 */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] text-[#04163a]/80">
                  {[
                    { label: "Dossier", desc: "Vos infos" },
                    { label: "Matching pros", desc: "Déménageurs filtrés" },
                    { label: "Comparaison", desc: "5+ devis fiables" },
                  ].map((step, index) => {
                    const isActive = stage === index;
                    return (
                      <div key={step.label} className="flex flex-1 items-center">
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold transition-all ${
                              isActive
                                ? "border-[#2b7a78] bg-[#2b7a78] text-white shadow-md shadow-[#2b7a78]/40"
                                : "border-[#c9d7d9] bg-white text-[#2b7a78]"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className="text-[10px] font-medium text-[#37555d]">
                            {step.label}
                          </span>
                          <span className="text-[9px] text-[#7a8b90]">{step.desc}</span>
                        </div>
                        {index < 2 && (
                          <div className="mx-1 hidden h-px flex-1 bg-gradient-to-r from-transparent via-[#9fbec2] to-transparent sm:block" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mockup tableau comparatif (statique, lisible) */}
              <div className="mt-6 rounded-2xl border border-[#eef3f4] bg-[#f9fcfc] p-4 text-[11px]">
                {/* En-têtes colonnes */}
                <div className="mb-3 grid grid-cols-4 items-center gap-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a8b90]">
                    Critère
                  </div>
                  {["Offre A", "Offre recommandée", "Offre C"].map((name, index) => (
                    <div
                      key={name}
                      className={`rounded-xl border px-2.5 py-1.5 text-center text-[10px] font-semibold ${
                        index === 1
                          ? "border-[#2b7a78]/70 bg-white text-[#04163a] shadow-sm shadow-[#bfdede]"
                          : "border-transparent bg-[#e6f1f1] text-[#37555d]"
                      }`}
                    >
                      {name}
                    </div>
                  ))}
                </div>

                {/* Ligne prix */}
                <div className="mb-2 grid grid-cols-4 items-center gap-3">
                  <div className="text-[10px] font-medium text-[#51666c]">Prix</div>
                  {["1 040 €", "890 €", "920 €"].map((price, index) => (
                    <div
                      key={price}
                      className={`rounded-lg px-2.5 py-1.5 text-center text-[11px] font-semibold ${
                        index === 1
                          ? "bg-[#2b7a78] text-white"
                          : "bg-white text-[#04163a]"
                      }`}
                    >
                      {price}
                    </div>
                  ))}
                </div>

                {/* Ligne avis clients */}
                <div className="mb-2 grid grid-cols-4 items-center gap-3">
                  <div className="text-[10px] font-medium text-[#51666c]">Avis clients</div>
                  {["4,2★", "4,8★", "4,6★"].map((score, index) => (
                    <div
                      key={score}
                      className={`rounded-lg px-2.5 py-1.5 text-center text-[10px] ${
                        index === 1
                          ? "bg-[#e3f4f4] text-[#0c3a3a]"
                          : "bg-white text-[#51666c]"
                      }`}
                    >
                      {score}
                    </div>
                  ))}
                </div>

                {/* Ligne services */}
                <div className="mt-1 grid grid-cols-4 items-start gap-3">
                  <div className="text-[10px] font-medium text-[#51666c]">Services</div>
                  <div className="rounded-lg bg-white px-2.5 py-1.5 text-center text-[9px] text-[#9aa8ac]">
                    Standard
                  </div>
                  <div className="rounded-lg bg-white px-2.5 py-1.5 text-[9px] text-[#51666c] ring-1 ring-[#2b7a78]/60">
                    <div className="flex flex-wrap justify-center gap-1">
                      {["Monte-meubles", "Protection", "Cartons"].map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full bg-[#eef5f5] px-1.5 py-0.5"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg bg-white px-2.5 py-1.5 text-center text-[9px] text-[#9aa8ac]">
                    Standard
                  </div>
                </div>
              </div>

              {/* Badges de synthèse */}
              <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-[#37555d]">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f1f1] px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  5+ devis filtrés automatiquement
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f1f1] px-2.5 py-1">
                  0 appels indésirables
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}