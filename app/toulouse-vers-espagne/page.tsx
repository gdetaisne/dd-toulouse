import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Espagne");

const espagneData = {
  destination: "Espagne",
  distance: "200-400 km",
  tempsMoyen: "3h-5h",
  periodeConseillee: "Toute l'année",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "600-900€",
      description: "Déménagement Toulouse → Espagne : 200-400 km, variable. Studio/T1 (10-15 m³) dès 600-900€. Devis gratuit sous 7j. Équipe pro, emballage inclus."
    },
    {
      type: "T2/T3",
      prix: "900-1400€",
      description: "Volume : 20-35 m³"
    },
    {
      type: "Maison",
      prix: "1400-2200€",
      description: "Volume : 40-80 m³"
    }
  ],
  accesArrivee: "L'Espagne présente des défis spécifiques pour les déménagements : contrôles douaniers, réglementations spécifiques, contraintes de circulation selon les villes. Nos partenaires déménageurs connaissent parfaitement les procédures douanières, les créneaux autorisés et les contraintes de circulation espagnoles. Ils s'adaptent aux gabarits de camions selon les destinations et optimisent les horaires pour éviter les embouteillages.",
  conseils: [
    "Anticipez les procédures douanières et les contrôles",
    "Vérifiez les réglementations spécifiques à votre destination",
    "Planifiez les créneaux de livraison avec votre déménageur",
    "Considérez un déménagement en semaine pour éviter les embouteillages",
    "Contrôle gabarit et horaires selon les destinations",
    "Bilbao / San Sebastián, conditions généralement bonnes"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement toulouse → Espagne ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours. Pour les déménagements urgents, certains peuvent se libérer en 48h selon la période et les procédures douanières."
    },
    {
      question: "Comment gérer les contraintes douanières ?",
      answer: "Nos déménageurs connaissent parfaitement les procédures douanières et les réglementations espagnoles. Ils s'occupent de toutes les formalités nécessaires."
    },
    {
      question: "Quels sont les tarifs pour toulouse → Espagne ?",
      answer: "Les tarifs varient selon le volume et la destination espagnole. Comptez 600-900€ pour un studio, 900-1400€ pour un T2/T3, 1400-2200€ pour une maison."
    },
    {
      question: "Peut-on déménager le week-end vers l'Espagne ?",
      answer: "Oui, mais les créneaux sont limités et les tarifs majorés de 20-30%. Il est recommandé de privilégier la semaine pour éviter les embouteillages."
    }
  ]
};

export default function EspagnePage() {
  return <CorridorPage {...espagneData} />;
}
