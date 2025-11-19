"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime: number | null = null;
    const startValue = 0;
    
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(startValue + (end - startValue) * easeProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);
  
  return count;
}

function useInView(ref: React.RefObject<HTMLDivElement | null>, threshold: number = 0.3) {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, isInView]);
  
  return isInView;
}

export default function ProofStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, 0.3);
  
  const stats = [
    {
      value: 1200,
      suffix: "+",
      label: "clients ont comparé grâce au comparateur",
      caption: "Dossiers pilotés depuis 2022.",
    },
    {
      value: 4.9,
      suffix: "/5",
      label: "note moyenne vérifiée",
      caption: "Avis sur des dossiers réellement comparés.",
      isDecimal: true,
    },
    {
      value: 5,
      suffix: "+ devis",
      label: "fiables à comparer",
      caption: "Tous chiffrés sur le même dossier, ligne par ligne.",
    },
    {
      value: -18,
      suffix: "%",
      label: "économies moyennes",
      caption: "Écart moyen vs devis le plus cher.",
    },
  ];

  const chips = ["Déménageurs contrôlés", "Dossier anonyme"];

  return (
    <div 
      ref={sectionRef}
      className="relative overflow-hidden space-y-10 rounded-3xl bg-gradient-to-br from-[#0A1929] via-[#04141f] to-[#0b3b46] p-8 md:p-12 lg:p-16 text-white shadow-[0_32px_90px_rgba(0,0,0,0.6)]"
    >
      {/* Halos lumineux (Stripe-style) avec parallax */}
      <div 
        className="pointer-events-none absolute top-0 left-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(107,207,207,0.2),_transparent_70%)] blur-3xl transition-transform duration-1000"
        style={{ transform: isInView ? 'translate(0, 0)' : 'translate(-20px, -20px)' }}
      />
      <div 
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.12),_transparent_70%)] blur-3xl transition-transform duration-1000"
        style={{ transform: isInView ? 'translate(0, 0)' : 'translate(20px, 20px)' }}
      />
      
      {/* Header avec espacement généreux */}
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
            Chiffres clés
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Le comparateur en quelques chiffres
          </h2>
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl font-light">
            Des données issues de dossiers réellement comparés, pas de promesses marketing.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs md:text-sm font-semibold text-white/90 backdrop-blur-sm shadow-lg hover:bg-white/10 hover:border-white/25 transition-all duration-300"
            >
              <span className="h-2 w-2 rounded-full bg-[#6BCFCF] animate-pulse" />
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Stats cards avec counter animations */}
      <div className="relative grid gap-6 md:grid-cols-4 md:gap-8">
        {stats.map((stat, index) => {
          const count = useCountUp(
            stat.isDecimal ? Math.round(stat.value * 10) : Math.abs(stat.value),
            2000,
            isInView
          );
          
          const displayValue = stat.isDecimal 
            ? (count / 10).toFixed(1).replace('.', ',')
            : stat.value < 0 
              ? `-${count}`
              : count;
          
          return (
            <div
              key={stat.label}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-white/20 motion-safe:animate-fade-up-soft"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Glow effect au hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6BCFCF]/0 to-[#4FB8B8]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
              
              <div className="relative space-y-4">
                <div className="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-white/60">
                  {stat.label}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl md:text-6xl font-bold text-white leading-none transition-all duration-300 group-hover:text-[#6BCFCF]">
                    {displayValue}
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-white/80 leading-none">
                    {stat.suffix}
                  </span>
                </div>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">{stat.caption}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
