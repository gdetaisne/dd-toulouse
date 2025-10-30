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
    <div className={`fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-6 md:right-6 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
      <div className="mx-auto max-w-md">
        <div className="card-glass rounded-2xl p-4 text-center">
          <p className="text-sm text-white/90 mb-3">Prêt pour déménager?</p>
          <a href="/inventaire-ia/" className="btn-accent w-full text-center" aria-label="Obtenez vos devis précis gratuitement">Obtenez vos devis précis gratuitement</a>
        </div>
      </div>
    </div>
  );
}