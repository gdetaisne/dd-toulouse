"use client";
import React, { useEffect, useState } from "react";
export default function Hero() {
  const [stage, setStage] = useState(0); // 0 idle, 1 photos, 2 analyse, 3 devis

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;
    let t3: ReturnType<typeof setTimeout> | undefined;
    let t4: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      setStage(1);
      // Faster, smoother sequence: Photos (quick complete) -> IA -> Devis
      t1 = setTimeout(() => setStage(2), 600);
      t2 = setTimeout(() => setStage(3), 1300);
      // small pause after stage 3, then loop
      t3 = setTimeout(() => setStage(0), 2000);
      t4 = setTimeout(run, 2300);
    };
    run();
    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
      if (t3) clearTimeout(t3);
      if (t4) clearTimeout(t4);
    };
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
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Le seul comparateur où vous comparez
              <span className="text-[#6bcfcf]"> vraiment</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Enfin des devis comparables : notre IA crée un inventaire unique (ex : 28 m³) et l’envoie à des déménageurs vérifiés, sans partager vos coordonnées tant que vous ne l’avez pas décidé.
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
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a href="/inventaire-ia/" className="btn-primary" aria-label="Calculer mon volume en photos (gratuit) (gratuit)">
                Calculer mon volume en photos (gratuit)
              </a>
              <span className="text-sm text-white/70">Processus express – 100% gratuit</span>
            </div>
            <div className="mt-6 flex flex-col items-center gap-4 text-sm text-white/80 sm:flex-row lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs">👤</div>
                  <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs">👤</div>
                  <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs">👤</div>
                </div>
                <span>+1200 clients satisfaits</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-300">⭐⭐⭐⭐⭐</span>
                <span>Note moyenne 4,9/5</span>
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div className="absolute -inset-6 hidden rounded-3xl bg-black/20 blur-3xl lg:block" />
            <div className="relative rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md md:p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Processus IA anti-arnaque
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">📷</div>
                    <div className="flex-1">
                      <div className="text-white font-medium">Photos uploadées</div>
                      <div className="text-xs text-white/70">48 photos analysées</div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${stage >= 3 ? "bg-emerald-400" : "bg-[#6bcfcf]"}`}
                          style={{ width: stage === 0 ? "8%" : stage === 1 ? "60%" : stage === 2 ? "90%" : "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">🤖</div>
                    <div className="flex-1">
                      <div className="text-white font-medium">IA calcule votre volume</div>
                      <div className="text-xs text-white/70">Volume identique : 28 m³</div>
                      <div className="text-xs text-white/70">Inventaire unique partagé aux pros</div>
                      <div className="mt-3 flex items-center gap-2">
                        {[0, 1, 2, 3].map((d) => (
                          <span
                            key={d}
                            className={`h-2 w-2 rounded-full ${stage >= 3 ? "bg-emerald-400" : stage === 2 && d === 0 ? "bg-[#6bcfcf] animate-pulse" : "bg-white/30"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stage === 3 ? "bg-emerald-400 text-[#04163a]" : "bg-white/10 text-white/70"}`}>{stage === 3 ? "✓" : "…"}</div>
                    <div>
                      <div className="text-white font-medium">Dossier anonyme envoyé</div>
                      <div className="text-xs text-white/70">5+ devis fiables à comparer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}