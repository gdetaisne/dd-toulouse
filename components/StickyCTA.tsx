"use client";
import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrolled > 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-0 right-0 z-50 md:bottom-6 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A1929]/95 p-4 sm:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_100px_rgba(0,0,0,0.85)] hover:border-white/20">
          {/* Filament lumineux en haut (Stripe-style) */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#6BCFCF] via-[#4f46e5] to-[#22c55e] opacity-80" />
          
          {/* Glow effect au hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6BCFCF]/0 to-[#4FB8B8]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
          
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
                Passez à l'action
              </p>
              <p className="text-sm md:text-base text-white/75 leading-relaxed">
                Estimation rapide, avec ou sans photos, c'est vous qui décidez.
              </p>
            </div>
            <div className="flex sm:flex-row sm:items-center sm:justify-end">
              <a
                href="/inventaire-ia/"
                className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-6 py-3 text-sm md:text-base font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.4)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 sm:w-auto"
                aria-label="Recevez 5+ devis fiables gratuitement"
              >
                {/* Shimmer effect au hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                <span className="relative">Recevez 5+ devis fiables gratuitement</span>
                <span className="relative text-lg leading-none group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
