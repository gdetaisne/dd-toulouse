"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
        {/* Image de fond évocatrice */}
        <img 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
          alt="Déménagement professionnel - Équipe de déménageurs"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient fort pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/90 to-[#04163a]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Préparez votre déménagement en 30 minutes</h1>
            <p className="mt-3 text-lg md:text-xl text-white/90">Envoyez vos photos, recevez 5 devis fiables sous 7 jours — sans appels ni formulaires, l'IA s'occupe de tout.</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-white/80 lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                <Image src="/logo.png" alt="Logo Moverz" width={16} height={16} className="rounded-[3px]" />
                <span>Propulsé par Moverz IA</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15"><span className="h-1 w-1 rounded-full bg-white/50" />Déménageurs vérifiés</span>
            </div>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a href="/inventaire-ia/" className="btn-primary" aria-label="Obtenez vos devis précis gratuitement">Obtenez vos devis précis gratuitement</a>
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
              <div className="flex items-center justify-between text-sm text-white/70">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-400/80" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <span className="h-2 w-2 rounded-full bg-green-400/80" />
                </div>
                {/* right-side header content intentionally left empty */}
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
                      <div className="text-white font-medium">Analyse IA</div>
                      <div className="text-xs text-white/70">Volume total: 28 m³</div>
                      <div className="text-xs text-white/70">Démonté et emballé: 23 m²</div>
                      <div className="mt-3 flex items-center gap-2">
                        {[0,1,2,3].map((d) => (
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
                      <div className="text-white font-medium">5 devis générés</div>
                      <div className={`text-xs ${stage === 3 ? "text-white/90" : "text-white/70"}`}>Prêts sous 7 jours</div>
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