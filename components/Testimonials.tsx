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

import Image from "next/image";

export default function Testimonials() {
  const city = useMemo(() => {
    const citySlug = getCityFromHostname();
    return getCityData(citySlug);
  }, []);

  // Utiliser les 3 premiers quartiers de la ville
  const neighborhoods = city.neighborhoods.slice(0, 3);

  const testimonials = [
    {
      name: "Marie L.",
      location: neighborhoods[0]?.name || city.nameCapitalized,
      text: "Estimation très précise, équipe pro. Déménagement sans stress.",
      avatar: "/images/testimonials/avatar-1.jpg"
    },
    {
      name: "Thomas B.", 
      location: neighborhoods[1]?.name || city.nameCapitalized,
      text: "L'IA a bien évalué le volume. Prix correct, service impeccable.",
      avatar: "/images/testimonials/avatar-2.jpg"
    },
    {
      name: "Sophie M.",
      location: neighborhoods[2]?.name || city.nameCapitalized, 
      text: "Gain de temps énorme avec l'estimation photo. Recommande.",
      avatar: "/images/testimonials/avatar-3.jpg"
    }
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
          Ils nous ont fait confiance
        </h2>
        <div className="flex items-center justify-center gap-2 text-yellow-300 text-xl">
          ⭐⭐⭐⭐⭐ <span className="text-white/70 text-sm md:text-base ml-2">4,9/5 sur 1200+ avis</span>
        </div>
      </div>
      <div className="mt-12 grid md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="card-glass rounded-2xl p-6 md:p-8 border-2 border-white/10 hover:border-[#6bcfcf]/40 hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-[#6bcfcf]/20 to-[#2b7a78]/20 flex-shrink-0 ring-2 ring-white/20">
                <Image 
                  src={testimonial.avatar}
                  alt={`Photo de ${testimonial.name}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                  quality={85}
                />
              </div>
              <div>
                <div className="font-semibold text-white text-base">{testimonial.name}</div>
                <div className="text-sm text-white/60">{testimonial.location}</div>
              </div>
            </div>
            <p className="text-white/85 italic leading-relaxed text-sm md:text-base">"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}