import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getCanonicalUrl } from '@/lib/canonical-helper';
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';
import Breadcrumbs from '@/components/Breadcrumbs';

interface LocalPageProps {
  zone: string;
  zoneDisplay: string;
  description: string;
  coverImage?: string;
  accessInfo?: string;
  pricing?: any;
  destinations?: any[];
  partners?: any[];
  stats?: {
    dossiers: string;
    demenageurs: string;
    delai: string;
  };
  pourquoiMoverz?: string;
  accesStationnement?: string;
  destinationsFrequentes?: Array<{
    href: string;
    title: string;
    description: string;
  }>;
  partenaires?: Array<{
    name: string;
    rating: number;
    reviews: number;
    specialties: string[];
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

export function generateLocalPageMetadata(zone: string, zoneDisplay: string): Metadata {
  const city = getCityDataFromUrl(env.SITE_URL);
  const zoneDisplayNormalized = (zoneDisplay || '').trim().toLowerCase();
  const cityNameNormalized = (city.nameCapitalized || '').trim().toLowerCase();
  const isCityPage = zone === city.slug || zoneDisplayNormalized === cityNameNormalized;
  const canonicalPath = isCityPage ? `${city.slug}` : `${city.slug}/${(zone || '').toLowerCase()}`;
  const canonicalUrl = getCanonicalUrl(canonicalPath);

  const titleText = isCityPage
    ? `Déménagement ${city.nameCapitalized} — 5+ Devis Comparables Gratuits`
    : `Déménagement ${zoneDisplay} ${city.nameCapitalized} — Devis Gratuits`;

  const descriptionText = isCityPage
    ? `Déménagez à ${city.nameCapitalized} dès 280€. Comparez 5+ devis de déménageurs certifiés sous 7j. Gratuit, 0 spam. 1200+ clients ⭐4.9/5`
    : `Déménagement ${zoneDisplay} (${city.nameCapitalized}) dès 280€. 5+ devis comparables sous 7j. Gratuit, sans harcèlement. 1200+ clients satisfaits.`;

  return {
    title: titleText,
    description: descriptionText,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: isCityPage
        ? `Déménagement ${city.nameCapitalized}`
        : `Déménagement ${zoneDisplay} ${city.nameCapitalized}`,
      description: isCityPage
        ? `Déménageur local à ${city.nameCapitalized}`
        : `Déménageur local ${zoneDisplay} à ${city.nameCapitalized}`,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export function generateLocalPageJsonLd(zone: string, zoneDisplay: string) {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Comparaison de devis déménagement — ${zoneDisplay}`,
    "provider": {
      "@type": "Organization",
      "name": "Moverz"
    },
    "areaServed": `${city.nameCapitalized} — ${zoneDisplay}`,
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
  // Force dynamic rendering to avoid prerendering errors
  const jsonLd = generateLocalPageJsonLd(zone, zoneDisplay);
  const city = getCityDataFromUrl(env.SITE_URL);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="bg-hero min-h-screen">
        <div className="halo" />

        {/* Hero - Fond sombre */}
        <section className="section section-contrast relative overflow-hidden">
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Breadcrumbs
                items={[
                  { label: "Accueil", href: "/" },
                  { label: "Quartiers", href: `/quartiers-${city.slug}/` },
                  { label: zoneDisplay, href: `/${city.slug}/${zone}/` }
                ]}
              />
              
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
                {zoneDisplay}
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
                Déménageur {zoneDisplay} : comparez des devis fiables
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
                {description}
              </p>
              
              {/* Cover Image */}
              {coverImage && (
                <div className="relative w-full max-w-5xl mx-auto h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
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
                    <div className="w-12 h-12 rounded-full bg-[#6BCFCF]/20 backdrop-blur-sm border border-[#6BCFCF]/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-bold text-2xl">{zoneDisplay}</div>
                      <div className="text-white/80 text-sm">{city.nameCapitalized}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stats - Fond clair */}
        {stats && (
        <section className="section section-light">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white border border-[#E3E5E8] rounded-3xl p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{stats.dossiers}</div>
                <div className="text-[#4b5c6b]">dossiers {zoneDisplay}</div>
              </div>
              <div className="bg-white border border-[#E3E5E8] rounded-3xl p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{stats.demenageurs}</div>
                <div className="text-[#4b5c6b]">déménageurs certifiés</div>
              </div>
              <div className="bg-white border border-[#E3E5E8] rounded-3xl p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{stats.delai}</div>
                <div className="text-[#4b5c6b]">devis sous 7 j</div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Pourquoi le comparateur - Fond sombre */}
        {pourquoiMoverz && (
        <section className="section section-contrast">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Pourquoi comparer les devis à {zoneDisplay} ?
                </h2>
                <p className="text-white/80 leading-relaxed text-lg">
                  {pourquoiMoverz}
                </p>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Processus - Fond clair */}
        <section className="section section-light">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#04163a] mb-4">
                Votre parcours en 3 étapes
              </h2>
              <p className="text-[#4b5c6b] max-w-2xl mx-auto">
                Simple, rapide et sans engagement
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6bcfcf] to-[#4FB8B8] rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-[#04163a] mb-3">Créez votre dossier</h3>
                <p className="text-[#4b5c6b] leading-relaxed">Remplissez les détails de votre déménagement en 30 minutes</p>
              </div>
              <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6bcfcf] to-[#4FB8B8] rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-[#04163a] mb-3">Recevez 5+ devis</h3>
                <p className="text-[#4b5c6b] leading-relaxed">Déménageurs certifiés vous envoient leurs propositions sous 7 jours</p>
              </div>
              <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6bcfcf] to-[#4FB8B8] rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-bold text-[#04163a] mb-3">Comparez et choisissez</h3>
                <p className="text-[#4b5c6b] leading-relaxed">Sélectionnez le meilleur rapport qualité/prix en toute transparence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Prix indicatifs - Fond sombre */}
        <section className="section section-contrast">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prix indicatifs à {zoneDisplay}
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Fourchettes de prix pour un déménagement local
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Studio/T1</h3>
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">300-500€</div>
                <p className="text-white/70 text-sm">Volume : 10-15 m³</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">T2/T3</h3>
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">500-900€</div>
                <p className="text-white/70 text-sm">Volume : 20-35 m³</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Maison</h3>
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">900-1500€</div>
                <p className="text-white/70 text-sm">Volume : 40-80 m³</p>
              </div>
            </div>
            <p className="text-white/60 text-sm text-center mt-8">
              * Prix indicatifs pour un déménagement local. Variables : ascenseur, distance, accès camion, objets fragiles
            </p>
          </div>
        </section>

        {/* Accès & stationnement - Fond clair */}
        {accesStationnement && (
        <section className="section section-light">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#2B7A78]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#04163a]">
                    Accès & stationnement à {zoneDisplay}
                  </h2>
                </div>
                <div className="text-[#04163a] leading-relaxed text-lg">
                  {accesStationnement}
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Destinations fréquentes - Fond sombre */}
        {destinationsFrequentes && destinationsFrequentes.length > 0 && (
        <section className="section section-contrast">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Destinations fréquentes depuis {zoneDisplay}
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Trajets populaires et déménagements longue distance
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {destinationsFrequentes.map((dest, index) => (
                <Link
                  key={index}
                  href={dest.href}
                  className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-white">{dest.title}</h3>
                    <svg className="w-5 h-5 text-[#6BCFCF] group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-sm">{dest.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Partenaires - Fond clair */}
        {partenaires && partenaires.length > 0 && (
        <section className="section section-light">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Déménageurs certifiés à {zoneDisplay}
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Nos partenaires locaux contrôlés et assurés
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {partenaires.map((partner, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-white text-lg">{partner.name}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-white/80">{partner.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mb-4">{partner.reviews} avis</p>
                  <div className="space-y-2">
                    {partner.specialties.map((specialty, idx) => (
                      <p key={idx} className="text-sm text-white/70 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf]"></span>
                        {specialty}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/partenaires"
                className="text-[#6bcfcf] hover:text-white transition-colors text-lg"
              >
                Voir tous nos partenaires →
              </Link>
            </div>
          </div>
        </section>
        )}

        {/* FAQ - Fond clair */}
        {faq && faq.length > 0 && (
        <section className="section section-light">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#04163a] mb-4">
                Questions fréquentes - {zoneDisplay}
              </h2>
            </div>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faq.map((item, index) => (
                <details key={index} className="bg-white border border-[#E3E5E8] rounded-3xl p-6 shadow-sm group">
                  <summary className="cursor-pointer text-lg font-bold text-[#04163a] list-none flex items-center justify-between">
                    <span>{item.question}</span>
                    <svg className="w-5 h-5 text-[#6BCFCF] group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-[#4b5c6b] leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* CTA final - Fond sombre */}
        <section className="section section-contrast">
          <div className="container">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Prêt à déménager à {zoneDisplay} ?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
                Créez votre dossier en 30 minutes et recevez 5+ devis comparables sous 7 jours
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
    </>
  );
}
