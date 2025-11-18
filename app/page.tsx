import type { Metadata } from "next";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import { getCanonicalAlternates } from "@/lib/canonical-helper";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ComparisonSection from "@/components/ComparisonSection";
import ProofStrip from "@/components/ProofStrip";
import Testimonials from "@/components/Testimonials";
import StickyCTA from "@/components/StickyCTA";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Déménagement ${city.nameCapitalized} — 5 Devis IA Comparables Gratuits`,
    description:
      `Déménagez à ${city.nameCapitalized} dès 280€. IA analyse vos photos → 5 devis comparables sous 7j. Gratuit, sans appels. 1200+ clients ⭐4.9/5`,
    ...getCanonicalAlternates(''),
  };
})();

export default function Home() {
  const city = getCityDataFromUrl(env.SITE_URL);
  const shortFaq = [
    {
      q: "Est-ce vraiment gratuit ?",
      a: "Oui. Le comparateur est 100% gratuit pour vous, nous sommes rémunérés par les déménageurs partenaires.",
    },
    {
      q: "Pourquoi 5+ devis et pas un seul ?",
      a: "Comparer plusieurs devis sur la même base permet de voir les écarts de prix et de service en un coup d'œil.",
    },
    {
      q: "Comment sont choisis les déménageurs ?",
      a: "Seuls les pros contrôlés (assurances, avis, historique) reçoivent votre dossier.",
    },
    {
      q: "Est-ce que je vais être rappelé 10 fois ?",
      a: "Non. Votre dossier reste anonyme : vous décidez vous‑même qui vous contactez et quand.",
    },
  ];
  
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* 1. Hero (inclut déjà social proof) */}
      <Hero />

      {/* 2. Comment ça marche */}
      <section className="section section-light">
        <div className="container">
          <HowItWorks />
        </div>
      </section>

      {/* 3. Comparatif – pourquoi notre comparateur est différent */}
      <section className="section section-contrast">
        <div className="container space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Pourquoi utiliser ce comparateur ?
            </h2>
          </div>

          <ComparisonSection />

          <div className="text-center">
            <a href="/inventaire-ia/" className="btn-primary">
              Recevoir 5+ devis fiables gratuitement
            </a>
          </div>
        </div>
      </section>

      {/* 4. Preuves chiffrées / confiance */}
      <section className="section section-light">
        <div className="container">
          <ProofStrip />
        </div>
      </section>

      {/* 5. Avis clients */}
      <section className="section section-gray">
        <div className="container">
          <Testimonials />
        </div>
      </section>

      {/* 6. FAQ ultra courte */}
      <section className="section section-light">
        <div className="container space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#04163a]">
              Questions fréquentes
            </h2>
            <p className="text-sm text-[#04163a]/70">
              3–4 réponses rapides aux questions qu’on nous pose le plus.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {shortFaq.map((item) => (
              <div
                key={item.q}
                className="group rounded-2xl border border-[#E3E5E8] bg-gradient-to-b from-white to-[#F8F9FA] p-4 md:p-5 text-left shadow-sm shadow-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.15)] hover:border-[#6BCFCF]/50"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#04163a]">
                    {item.q}
                  </h3>
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#E6FFFA] text-[11px] font-semibold text-[#0f766e] transition-transform duration-150 group-hover:scale-105">
                    ?
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#4b5c6b]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer / CTA final */}
      <section className="section section-contrast">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-6 md:p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
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

      <StickyCTA />
    </main>
  );
}


