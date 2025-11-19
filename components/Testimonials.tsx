"use client";

import { useMemo, useState } from "react";

import { getCityData } from "@/lib/cityData";
import { getAverageRating, getReviewsForCity } from "@/lib/reviews";

const citySlugs = [
  "strasbourg",
  "nice",
  "lyon",
  "marseille",
  "nantes",
  "lille",
  "rennes",
  "rouen",
  "montpellier",
  "toulouse",
  "bordeaux",
];

function resolveCityFromHostname(): string {
  if (typeof window === "undefined") return "marseille";
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.includes("toulousain")) return "toulouse";
  if (hostname.includes("bordeaux-demenageur")) return "bordeaux";
  const match = citySlugs.find((slug) => hostname.includes(slug));
  return match ?? "marseille";
}

function getInitials(author: string): string {
  const name = author.trim();
  if (!name) return "·";
  const parts = name.split(" ").filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "·";
}

function TestimonialCard({ review, index }: { review: any; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -8; // Max 8deg
    const tiltY = ((x - centerX) / centerX) * 8;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const city = useMemo(() => getCityData(resolveCityFromHostname()), []);
  const [name, location] = review.author.split(" — ");
  const displayName = name ?? review.author;
  const initials = getInitials(displayName);

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl border border-[#dfeaea] bg-white p-6 md:p-8 shadow-lg transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-[#6bcfcf]/40 motion-safe:animate-fade-up-soft"
      style={{
        animationDelay: `${index * 100}ms`,
        transform: isHovering
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: 'transform 0.1s ease-out, box-shadow 0.3s, border-color 0.3s',
      }}
    >
      {/* Glow effect au hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6BCFCF]/0 to-[#4FB8B8]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
      
      <div className="relative space-y-5">
        {/* Avatar + Info */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6bcfcf]/20 to-[#2b7a78]/30 ring-2 ring-[#2b7a78]/20 transition-all duration-300 group-hover:ring-[#6bcfcf]/40 group-hover:scale-110">
            <span className="text-base font-bold text-[#043a3a]">
              {initials}
            </span>
          </div>
          <div>
            <div className="text-base md:text-lg font-bold text-[#04163a]">
              {displayName}
            </div>
            <div className="text-xs md:text-sm text-[#04163a]/60">
              {location ?? city.nameCapitalized}
            </div>
          </div>
        </div>

        {/* Quote avec style */}
        <div className="relative">
          <span className="absolute -left-2 -top-2 text-4xl text-[#6bcfcf]/20 font-serif">"</span>
          <p className="text-sm md:text-base leading-relaxed text-[#04163a]/80 pl-4">
            {review.body}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const city = useMemo(() => getCityData(resolveCityFromHostname()), []);
  const reviews = getReviewsForCity(city, 3);
  const averageRating = getAverageRating(reviews);
  const ratingLabel = `${averageRating.toString().replace(".", ",")}/5`;

  return (
    <div className="space-y-10">
      {/* Header avec espacement généreux */}
      <div className="space-y-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2b7a78]">
          Avis clients
        </p>
        <h2 className="text-3xl font-bold text-[#04163a] md:text-4xl lg:text-5xl leading-tight">
          Ce que disent les clients à {city.nameCapitalized}
        </h2>
        <div className="flex flex-col items-center justify-center gap-2 text-base text-yellow-400 md:text-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            <span className="text-base md:text-lg font-semibold text-[#04163a]/80">
              {ratingLabel} de moyenne
            </span>
          </div>
          <p className="text-sm md:text-base text-[#04163a]/60 font-light">
            Clarté des devis, 0 spam, accompagnement, pros fiables.
          </p>
        </div>
      </div>

      {/* Cards avec tilt 3D */}
      <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
        {reviews.map((review, index) => (
          <TestimonialCard key={`${review.summary}-${index}`} review={review} index={index} />
        ))}
      </div>
    </div>
  );
}
