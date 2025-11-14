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
    title: `Services Déménagement ${city.nameCapitalized} — 3 Formules`,
    description: `Découvrez nos formules de déménagement à ${city.nameCapitalized} : Économique, Standard, Premium. Estimation IA gratuite, devis personnalisés sous 7j. Comparaison transparente.`,
    alternates: {
      canonical: getCanonicalUrl('services'),
    },
    openGraph: {
      title: `Services Déménagement ${city.nameCapitalized}`,
      description: "Formules adaptées à tous les budgets. Estimation IA gratuite.",
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
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=2000&auto=format&fit=crop"
            alt={`Services de déménagement professionnels à ${city.nameCapitalized}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/90 to-[#04163a]/90"></div>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:py-32">
          <div className="text-center">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Services", href: "/services" }
              ]}
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Nos formules de déménagement depuis {city.nameCapitalized}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Choisissez la formule qui correspond à vos besoins et votre budget. 
              Toutes nos prestations incluent l'estimation IA gratuite.
            </p>
          </div>
        </div>
      </section>

      {/* Comparatif des formules */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Comparatif de nos formules
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Découvrez les différences entre nos trois formules pour faire le meilleur choix
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Formule Économique */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-[#2b7a78] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  💰 Économique
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Déménagement Économique</h3>
                <p className="text-white/70 text-sm">Pour les budgets serrés</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Estimation IA gratuite</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Fourniture de cartons</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Assurance incluse</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Support téléphonique</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">À partir de 280€</div>
                <p className="text-white/60 text-sm mb-6">Studio local {city.nameCapitalized}</p>
                <a
                  href={`/services/demenagement-economique-${city.slug}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition duration-300"
                >
                  Découvrir cette formule
                </a>
              </div>
            </div>

            {/* Formule Standard */}
            <div className="bg-white/5 backdrop-blur-sm border border-[#6bcfcf] rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#6bcfcf] text-[#04163a] px-4 py-1 rounded-full text-sm font-semibold">
                  Recommandé
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-[#6bcfcf] text-[#04163a] px-4 py-2 rounded-full text-sm font-medium mb-4">
                  ⭐ Standard
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Déménagement Standard</h3>
                <p className="text-white/70 text-sm">Le plus populaire</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Estimation IA gratuite</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Emballage de base</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Démontage/Remontage</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Assurance renforcée</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Support prioritaire</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">À partir de 600€</div>
                <p className="text-white/60 text-sm mb-6">T2 local {city.nameCapitalized}</p>
                <a
                  href={`/services/demenagement-standard-${city.slug}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-[#6bcfcf] text-[#04163a] font-medium hover:bg-[#6bcfcf]/90 transition duration-300"
                >
                  Découvrir cette formule
                </a>
              </div>
            </div>

            {/* Formule Premium */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6bcfcf] to-[#2b7a78] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  👑 Premium
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Déménagement Premium</h3>
                <p className="text-white/70 text-sm">Service haut de gamme</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Estimation IA gratuite</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Emballage complet</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Déballage inclus</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Assurance tous risques</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Garde-meuble</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">Support dédié 24/7</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">À partir de 1200€</div>
                <p className="text-white/60 text-sm mb-6">Local {city.nameCapitalized}</p>
                <a
                  href={`/services/demenagement-premium-${city.slug}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition duration-300"
                >
                  Découvrir cette formule
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
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
                <p>Utilisez notre <a href="/inventaire-ia/" className="text-[#6bcfcf] underline hover:text-[#6bcfcf]/80">estimation IA gratuite</a>. En 30 minutes avec vos photos, vous recevez 5 devis comparables sous 7 jours, adaptés à votre volume exact et vos contraintes.</p>
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
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Ressources utiles pour votre déménagement
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Guides pratiques et informations locales pour bien préparer votre déménagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Articles blog */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                📚 Guides pratiques
              </h3>
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
                <a href="/blog/" className="block text-white/70 hover:text-white text-sm transition-colors mt-6">
                  Voir tous les articles →
                </a>
              </div>
            </div>

            {/* Quartiers */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                📍 Déménager par quartier
              </h3>
              <div className="space-y-4">
                <a href={`/${city.slug}/`} className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
                  → Déménagement {city.nameCapitalized} (vue d'ensemble)
                </a>
                <a href="/quartiers-toulouse/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
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
              href="/inventaire-ia/"
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
