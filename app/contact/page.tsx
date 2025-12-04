import { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/canonical-helper';
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Contact Déménagement ${city.nameCapitalized} | Devis Gratuits | Moverz`,
    description: `Contactez notre équipe à ${city.nameCapitalized}. Comparez 5+ devis de déménageurs certifiés. Réponse sous 24h.`,
    alternates: {
      canonical: getCanonicalUrl('contact'),
    },
    openGraph: {
      title: `Contact Déménagement ${city.nameCapitalized}`,
      description: `Contactez notre équipe à ${city.nameCapitalized}`,
      url: getCanonicalUrl('contact'),
      type: 'website',
    },
  };
})();

export default function ContactPage() {
  const city = getCityDataFromUrl(env.SITE_URL);
  const emailDomain = city.siteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
  
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
                { label: "Contact", href: "/contact/" }
              ]}
            />
            
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
              Nous sommes là pour vous aider
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Besoin d'aide ? On vous répond en 24h
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Questions, suivi de dossier ou aide au choix : notre équipe vous accompagne pour comparer des déménageurs vraiment fiables.
            </p>
          </div>
        </div>
      </section>

      {/* Coordonnées & Garanties - Fond clair */}
      <section className="section section-light">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact */}
            <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#2B7A78]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#04163a]">Nous contacter</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-[#04163a] mb-2">Email</p>
                  <a 
                    href={`mailto:contact@${emailDomain}`} 
                    className="text-[#6bcfcf] hover:text-[#2B7A78] transition-colors text-lg"
                  >
                    contact@{emailDomain}
                  </a>
                </div>
                
                <div>
                  <p className="font-semibold text-[#04163a] mb-2">Horaires</p>
                  <p className="text-[#4b5c6b]">Lundi - Vendredi : 9h - 18h</p>
                  <p className="text-[#4b5c6b] text-sm mt-1">Réponse sous 24h ouvrées</p>
                </div>
                
                <div>
                  <p className="font-semibold text-[#04163a] mb-2">Téléphone</p>
                  <p className="text-[#4b5c6b] text-sm">
                    Nous privilégions l'email pour éviter les appels intempestifs. Si vous souhaitez être rappelé, indiquez-le dans votre message.
                  </p>
                </div>
              </div>
            </div>

            {/* Garanties */}
            <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#2B7A78]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#04163a]">Nos garanties</h2>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] mt-2 flex-shrink-0"></span>
                  <span className="text-[#04163a]">
                    <strong>Dossier anonyme</strong> : Vos coordonnées ne sont partagées qu'après votre choix
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] mt-2 flex-shrink-0"></span>
                  <span className="text-[#04163a]">
                    <strong>5+ déménageurs certifiés</strong> : Solvabilité vérifiée, 0 litige majeur
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] mt-2 flex-shrink-0"></span>
                  <span className="text-[#04163a]">
                    <strong>Devis comparables</strong> : Même cahier des charges pour tous
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] mt-2 flex-shrink-0"></span>
                  <span className="text-[#04163a]">
                    <strong>0 spam</strong> : Vous décidez quand et avec qui échanger
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ rapide - Fond sombre */}
      <section className="section section-contrast">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions fréquentes
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Les réponses aux questions les plus courantes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-3 text-lg">Le service est-il vraiment gratuit ?</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Oui, 100% gratuit pour vous. Nous sommes rémunérés par les déménageurs partenaires uniquement si vous choisissez l'un d'eux.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-3 text-lg">Combien de devis vais-je recevoir ?</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Vous recevez minimum 5 devis de déménageurs certifiés. Dans 95% des cas, vous en recevez entre 5 et 8 sous 7 jours.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-3 text-lg">Vais-je être harcelé par des appels ?</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Non, 0 spam garanti. Votre dossier est anonymisé. Vous recevez les devis par email et c'est vous qui contactez le déménageur de votre choix.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-3 text-lg">Les devis sont-ils comparables ?</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Oui. Tous les déménageurs reçoivent exactement le même dossier (volume, adresses, contraintes). Vous comparez sur une base commune.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="/faq" 
              className="text-[#6bcfcf] hover:text-white transition-colors text-lg inline-flex items-center gap-2"
            >
              <span>Voir toutes les questions fréquentes</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA final - Fond clair */}
      <section className="section section-light">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#04163a] to-[#2B7A78] rounded-3xl p-8 md:p-12 text-center shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Prêt à comparer des devis ?
              </h2>
              <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
                Créez votre dossier en 30 minutes et recevez 5+ devis comparables sous 7 jours
              </p>
              <a 
                href="/devis-gratuits/" 
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative">Obtenez vos devis gratuitement</span>
                <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <p className="text-sm text-white/60 mt-6">
                Dossier anonyme · 0 spam · 5+ devis fiables
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
