"use client";

import { useMemo } from 'react';
import Image from 'next/image';

import { getCityData } from '@/lib/cityData';
import { getAverageRating, getReviewsForCity } from '@/lib/reviews';

const citySlugs = ['strasbourg', 'nice', 'lyon', 'marseille', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'toulouse', 'bordeaux'];

function resolveCityFromHostname(): string {
  if (typeof window === 'undefined') return 'marseille';
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.includes('toulousain')) return 'toulouse';
  if (hostname.includes('bordeaux-demenageur')) return 'bordeaux';
  const match = citySlugs.find((slug) => hostname.includes(slug));
  return match ?? 'marseille';
}

export default function Testimonials() {
  const city = useMemo(() => getCityData(resolveCityFromHostname()), []);
  const reviews = getReviewsForCity(city, 3);
  const averageRating = getAverageRating(reviews);
  const ratingLabel = `${averageRating.toString().replace('.', ',')}/5`;

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
          Ils nous ont fait confiance à {city.nameCapitalized}
        </h2>
        <div className="flex items-center justify-center gap-2 text-yellow-300 text-xl">
          ⭐⭐⭐⭐⭐<span className="text-white/70 text-sm md:text-base ml-2">{ratingLabel} sur 1200+ avis</span>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6 md:gap-8">
        {reviews.map((review, index) => {
          const [name, location] = review.author.split(' — ');
          return (
            <article
              key={`${review.summary}-${index}`}
              className="card-glass rounded-2xl p-6 md:p-8 border-2 border-white/10 hover:border-[#6bcfcf]/40 hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-[#6bcfcf]/20 to-[#2b7a78]/20 flex-shrink-0 ring-2 ring-white/20">
                  <Image
                    src={`/images/testimonials/avatar-${(index % 3) + 1}.jpg`}
                    alt={`Photo de ${name ?? review.author}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                    quality={85}
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-base">{name ?? review.author}</div>
                  <div className="text-sm text-white/60">
                    {location ?? city.nameCapitalized}
                  </div>
                </div>
              </div>
              <p className="text-white/85 italic leading-relaxed text-sm md:text-base">{review.body}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
