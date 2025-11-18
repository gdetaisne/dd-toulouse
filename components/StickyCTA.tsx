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
      className={`fixed bottom-4 left-0 right-0 z-50 md:bottom-6 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="rounded-2xl border border-white/10 bg-[#04141f]/90 p-3 sm:p-4 shadow-[0_18px_60px_rgba(0,0,0,0.65)] backdrop-blur-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2b7a78]">
                Passez à l’action
              </p>
              <p className="text-[11px] sm:text-xs text-white/75">
                Estimation rapide, avec ou sans photos, c’est vous qui décidez.
              </p>
            </div>
            <div className="flex sm:flex-row sm:items-center sm:justify-end">
              <a
                href="/inventaire-ia/"
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2b7a78] via-[#26a69a] to-[#6BCFCF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0b2730]/60 transition hover:shadow-[0_0_35px_rgba(38,166,154,0.6)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6BCFCF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04141f] sm:w-auto"
                aria-label="Recevez 5+ devis fiables gratuitement"
              >
                Recevez 5+ devis fiables gratuitement
                <span className="ml-2 text-base leading-none">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}