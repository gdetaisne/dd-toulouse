import { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/canonical-helper';
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';
import Breadcrumbs from '@/components/Breadcrumbs';

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
  const city = getCityDataFromUrl(env.SITE_URL);
  const canonicalUrl = getCanonicalUrl(`${city.slug}-vers-${destination.toLowerCase()}`);
  
  return {
    title: `Déménagement ${city.nameCapitalized} → ${destination} — 5+ devis comparables en 7j`,
    description: `Déménagement ${city.nameCapitalized} → ${destination}. Comparez 5+ devis de déménageurs certifiés. Gratuit, 0 spam. Service 100% en ligne.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Déménagement ${city.nameCapitalized} → ${destination}`,
      description: `Comparez 5+ devis de déménageurs certifiés pour votre déménagement ${city.nameCapitalized} → ${destination}`,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export function generateCorridorPageJsonLd(destination: string) {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Déménagement ${city.nameCapitalized} → ${destination} — comparaison de devis`,
    "provider": {
      "@type": "Organization",
      "name": "Moverz"
    },
    "areaServed": `${city.nameCapitalized} → ${destination}`,
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
  const city = getCityDataFromUrl(env.SITE_URL);
  const jsonLd = generateCorridorPageJsonLd(destination);

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
                  { label: `${city.nameCapitalized} vers ${destination}`, href: `/${city.slug}-vers-${destination.toLowerCase()}/` }
                ]}
              />
              
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
                Longue distance
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
                Déménagement {city.nameCapitalized} → {destination}
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
                Comparez 5+ devis de déménageurs certifiés pour votre déménagement longue distance
              </p>
            </div>
          </div>
        </section>

        {/* Infos trajet - Fond clair */}
        <section className="section section-light">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white border border-[#E3E5E8] rounded-3xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#2B7A78]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{distance}</div>
                <div className="text-[#4b5c6b]">Distance</div>
              </div>
              <div className="bg-white border border-[#E3E5E8] rounded-3xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#2B7A78]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{tempsMoyen}</div>
                <div className="text-[#4b5c6b]">Temps moyen</div>
              </div>
              <div className="bg-white border border-[#E3E5E8] rounded-3xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#2B7A78]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{periodeConseillee}</div>
                <div className="text-[#4b5c6b]">Période conseillée</div>
              </div>
            </div>
          </div>
        </section>

        {/* Prix indicatifs - Fond sombre */}
        <section className="section section-contrast">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prix indicatifs {city.nameCapitalized} → {destination}
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Fourchettes de prix pour un déménagement longue distance
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {prixIndicatifs.map((prix, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">{prix.type}</h3>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-2">{prix.prix}</div>
                  <p className="text-white/70 text-sm">{prix.description}</p>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm text-center mt-8">
              * Prix indicatifs pour un déménagement longue distance. Variables : volume, accès, période, services
            </p>
          </div>
        </section>

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

        {/* Accès à l'arrivée - Fond sombre */}
        <section className="section section-contrast">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Accès à l'arrivée à {destination}
                  </h2>
                </div>
                <p className="text-white/80 leading-relaxed text-lg">
                  {accesArrivee}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conseils - Fond clair */}
        <section className="section section-light">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#2B7A78]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#04163a]">
                    Conseils & check-list
                  </h2>
                </div>
                <div className="space-y-4">
                  {conseils.map((conseil, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6bcfcf] mt-2 flex-shrink-0"></span>
                      <p className="text-[#04163a]">{conseil}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Fond sombre */}
        <section className="section section-contrast">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Questions fréquentes - {city.nameCapitalized} → {destination}
              </h2>
            </div>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faq.map((item, index) => (
                <details key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-white list-none flex items-center justify-between">
                    <span>{item.question}</span>
                    <svg className="w-5 h-5 text-[#6BCFCF] group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-white/80 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final - Fond clair */}
        <section className="section section-light">
          <div className="container">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#04163a] mb-6">
                Prêt à déménager vers {destination} ?
              </h2>
              <p className="text-[#4b5c6b] mb-8 max-w-2xl mx-auto text-lg">
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
