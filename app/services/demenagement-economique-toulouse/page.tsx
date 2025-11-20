import Breadcrumbs from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Déménagement Économique ${city.nameCapitalized} — Dès 280€`,
    description: `Déménagement économique ${city.nameCapitalized} dès 280-450€. Comparez 5+ devis sous 7j. Déménageurs certifiés. Économisez jusqu'à 40%.`,
    alternates: {
      canonical: getCanonicalUrl(`services/demenagement-economique-${city.slug}`),
    },
    openGraph: {
      title: `Déménagement Économique ${city.nameCapitalized}`,
      description: `Déménagement économique ${city.nameCapitalized} dès 280-450€. Comparez 5+ devis sous 7j.`,
      url: getCanonicalUrl(`services/demenagement-economique-${city.slug}`),
      type: 'website',
    },
  };
})();

export default function DemenagementEconomiquePage() {
  const city = getCityDataFromUrl(env.SITE_URL);
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      {/* Hero - Fond sombre */}
      <section className="section section-contrast relative overflow-hidden">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Déménagement Économique", href: `/services/demenagement-economique-${city.slug}` }
              ]}
            />
            
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
              Formule Économique
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Déménagement Économique à {city.nameCapitalized}
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              La solution la plus abordable pour déménager à petit budget. Idéale pour les étudiants et petits budgets.
            </p>
          </div>
        </div>
      </section>

      {/* Présentation - Fond clair */}
      <section className="section section-light">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#04163a] mb-6">
              Solution la plus abordable pour déménager à {city.nameCapitalized}
            </h2>
            <p className="text-lg text-[#4b5c6b] leading-relaxed">
              Notre formule économique est la solution la plus abordable proposée par nos partenaires. 
              Idéale pour les petits budgets ou les étudiants, elle couvre uniquement les besoins essentiels : 
              chargement, transport et livraison. Parfaite pour un déménagement simple sans fioritures, 
              cette formule vous permet de déménager à moindre coût tout en bénéficiant d'un service professionnel fiable.
            </p>
          </div>
        </div>
      </section>

      {/* Inclus / Non inclus - Fond sombre */}
      <section className="section section-contrast">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ce qui est inclus
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Détail des prestations de la formule économique
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Inclus */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#6BCFCF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Inclus</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] flex-shrink-0"></span>
                  <span className="text-white/90">Fourniture de cartons</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] flex-shrink-0"></span>
                  <span className="text-white/90">Transport des biens</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] flex-shrink-0"></span>
                  <span className="text-white/90">Équipe de 2 déménageurs</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] flex-shrink-0"></span>
                  <span className="text-white/90">Véhicule adapté</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] flex-shrink-0"></span>
                  <span className="text-white/90">Assurance responsabilité civile</span>
                </div>
              </div>
            </div>
            
            {/* Non inclus */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Non inclus</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                  <span className="text-white/90">Emballage objets fragiles</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                  <span className="text-white/90">Démontage/remontage de meubles</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                  <span className="text-white/90">Protection spéciale</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                  <span className="text-white/90">Nettoyage</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                  <span className="text-white/90">Assurance renforcée</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs - Fond clair */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#04163a] mb-4">
              Prix indicatifs
            </h2>
            <p className="text-[#4b5c6b] max-w-2xl mx-auto">
              Tarifs adaptés selon la distance de déménagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Déménagement local */}
            <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#04163a] mb-6 text-center">Déménagement local ({city.nameCapitalized})</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-[#04163a] mb-2">Studio/T1</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">280-450€</div>
                  <p className="text-[#4b5c6b] text-sm">Jusqu'à 30m²</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-[#04163a] mb-2">T2</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">400-650€</div>
                  <p className="text-[#4b5c6b] text-sm">Jusqu'à 50m²</p>
                </div>
              </div>
            </div>
            
            {/* Déménagement national */}
            <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#04163a] mb-6 text-center">Déménagement national (ex: Orléans)</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-[#04163a] mb-2">Studio/T1</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">1400-1680€</div>
                  <p className="text-[#4b5c6b] text-sm">Jusqu'à 30m² (8-10m³)</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-[#04163a] mb-2">T2</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">2100-2520€</div>
                  <p className="text-[#4b5c6b] text-sm">Jusqu'à 50m² (12-15m³)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-[#4b5c6b] text-sm">
              * Tarifs indicatifs. Devis personnalisé selon vos besoins spécifiques et la distance exacte.
            </p>
          </div>
        </div>
      </section>

      {/* Témoignage - Fond sombre */}
      <section className="section section-contrast">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#6BCFCF]/20 border border-[#6BCFCF]/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <blockquote className="text-lg text-white/90 italic mb-6">
                "En tant qu'étudiant, j'avais un budget serré. La formule économique était parfaite pour mon studio. 
                Les déménageurs ont été efficaces et professionnels. J'ai pu déménager sans me ruiner !"
              </blockquote>
              <div className="text-white/70">
                <div className="font-semibold text-white">Lucas, 22 ans</div>
                <div className="text-sm">Étudiant · Déménagement Studio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Fond clair */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#04163a] mb-4">
              Questions fréquentes
            </h2>
            <p className="text-[#4b5c6b] max-w-2xl mx-auto">
              Les réponses à vos questions sur la formule économique
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <details className="bg-white border border-[#E3E5E8] rounded-3xl p-6 group">
              <summary className="cursor-pointer text-lg font-bold text-[#04163a] list-none flex items-center justify-between">
                <span>Dois-je emballer moi-même mes affaires ?</span>
                <svg className="w-5 h-5 text-[#6BCFCF] group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[#4b5c6b] leading-relaxed">
                Oui, avec la formule économique, l'emballage est à votre charge. 
                Nous fournissons les cartons, mais vous devez emballer vos affaires vous-même avant l'arrivée des déménageurs.
              </p>
            </details>

            <details className="bg-white border border-[#E3E5E8] rounded-3xl p-6 group">
              <summary className="cursor-pointer text-lg font-bold text-[#04163a] list-none flex items-center justify-between">
                <span>Les meubles sont-ils démontés ?</span>
                <svg className="w-5 h-5 text-[#6BCFCF] group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[#4b5c6b] leading-relaxed">
                Non, le démontage et remontage des meubles ne sont pas inclus dans la formule économique. 
                Vous devez démonter vos meubles avant le déménagement. 
                Pour ce service, optez pour la formule standard ou premium.
              </p>
            </details>

            <details className="bg-white border border-[#E3E5E8] rounded-3xl p-6 group">
              <summary className="cursor-pointer text-lg font-bold text-[#04163a] list-none flex items-center justify-between">
                <span>Quelle est la différence avec la formule standard ?</span>
                <svg className="w-5 h-5 text-[#6BCFCF] group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[#4b5c6b] leading-relaxed">
                La formule standard inclut en plus : le démontage/remontage des meubles, 
                la protection des meubles avec housses, et une assurance renforcée. 
                La formule économique couvre uniquement le transport.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA final - Fond sombre */}
      <section className="section section-contrast">
        <div className="container">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Prêt pour votre déménagement économique ?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
              Comparez 5+ devis de déménageurs certifiés sous 7 jours
            </p>
            <Link
              href="/devis-gratuits/"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative">Obtenez vos devis gratuitement</span>
              <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
