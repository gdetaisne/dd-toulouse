import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Capitole (Toulouse) | Devis gratuit & IA`,
  description: `Déménagement à Capitole (Toulouse). Cœur historique de Toulouse, place du Capitole et patrimoine rose. Rues commerçantes et accès délicat. Accès: Rues commerçantes, circulation limitée, parkings payants, escaliers anciens. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Capitole Toulouse, déménageurs Toulouse, devis déménagement Toulouse, Rues commerçantes, circulation limitée, parkings payants, escaliers anciens`,
};

const toulouseCapitoleData = {
  zone: "capitole",
  zoneDisplay: "Capitole",
  description: `Cœur historique de Toulouse, place du Capitole et patrimoine rose. Rues commerçantes et accès délicat.`,
  coverImage: "/images/quartiers/toulouse/capitole.jpg",
  accessInfo: "Rues commerçantes, circulation limitée, parkings payants, escaliers anciens",
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

export default function ToulouseCapitolePage() {
  return <LocalPage {...toulouseCapitoleData} />;
}
