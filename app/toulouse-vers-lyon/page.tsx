import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Lyon");

const lyonData = {
  destination: "Lyon",
  distance: "550 km",
  tempsMoyen: "6h00",
  periodeConseillee: "Avril-Oct",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "750-1100€",
      description: "Déménagement toulouse → Lyon : 550 km, 5h30. Studio/T1 (10-15 m³) dès 750-1100€. Devis gratuit sous 7j. Équipe pro, emballage inclus."
    },
    {
      type: "T2/T3",
      prix: "1100-1700€",
      description: "Volume : 20-35 m³"
    },
    {
      type: "Maison",
      prix: "1700-2800€",
      description: "Volume : 40-80 m³"
    }
  ],
  accesArrivee: "Lyon présente des défis spécifiques pour les déménagements : rues étroites dans le centre historique, stationnement limité, immeubles anciens avec escaliers, contraintes de circulation. Nos partenaires déménageurs connaissent parfaitement les créneaux autorisés, les zones de déchargement et les contraintes de circulation lyonnaises. Ils s'adaptent aux gabarits de camions selon les arrondissements et optimisent les horaires pour éviter les embouteillages.",
  conseils: [
    "Anticipez les créneaux de livraison lyonnais (généralement 8h-12h et 14h-18h)",
    "Prévoyez des protections renforcées pour les objets fragiles (trajet long)",
    "Vérifiez les contraintes d'accès de votre nouvel arrondissement",
    "Planifiez le stationnement temporaire avec votre déménageur",
    "Considérez un déménagement en semaine pour éviter les embouteillages",
    "Optimisez le volume de vos affaires (longue distance)"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement toulouse → Lyon ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours. Pour les déménagements urgents, certains peuvent se libérer en 48h selon la période."
    },
    {
      question: "Comment gérer les contraintes lyonnaises ?",
      answer: "Nos déménageurs connaissent parfaitement les contraintes lyonnaises : créneaux autorisés, zones de déchargement, contraintes de circulation. Ils s'adaptent aux spécificités de chaque arrondissement."
    },
    {
      question: "Quels sont les tarifs pour toulouse → Lyon ?",
      answer: "Les tarifs varient selon le volume et les contraintes d'accès lyonnaises. Comptez 750-1100€ pour un studio, 1100-1700€ pour un T2/T3, 1700-2800€ pour une maison."
    },
    {
      question: "Peut-on déménager le week-end vers Lyon ?",
      answer: "Oui, mais les créneaux sont limités et les tarifs majorés de 20-30%. Il est recommandé de privilégier la semaine pour éviter les embouteillages."
    }
  ]
};

export default function LyonPage() {
  return <CorridorPage {...lyonData} />;
}
