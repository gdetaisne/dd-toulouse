import { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/canonical-helper';
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Contact Déménagement ${city.nameCapitalized} | Devis Gratuits | Moverz`,
    description: `Contactez nos experts déménageurs à ${city.nameCapitalized}. Estimation gratuite en 30 min, 5 devis précis sous 7 jours.`,
    alternates: {
      canonical: getCanonicalUrl('contact'),
    },
    openGraph: {
      title: `Contact Déménagement ${city.nameCapitalized}`,
      description: `Contactez nos experts déménageurs à ${city.nameCapitalized}`,
      url: getCanonicalUrl('contact'),
      type: 'website',
    },
  };
})();

export default function ContactPage() {
  const city = getCityDataFromUrl(env.SITE_URL);
  const emailDomain = city.siteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '');
  
  return (
    <div className="min-h-screen bg-[#04163a]">
      {/* Header avec image de fond */}
      <div className="relative overflow-hidden">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2000&auto=format&fit=crop"
            alt={`Contactez notre équipe de déménagement à ${city.nameCapitalized}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/85 to-[#04163a]/90"></div>
        </div>

        <div className="relative bg-white/5 backdrop-blur border-b border-white/10">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <Breadcrumbs
                items={[
                  { label: "Accueil", href: "/" },
                  { label: "Contact", href: "/contact/" }
                ]}
              />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 mt-6">
                <span className="text-2xl">📞</span>
                <span className="text-sm font-medium text-white">Nous sommes là pour vous aider</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Besoin d’un humain ? On vous répond en 24h
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Questions, suivi dossier ou arbitrage de devis : notre équipe vérifie les infos et vous aide à comparer des déménageurs vraiment fiables.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
        {/* Garanties */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Nos garanties</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-[#6bcfcf] mt-1">✓</span>
                <span>Calcul de volume en photos, dossier anonyme</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#6bcfcf] mt-1">✓</span>
                <span>5+ déménageurs contrôlés (solvabilité, litiges, avis)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#6bcfcf] mt-1">✓</span>
                <span>Devis comparables sur le même cahier des charges</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#6bcfcf] mt-1">✓</span>
                <span>0 appel intempestif : vous décidez quand échanger</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Besoin d'aide ?</h3>
            <div className="space-y-4 text-white/80">
              <div>
                <p className="font-medium text-white mb-2">Email</p>
                <a href={`mailto:contact@${emailDomain}`} className="text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
                  contact@{emailDomain}
                </a>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Horaires</p>
                <p className="text-white/80">Lun-Ven : 9h-18h</p>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Envie de parler ?</p>
                <p className="text-white/70 text-sm">On rappelle sur demande pour éviter les harcèlements téléphoniques.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
          <div className="text-center">
            <a 
              href="/inventaire-ia" 
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#6bcfcf] px-8 text-lg font-semibold text-[#04163a] shadow-lg hover:bg-[#6bcfcf]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6bcfcf]/50 transition duration-300"
            >
              Recevez 5+ devis fiables gratuitement
            </a>
            <p className="text-sm text-white/60 mt-4">
              ⚡ Calcul en photos rapide • 🔍 5+ pros contrôlés • 💬 Zéro harcèlement tel
            </p>
          </div>
        </div>

        {/* FAQ rapide */}
        <div className="mt-12 bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Questions fréquentes</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-2">Combien de photos faut-il ?</h4>
              <p className="text-white/80 text-sm">3 à 10 photos par pièce. Inclure plafonniers, lampes, objets fragiles.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">L'estimation est-elle fiable ?</h4>
              <p className="text-white/80 text-sm">Très fiable dès la première estimation (~90%). Nos partenaires valident et affinent.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Le service est-il vraiment gratuit ?</h4>
              <p className="text-white/80 text-sm">Oui, 100% gratuit pour vous. Nous facturons une commission au déménageur sélectionné.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Quand recevrai-je mes devis ?</h4>
              <p className="text-white/80 text-sm">Dans 90% des cas, vous recevez 3 à 5 devis sous une semaine.</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <a href="/faq" className="text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors underline">
              Voir toutes les questions fréquentes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
