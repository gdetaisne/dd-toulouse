import type { Metadata } from "next";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import Hero from "@/components/Hero";
import ValueTriad from "@/components/ValueTriad";
import HowItWorks from "@/components/HowItWorks";
import ProofStrip from "@/components/ProofStrip";
import PhotoGuidelines from "@/components/PhotoGuidelines";
import PricingPreview from "@/components/PricingPreview";
import Testimonials from "@/components/Testimonials";
import NeighborhoodsTeaser from "@/components/NeighborhoodsTeaser";
import StickyCTA from "@/components/StickyCTA";
import LocalMoneyFAQ from "@/components/LocalMoneyFAQ";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    description:
      `Volume IA identique pour 3-5 devis comparables. Dossier anonyme, zéro harcèlement. Déménageurs vérifiés ${city.nameCapitalized}. Vraie comparaison.`,
  };
})();

export default function Home() {
  return (
    <main className="bg-hero">
      <div className="halo" />
      <Hero />
      <section className="section">
        <div className="container">
          <ValueTriad />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <HowItWorks />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <NeighborhoodsTeaser />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ProofStrip />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PhotoGuidelines className="my-12 md:my-16" />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PricingPreview />
        </div>
      </section>

      {/* Chiffres clés - Social Proof */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Pourquoi choisir Moverz ?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              La première plateforme qui compare vraiment les devis de déménagement
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#6bcfcf] mb-2">90%</div>
              <div className="text-white/70 text-sm">Précision estimation IA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#6bcfcf] mb-2">5</div>
              <div className="text-white/70 text-sm">Devis comparables</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#6bcfcf] mb-2">7j</div>
              <div className="text-white/70 text-sm">Délai de réponse</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#6bcfcf] mb-2">0€</div>
              <div className="text-white/70 text-sm">Service 100% gratuit</div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="card-glass rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💡</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    La différence Moverz
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    Contrairement aux comparateurs classiques, notre IA analyse vos photos pour créer un inventaire précis. 
                    Résultat : tous les déménageurs chiffrent le <strong className="text-[#6bcfcf]">même volume exact</strong>, 
                    vous pouvez enfin comparer ce qui est comparable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ locales Nice (questions prix/devis) - JSON-LD FAQPage */}
      <LocalMoneyFAQ citySlug="nice" cityName="Nice" />
      
      <section className="section">
        <div className="container">
          <Testimonials />
        </div>
      </section>

      {/* Section Ressources SEO - Maillage interne */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Tout pour préparer votre déménagement
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Guides pratiques, informations tarifaires et conseils d'experts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Services */}
            <div className="card-glass rounded-2xl p-8 hover:border-[#6bcfcf]/50 transition-colors">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-white mb-4">Nos formules</h3>
              <p className="text-white/70 text-sm mb-6">
                Comparez nos 3 formules de déménagement adaptées à tous les budgets
              </p>
              <div className="space-y-3">
                <a href="/services/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors text-sm font-medium">
                  → Comparer les formules
                </a>
                <a href="/services/demenagement-economique-nice/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Économique (dès 280€)
                </a>
                <a href="/services/demenagement-standard-nice/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Standard (dès 600€)
                </a>
              </div>
            </div>

            {/* Guides */}
            <div className="card-glass rounded-2xl p-8 hover:border-[#6bcfcf]/50 transition-colors">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-4">Guides & conseils</h3>
              <p className="text-white/70 text-sm mb-6">
                Tous nos articles pour bien préparer et organiser votre déménagement
              </p>
              <div className="space-y-3">
                <a href="/blog/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors text-sm font-medium">
                  → Voir tous les guides
                </a>
                <a href="/blog/cartons-demenagement/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Combien de cartons ?
                </a>
                <a href="/blog/prix-demenagement-2025/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Prix 2025
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="card-glass rounded-2xl p-8 hover:border-[#6bcfcf]/50 transition-colors">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-white mb-4">Questions fréquentes</h3>
              <p className="text-white/70 text-sm mb-6">
                Toutes les réponses aux questions que vous vous posez
              </p>
              <div className="space-y-3">
                <a href="/faq/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors text-sm font-medium">
                  → Voir toutes les FAQ
                </a>
                <a href="/estimation-rapide/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Estimation rapide
                </a>
                <a href="/quartiers-nice/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Quartiers Nice
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


