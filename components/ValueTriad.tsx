"use client";

import { useMemo } from 'react';
import { getCityData } from '@/lib/cityData';

// Fonction client-side pour résoudre la ville depuis hostname
function getCityFromHostname(): string {
  if (typeof window === 'undefined') return 'toulouse';
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.includes('toulousain')) return 'toulouse';
  if (hostname.includes('bordeaux-demenageur')) return 'bordeaux';
  const cities = ['strasbourg', 'nice', 'lyon', 'marseille', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'toulouse', 'bordeaux'];
  const found = cities.find(city => hostname.includes(city));
  return found || 'toulouse';
}

export default function ValueTriad() {
  const city = useMemo(() => {
    const citySlug = getCityFromHostname();
    return getCityData(citySlug);
  }, []);

  const values = [
    {
      icon: "🎯",
      iconBg: "from-blue-500/20 to-cyan-500/20",
      title: "IA précise",
      description: "Estimation volumétrique ultra‑fiable à partir de vos photos"
    },
    {
      icon: "✨",
      iconBg: "from-purple-500/20 to-pink-500/20",
      title: "Transparence totale",
      description: "Devis détaillés, aucun frais caché"
    },
    {
      icon: "🆓",
      iconBg: "from-green-500/20 to-emerald-500/20",
      title: "100% gratuit",
      description: "Comparez en toute liberté, sans engagement"
    },
    {
      icon: "🏆",
      iconBg: "from-amber-500/20 to-yellow-500/20",
      title: "Experts locaux",
      description: `Déménageurs qualifiés (ex. ${city.nameCapitalized} & Gironde)`
    }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
        Nos garanties
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, i) => (
          <div key={i} className="card-glass rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.iconBg} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
              {value.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}