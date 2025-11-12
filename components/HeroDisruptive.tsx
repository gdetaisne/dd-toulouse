"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroDisruptive() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;
    let t3: ReturnType<typeof setTimeout> | undefined;
    let t4: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      setStage(1);
      t1 = setTimeout(() => setStage(2), 600);
      t2 = setTimeout(() => setStage(3), 1300);
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
        <div className="absolute inset-0 bg-white/0" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            {/* NOUVEAU H1 DISRUPTIF */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Le seul comparateur où vous comparez <span className="text-[#6bcfcf]">vraiment</span>
            </h1>
            
            {/* NOUVELLE DESCRIPTION DISRUPTIVE */}
            <div className="mt-6">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                <strong className="text-white">Enfin des devis comparables :</strong> notre IA calcule votre volume exact <span className="text-[#6bcfcf] font-semibold">(28 m³)</span> et l'envoie à <strong className="text-white">des déménageurs vérifiés et de confiance</strong>
              </p>
            </div>

            {/* 3 GARANTIES */}
            <div className="mt-6 space-y-2 text-base text-white/85">
              <div className="flex items-start gap-2">
                <span className="text-[#6bcfcf] mt-1 font-bold text-lg">✓</span>
                <span><strong className="text-white">Volume identique</strong> pour tous les déménageurs</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#6bcfcf] mt-1 font-bold text-lg">✓</span>
                <span><strong className="text-white">Dossier anonyme</strong> jusqu'à votre choix</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#6bcfcf] mt-1 font-bold text-lg">✓</span>
                <span><strong className="text-white">3-5 devis garantis</strong> sous 7 jours</span>
              </div>
            </div>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a href="/inventaire-ia/" className="btn-primary" aria-label="Comparez 5 devis gratuitement">
                Comparez 5 devis gratuitement
              </a>
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

          {/* GARDER L'ANIMATION EXISTANTE */}
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div className="absolute -inset-6 hidden rounded-3xl bg-black/20 blur-3xl lg:block" />
            <div className="relative rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md md:p-6">
              <div className="flex items-center justify-between text-sm text-white/70">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-400/80" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <span className="h-2 w-2 rounded-full bg-green-400/80" />
                </div>
              </div>
              <div className="mt-4 space-y-4">
                {/* Étape 1 : Photos uploadées */}
                <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">📷</div>
                    <div className="flex-1">
                      <div className="text-white font-medium">1. Photos uploadées</div>
                      <div className="text-xs text-white/70">48 photos analysées</div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${stage >= 1 ? "bg-[#6bcfcf]" : "bg-white/20"}`}
                          style={{ width: stage === 0 ? "0%" : stage >= 1 ? "100%" : "0%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Étape 2 : IA calcule volume */}
                <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">🤖</div>
                    <div className="flex-1">
                      <div className="text-white font-medium">2. IA calcule votre volume</div>
                      <div className="text-xs text-[#6bcfcf] font-semibold">Volume : 28 m³</div>
                      <div className="mt-3 flex items-center gap-2">
                        {[0,1,2,3].map((d) => (
                          <span
                            key={d}
                            className={`h-2 w-2 rounded-full ${stage >= 2 ? "bg-[#6bcfcf]" : stage === 1 && d === 0 ? "bg-[#6bcfcf] animate-pulse" : "bg-white/30"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Étape 3 : 28m³ envoyé à des pros vérifiés */}
                <div className={`rounded-xl border transition-all duration-500 ${stage >= 2 ? "border-[#6bcfcf]/60 bg-[#6bcfcf]/10" : "border-white/15 bg-white/5"} p-4 md:p-5`}>
                  <div className="flex items-start gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stage >= 3 ? "bg-emerald-400 text-[#04163a]" : "bg-white/10 text-white/70"}`}>
                      {stage >= 3 ? "✓" : "📤"}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">3. Envoyé à des pros vérifiés</div>
                      <div className="text-xs text-white/70 mt-1">Tous reçoivent <span className="text-[#6bcfcf] font-semibold">28 m³</span> → 3-5 devis comparables</div>
                      {stage >= 2 && (
                        <div className="mt-3 flex items-center gap-1">
                          {[0,1,2,3,4].map((d) => (
                            <div key={d} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${stage >= 3 ? "bg-emerald-400" : "bg-[#6bcfcf]"}`} style={{ transitionDelay: `${d * 100}ms` }} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-5 -right-3 flex items-center gap-2 rounded-full bg-[#6bcfcf] px-5 py-2.5 text-sm font-semibold text-[#04163a] shadow-xl ring-1 ring-white/30 animate-badge-pop transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(107,207,207,0.45)] hover:ring-white/50">
              <Image src="/logo.png" alt="Logo Moverz" width={16} height={16} className="rounded-[3px] brightness-0 invert" />
              <span>Propulsé par Moverz IA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

