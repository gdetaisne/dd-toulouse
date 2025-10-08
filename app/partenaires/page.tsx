import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaPrimary from "@/components/CtaPrimary";
import Section from "@/components/Section";
import PartnerCard from "@/components/PartnerCard";
import PartnersList from "@/components/PartnersList";

export const metadata: Metadata = {
  title: "Partenaires déménageurs - Déménageurs toulouse (IA)",
  description: "Découvrez nos partenaires déménageurs certifiés à toulouse. Qualité garantie, tarifs transparents, service client premium.",
  alternates: {
    canonical: "https://www.toulouse-demenageur.fr/partenaires/",
  },
  openGraph: {
    title: "Partenaires déménageurs - Déménageurs toulouse (IA)",
    description: "Découvrez nos partenaires déménageurs certifiés à toulouse. Qualité garantie, tarifs transparents, service client premium.",
    url: "https://www.toulouse-demenageur.fr/partenaires/",
    type: "website",
  },
};

const partners = [
  {
    name: "Déménageurs Occitanie Pro",
    city: "Blagnac",
    rating: 4.8,
    reviews: 366,
    specialties: ["Déménagements sur mesure", "Service personnalisé"],
  },
  {
    name: "Les Déménageurs Toulousains",
    city: "Colomiers",
    rating: 4.8,
    reviews: 69,
    specialties: ["Déménagements locaux", "Gironde et Occitanie"],
  },
  {
    name: "Déménageur Toulouse Express",
    city: "Toulouse",
    rating: 4.8,
    reviews: 69,
    specialties: ["Déménagements particuliers", "Déménagements professionnels"],
  },
  {
    name: "Garonne Déménagements Toulouse",
    city: "Toulouse",
    rating: 4.5,
    reviews: 66,
    specialties: ["Garde-meuble", "Stockage d'archives"],
  },
  {
    name: "Les Déménageurs du Sud-Ouest",
    city: "Tournefeuille",
    rating: 5.0,
    reviews: 81,
    specialties: ["Déménagements qualifiés", "Tout le sud-ouest"],
  },
  {
    name: "Les Déménageurs Occitans",
    city: "Ramonville-Saint-Agne",
    rating: 4.5,
    reviews: 50,
    specialties: ["Déménagements nationaux", "Réseau national"],
  },
  {
    name: "Alex Déménagement",
    city: "toulouse",
    rating: 4.7,
    reviews: 45,
    specialties: ["Déménagements express", "Emballage professionnel"],
  },
  {
    name: "toulouse Déménagement",
    city: "toulouse",
    rating: 4.0,
    reviews: 32,
    specialties: ["Déménagements résidentiels", "Déménagements commerciaux"],
  },
  {
    name: "Hontas Déménagements",
    city: "toulouse",
    rating: 4.0,
    reviews: 1,
    specialties: ["Déménagements longue distance", "Équipe professionnelle"],
  },
  {
    name: "Déménageurs Bretons",
    city: "toulouse",
    rating: 5.0,
    reviews: 1,
    specialties: ["Déménagements complets", "Services nationaux"],
  },
  {
    name: "SAM'DÉMÉNAGE",
    city: "toulouse",
    rating: 4.6,
    reviews: 28,
    specialties: ["Déménagements efficaces", "Équipe bienveillante"],
  },
  {
    name: "Rachid Chaty (GÈRE FOR YOU)",
    city: "toulouse",
    rating: 4.8,
    reviews: 15,
    specialties: ["Manutention", "Nettoyage avant état des lieux"],
  },
  {
    name: "Ben Ben",
    city: "toulouse",
    rating: 4.9,
    reviews: 12,
    specialties: ["Aide au déménagement", "Livraison", "Retrait de colis"],
  },
  {
    name: "Phone Course",
    city: "toulouse",
    rating: 4.5,
    reviews: 8,
    specialties: ["Transport routier", "Livraison"],
  },
  {
    name: "Burdigala Déménagement",
    city: "toulouse",
    rating: 4.3,
    reviews: 6,
    specialties: ["Déménagements locaux", "Services adaptés"],
  },
  {
    name: "Larnaudie Déménagements",
    city: "toulouse",
    rating: 4.7,
    reviews: 5,
    specialties: ["Déménagements familiaux", "Garde-meuble"],
  },
  {
    name: "Déménagements Grée",
    city: "toulouse",
    rating: 4.4,
    reviews: 4,
    specialties: ["Services personnalisés", "Particuliers et professionnels"],
  },
  {
    name: "Air Déménagement",
    city: "toulouse",
    rating: 4.6,
    reviews: 3,
    specialties: ["Solutions adaptées", "Besoins spécifiques"],
  },
  {
    name: "Alexandre Meigne-Sakr",
    city: "toulouse",
    rating: 4.8,
    reviews: 2,
    specialties: ["Services sur mesure", "Déménagements particuliers"],
  },
  {
    name: "Alain Lagache",
    city: "toulouse",
    rating: 4.5,
    reviews: 2,
    specialties: ["Déménagements locaux", "Services de qualité"],
  },
  {
    name: "A À Z Service",
    city: "toulouse",
    rating: 4.2,
    reviews: 1,
    specialties: ["Déménagements", "Nettoyage"],
  },
  {
    name: "Sédégo",
    city: "toulouse",
    rating: 4.0,
    reviews: 1,
    specialties: ["Solutions adaptées", "Services complets"],
  },
  {
    name: "Transport Joël Latrille",
    city: "toulouse",
    rating: 4.3,
    reviews: 1,
    specialties: ["Transport", "Déménagements professionnels"],
  },
  {
    name: "Adema",
    city: "toulouse",
    rating: 4.1,
    reviews: 1,
    specialties: ["Services complets", "Particuliers et professionnels"],
  },
  {
    name: "Les Déménageurs Girondins",
    city: "Balma",
    rating: 4.4,
    reviews: 8,
    specialties: ["Déménagements locaux", "Services adaptés"],
  },
  {
    name: "Bouexpress",
    city: "Cugnaux",
    rating: 4.6,
    reviews: 6,
    specialties: ["Déménagements rapides", "Satisfaction client"],
  },
  {
    name: "TTD Turbo Transport Déménagement",
    city: "L'Union",
    rating: 4.5,
    reviews: 4,
    specialties: ["Solutions rapides", "Particuliers et entreprises"],
  },
  {
    name: "Déménagement Transport 33",
    city: "Muret",
    rating: 4.3,
    reviews: 3,
    specialties: ["Transport", "Services personnalisés"],
  },
  {
    name: "Transport Gironde",
    city: "Castanet-Tolosan",
    rating: 4.2,
    reviews: 2,
    specialties: ["Transport", "Solutions sur mesure"],
  },
].sort((a, b) => b.reviews - a.reviews);

export default function PartenairesPage() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop"
            alt="Partenaires déménageurs certifiés à toulouse"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/92"></div>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Partenaires", href: "/partenaires/" }
              ]}
            />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 mt-6">
              <span className="text-2xl">🤝</span>
              <span className="text-sm font-medium text-white">Réseau de confiance</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Nos partenaires déménageurs certifiés
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Nous travaillons exclusivement avec des déménageurs locaux certifiés et expérimentés. 
              Chaque partenaire est sélectionné pour sa qualité de service, sa transparence tarifaire et sa connaissance du terrain toulousain.
            </p>
          </div>
        </div>
      </section>

      <div className="container section">
        <Section>
          <PartnersList partners={partners} />
        </Section>

        <Section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            Pourquoi faire confiance à nos partenaires ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card-glass rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#6bcfcf]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Certification qualité</h3>
              <p className="text-white/80">
                Tous nos partenaires sont certifiés et assurés. Nous vérifions régulièrement leur qualité de service.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#6bcfcf]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tarifs transparents</h3>
              <p className="text-white/80">
                Pas de frais cachés, pas de surprises. Nos partenaires s'engagent sur des tarifs clairs et définitifs.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#6bcfcf]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connaissance locale</h3>
              <p className="text-white/80">
                Expertise du terrain toulousain : accès, stationnement, contraintes spécifiques à chaque quartier.
              </p>
            </div>
          </div>
        </Section>

        <CtaPrimary placement="inline" />

        <Section>
          <div className="card-glass rounded-2xl p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Devenir partenaire Moverz
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Vous êtes déménageur à toulouse et souhaitez rejoindre notre réseau ? 
              Bénéficiez de notre technologie IA et de notre visibilité en ligne.
            </p>
            <a 
              href="/contact/" 
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2b7a78] px-5 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
            >
              Devenir partenaire
            </a>
          </div>
        </Section>

      </div>
    </main>
  );
}
