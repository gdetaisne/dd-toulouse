import Breadcrumbs from "@/components/Breadcrumbs";
import CtaPrimary from "@/components/CtaPrimary";

export default function DemenagementPremiumPage() {
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04163a] via-[#2b7a78] to-[#6bcfcf] text-white">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:py-32">
          <div className="text-center">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Déménagement Premium", href: "/services/demenagement-premium-toulouse" }
              ]}
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Déménagement Premium à toulouse
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              La solution clé-en-main pour déménager sans stress. Service complet avec emballage fragile et chef d'équipe dédié.
            </p>
            <div className="mt-8">
              <a
                href="/devis-demenagement-toulouse/"
                className="inline-flex rounded-xl bg-white px-6 py-3 text-lg font-semibold text-[#04163a] hover:bg-white/90 transition duration-300 shadow-lg"
              >
                Créer mon dossier
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation de la formule */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              La solution clé-en-main pour déménager sans stress
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Notre formule premium est la solution clé-en-main pour déménager sans stress. 
              Nos partenaires gèrent absolument tout : emballage des objets fragiles, démontage/remontage des meubles, 
              protection haut de gamme, chef d'équipe dédié. C'est la formule complète pour ceux qui veulent 
              un déménagement parfaitement orchestré sans se soucier de rien.
            </p>
          </div>
        </div>
      </section>

      {/* Inclus / Non inclus */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Inclus
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Emballage complet de tous les biens</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Emballage objets fragiles (vaisselle, électronique, art)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Protection spécifique des meubles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Démontage et remontage des meubles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Déballage des biens à l'arrivée</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Nettoyage post-déménagement</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Garde-meuble si nécessaire</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Chef d'équipe dédié</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Assurance tous risques</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Non inclus
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-white/90">Collecte objets personnels (clés, papiers, bijoux)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-white/90">Débranchement appareils électriques</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-white/90">Démontage objets fixés aux murs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-white/90">Réalisation état des lieux</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-white/90">Résiliation abonnements</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-white/90">Transfert compteurs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Prix indicatifs
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Tarifs adaptés selon la distance de déménagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Déménagement local */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Déménagement local (toulouse)</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-medium text-white mb-2">T3/T4</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">1200-1800€</div>
                  <p className="text-white/60 text-sm">Jusqu'à 100m²</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-medium text-white mb-2">Maison</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">1500-2500€</div>
                  <p className="text-white/60 text-sm">100m² et plus</p>
                </div>
              </div>
            </div>
            
            {/* Déménagement national */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Déménagement national (ex: Orléans)</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-medium text-white mb-2">T3/T4</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">2880-4800€</div>
                  <p className="text-white/60 text-sm">Jusqu'à 100m² (18-30m³)</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-medium text-white mb-2">Maison</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">4800-5760€</div>
                  <p className="text-white/60 text-sm">100m² et plus (30-36m³)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-white/60 text-sm">
              * Tarifs indicatifs. Devis personnalisé selon vos besoins spécifiques et la distance exacte.
            </p>
          </div>
        </div>
      </section>

      {/* Témoignage */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="text-6xl mb-4">🏢</div>
              <blockquote className="text-lg text-white/90 italic mb-4">
                "En tant que cadre avec un emploi du temps chargé, la formule premium était parfaite. 
                L'équipe a tout géré : emballage de mes objets d'art, démontage des meubles, 
                installation de l'électroménager. Je n'ai eu qu'à signer et tout était fait."
              </blockquote>
              <div className="text-white/70">
                <div className="font-semibold">Pierre, 42 ans</div>
                <div className="text-sm">Cadre - Déménagement T4 → Maison</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Questions fréquentes
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Les réponses à vos questions sur la formule premium
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Est-ce que je peux ne rien faire moi-même ?
              </h3>
              <p className="text-white/80">
                Oui, absolument ! Dans la formule premium, vous n'avez rien à faire. 
                L'équipe s'occupe de tout : emballage, démontage, transport, installation, nettoyage. 
                C'est un déménagement clé-en-main complet.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Y a-t-il un suivi personnalisé ?
              </h3>
              <p className="text-white/80">
                Oui, un chef d'équipe dédié coordonne tout le déménagement. 
                Il est votre interlocuteur unique et vous tient informé à chaque étape. 
                Vous avez aussi accès à un support dédié 24/7.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Que se passe-t-il si j'ai des objets très fragiles ?
              </h3>
              <p className="text-white/80">
                La formule premium inclut l'emballage spécialisé pour tous les objets fragiles : 
                vaisselle, électronique, objets d'art, instruments de musique. 
                Nos équipes sont formées aux techniques de protection haut de gamme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaPrimary placement="inline" label="Prêt pour votre déménagement premium ?" />
    </main>
  );
}
