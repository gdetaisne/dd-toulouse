import Hero from "@/components/Hero";
import CtaPrimary from "@/components/CtaPrimary";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ServicesPage() {
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=2000&auto=format&fit=crop"
            alt="Services de déménagement professionnels à Toulouse"
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
              Nos formules de déménagement depuis Toulouse
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
                <div className="text-2xl font-bold text-white mb-2">À partir de 450€</div>
                <p className="text-white/60 text-sm mb-6">Local Toulouse</p>
                <a
                  href="/services/demenagement-economique-Toulouse"
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
                <div className="text-2xl font-bold text-white mb-2">À partir de 750€</div>
                <p className="text-white/60 text-sm mb-6">Local Toulouse</p>
                <a
                  href="/services/demenagement-standard-Toulouse"
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
                <p className="text-white/60 text-sm mb-6">Local Toulouse</p>
                <a
                  href="/services/demenagement-premium-Toulouse"
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition duration-300"
                >
                  Découvrir cette formule
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
              Affiner vos volumes pour obtenir une fourchette de prix plus précise
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

    </main>
  );
}
