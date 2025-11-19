import Breadcrumbs from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Déménagement Standard ${city.nameCapitalized} — Dès 600€`,
    description: `Déménagement standard ${city.nameCapitalized} : qualité/prix dès 600-900€. Comparez 5+ devis sous 7j. Volume identique, déménageurs certifiés. Dossier anonyme.`,
    alternates: {
      canonical: getCanonicalUrl(`services/demenagement-standard-${city.slug}`),
    },
    openGraph: {
      title: `Déménagement Standard ${city.nameCapitalized}`,
      description: `Déménagement standard ${city.nameCapitalized} : qualité/prix dès 600-900€. Comparez 5+ devis sous 7j.`,
      url: getCanonicalUrl(`services/demenagement-standard-${city.slug}`),
      type: 'website',
    },
  };
})();

export default function DemenagementStandardPage() {
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
                { label: "Déménagement Standard", href: `/services/demenagement-standard-${city.slug}` }
              ]}
            />
            
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
              Formule Standard
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Déménagement Standard à {city.nameCapitalized}
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              La formule la plus choisie. Bon équilibre prix/prestations avec protection des meubles et emballage standard.
            </p>
          </div>
        </div>
      </section>

      {/* Présentation - Fond clair */}
      <section className="section section-light">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#04163a] mb-6">
              La formule la plus choisie par nos clients
            </h2>
            <p className="text-lg text-[#4b5c6b] leading-relaxed">
              Notre formule standard offre le meilleur équilibre entre prix et prestations. 
              Elle inclut la protection des meubles et l'emballage standard. 
              C'est la solution idéale pour un déménagement complet sans se ruiner, 
              avec tous les services essentiels pour déménager en toute sérénité.
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
              Détail des prestations de la formule standard
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
                  <span className="text-white/90">Emballage de base des biens</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] flex-shrink-0"></span>
                  <span className="text-white/90">Démontage et remontage des meubles</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] flex-shrink-0"></span>
                  <span className="text-white/90">Transport des biens</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] flex-shrink-0"></span>
                  <span className="text-white/90">Protection meubles (housses, couvertures)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] flex-shrink-0"></span>
                  <span className="text-white/90">Équipe de 3 déménageurs</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] flex-shrink-0"></span>
                  <span className="text-white/90">Assurance renforcée</span>
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
                  <span className="text-white/90">Emballage objets très fragiles</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                  <span className="text-white/90">Nettoyage complet</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                  <span className="text-white/90">Installation électroménager</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                  <span className="text-white/90">Conciergerie</span>
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
                  <h4 className="text-lg font-semibold text-[#04163a] mb-2">T2/T3</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">600-1000€</div>
                  <p className="text-[#4b5c6b] text-sm">Jusqu'à 70m²</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-[#04163a] mb-2">Maison</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">900-1400€</div>
                  <p className="text-[#4b5c6b] text-sm">Jusqu'à 120m²</p>
                </div>
              </div>
            </div>
            
            {/* Déménagement national */}
            <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#04163a] mb-6 text-center">Déménagement national (ex: Orléans)</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-[#04163a] mb-2">T2/T3</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">2520-3360€</div>
                  <p className="text-[#4b5c6b] text-sm">Jusqu'à 70m² (18-24m³)</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-[#04163a] mb-2">Maison</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">4200-5040€</div>
                  <p className="text-[#4b5c6b] text-sm">Jusqu'à 120m² (30-36m³)</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <blockquote className="text-lg text-white/90 italic mb-6">
                "Avec deux enfants et un emploi du temps chargé, la formule standard était parfaite. 
                L'équipe a tout géré : emballage, protection des meubles, transport. 
                Nous avons pu nous concentrer sur l'essentiel pendant que nos affaires étaient en sécurité."
              </blockquote>
              <div className="text-white/70">
                <div className="font-semibold text-white">Thomas et Sarah, 35 ans</div>
                <div className="text-sm">Famille · Déménagement T3 → Maison</div>
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
              Les réponses à vos questions sur la formule standard
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <details className="bg-white border border-[#E3E5E8] rounded-3xl p-6 group">
              <summary className="cursor-pointer text-lg font-bold text-[#04163a] list-none flex items-center justify-between">
                <span>Est-ce que l'emballage est fourni ?</span>
                <svg className="w-5 h-5 text-[#6BCFCF] group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[#4b5c6b] leading-relaxed">
                Oui, les cartons standard sont inclus dans la formule. 
                Nous fournissons tous les cartons nécessaires pour emballer vos affaires. 
                Pour les objets très fragiles, nous recommandons la formule premium.
              </p>
            </details>

            <details className="bg-white border border-[#E3E5E8] rounded-3xl p-6 group">
              <summary className="cursor-pointer text-lg font-bold text-[#04163a] list-none flex items-center justify-between">
                <span>Puis-je ajouter un service "fragile" ?</span>
                <svg className="w-5 h-5 text-[#6BCFCF] group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[#4b5c6b] leading-relaxed">
                Oui, vous pouvez ajouter des services à la carte comme l'emballage d'objets très fragiles. 
                Ces options sont facturées en supplément. 
                Pour un service complet, nous recommandons la formule premium.
              </p>
            </details>

            <details className="bg-white border border-[#E3E5E8] rounded-3xl p-6 group">
              <summary className="cursor-pointer text-lg font-bold text-[#04163a] list-none flex items-center justify-between">
                <span>Quelle est la différence avec la formule économique ?</span>
                <svg className="w-5 h-5 text-[#6BCFCF] group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[#4b5c6b] leading-relaxed">
                La formule standard inclut en plus : protection des meubles avec housses, 
                emballage standard avec cartons fournis, et une assurance renforcée. 
                C'est le meilleur rapport qualité-prix pour un déménagement complet.
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
              Prêt pour votre déménagement standard ?
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
