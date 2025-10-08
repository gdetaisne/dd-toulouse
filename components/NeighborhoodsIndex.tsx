"use client";

import { useMemo, useState } from "react";
import { QUARTIERS, COMMUNES, urlForQuartier, urlForCommune } from "@/components/NeighborhoodsData";

type CardProps = { href: string; title: string; subtitle?: string };

function Card({ href, title, subtitle }: CardProps) {
  return (
    <a href={href} className="card-glass rounded-2xl p-5 hover:translate-y-[2px] hover:shadow-lg transition">
      <div className="text-lg font-semibold">{title}</div>
      {subtitle && <div className="mt-1 text-white/80 text-sm">{subtitle}</div>}
      <div className="mt-3 inline-flex text-sm text-accent underline">Voir la page</div>
    </a>
  );
}

export default function NeighborhoodsIndex() {
  const [query, setQuery] = useState("");

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
    <main className="section">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-semibold">Déménagement par quartiers & communes (Toulouse)</h1>
        <p className="mt-2 text-white/90 max-w-2xl">
          Sélectionnez votre zone pour obtenir des prix indicatifs et lancer une estimation IA en quelques minutes.
        </p>

        <div className="mt-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un quartier ou une commune…"
            className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <section className="mt-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Quartiers de Toulouse</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {filteredQuartiers.map((q) => (
              <Card key={q.slug} href={urlForQuartier(q.slug)} title={q.title} subtitle="Exemples de prix, conseils d’accès, estimation IA" />
            ))}
            {filteredQuartiers.length === 0 && <p className="text-white/80">Aucun quartier ne correspond à votre recherche.</p>}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-semibold">Communes limitrophes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {filteredCommunes.map((c) => (
              <Card key={c.slug} href={urlForCommune(c.slug)} title={c.title} subtitle="Fourchettes de prix et estimation IA" />
            ))}
            {filteredCommunes.length === 0 && <p className="text-white/80">Aucune commune ne correspond à votre recherche.</p>}
          </div>
        </section>

        <div className="mt-12">
          <a href="/inventaire-ia/" className="inline-flex rounded-2xl bg-accent px-5 py-3 text-sm font-medium hover:brightness-110">
            Obtenez votre estimation instantanée
          </a>
        </div>
      </div>
    </main>
  );
}


