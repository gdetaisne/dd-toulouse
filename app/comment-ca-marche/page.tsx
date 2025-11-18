import React from "react";
import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "Comment ça marche ? Déménagement Nice en 3 étapes | Moverz",
  description:
    "Créez un inventaire IA unique en 30 min, recevez 5+ devis de déménageurs contrôlés (solvabilité vérifiée, 0 litige) et choisissez sans harcèlement. 100% gratuit.",
  alternates: {
    canonical: getCanonicalUrl("comment-ca-marche"),
  },
  openGraph: {
    title: "Processus IA anti-arnaque : 5+ devis comparables à Nice | Moverz",
    description:
      "Notre IA calcule votre volume exact et l'envoie à 5+ déménageurs contrôlés. Recevez des devis comparables en 7 jours, sans appels intrusifs.",
    url: getCanonicalUrl("comment-ca-marche"),
    type: "website",
  },
};

export default function CommentCaMarchePage() {
  const city = getCityDataFromUrl(env.SITE_URL);

  const steps = [
    {
      number: "1",
      title: "Créez votre dossier unique",
      description: (
        <>
          Quelques infos clés sur votre déménagement (adresses, accès, volume
          estimé, contraintes).{" "}
          <span className="font-semibold text-[#043a3a]">📁 Un seul dossier</span>{" "}
          pour tous les déménageurs.
        </>
      ),
    },
    {
      number: "2",
      title: "Nous filtrons les déménageurs",
      description: (
        <>
          On ne garde que les{" "}
          <span className="font-semibold text-[#043a3a]">🛡️ pros fiables</span>,
          bien notés et assurés. Votre dossier reste anonyme : vous gardez la
          main.
        </>
      ),
    },
    {
      number: "3",
      title: "Vous comparez 5+ devis fiables",
      description: (
        <>
          Même base, mêmes options, même volume estimé :{" "}
          <span className="font-semibold text-[#043a3a]">📊 des devis enfin comparables</span>
          , sans appels commerciaux non souhaités.
        </>
      ),
    },
  ];

  return (
    <main className="bg-hero">
      <div className="halo" />

      {/* Hero simplifié */}
      <section className="section section-contrast relative overflow-hidden">
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Breadcrumbs
              items={[
                { label: "Accueil", href: "/" },
                { label: "Comment ça marche", href: "/comment-ca-marche" },
              ]}
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF]" />
              Processus en 3 étapes
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
              Comment fonctionne le comparateur de devis&nbsp;?
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto">
              L’objectif est simple :{" "}
              <span className="font-semibold text-white">
                comparer des devis vraiment comparables
              </span>{" "}
              pour votre déménagement à {city.nameCapitalized},{" "}
              <span className="font-semibold text-[#6BCFCF]">
                sans spam ni appels commerciaux
              </span>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Étapes en 3 cartes */}
      <section className="section section-light">
        <div className="container space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#04163a]">
              Les 3 étapes, concrètement
            </h2>
            <p className="text-sm md:text-base text-[#04163a]/70 max-w-2xl mx-auto">
              Un seul fil conducteur : vous gardez la main sur votre dossier,
              nous gérons la partie compliquée.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group flex flex-col gap-3 rounded-2xl border border-[#E3E5E8] bg-white p-5 md:p-6 shadow-sm shadow-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.15)]"
              >
                <div className="mb-1 flex justify-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#6BCFCF] bg-[#0b304a] text-[12px] font-semibold text-[#6BCFCF] shadow-[0_0_0_4px_rgba(107,207,207,0.22)]">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-sm md:text-base font-semibold text-[#04163a] text-center md:text-left">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-[#4b5c6b]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#E3E5E8] bg-[#F4FBFB] p-4 text-sm text-[#043a3a]">
              <p className="font-semibold">Ce que vous gagnez</p>
              <ul className="mt-2 space-y-1 text-xs md:text-sm text-[#285c5c]">
                <li>
                  •{" "}
                  <span className="font-semibold text-[#043a3a]">
                    ⏱️ 30 minutes
                  </span>{" "}
                  pour créer un dossier propre.
                </li>
                <li>
                  •{" "}
                  <span className="font-semibold text-[#0f766e]">📨 5+ devis</span>{" "}
                  reçus sans relances ni visites inutiles.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#E3E5E8] bg-[#F8FAFC] p-4 text-sm text-[#043a3a]">
              <p className="font-semibold">Ce que l’on évite</p>
              <ul className="mt-2 space-y-1 text-xs md:text-sm text-[#285c5c]">
                <li>
                  •{" "}
                  <span className="font-semibold text-[#b91c1c]">
                    ❌ Devis incomparables
                  </span>
                  , formats différents.
                </li>
                <li>
                  •{" "}
                  <span className="font-semibold text-[#b91c1c]">
                    📵 Appels commerciaux non sollicités
                  </span>
                  .
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#E3E5E8] bg-white p-4 text-sm text-[#043a3a]">
              <p className="font-semibold">Ce que ça reste</p>
              <ul className="mt-2 space-y-1 text-xs md:text-sm text-[#285c5c]">
                <li>
                  •{" "}
                  <span className="font-semibold text-[#0f766e]">
                    🔓 Gratuit, sans engagement
                  </span>
                  .
                </li>
                <li>
                  • Dossier{" "}
                  <span className="font-semibold text-[#0f766e]">
                    🕵️ anonyme jusqu’à votre choix final
                  </span>
                  .
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Qui fait quoi ? */}
      <section className="section section-gray">
        <div className="container space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#04163a]">
              Qui fait quoi dans le process&nbsp;?
            </h2>
            <p className="text-sm md:text-base text-[#04163a]/70 max-w-2xl mx-auto">
              Vous vous concentrez sur vos critères et votre calendrier, nous
              gérons la partie technique et la mise en forme des devis.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[#E3E5E8] bg-white p-5 md:p-6 shadow-sm shadow-black/5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8794]">
                Votre rôle
              </p>
              <h3 className="mt-2 text-lg md:text-xl font-semibold text-[#04163a]">
                Ce que vous faites
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#4b5c6b]">
                <li>
                  • Remplir{" "}
                  <span className="font-semibold text-[#043a3a]">
                    📁 un seul dossier
                  </span>{" "}
                  avec vos infos et contraintes.
                </li>
                <li>
                  • Préciser vos{" "}
                  <span className="font-semibold text-[#043a3a]">
                    🎯 préférences
                  </span>{" "}
                  (budget, dates, niveau de service).
                </li>
                <li>
                  • Choisir le déménageur qui vous convient parmi les offres.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[#6BCFCF]/40 bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-5 md:p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6BCFCF]">
                Notre rôle
              </p>
              <h3 className="mt-2 text-lg md:text-xl font-semibold">
                Ce que fait le comparateur
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li>
                  •{" "}
                  <span className="font-semibold text-[#6BCFCF]">
                    🧮 Filtrer les déménageurs fiables
                  </span>{" "}
                  et adaptés à votre dossier.
                </li>
                <li>
                  • Aligner les devis sur la même base pour les rendre lisibles.
                </li>
                <li>• Vous accompagner jusqu’au choix final si besoin.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section section-contrast">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br.from-[#04163A] via-[#05243f] to-[#0b3b46] p-6 md:p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
              <div className="relative space-y-4">
                <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF]" />
                  Sans engagement · 0 spam · 5+ devis fiables
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  Lancer mon comparateur de devis
                </h2>
                <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto">
                  Pour votre déménagement à {city.nameCapitalized}, obtenez des
                  devis alignés sur la même base, sans appels commerciaux non
                  souhaités.
                </p>
                <a href="/inventaire-ia/" className="btn-primary">
                  Lancer mon comparateur de devis
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


