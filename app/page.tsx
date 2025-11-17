import type { Metadata } from "next";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import { getCanonicalAlternates } from "@/lib/canonical-helper";
import { getLocalFAQs } from "@/lib/faqs-locales";
import Hero from "@/components/Hero";
import ValueTriad from "@/components/ValueTriad";
import PricingPreview from "@/components/PricingPreview";
import ProofStrip from "@/components/ProofStrip";
import ComparisonSection from "@/components/ComparisonSection";
import PhotoVolumeMock from "@/components/PhotoVolumeMock";
import KeyMetrics from "@/components/KeyMetrics";
import Testimonials from "@/components/Testimonials";
import NeighborhoodsTeaser from "@/components/NeighborhoodsTeaser";
import MiniFAQTeaser from "@/components/MiniFAQTeaser";
import ResourcesStrip from "@/components/ResourcesStrip";
import GlobalFAQStrip from "@/components/GlobalFAQStrip";
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
  const localFaqs = getLocalFAQs(city.slug);
  
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* 1. Hero (inclut déjà social proof) */}
      <Hero />

      {/* 2. Preuves instantanées */}
      <section className="section section-light">
        <div className="container">
          <ProofStrip />
        </div>
      </section>

      {/* 3. Pourquoi Moverz - Garanties */}
      <section className="section section-contrast">
        <div className="container">
          <ValueTriad />
        </div>
      </section>

      {/* 4. Testimonials - Preuve sociale */}
      <section className="section section-light">
        <div className="container">
          <Testimonials />
        </div>
      </section>

      {/* 5. Tarifs indicatifs */}
      <section className="section section-gray">
        <div className="container">
          <PricingPreview />
        </div>
      </section>

      {/* 6. Comparatif */}
      <section className="section section-contrast">
        <div className="container space-y-8">
          <div className="text-center space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6bcfcf]">Comparatif</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Pourquoi faire appel à Moverz ?</h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              Comparez le déménagement “DIY” avec notre process IA. Vous gagnez du temps, vous évitez les arnaques
              et vous recevez des devis enfin comparables.
            </p>
          </div>

          <ComparisonSection />

          <div className="text-center space-y-3">
            <a href="/inventaire-ia/" className="btn-primary">
              Calculer mon volume en photos (gratuit)
            </a>
            <p className="text-sm text-white/70">
              ou <a href="/estimation-rapide/" className="font-semibold text-[#6bcfcf] hover:underline">estimation rapide sans photos</a>
            </p>
          </div>
        </div>
      </section>

      {/* 7. Calcul de volume en photos */}
      <section className="section section-light">
        <div className="container">
          <PhotoVolumeMock />
        </div>
      </section>

      {/* 8. Zones couvertes */}
      <section className="section section-contrast">
        <div className="container">
          <NeighborhoodsTeaser
            citySlug={city.slug}
            cityName={city.nameCapitalized}
            neighborhoods={city.neighborhoods}
            areaServed={city.areaServed}
          />
        </div>
      </section>

      {/* 9. FAQ locale (teaser) */}
      {localFaqs.length > 0 && (
        <section className="section section-contrast">
          <div className="container">
            <MiniFAQTeaser
              citySlug={city.slug}
              cityName={city.nameCapitalized}
              faqs={localFaqs}
            />
          </div>
        </section>
      )}

      {/* 10. Ressources pour préparer votre déménagement */}
      <section className="section section-light">
        <div className="container">
          <ResourcesStrip citySlug={city.slug} cityName={city.nameCapitalized} />
        </div>
      </section>

      {/* 11. FAQ générales */}
      <section className="section section-contrast">
        <div className="container">
          <GlobalFAQStrip />
        </div>
      </section>

      <StickyCTA />
    </main>
  );
}


