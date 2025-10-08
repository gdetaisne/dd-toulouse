import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Déménagement toulouse | Devis Gratuits | Moverz',
  description: 'Contactez nos experts déménageurs à toulouse. Estimation gratuite en 30 min, 5 devis précis sous 7 jours.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#04163a]">
      {/* Header avec image de fond */}
      <div className="relative overflow-hidden">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2000&auto=format&fit=crop"
            alt="Contactez notre équipe de déménagement à toulouse"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/85 to-[#04163a]/90"></div>
        </div>

        <div className="relative bg-white/5 backdrop-blur border-b border-white/10">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <span className="text-2xl">📞</span>
                <span className="text-sm font-medium text-white">Nous sommes là pour vous aider</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Contactez-nous
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Préparez votre déménagement en 30 minutes → recevez 5 devis précis gratuitement sous 7 jours
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
                <span>100% gratuit, sans engagement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#6bcfcf] mt-1">✓</span>
                <span>Estimation précise par IA</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#6bcfcf] mt-1">✓</span>
                <span>Partenaires qualifiés et assurés</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#6bcfcf] mt-1">✓</span>
                <span>Prix transparents, aucun frais caché</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Besoin d'aide ?</h3>
            <div className="space-y-4 text-white/80">
              <div>
                <p className="font-medium text-white mb-2">Email</p>
                <a href="mailto:contact@moverz.fr" className="text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
                  contact@moverz.fr
                </a>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Téléphone</p>
                <a href="tel:+33556789012" className="text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
                  05 56 78 90 12
                </a>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Horaires</p>
                <p className="text-white/80">Lun-Ven : 9h-18h</p>
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
              Obtenez vos devis précis gratuitement
            </a>
            <p className="text-sm text-white/60 mt-4">
              ⚡ Estimation en 30 minutes • 🔒 100% sécurisé • 💰 Gratuit et sans engagement
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
