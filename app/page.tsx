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
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Déménagement ${city.nameCapitalized} dès 280€ | 5+ Devis 48h | Contrôlés`,
    description:
      `280€ minimum. Recevez 5+ devis comparables en 48h à ${city.nameCapitalized}. Dossier anonyme, 0 harcèlement. Déménageurs contrôlés et assurés. 100% gratuit.`,
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
        <div className="container space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm md:text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              Pourquoi ce comparateur
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ce que vous gagnez vraiment
            </h2>
            <p className="text-lg md:text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
              4 bénéfices concrets pour comparer sereinement vos devis.
            </p>
          </div>

          <ComparisonSection />

          <div className="text-center">
            <a 
              href="/devis-gratuits/" 
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative">Recevoir 5+ devis fiables gratuitement</span>
              <span className="relative text-xl leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
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
      <section className="section section-contrast">
        <div className="container">
          <Testimonials />
        </div>
      </section>

      {/* 6. FAQ ultra courte */}
      <section className="section section-light">
        <div className="container space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2b7a78]">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#04163a] leading-tight">
              Questions fréquentes
            </h2>
            <p className="text-base md:text-lg text-[#04163a]/70 leading-relaxed max-w-2xl mx-auto font-light">
              Les réponses aux questions qu'on nous pose le plus.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <FAQAccordion items={shortFaq} />
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
                <a href="/devis-gratuits/" className="btn-primary">
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


