import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("Toulouse", "Toulouse");

const ToulouseData = {
  zone: "Toulouse",
  zoneDisplay: "Toulouse",
  description: "Service professionnel de déménagement dans le centre de Toulouse",
  stats: {
    dossiers: "+120",
    demenageurs: "20",
    delai: "3-5"
  },
  pourquoiMoverz: "Toulouse se classe en tête des villes françaises où il fait bon vivre en famille avec une note de 19/20 selon Le Figaro. Notre équipe d'experts déménageurs connaît parfaitement les spécificités de la ville : rues étroites du centre historique, contraintes de stationnement, immeubles anciens avec escaliers. Nous vous accompagnons dans votre projet de déménagement avec des déménageurs locaux certifiés qui maîtrisent les accès et les particularités de chaque quartier toulousain.",
  accesStationnement: "Toulouse présente des défis spécifiques pour les déménagements : rues étroites dans le centre historique, stationnement limité, immeubles anciens avec escaliers. Nos partenaires déménageurs connaissent parfaitement les créneaux autorisés, les zones de déchargement et les contraintes de circulation. Ils s'adaptent aux gabarits de camions selon les rues et optimisent les horaires pour éviter les embouteillages.",
  destinationsFrequentes: [
    {
      href: "/toulouse-vers-paris",
      title: "Toulouse → Paris",
      description: "Flux régulier, accès livraison à anticiper (créneaux)."
    },
    {
      href: "/toulouse-vers-lyon",
      title: "Toulouse → Lyon",
      description: "Longue distance, optimisation du volume recommandée."
    },
    {
      href: "/toulouse-vers-marseille",
      title: "Toulouse → Marseille",
      description: "Axe fréquent, stationnement à l'arrivée à planifier."
    },
    {
      href: "/toulouse-vers-nantes",
      title: "Toulouse → Nantes",
      description: "Accès centre-ville selon zones, créneau conseillé."
    }
  ],
  partenaires: [
    {
      name: "Déménageur Toulouse",
      rating: 4.8,
      reviews: 69,
      specialties: ["Déménagements particuliers", "Déménagements professionnels"]
    },
    {
      name: "Atlantique Toulouse Déménagements",
      rating: 4.5,
      reviews: 66,
      specialties: ["Garde-meuble", "Stockage d'archives"]
    },
    {
      name: "Alex Déménagement",
      rating: 4.7,
      reviews: 45,
      specialties: ["Déménagements express", "Emballage professionnel"]
    },
    {
      name: "SAM'DÉMÉNAGE",
      rating: 4.6,
      reviews: 28,
      specialties: ["Déménagements efficaces", "Équipe bienveillante"]
    },
    {
      name: "Burdigala Déménagement",
      rating: 4.3,
      reviews: 6,
      specialties: ["Déménagements locaux", "Services adaptés"]
    },
    {
      name: "Larnaudie Déménagements",
      rating: 4.7,
      reviews: 5,
      specialties: ["Déménagements familiaux", "Garde-meuble"]
    }
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement à Toulouse ?",
      answer: "Nos partenaires déménageurs à Toulouse peuvent généralement intervenir sous 7 jours. Pour les déménagements urgents, certains peuvent se libérer en 48h selon la période."
    },
    {
      question: "Comment se déroule l'accès au logement à Toulouse ?",
      answer: "Nos déménageurs connaissent parfaitement les contraintes toulousaines : rues étroites, stationnement limité, immeubles anciens. Ils s'adaptent aux créneaux autorisés et optimisent les horaires."
    },
    {
      question: "Quels sont les tarifs pour un déménagement à Toulouse ?",
      answer: "Les tarifs varient selon le volume, la distance et les contraintes d'accès. Comptez 300-500€ pour un studio, 500-800€ pour un T2/T3, 800-1500€ pour une maison."
    },
    {
      question: "Les déménageurs sont-ils assurés ?",
      answer: "Tous nos partenaires déménageurs à Toulouse sont certifiés et assurés. Nous vérifions régulièrement leur couverture d'assurance et leur qualité de service."
    },
    {
      question: "Peut-on déménager le week-end à Toulouse ?",
      answer: "Oui, la plupart de nos partenaires proposent des créneaux week-end. Les tarifs peuvent être majorés de 20-30% selon les prestations."
    },
    {
      question: "Comment préparer mon déménagement à Toulouse ?",
      answer: "Préparez votre inventaire en ligne en 30 minutes. Nos déménageurs vous conseilleront sur l'emballage, les créneaux optimaux et les contraintes spécifiques à votre quartier."
    }
  ]
};

export default function ToulousePage() {
  return <LocalPage {...ToulouseData} />;
}