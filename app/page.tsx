import type { Metadata } from "next";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import Hero from "@/components/Hero";
import ValueTriad from "@/components/ValueTriad";
import HowItWorks from "@/components/HowItWorks";
import PhotoGuidelines from "@/components/PhotoGuidelines";
import PricingPreview from "@/components/PricingPreview";
import Testimonials from "@/components/Testimonials";
import NeighborhoodsTeaser from "@/components/NeighborhoodsTeaser";
import StickyCTA from "@/components/StickyCTA";
import LocalMoneyFAQ from "@/components/LocalMoneyFAQ";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Déménagement ${city.nameCapitalized} — 5 Devis IA Comparables Gratuits`,
    description:
      `Déménagez à ${city.nameCapitalized} dès 280€. IA analyse vos photos → 5 devis comparables sous 7j. Gratuit, sans appels. 1200+ clients ⭐4.9/5`,
  };
})();

export default function Home() {
  const city = getCityDataFromUrl(env.SITE_URL);
  
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* 1. Hero (inclut déjà social proof) */}
      <Hero />

      {/* 2. Comment ça marche */}
      <section className="section">
        <div className="container">
          <HowItWorks />
        </div>
      </section>
      
      {/* 4. Testimonials - Remonté pour preuve sociale */}
      <section className="section bg-white/5">
        <div className="container">
          <Testimonials />
        </div>
      </section>

      {/* 5. Pourquoi Moverz - Différenciation + Garanties */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Pourquoi choisir Moverz ?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              La première plateforme qui compare vraiment les devis de déménagement
            </p>
          </div>

          {/* Différenciation */}
          <div className="max-w-3xl mx-auto mb-12">
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

          {/* Chiffres clés */}
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
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

          {/* Garanties intégrées */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-white text-center mb-8">
              Nos garanties
            </h3>
            <ValueTriad />
          </div>
        </div>
      </section>

      {/* 6. Tarifs indicatifs */}
      <section className="section bg-white/5">
        <div className="container">
          <PricingPreview />
        </div>
      </section>

      {/* 7. Objection Handling - NOUVEAU */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Pourquoi ne pas déménager seul ?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Comparez les avantages avant de décider
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* DIY */}
            <div className="card-glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">🚗</span>
                Déménagement seul
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-green-400 text-xl mt-1">✓</div>
                  <div>
                    <div className="text-white font-medium">Économie apparente</div>
                    <div className="text-white/70 text-sm">Location camion ~150€</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-xl mt-1">✗</div>
                  <div>
                    <div className="text-white font-medium">Risques élevés</div>
                    <div className="text-white/70 text-sm">Blessures, casse, fatigue</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-xl mt-1">✗</div>
                  <div>
                    <div className="text-white font-medium">Temps important</div>
                    <div className="text-white/70 text-sm">2-3 jours minimum</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-xl mt-1">✗</div>
                  <div>
                    <div className="text-white font-medium">Aucune assurance pro</div>
                    <div className="text-white/70 text-sm">Casse à vos frais</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro avec Moverz */}
            <div className="card-glass rounded-2xl p-8 border-2 border-[#6bcfcf]">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">🚚</span>
                Avec Moverz (dès 280€)
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-[#6bcfcf] text-xl mt-1">✓</div>
                  <div>
                    <div className="text-white font-medium">Prix transparent</div>
                    <div className="text-white/70 text-sm">5 devis comparables</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#6bcfcf] text-xl mt-1">✓</div>
                  <div>
                    <div className="text-white font-medium">Zéro risque</div>
                    <div className="text-white/70 text-sm">Pros assurés + formés</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#6bcfcf] text-xl mt-1">✓</div>
                  <div>
                    <div className="text-white font-medium">Gain de temps</div>
                    <div className="text-white/70 text-sm">Fini en 1 journée</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#6bcfcf] text-xl mt-1">✓</div>
                  <div>
                    <div className="text-white font-medium">Assurance tous risques</div>
                    <div className="text-white/70 text-sm">Casse couverte</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a href="/inventaire-ia/" className="btn-primary">
              Comparer 5 devis maintenant
            </a>
            <p className="text-white/60 text-sm mt-4">
              ou <a href="/estimation-rapide/" className="text-[#6bcfcf] underline hover:text-[#6bcfcf]/80">estimation rapide sans photos</a> (30 secondes)
            </p>
          </div>
        </div>
      </section>

      {/* 8. FAQ locales */}
      <LocalMoneyFAQ citySlug="nice" cityName="Nice" />

      {/* 10. Guides photos - Pour ceux qui veulent se lancer */}
      <section className="section">
        <div className="container">
          <PhotoGuidelines className="my-12 md:my-16" />
        </div>
      </section>

      {/* 11. Zones couvertes */}
      <section className="section bg-white/5">
        <div className="container">
          <NeighborhoodsTeaser />
        </div>
      </section>

      {/* 12. Ressources SEO - Maillage interne */}
      <section className="section">
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
                <a href={`/services/demenagement-economique-${city.slug}/`} className="block text-white/70 hover:text-white transition-colors text-sm">
                  Économique (dès 280€)
                </a>
                <a href={`/services/demenagement-standard-${city.slug}/`} className="block text-white/70 hover:text-white transition-colors text-sm">
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
                <a href={`/quartiers-${city.slug}/`} className="block text-white/70 hover:text-white transition-colors text-sm">
                  Quartiers {city.nameCapitalized}
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


