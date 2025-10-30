import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Marseille");

const marseilleData = {
  destination: "Marseille",
  distance: "650 km",
  tempsMoyen: "7h00",
  periodeConseillee: "Avril-Oct",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "900-1300€",
      description: "Déménagement toulouse → Marseille : 660 km, 7h00. Studio/T1 (10-15 m³) dès 900-1300€. Devis gratuit sous 7j. Équipe pro, emballage inclus."
    },
    {
      type: "T2/T3",
      prix: "1300-2000€",
      description: "Volume : 20-35 m³"
    },
    {
      type: "Maison",
      prix: "2000-3200€",
      description: "Volume : 40-80 m³"
    }
  ],
  accesArrivee: "Marseille présente des défis spécifiques pour les déménagements : rues étroites dans le centre historique, stationnement limité, immeubles anciens avec escaliers, contraintes de circulation. Nos partenaires déménageurs connaissent parfaitement les créneaux autorisés, les zones de déchargement et les contraintes de circulation marseillaises. Ils s'adaptent aux gabarits de camions selon les arrondissements et optimisent les horaires pour éviter les embouteillages.",
  conseils: [
    "Anticipez les créneaux de livraison marseillais (généralement 8h-12h et 14h-18h)",
    "Prévoyez des protections renforcées pour les objets fragiles (trajet long)",
    "Vérifiez les contraintes d'accès de votre nouvel arrondissement",
    "Planifiez le stationnement temporaire avec votre déménageur",
    "Considérez un déménagement en semaine pour éviter les embouteillages",
    "Trajets longs, prévoir protections renforcées"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement toulouse → Marseille ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours. Pour les déménagements urgents, certains peuvent se libérer en 48h selon la période."
    },
    {
      question: "Comment gérer les contraintes marseillaises ?",
      answer: "Nos déménageurs connaissent parfaitement les contraintes marseillaises : créneaux autorisés, zones de déchargement, contraintes de circulation. Ils s'adaptent aux spécificités de chaque arrondissement."
    },
    {
      question: "Quels sont les tarifs pour toulouse → Marseille ?",
      answer: "Les tarifs varient selon le volume et les contraintes d'accès marseillaises. Comptez 900-1300€ pour un studio, 1300-2000€ pour un T2/T3, 2000-3200€ pour une maison."
    },
    {
      question: "Peut-on déménager le week-end vers Marseille ?",
      answer: "Oui, mais les créneaux sont limités et les tarifs majorés de 20-30%. Il est recommandé de privilégier la semaine pour éviter les embouteillages."
    }
  ]
};

export default function MarseillePage() {
  return <CorridorPage {...marseilleData} />;
}
