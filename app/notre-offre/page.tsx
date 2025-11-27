import React from "react";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

const city = getCityDataFromUrl(env.SITE_URL);

export const metadata: Metadata = {
  title: `Comparateur Déménageurs ${city.nameCapitalized} | 0 Spam | Anonyme`,
  description: `280€ minimum. Comparez 5+ devis anonymement à ${city.nameCapitalized}. Tarifs transparents, 0 harcèlement. Déménageurs contrôlés et assurés. Gratuit.`,
  alternates: {
    canonical: getCanonicalUrl("notre-offre"),
  },
  openGraph: {
    title: `Comparateur Déménageurs ${city.nameCapitalized} | 0 Spam | Anonyme`,
    description: `280€ min. 5+ devis anonymes. Tarifs transparents. Contrôlés. Gratuit.`,
    url: getCanonicalUrl("notre-offre"),
    type: "website",
  },
};

export default function NotreOffrePage() {
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* 1. Hero sombre */}
      <section className="section section-contrast">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-6 md:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
              <div className="relative space-y-4 text-center">
                <Breadcrumbs
                  items={[
                    { label: "Accueil", href: "/" },
                    { label: "Notre offre", href: "/notre-offre" },
                  ]}
                />
                <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF]" />
                  Comparateur de déménageurs · Offre détaillée
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-white">
                  Notre offre : des devis de déménageurs vraiment comparables
                </h1>
                <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto">
                  Pour votre déménagement à {city.nameCapitalized}, vous
                  préparez un seul dossier, nous filtrons les pros et vous
                  comparez 5+ devis alignés sur la même base, sans spam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Avantages clés – bloc clair */}
      <section className="section section-light">
        <div className="container space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#04163a]">
              Ce que fait le comparateur pour vous
            </h2>
            <p className="text-sm text-[#4b5c6b]">
              Trois piliers pour rendre vos devis enfin comparables.
            </p>
                </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="group rounded-2xl border border-[#E3E5E8] bg-gradient-to-b from-white to-[#F8F9FA] p-5 shadow-sm shadow-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.15)]">
              <h3 className="text-base md:text-lg font-semibold text-[#04163a]">
                Dossier unique
              </h3>
              <p className="mt-2 text-sm text-[#4b5c6b]">
                Vous partagez une seule fois les infos clés sur votre
                déménagement.
              </p>
              </div>
            <div className="group rounded-2xl border border-[#E3E5E8] bg-gradient-to-b from-white to-[#F8F9FA] p-5 shadow-sm shadow-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.15)]">
              <h3 className="text-base md:text-lg font-semibold text-[#04163a]">
                Pros contrôlés
              </h3>
              <p className="mt-2 text-sm text-[#4b5c6b]">
                Seuls les déménageurs sérieux (assurances, avis, historique)
                reçoivent votre dossier.
              </p>
                </div>
            <div className="group rounded-2xl border border-[#E3E5E8] bg-gradient-to-b from-white to-[#F8F9FA] p-5 shadow-sm shadow-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.15)]">
              <h3 className="text-base md:text-lg font-semibold text-[#04163a]">
                Devis comparables
              </h3>
              <p className="mt-2 text-sm text-[#4b5c6b]">
                Les devis sont alignés sur le même volume et les mêmes options,
                lisibles en un coup d’œil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mini “comment ça marche” – bloc sombre */}
      <section className="section section-contrast">
        <div className="container space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Comment fonctionne l’offre ?
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/6 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-black/40">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#E6FFFA] text-xs font-semibold text-[#0f766e]">
                1
              </div>
              <h3 className="text-sm md:text-base font-semibold text-white">
                Vous complétez votre dossier
              </h3>
              <p className="mt-2 text-sm text-white/75">
                Quelques infos pratiques sur votre logement et vos dates.
                  </p>
                </div>
            <div className="rounded-2xl border border-white/10 bg-white/6 p-5 shadow-sm transition-all.duration-200 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-black/40">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#E6FFFA] text-xs font-semibold text-[#0f766e]">
                2
              </div>
              <h3 className="text-sm md:text-base font-semibold text-white">
                On filtre et prépare les devis
              </h3>
              <p className="mt-2 text-sm text-white/75">
                On ne garde que des déménageurs contrôlés et on aligne les
                devis sur la même base.
                  </p>
                </div>
            <div className="rounded-2xl border border-white/10 bg-white/6 p-5 shadow-sm transition-all.duration-200 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-black/40">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#E6FFFA] text-xs font-semibold text-[#0f766e]">
                3
              </div>
              <h3 className="text-sm md:text-base font-semibold text-white">
                Vous comparez 5+ devis et choisissez
              </h3>
              <p className="mt-2 text-sm text-white/75">
                Vous choisissez en toute sérénité, sans spam ni appels forcés.
                  </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Inclus / non inclus – bloc clair */}
      <section className="section section-light">
        <div className="container grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E3E5E8] bg-gradient-to-b from-white to-[#F8F9FA] p-5 shadow-sm shadow-black/5 transition-all.duration-200 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.15)]">
            <h2 className="text-lg md:text-xl font-semibold text-[#04163a]">
              Ce qui est inclus
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-[#4b5c6b]">
              <li>Préparation d’un dossier unique pour votre déménagement.</li>
              <li>Filtrage des déménageurs (assurances, avis, historique).</li>
              <li>5+ devis alignés sur la même base pour comparer facilement.</li>
              <li>Support de notre équipe jusqu’au choix de votre déménageur.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#E3E5E8] bg-gradient-to-b from-white to-[#F8F9FA] p-5 shadow-sm shadow-black/5 transition-all.duration-200 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.15)]">
            <h2 className="text-lg md:text-xl font-semibold text-[#04163a]">
              Ce qui n’est pas inclus
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-[#4b5c6b]">
              <li>Nous ne sommes pas le déménageur qui réalise la prestation.</li>
              <li>
                Aucun démarchage téléphonique : pas d’appels sans votre accord
                explicite.
              </li>
              <li>Pas de frais cachés ajoutés par le comparateur.</li>
              <li>
                Vous restez libre de choisir un autre déménageur en dehors du
                comparateur.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. CTA final – bloc sombre */}
      <section className="section section-contrast">
        <div className="container space-y-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Lancer mon comparateur de devis
            </h2>
          <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto">
            Sans engagement · 0 spam · 5+ devis fiables pour votre déménagement
            à {city.nameCapitalized}.
            </p>
          <a href="/devis-gratuits/" className="btn-primary">
            Commencer avec mon dossier unique
          </a>
        </div>
      </section>
    </main>
  );
}

