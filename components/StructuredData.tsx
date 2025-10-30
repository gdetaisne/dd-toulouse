'use client';

import { env } from '@/lib/env';
import { getCityDataFromUrl } from '@/lib/cityData';

export default function StructuredData() {
  // Résoudre les données de ville dynamiquement
  const city = getCityDataFromUrl(env.SITE_URL);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Comparateur de devis déménagement",
        "name": `Devis Déménageur ${city.nameCapitalized}`,
        "description": "Service gratuit de comparaison de devis déménagement avec estimation IA par photos.",
        "provider": {
          "@type": "Organization",
          "name": `Devis Déménageur ${city.nameCapitalized}`,
          "url": city.siteUrl
        },
        "areaServed": {
          "@type": "City",
          "name": city.nameCapitalized
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
          "description": "Service 100% gratuit pour les particuliers"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Le service est-il vraiment gratuit ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, 100% gratuit pour les particuliers sans limite de volume ou de distance. Aucun frais caché. Nous sommes rémunérés par les déménageurs partenaires directement."
            }
          },
          {
            "@type": "Question",
            "name": "Combien de temps pour recevoir les devis ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "3 à 7 jours maximum. Vous recevez une estimation IA immédiate en 30 minutes. Puis nous collectons 10 à 15 devis de déménageurs sur la base de votre demande. Nous pré-sélectionnons les devis qui nous paraissent les plus pertinents sur la base du service, du prix mais également de la qualité du déménageur, sa réputation en ligne, sa fiabilité financière, etc. Enfin, sous 7 jours, nous vous soumettons les 3 à 5 meilleurs candidats."
            }
          },
          {
            "@type": "Question",
            "name": "L'estimation par photos est-elle fiable ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Notre IA a une précision de 90%. Prenez 3 à 5 photos par pièce, et l'algorithme calcule automatiquement le volume en m³. Vous pouvez tester notre application gratuitement et sans engagement dès maintenant."
            }
          },
          {
            "@type": "Question",
            "name": `Quelles zones de ${city.nameCapitalized} sont couvertes ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Toute la ville de ${city.nameCapitalized} et ses environs${city.topNeighborhoods ? ' (' + city.topNeighborhoods.join(', ') + '...)' : ''}. Point de départ à ${city.nameCapitalized}, destination n'importe où en France.`
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
