import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Paris");

const parisData = {
  destination: "Paris",
  distance: "580 km",
  tempsMoyen: "6h30",
  periodeConseillee: "Mai-Sept",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "800-1200€",
      description: "Déménagement toulouse → Paris : 580 km, 6h00. Studio/T1 (10-15 m³) dès 800-1200€. Devis gratuit sous 7j. Équipe pro, emballage inclus."
    },
    {
      type: "T2/T3",
      prix: "1200-1800€",
      description: "Volume : 20-35 m³"
    },
    {
      type: "Maison",
      prix: "1800-3000€",
      description: "Volume : 40-80 m³"
    }
  ],
  accesArrivee: "Paris présente des défis spécifiques pour les déménagements : rues étroites, stationnement limité, immeubles anciens avec escaliers, contraintes de circulation. Nos partenaires déménageurs connaissent parfaitement les créneaux autorisés, les zones de déchargement et les contraintes de circulation parisiennes. Ils s'adaptent aux gabarits de camions selon les arrondissements et optimisent les horaires pour éviter les embouteillages.",
  conseils: [
    "Anticipez les créneaux de livraison parisiens (généralement 8h-12h et 14h-18h)",
    "Prévoyez des protections renforcées pour les objets fragiles (trajet long)",
    "Vérifiez les contraintes d'accès de votre nouvel arrondissement",
    "Planifiez le stationnement temporaire avec votre déménageur",
    "Préparez les autorisations de stationnement si nécessaire",
    "Considérez un déménagement en semaine pour éviter les embouteillages"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement toulouse → Paris ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours. Pour les déménagements urgents, certains peuvent se libérer en 48h selon la période."
    },
    {
      question: "Comment gérer les contraintes parisiennes ?",
      answer: "Nos déménageurs connaissent parfaitement les contraintes parisiennes : créneaux autorisés, zones de déchargement, contraintes de circulation. Ils s'adaptent aux spécificités de chaque arrondissement."
    },
    {
      question: "Quels sont les tarifs pour toulouse → Paris ?",
      answer: "Les tarifs varient selon le volume et les contraintes d'accès parisiennes. Comptez 800-1200€ pour un studio, 1200-1800€ pour un T2/T3, 1800-3000€ pour une maison."
    },
    {
      question: "Peut-on déménager le week-end vers Paris ?",
      answer: "Oui, mais les créneaux sont limités et les tarifs majorés de 20-30%. Il est recommandé de privilégier la semaine pour éviter les embouteillages."
    }
  ]
};

export default function ParisPage() {
  return <CorridorPage {...parisData} />;
}
