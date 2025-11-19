"use client";

import { useMemo } from "react";

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

export default function Testimonials() {
  const city = useMemo(() => getCityData(resolveCityFromHostname()), []);
  const reviews = getReviewsForCity(city, 3);
  const averageRating = getAverageRating(reviews);
  const ratingLabel = `${averageRating.toString().replace(".", ",")}/5`;

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2b7a78]">
          Avis clients
        </p>
        <h2 className="text-2xl font-semibold text-[#04163a] md:text-3xl lg:text-4xl">
          Ce que disent les clients à {city.nameCapitalized}
        </h2>
        <div className="flex flex-col items-center justify-center gap-1 text-base text-yellow-400 md:text-lg">
          <div className="flex items-center gap-2">
          <span className="text-lg">⭐⭐⭐⭐⭐</span>
            <span className="text-sm text-[#04163a]/70 md:text-base">
              {ratingLabel} de moyenne
          </span>
          </div>
          <p className="text-xs text-[#04163a]/60 md:text-sm">
            Clarté des devis, 0 spam, accompagnement, pros fiables.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
        {reviews.map((review, index) => {
          const [name, location] = review.author.split(" — ");
          const displayName = name ?? review.author;
          const initials = getInitials(displayName);

          return (
            <article
              key={`${review.summary}-${index}`}
              className="rounded-2xl border border-[#dfeaea] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6bcfcf]/15 to-[#2b7a78]/25 ring-2 ring-[#2b7a78]/20">
                  <span className="text-sm font-semibold text-[#043a3a]">
                    {initials}
                  </span>
                </div>
                <div>
                  <div className="text-base font-semibold text-[#04163a]">
                    {displayName}
                  </div>
                  <div className="text-xs text-[#04163a]/60">
                    {location ?? city.nameCapitalized}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[#04163a]/80 md:text-base">
                {review.body}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
