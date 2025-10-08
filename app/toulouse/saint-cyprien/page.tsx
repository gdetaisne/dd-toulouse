import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Saint-Cyprien (Toulouse) | Devis gratuit & IA`,
  description: `Déménagement à Saint-Cyprien (Toulouse). Quartier populaire de Toulouse, rive gauche de la Garonne. Mixité sociale et accès varié. Accès: Rues normales, parkings de rue, mixité ancien/moderne. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Saint-Cyprien Toulouse, déménageurs Toulouse, devis déménagement Toulouse, Rues normales, parkings de rue, mixité ancien/moderne`,
};

const toulouseSaintCyprienData = {
  zone: "saint-cyprien",
  zoneDisplay: "Saint-Cyprien",
  description: `Quartier populaire de Toulouse, rive gauche de la Garonne. Mixité sociale et accès varié.`,
  coverImage: "/images/quartiers/toulouse/saint-cyprien.jpg",
  accessInfo: "Rues normales, parkings de rue, mixité ancien/moderne",
  pricing: {
    studio: { min: 800, max: 1200 },
    t2: { min: 1200, max: 1800 },
    t3: { min: 1800, max: 2500 },
    t4: { min: 2500, max: 3500 },
    t5: { min: 3500, max: 4500 }
  },
  destinations: [
    { name: "Toulouse intra-muros", slug: "toulouse" },
    { name: "Paris", slug: "paris" },
    { name: "Lyon", slug: "lyon" },
    { name: "Toulouse", slug: "toulouse" },
    { name: "France entière", slug: "france" }
  ],
  partners: [
    {
      name: "Déménageur Toulouse",
      rating: 4.8,
      reviews: 69,
      specialties: ["Déménagements locaux", "Gestion des contraintes d'accès"]
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
      specialties: ["Déménagements économiques", "Service personnalisé"]
    }
  ]
};

export default function ToulouseSaintCyprienPage() {
  return <LocalPage data={toulouseSaintCyprienData} />;
}
