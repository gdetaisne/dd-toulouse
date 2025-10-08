import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

interface LocalPageProps {
  zone: string;
  zoneDisplay: string;
  description: string;
  coverImage?: string; // Image du quartier (optionnelle)
  stats: {
    dossiers: string;
    demenageurs: string;
    delai: string;
  };
  pourquoiMoverz: string;
  accesStationnement: string;
  destinationsFrequentes: Array<{
    href: string;
    title: string;
    description: string;
  }>;
  partenaires: Array<{
    name: string;
    rating: number;
    reviews: number;
    specialties: string[];
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export function generateLocalPageMetadata(zone: string, zoneDisplay: string): Metadata {
  return {
    title: `Déménageur ${zoneDisplay} — Comparez des devis fiables | Moverz`,
    description: `Préparez votre dossier en 30 min. Au moins 3 devis personnalisés sous 7 jours pour ${zoneDisplay} (toulouse).`,
    alternates: {
      canonical: `https://www.toulouse-demenageur.fr/${zone}`,
    },
    openGraph: {
      title: `Déménageur ${zoneDisplay} — Comparez des devis fiables | Moverz`,
      description: `Préparez votre dossier en 30 min. Au moins 3 devis personnalisés sous 7 jours pour ${zoneDisplay} (toulouse).`,
      url: `https://www.toulouse-demenageur.fr/${zone}`,
      type: 'website',
    },
  };
}

export function generateLocalPageJsonLd(zone: string, zoneDisplay: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Comparaison de devis déménagement — ${zoneDisplay}`,
    "provider": {
      "@type": "Organization",
      "name": "Moverz"
    },
    "areaServed": `toulouse — ${zoneDisplay}`,
    "serviceType": "Mise en relation et comparaison de devis"
  };
}

export default function LocalPage({
  zone,
  zoneDisplay,
  description,
  coverImage,
  stats,
  pourquoiMoverz,
  accesStationnement,
  destinationsFrequentes,
  partenaires,
  faq,
}: LocalPageProps) {
  const jsonLd = generateLocalPageJsonLd(zone, zoneDisplay);

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
                Déménageur {zoneDisplay} : comparez des devis fiables
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                30 min pour préparer votre dossier • ≥ 3 devis personnalisés sous 7 jours
              </p>
              
              {/* Cover Image du quartier */}
              {coverImage && (
                <div className="relative w-full max-w-5xl mx-auto h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                  <Image 
                    src={coverImage}
                    alt={`${zoneDisplay} — accès camion déménagement, façades typiques, parking`}
                    fill
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    className="object-cover"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04163a]/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <span className="text-4xl">📍</span>
                    <div className="text-left">
                      <div className="text-white font-bold text-2xl">{zoneDisplay}</div>
                      <div className="text-white/80 text-sm">toulouse</div>
                    </div>
                  </div>
                </div>
              )}
              
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#2b7a78] px-8 text-lg font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
              >
                Préparez votre demande en 30 min — recevez 3 devis sous 7 jours
              </Link>
            </div>
          </div>
        </div>

        {/* Stats locales */}
        <div className="container max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{stats.dossiers}</div>
              <div className="text-white/80">dossiers {zoneDisplay}</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{stats.demenageurs}</div>
              <div className="text-white/80">déménageurs qualifiés</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{stats.delai}</div>
              <div className="text-white/80">devis sous 7 j</div>
            </div>
          </div>
        </div>

        {/* Pourquoi Moverz */}
        <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Pourquoi Moverz à {zoneDisplay} ?
            </h2>
            <p className="text-white/80 leading-relaxed">
              {pourquoiMoverz}
            </p>
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

        {/* Prix indicatifs */}
        <div className="container max-w-6xl mx-auto px-4 md:px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Prix indicatifs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Studio/T1</h3>
              <div className="text-2xl font-bold text-[#6bcfcf] mb-2">300-500€</div>
              <p className="text-white/70 text-sm">Volume : 10-15 m³</p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">T2/T3</h3>
              <div className="text-2xl font-bold text-[#6bcfcf] mb-2">500-800€</div>
              <p className="text-white/70 text-sm">Volume : 20-35 m³</p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Maison</h3>
              <div className="text-2xl font-bold text-[#6bcfcf] mb-2">800-1500€</div>
              <p className="text-white/70 text-sm">Volume : 40-80 m³</p>
            </div>
          </div>
          <p className="text-white/60 text-sm text-center mt-6">
            * Prix indicatifs. Facteurs : ascenseur, distance, accès camion, objets fragiles
          </p>
        </div>

        {/* Accès & stationnement */}
        <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Accès & stationnement à {zoneDisplay}
            </h2>
            <div className="text-white/80 leading-relaxed">
              {accesStationnement}
            </div>
          </div>
        </div>

        {/* Destinations couvertes */}
        <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Destinations couvertes
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['toulouse intra-muros', 'Gironde', 'Occitanie', 'France entière', 'Europe'].map((dest) => (
              <span key={dest} className="bg-[#6bcfcf]/20 text-[#6bcfcf] px-4 py-2 rounded-full text-sm">
                {dest}
              </span>
            ))}
          </div>
        </div>

        {/* Destinations fréquentes */}
        <div className="container max-w-6xl mx-auto px-4 md:px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Destinations fréquentes depuis {zoneDisplay}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {destinationsFrequentes.map((dest) => (
              <Link
                key={dest.href}
                href={dest.href}
                className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{dest.title}</h3>
                <p className="text-white/70 text-sm">{dest.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Partenaires */}
        <div className="container max-w-6xl mx-auto px-4 md:px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Partenaires qui desservent {zoneDisplay}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partenaires.map((partner, index) => (
              <div key={index} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{partner.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-white/80">{partner.rating} ({partner.reviews} avis)</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {partner.specialties.map((specialty, idx) => (
                    <p key={idx} className="text-sm text-white/70">• {specialty}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/partenaires"
              className="text-[#6bcfcf] hover:text-white transition-colors"
            >
              Voir tous nos partenaires →
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            FAQ {zoneDisplay}
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
              Prêt à déménager à {zoneDisplay} ?
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
