import { Metadata } from 'next';
import Link from 'next/link';

interface CorridorPageProps {
  destination: string;
  distance: string;
  tempsMoyen: string;
  periodeConseillee: string;
  prixIndicatifs: Array<{
    type: string;
    prix: string;
    description: string;
  }>;
  accesArrivee: string;
  conseils: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export function generateCorridorPageMetadata(destination: string): Metadata {
  return {
    title: `Déménagement toulouse → ${destination} — Comparez des devis | Moverz`,
    description: `Un seul dossier, 20 déménageurs qualifiés. 3 devis sous 7 jours pour toulouse → ${destination}.`,
    alternates: {
      canonical: `https://www.toulouse-demenageur.fr/toulouse-vers-${destination.toLowerCase()}`,
    },
    openGraph: {
      title: `Déménagement toulouse → ${destination} — Comparez des devis | Moverz`,
      description: `Un seul dossier, 20 déménageurs qualifiés. 3 devis sous 7 jours pour toulouse → ${destination}.`,
      url: `https://www.toulouse-demenageur.fr/toulouse-vers-${destination.toLowerCase()}`,
      type: 'website',
    },
  };
}

export function generateCorridorPageJsonLd(destination: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Déménagement toulouse → ${destination} — comparaison de devis`,
    "provider": {
      "@type": "Organization",
      "name": "Moverz"
    },
    "areaServed": `toulouse → ${destination}`,
    "serviceType": "Mise en relation et comparaison de devis"
  };
}

export default function CorridorPage({
  destination,
  distance,
  tempsMoyen,
  periodeConseillee,
  prixIndicatifs,
  accesArrivee,
  conseils,
  faq,
}: CorridorPageProps) {
  const jsonLd = generateCorridorPageJsonLd(destination);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-[#04163a]">
        {/* Hero */}
        <div className="bg-white/5 backdrop-blur border-b border-white/10">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 py-12">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Déménagement toulouse → {destination} : comparez des devis fiables
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                30 min pour préparer votre dossier • ≥ 3 devis personnalisés sous 7 jours
              </p>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#2b7a78] px-8 text-lg font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
              >
                Préparez votre demande en 30 min — recevez 3 devis sous 7 jours
              </Link>
            </div>
          </div>
        </div>

        {/* Infos trajet */}
        <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Informations trajet
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{distance}</div>
                <div className="text-white/80">Distance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{tempsMoyen}</div>
                <div className="text-white/80">Temps moyen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{periodeConseillee}</div>
                <div className="text-white/80">Période conseillée</div>
              </div>
            </div>
          </div>
        </div>

        {/* Prix indicatifs corridor */}
        <div className="container max-w-6xl mx-auto px-4 md:px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Prix indicatifs toulouse → {destination}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {prixIndicatifs.map((prix, index) => (
              <div key={index} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">{prix.type}</h3>
                <div className="text-2xl font-bold text-[#6bcfcf] mb-2">{prix.prix}</div>
                <p className="text-white/70 text-sm">{prix.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accès à l'arrivée */}
        <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Accès à l'arrivée à {destination}
            </h2>
            <div className="text-white/80 leading-relaxed">
              {accesArrivee}
            </div>
          </div>
        </div>

        {/* Parcours J0 → J7 */}
        <div className="container max-w-6xl mx-auto px-4 md:px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Votre parcours en 4 étapes
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-[#6bcfcf] rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Dossier 30 min</h3>
              <p className="text-white/70 text-sm">Préparez votre inventaire en ligne</p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-[#6bcfcf] rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Appel d'offres</h3>
              <p className="text-white/70 text-sm">20 déménageurs qualifiés</p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-[#6bcfcf] rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Comparaison</h3>
              <p className="text-white/70 text-sm">Vérifications et sélection</p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-[#6bcfcf] rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">3-5 devis</h3>
              <p className="text-white/70 text-sm">Sous 7 jours</p>
            </div>
          </div>
        </div>

        {/* Conseils & check-list */}
        <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Conseils & check-list
            </h2>
            <div className="space-y-4">
              {conseils.map((conseil, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#6bcfcf] rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    ✓
                  </div>
                  <p className="text-white/80">{conseil}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maillage */}
        <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">
              Vous déménagez depuis toulouse ?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/toulouse"
                className="bg-[#6bcfcf]/20 text-[#6bcfcf] px-6 py-3 rounded-full hover:bg-[#6bcfcf]/30 transition-colors"
              >
                Voir toulouse
              </Link>
              <Link
                href="/services/demenagement-standard-toulouse"
                className="bg-[#6bcfcf]/20 text-[#6bcfcf] px-6 py-3 rounded-full hover:bg-[#6bcfcf]/30 transition-colors"
              >
                Service Standard
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ corridor */}
        <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            FAQ toulouse → {destination}
          </h2>
          <div className="space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">{item.question}</h3>
                <p className="text-white/80">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="bg-[#2b7a78] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Prêt à déménager vers {destination} ?
            </h2>
            <p className="text-white/90 mb-6">
              Préparez votre dossier en 30 minutes et recevez 3 devis personnalisés sous 7 jours
            </p>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-white text-[#2b7a78] px-8 font-medium hover:bg-white/90 transition-colors"
            >
              Préparez votre demande en 30 min — recevez 3 devis sous 7 jours
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
