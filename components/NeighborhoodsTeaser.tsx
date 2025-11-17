import Link from "next/link";

import { cityData, type CityData } from "@/lib/cityData";

type Neighborhood = CityData["neighborhoods"][number];

interface NeighborhoodsTeaserProps {
  citySlug?: string;
  cityName?: string;
  neighborhoods?: Neighborhood[];
  areaServed?: string[];
}

const FALLBACK_CITY = cityData.toulouse;

export default function NeighborhoodsTeaser({
  citySlug = FALLBACK_CITY.slug,
  cityName = FALLBACK_CITY.nameCapitalized,
  neighborhoods = FALLBACK_CITY.neighborhoods,
  areaServed = FALLBACK_CITY.areaServed,
}: NeighborhoodsTeaserProps) {
  const featuredNeighborhoods = neighborhoods.slice(0, 6);
  const items = [
    ...featuredNeighborhoods.map((hood) => ({
      title: hood.name,
      href: `/${citySlug}/${hood.slug}/`,
    })),
    { title: "Ajouter votre quartier", href: "/contact/", isAdd: true as const },
  ];
  const coverageChips = areaServed.slice(0, 4);
  const quartiersLink = `/quartiers-${citySlug}/`;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6bcfcf]">
            Zones couvertes
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Déménageurs contrôlés à {cityName} et alentours
          </h2>
          <p className="text-white/80 max-w-xl text-sm md:text-base">
            Nous opérons dans les principaux quartiers de {cityName} et les villes voisines. Votre
            dossier est envoyé en priorité aux déménageurs locaux les mieux notés.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {coverageChips.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs text-white/80"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={quartiersLink} className="btn-secondary px-5 py-3 text-sm">
            Voir tous les quartiers
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={
              "rounded-2xl border transition hover:-translate-y-0.5 hover:shadow-lg " +
              ("isAdd" in item
                ? "border-dashed border-[#2b7a78]/40 bg-white p-5 text-[#2b7a78]"
                : "border-[#dfeaea] bg-white/95 p-5 text-[#04163a] shadow-sm")
            }
          >
            {"isAdd" in item ? (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white text-lg">
                  +
                </div>
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-[#2b7a78]/80">Dites-nous où vous déménagez</div>
                </div>
              </div>
            ) : (
              <>
                <div className="text-sm font-semibold text-[#2b7a78] uppercase tracking-[0.15em]">
                  Quartier
                </div>
                <div className="mt-1 text-lg font-semibold">{item.title}</div>
                <div className="mt-1 text-sm text-[#04163a]/70">Déménageurs locaux disponibles</div>
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
