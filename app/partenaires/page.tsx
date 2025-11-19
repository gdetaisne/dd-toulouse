import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaPrimary from "@/components/CtaPrimary";
import Section from "@/components/Section";
import PartnerCard from "@/components/PartnerCard";
import PartnersList from "@/components/PartnersList";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

const city = getCityDataFromUrl(env.SITE_URL);

export const metadata: Metadata = {
  title: `Partenaires déménageurs - Déménageurs ${city.nameCapitalized} (IA)`,
  description: `Découvrez nos partenaires déménageurs certifiés à ${city.nameCapitalized}. Qualité garantie, tarifs transparents, service client premium.`,
  alternates: {
    canonical: getCanonicalUrl('partenaires'),
  },
  openGraph: {
    title: `Partenaires déménageurs - Déménageurs ${city.nameCapitalized} (IA)`,
    description: `Découvrez nos partenaires déménageurs certifiés à ${city.nameCapitalized}. Qualité garantie, tarifs transparents, service client premium.`,
    url: getCanonicalUrl('partenaires'),
    type: "website",
  },
};

const partners = [
  {
    name: "Déménageurs Côte d'Azur Pro",
    city: "Cannes",
    rating: 4.8,
    reviews: 366,
    specialties: ["Déménagements sur mesure", "Service personnalisé"],
  },
  {
    name: "Les Déménageurs Niçois",
    city: "Antibes",
    rating: 4.8,
    reviews: 69,
    specialties: ["Déménagements locaux", "Gironde et Provence-Alpes-Côte d'Azur"],
  },
  {
    name: "Déménageur Nice Express",
    city: "Nice",
    rating: 4.8,
    reviews: 69,
    specialties: ["Déménagements particuliers", "Déménagements professionnels"],
  },
  {
    name: "Méditerranée Déménagements Nice",
    city: "Nice",
    rating: 4.5,
    reviews: 66,
    specialties: ["Garde-meuble", "Stockage d'archives"],
  },
  {
    name: "Les Déménageurs de la Riviera",
    city: "Grasse",
    rating: 5.0,
    reviews: 81,
    specialties: ["Déménagements qualifiés", "Tout le sud-ouest"],
  },
  {
    name: "Les Déménageurs Azuréens",
    city: "Menton",
    rating: 4.5,
    reviews: 50,
    specialties: ["Déménagements nationaux", "Réseau national"],
  },
  {
    name: "Alex Déménagement",
    city: "nice",
    rating: 4.7,
    reviews: 45,
    specialties: ["Déménagements express", "Emballage professionnel"],
  },
  {
    name: "nice Déménagement",
    city: "nice",
    rating: 4.0,
    reviews: 32,
    specialties: ["Déménagements résidentiels", "Déménagements commerciaux"],
  },
  {
    name: "Hontas Déménagements",
    city: "nice",
    rating: 4.0,
    reviews: 1,
    specialties: ["Déménagements longue distance", "Équipe professionnelle"],
  },
  {
    name: "Déménageurs Bretons",
    city: "nice",
    rating: 5.0,
    reviews: 1,
    specialties: ["Déménagements complets", "Services nationaux"],
  },
  {
    name: "SAM'DÉMÉNAGE",
    city: "nice",
    rating: 4.6,
    reviews: 28,
    specialties: ["Déménagements efficaces", "Équipe bienveillante"],
  },
  {
    name: "Rachid Chaty (GÈRE FOR YOU)",
    city: "nice",
    rating: 4.8,
    reviews: 15,
    specialties: ["Manutention", "Nettoyage avant état des lieux"],
  },
  {
    name: "Ben Ben",
    city: "nice",
    rating: 4.9,
    reviews: 12,
    specialties: ["Aide au déménagement", "Livraison", "Retrait de colis"],
  },
  {
    name: "Phone Course",
    city: "nice",
    rating: 4.5,
    reviews: 8,
    specialties: ["Transport routier", "Livraison"],
  },
  {
    name: "Burdigala Déménagement",
    city: "nice",
    rating: 4.3,
    reviews: 6,
    specialties: ["Déménagements locaux", "Services adaptés"],
  },
  {
    name: "Larnaudie Déménagements",
    city: "nice",
    rating: 4.7,
    reviews: 5,
    specialties: ["Déménagements familiaux", "Garde-meuble"],
  },
  {
    name: "Déménagements Grée",
    city: "nice",
    rating: 4.4,
    reviews: 4,
    specialties: ["Services personnalisés", "Particuliers et professionnels"],
  },
  {
    name: "Air Déménagement",
    city: "nice",
    rating: 4.6,
    reviews: 3,
    specialties: ["Solutions adaptées", "Besoins spécifiques"],
  },
  {
    name: "Alexandre Meigne-Sakr",
    city: "nice",
    rating: 4.8,
    reviews: 2,
    specialties: ["Services sur mesure", "Déménagements particuliers"],
  },
  {
    name: "Alain Lagache",
    city: "nice",
    rating: 4.5,
    reviews: 2,
    specialties: ["Déménagements locaux", "Services de qualité"],
  },
  {
    name: "A À Z Service",
    city: "nice",
    rating: 4.2,
    reviews: 1,
    specialties: ["Déménagements", "Nettoyage"],
  },
  {
    name: "Sédégo",
    city: "nice",
    rating: 4.0,
    reviews: 1,
    specialties: ["Solutions adaptées", "Services complets"],
  },
  {
    name: "Transport Joël Latrille",
    city: "nice",
    rating: 4.3,
    reviews: 1,
    specialties: ["Transport", "Déménagements professionnels"],
  },
  {
    name: "Adema",
    city: "nice",
    rating: 4.1,
    reviews: 1,
    specialties: ["Services complets", "Particuliers et professionnels"],
  },
  {
    name: "Les Déménageurs Girondins",
    city: "Vence",
    rating: 4.4,
    reviews: 8,
    specialties: ["Déménagements locaux", "Services adaptés"],
  },
  {
    name: "Bouexpress",
    city: "Cagnes-sur-Mer",
    rating: 4.6,
    reviews: 6,
    specialties: ["Déménagements rapides", "Satisfaction client"],
  },
  {
    name: "TTD Turbo Transport Déménagement",
    city: "Villefranche-sur-Mer",
    rating: 4.5,
    reviews: 4,
    specialties: ["Solutions rapides", "Particuliers et entreprises"],
  },
  {
    name: "Déménagement Transport 33",
    city: "Saint-Laurent-du-Var",
    rating: 4.3,
    reviews: 3,
    specialties: ["Transport", "Services personnalisés"],
  },
  {
    name: "Transport Gironde",
    city: "Le Cannet",
    rating: 4.2,
    reviews: 2,
    specialties: ["Transport", "Solutions sur mesure"],
  },
].sort((a, b) => b.reviews - a.reviews);

export default function PartenairesPage() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      {/* Hero Section - Version Stripe */}
      <section className="section section-contrast relative overflow-hidden">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Partenaires", href: "/partenaires/" }
              ]}
            />
            
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
              Réseau de confiance
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Nos partenaires déménageurs certifiés
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Nous travaillons exclusivement avec des déménageurs locaux certifiés et expérimentés. 
              Chaque partenaire est sélectionné pour sa qualité de service, sa transparence tarifaire et sa connaissance du terrain local.
            </p>
          </div>
        </div>
      </section>

      {/* Liste des partenaires - Fond clair */}
      <section className="section section-light">
        <div className="container">
          <PartnersList partners={partners} />
        </div>
      </section>

      {/* Pourquoi faire confiance - Fond sombre */}
      <section className="section section-contrast">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              Garanties
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Pourquoi faire confiance à nos partenaires ?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(107,207,207,0.2)] hover:border-[#6BCFCF]/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/30 to-[#4FB8B8]/40 border-2 border-[#6BCFCF]/50 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(107,207,207,0.6)]">
                <svg className="h-6 w-6 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">Certification qualité</h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                Tous nos partenaires sont certifiés et assurés. Nous vérifions régulièrement leur qualité de service.
              </p>
            </div>
            <div className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(107,207,207,0.2)] hover:border-[#6BCFCF]/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/30 to-[#4FB8B8]/40 border-2 border-[#6BCFCF]/50 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(107,207,207,0.6)]">
                <svg className="h-6 w-6 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">Tarifs transparents</h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                Pas de frais cachés, pas de surprises. Nos partenaires s'engagent sur des tarifs clairs et définitifs.
              </p>
            </div>
            <div className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(107,207,207,0.2)] hover:border-[#6BCFCF]/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/30 to-[#4FB8B8]/40 border-2 border-[#6BCFCF]/50 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(107,207,207,0.6)]">
                <svg className="h-6 w-6 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">Connaissance locale</h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                Expertise locale : accès, stationnement, contraintes spécifiques à chaque quartier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Fond clair */}
      <section className="section section-light">
        <div className="container">
          <CtaPrimary placement="inline" />
        </div>
      </section>

      {/* Devenir partenaire - Fond sombre */}
      <section className="section section-contrast">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 text-center shadow-lg">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
                Rejoignez-nous
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Devenir partenaire Moverz
              </h2>
              <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                Vous êtes déménageur à {city.nameCapitalized} et souhaitez rejoindre notre réseau ? 
                Bénéficiez de notre technologie IA et de notre visibilité en ligne.
              </p>
              <a 
                href="/contact/" 
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative">Devenir partenaire</span>
                <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
