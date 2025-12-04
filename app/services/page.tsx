import Hero from "@/components/Hero";
import CtaPrimary from "@/components/CtaPrimary";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import type { Metadata } from "next";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Services Déménagement ${city.nameCapitalized} | 280-1200€ | 3 Formules`,
    description: `Économique (280€), Standard (600€), Premium (1200€) à ${city.nameCapitalized}. Devis comparables en 48h. Déménageurs contrôlés. 0 spam. 100% gratuit.`,
    alternates: {
      canonical: getCanonicalUrl('services'),
    },
    openGraph: {
      title: `Services Déménagement ${city.nameCapitalized} | 280-1200€ | 3 Formules`,
      description: `Économique (280€), Standard (600€), Premium (1200€). Devis 48h. Contrôlés. Gratuit.`,
      url: getCanonicalUrl('services'),
      type: 'website',
    },
  };
})();

export default function ServicesPage() {
  const city = getCityDataFromUrl(env.SITE_URL);
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* Hero Section - Version Stripe */}
      <section className="section section-contrast relative overflow-hidden">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Services", href: "/services" }
              ]}
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
              Nos formules
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Nos formules de déménagement depuis {city.nameCapitalized}
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Choisissez la formule qui correspond à vos besoins et votre budget. 
              Toutes nos prestations incluent l'estimation IA gratuite.
            </p>
          </div>
        </div>
      </section>

      {/* Comparatif des formules */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B7A78]">
              Nos offres
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#04163a] leading-tight">
              Comparatif de nos formules
            </h2>
            <p className="text-base md:text-lg text-[#4b5c6b] max-w-2xl mx-auto leading-relaxed font-light">
              Découvrez les différences entre nos trois formules pour faire le meilleur choix
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Formule Économique */}
            <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 relative shadow-lg hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-[#6BCFCF]/40 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-[#2b7a78] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Économique
                </div>
                <h3 className="text-xl font-semibold text-[#04163a] mb-2">Déménagement Économique</h3>
                <p className="text-[#4b5c6b] text-sm">Pour les budgets serrés</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Estimation IA gratuite</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Fourniture de cartons</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Assurance incluse</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Support téléphonique</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[#04163a] mb-2">À partir de 280€</div>
                <p className="text-[#4b5c6b] text-sm mb-6">Studio local {city.nameCapitalized}</p>
                <a
                  href={`/services/demenagement-economique-${city.slug}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-[#F8F9FA] border border-[#E3E5E8] text-[#04163a] font-medium hover:bg-[#E3E5E8] transition duration-300"
                >
                  Découvrir cette formule
                </a>
              </div>
            </div>

            {/* Formule Standard */}
            <div className="bg-white border border-[#6BCFCF] rounded-3xl p-8 relative shadow-lg hover:shadow-[0_20px_60px_rgba(107,207,207,0.25)] transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#6bcfcf] text-[#04163a] px-4 py-1 rounded-full text-sm font-semibold">
                  Recommandé
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-[#6bcfcf] text-[#04163a] px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Standard
                </div>
                <h3 className="text-xl font-semibold text-[#04163a] mb-2">Déménagement Standard</h3>
                <p className="text-[#4b5c6b] text-sm">Le plus populaire</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Estimation IA gratuite</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Emballage de base</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Démontage/Remontage</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Assurance renforcée</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Support prioritaire</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[#04163a] mb-2">À partir de 600€</div>
                <p className="text-[#4b5c6b] text-sm mb-6">T2 local {city.nameCapitalized}</p>
                <a
                  href={`/services/demenagement-standard-${city.slug}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-[#6bcfcf] text-[#04163a] font-medium hover:bg-[#6bcfcf]/90 transition duration-300"
                >
                  Découvrir cette formule
                </a>
              </div>
            </div>

            {/* Formule Premium */}
            <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 relative shadow-lg hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-[#2b7a78]/40 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6bcfcf] to-[#2b7a78] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Premium
                </div>
                <h3 className="text-xl font-semibold text-[#04163a] mb-2">Déménagement Premium</h3>
                <p className="text-[#4b5c6b] text-sm">Service haut de gamme</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Estimation IA gratuite</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Emballage complet</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Déballage inclus</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Assurance tous risques</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Garde-meuble</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#04163a] text-sm">Support dédié 24/7</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[#04163a] mb-2">À partir de 1200€</div>
                <p className="text-[#4b5c6b] text-sm mb-6">Local {city.nameCapitalized}</p>
                <a
                  href={`/services/demenagement-premium-${city.slug}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-[#F8F9FA] border border-[#E3E5E8] text-[#04163a] font-medium hover:bg-[#E3E5E8] transition duration-300"
                >
                  Découvrir cette formule
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-contrast">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Questions fréquentes sur nos formules
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Tout ce que vous devez savoir pour choisir la bonne formule
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <details className="card-glass rounded-2xl p-6 open:shadow-lg">
              <summary className="cursor-pointer text-lg font-medium text-white">
                Quelle formule choisir pour un studio ?
              </summary>
              <div className="mt-3 text-white/85">
                <p>Pour un studio, la formule économique est généralement suffisante (dès 280€ en local). Si vous avez des objets fragiles ou que vous souhaitez un service clé-en-main, optez pour la formule standard.</p>
              </div>
            </details>

            <details className="card-glass rounded-2xl p-6 open:shadow-lg">
              <summary className="cursor-pointer text-lg font-medium text-white">
                Puis-je changer de formule après avoir demandé mes devis ?
              </summary>
              <div className="mt-3 text-white/85">
                <p>Oui, absolument. Vous recevez des devis pour toutes les formules disponibles. Vous pouvez comparer et choisir celle qui vous convient le mieux au moment de valider votre déménagement.</p>
              </div>
            </details>

            <details className="card-glass rounded-2xl p-6 open:shadow-lg">
              <summary className="cursor-pointer text-lg font-medium text-white">
                La différence de prix entre les formules est-elle justifiée ?
              </summary>
              <div className="mt-3 text-white/85">
                <p>Oui, chaque formule inclut des prestations différentes. L'économique couvre l'essentiel (transport + manutention), la standard ajoute l'emballage et la protection des meubles, et la premium inclut un service complet avec chef d'équipe dédié et emballage des objets fragiles.</p>
              </div>
            </details>

            <details className="card-glass rounded-2xl p-6 open:shadow-lg">
              <summary className="cursor-pointer text-lg font-medium text-white">
                Comment obtenir un devis précis pour ma situation ?
              </summary>
              <div className="mt-3 text-white/85">
                <p>Utilisez notre <a href="/devis-gratuits/" className="text-[#6bcfcf] underline hover:text-[#6bcfcf]/80">estimation IA gratuite</a>. En 30 minutes avec vos photos, vous recevez 5 devis comparables sous 7 jours, adaptés à votre volume exact et vos contraintes.</p>
              </div>
            </details>

            <details className="card-glass rounded-2xl p-6 open:shadow-lg">
              <summary className="cursor-pointer text-lg font-medium text-white">
                Les prix affichés incluent-ils tout ?
              </summary>
              <div className="mt-3 text-white/85">
                <p>Les prix indiqués sont des fourchettes indicatives pour un déménagement local à {city.nameCapitalized}. Le devis final dépend de votre volume exact, de la distance, et des contraintes d'accès (étages, stationnement, etc.). Consultez les pages détails de chaque formule pour voir ce qui est inclus ou non.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Ressources complémentaires */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B7A78]">
              Ressources
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#04163a] leading-tight">
              Ressources utiles pour votre déménagement
            </h2>
            <p className="text-base md:text-lg text-[#4b5c6b] max-w-2xl mx-auto leading-relaxed font-light">
              Guides pratiques et informations locales pour bien préparer votre déménagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Articles blog */}
            <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 shadow-lg hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-[#6BCFCF]/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30">
                  <svg className="w-5 h-5 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#04163a]">Guides pratiques</h3>
              </div>
              <div className="space-y-4">
                <a href="/blog/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
                  → Guide complet du déménagement à {city.nameCapitalized}
                </a>
                <a href="/blog/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
                  → Combien de cartons prévoir ?
                </a>
                <a href="/blog/prix/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
                  → Prix déménagement 2025 : tout comprendre
                </a>
                <a href="/blog/" className="block text-[#4b5c6b] hover:text-[#04163a] text-sm transition-colors mt-6">
                  Voir tous les articles →
                </a>
              </div>
            </div>

            {/* Quartiers */}
            <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 shadow-lg hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-[#6BCFCF]/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30">
                  <svg className="w-5 h-5 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#04163a]">Déménager par quartier</h3>
              </div>
              <div className="space-y-4">
                <a href={`/${city.slug}/`} className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
                  → Déménagement {city.nameCapitalized} (vue d'ensemble)
                </a>
                <a href="/quartiers-nice/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
                  → Tous les quartiers de {city.nameCapitalized}
                </a>
                <a href="/faq/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
                  → FAQ complète déménagement
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Prêt à obtenir vos devis précis ?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Utilisez notre outil d'estimation pour obtenir des tarifs personnalisés selon vos besoins spécifiques
            </p>
            <a
              href="/devis-gratuits/"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2b7a78] px-6 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
            >
              Obtenez vos devis précis gratuitement
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quelle formule choisir pour un studio ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Pour un studio, la formule économique est généralement suffisante (dès 280€ en local à ${city.nameCapitalized}). Si vous avez des objets fragiles ou que vous souhaitez un service clé-en-main, optez pour la formule standard.`
                }
              },
              {
                "@type": "Question",
                "name": "Puis-je changer de formule après avoir demandé mes devis ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, absolument. Vous recevez des devis pour toutes les formules disponibles. Vous pouvez comparer et choisir celle qui vous convient le mieux au moment de valider votre déménagement."
                }
              },
              {
                "@type": "Question",
                "name": "La différence de prix entre les formules est-elle justifiée ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, chaque formule inclut des prestations différentes. L'économique couvre l'essentiel (transport + manutention), la standard ajoute l'emballage et la protection des meubles, et la premium inclut un service complet avec chef d'équipe dédié et emballage des objets fragiles."
                }
              },
              {
                "@type": "Question",
                "name": "Comment obtenir un devis précis pour ma situation ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Utilisez notre estimation IA gratuite. En 30 minutes avec vos photos, vous recevez 5 devis comparables sous 7 jours, adaptés à votre volume exact et vos contraintes."
                }
              },
              {
                "@type": "Question",
                "name": "Les prix affichés incluent-ils tout ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Les prix indiqués sont des fourchettes indicatives pour un déménagement local à ${city.nameCapitalized}. Le devis final dépend de votre volume exact, de la distance, et des contraintes d'accès (étages, stationnement, etc.).`
                }
              }
            ]
          })
        }}
      />

      {/* JSON-LD Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Déménagement",
            "provider": {
              "@type": "Organization",
              "name": `Déménageurs ${city.nameCapitalized} (IA)`,
              "url": city.siteUrl
            },
            "areaServed": {
              "@type": "City",
              "name": city.nameCapitalized
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Formules de déménagement",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": `Déménagement Économique ${city.nameCapitalized}`,
                    "description": "Formule économique pour petits budgets : transport + manutention. Idéal pour studios et étudiants."
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "280",
                    "priceCurrency": "EUR",
                    "description": "À partir de 280€ pour un studio local"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": `Déménagement Standard ${city.nameCapitalized}`,
                    "description": "Formule standard : emballage de base, protection meubles, démontage/remontage. Le meilleur rapport qualité-prix."
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "600",
                    "priceCurrency": "EUR",
                    "description": "À partir de 600€ pour un T2 local"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": `Déménagement Premium ${city.nameCapitalized}`,
                    "description": "Formule premium clé-en-main : emballage complet, objets fragiles, déballage, nettoyage, chef d'équipe dédié."
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "1200",
                    "priceCurrency": "EUR",
                    "description": "À partir de 1200€ pour un T3 local"
                  }
                }
              ]
            }
          })
        }}
      />

    </main>
  );
}
