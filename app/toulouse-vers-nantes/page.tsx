import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Nantes");

const nantesData = {
  destination: "Nantes",
  distance: "350 km",
  tempsMoyen: "3h30",
  periodeConseillee: "Toute l'année",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "500-750€",
      description: "Volume : 10-15 m³"
    },
    {
      type: "T2/T3",
      prix: "750-1100€",
      description: "Volume : 20-35 m³"
    },
    {
      type: "Maison",
      prix: "1100-1800€",
      description: "Volume : 40-80 m³"
    }
  ],
  accesArrivee: "Nantes présente des défis spécifiques pour les déménagements : rues étroites dans le centre historique, stationnement limité, immeubles anciens avec escaliers, contraintes de circulation. Nos partenaires déménageurs connaissent parfaitement les créneaux autorisés, les zones de déchargement et les contraintes de circulation nantaises. Ils s'adaptent aux gabarits de camions selon les quartiers et optimisent les horaires pour éviter les embouteillages.",
  conseils: [
    "Anticipez les créneaux de livraison nantais (généralement 8h-12h et 14h-18h)",
    "Vérifiez les contraintes d'accès de votre nouveau quartier",
    "Planifiez le stationnement temporaire avec votre déménageur",
    "Considérez un déménagement en semaine pour éviter les embouteillages",
    "Accès centre-ville selon zones, créneau conseillé",
    "Prévoyez des protections pour les objets fragiles"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement toulouse → Nantes ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours. Pour les déménagements urgents, certains peuvent se libérer en 48h selon la période."
    },
    {
      question: "Comment gérer les contraintes nantaises ?",
      answer: "Nos déménageurs connaissent parfaitement les contraintes nantaises : créneaux autorisés, zones de déchargement, contraintes de circulation. Ils s'adaptent aux spécificités de chaque quartier."
    },
    {
      question: "Quels sont les tarifs pour toulouse → Nantes ?",
      answer: "Les tarifs varient selon le volume et les contraintes d'accès nantaises. Comptez 500-750€ pour un studio, 750-1100€ pour un T2/T3, 1100-1800€ pour une maison."
    },
    {
      question: "Peut-on déménager le week-end vers Nantes ?",
      answer: "Oui, les créneaux sont généralement disponibles et les tarifs majorés de 15-20%. L'accès centre-ville varie selon les zones."
    }
  ]
};

export default function NantesPage() {
  return <CorridorPage {...nantesData} />;
}
