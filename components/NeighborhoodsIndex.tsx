"use client";

import { useMemo, useState } from "react";
import { QUARTIERS, COMMUNES, urlForQuartier, urlForCommune } from "@/components/NeighborhoodsData";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

type CardProps = { href: string; title: string; subtitle?: string };

function Card({ href, title, subtitle }: CardProps) {
  return (
    <a 
      href={href} 
      className="group bg-white border border-[#E3E5E8] rounded-3xl p-6 shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-[#6BCFCF]/40 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-lg font-bold text-[#04163a] mb-2">{title}</div>
          {subtitle && <div className="text-sm text-[#4b5c6b] leading-relaxed">{subtitle}</div>}
        </div>
        <svg 
          className="w-5 h-5 text-[#6BCFCF] group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0 mt-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}

export default function NeighborhoodsIndex() {
  const [query, setQuery] = useState("");
  const city = getCityDataFromUrl(env.SITE_URL);

  const filteredQuartiers = useMemo(
    () =>
      QUARTIERS.filter((q) =>
        (q.title + " " + q.slug).toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );
  const filteredCommunes = useMemo(
    () =>
      COMMUNES.filter((c) =>
        (c.title + " " + c.slug).toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      {/* Hero Section - Fond sombre */}
      <section className="section section-contrast relative overflow-hidden">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
              Zones desservies
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Déménagement par quartiers & communes
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Sélectionnez votre zone pour obtenir des prix indicatifs et comparer des devis de déménageurs locaux.
            </p>
          </div>
        </div>
      </section>

      {/* Recherche + Quartiers - Fond clair */}
      <section className="section section-light">
        <div className="container">
          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un quartier ou une commune…"
                className="w-full px-5 py-4 pl-12 rounded-2xl bg-white border border-[#E3E5E8] text-[#04163a] placeholder-[#4b5c6b]/50 focus:outline-none focus:ring-2 focus:ring-[#6bcfcf] focus:border-transparent transition-all shadow-sm"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4b5c6b]/50"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4b5c6b]/50 hover:text-[#04163a] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
        </div>

          {/* Quartiers */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#04163a] mb-2">
                Quartiers de {city.nameCapitalized}
              </h2>
              <p className="text-[#4b5c6b]">
                {filteredQuartiers.length} quartier{filteredQuartiers.length > 1 ? 's' : ''} • Comparez des devis locaux
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuartiers.map((q) => (
                <Card 
                  key={q.slug} 
                  href={urlForQuartier(q.slug)} 
                  title={q.title} 
                  subtitle="Prix indicatifs, conseils d'accès, devis comparables" 
                />
            ))}
              {filteredQuartiers.length === 0 && (
                <p className="text-[#4b5c6b] col-span-full text-center py-8">
                  Aucun quartier ne correspond à votre recherche.
                </p>
              )}
            </div>
          </div>

          {/* Communes limitrophes */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#04163a] mb-2">
                Communes limitrophes
              </h2>
              <p className="text-[#4b5c6b]">
                {filteredCommunes.length} commune{filteredCommunes.length > 1 ? 's' : ''} • Fourchettes de prix et devis
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCommunes.map((c) => (
                <Card 
                  key={c.slug} 
                  href={urlForCommune(c.slug)} 
                  title={c.title} 
                  subtitle="Fourchettes de prix et devis comparables" 
                />
            ))}
              {filteredCommunes.length === 0 && (
                <p className="text-[#4b5c6b] col-span-full text-center py-8">
                  Aucune commune ne correspond à votre recherche.
                </p>
              )}
            </div>
          </div>
          </div>
        </section>

      {/* CTA Final - Fond sombre */}
      <section className="section section-contrast">
        <div className="container">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Prêt à comparer des devis ?
            </h2>
            <a 
              href="/inventaire-ia/" 
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative">Obtenez vos devis gratuitement</span>
              <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


