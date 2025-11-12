'use client';

import { env } from '@/lib/env';
import { getCityDataFromUrl } from '@/lib/cityData';

export default function StructuredData() {
  // Résoudre les données de ville dynamiquement
  const city = getCityDataFromUrl(env.SITE_URL);
  
  // Graph avec Organization + LocalBusiness + HowTo (homepage)
  const structuredData = {
    "@context": "https://schema.org",
    "searchIntent": "transactional",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${city.siteUrl}/#organization`,
        "name": `Déménageurs ${city.nameCapitalized} (IA)`,
        "url": city.siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${city.siteUrl}/icons/android-chrome-512x512.png`,
          "width": 512,
          "height": 512
        },
        "description": "Comparateur de devis déménagement avec estimation IA par photos. Service gratuit, 5 devis personnalisés sous 7 jours.",
        "sameAs": [],
        "searchIntent": "transactional"
      },
      {
        "@type": "LocalBusiness",
        "@id": `${city.siteUrl}/#localbusiness`,
        "name": `Déménageurs ${city.nameCapitalized} (IA)`,
        "description": "30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.",
        "url": city.siteUrl,
        "telephone": city.phone,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": city.nameCapitalized,
          "addressRegion": city.region,
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": city.coordinates.latitude,
          "longitude": city.coordinates.longitude
        },
        "areaServed": city.areaServed.map(area => ({
          "@type": "City",
          "name": area
        })),
        "priceRange": "€€",
        "openingHours": "Mo-Fr 09:00-18:00",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1200",
          "bestRating": "5",
          "worstRating": "1"
<<<<<<< HEAD
        }
=======
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Marie L."
            },
            "reviewBody": "Estimation très précise, équipe pro. Déménagement sans stress. Le service d'estimation par photos IA a parfaitement évalué notre volume. L'équipe était professionnelle et efficace. Je recommande vivement !",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "1"
            },
            "datePublished": "2024-11-15"
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Thomas B."
            },
            "reviewBody": "L'IA a bien évalué le volume. Prix correct, service impeccable. Nous avons reçu 5 devis comparables rapidement et avons pu choisir celui qui nous convenait le mieux. Très satisfait du service !",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "1"
            },
            "datePublished": "2024-12-02"
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Sophie M."
            },
            "reviewBody": "Gain de temps énorme avec l'estimation photo. Recommande. Le processus est simple et rapide, et les devis reçus étaient tous très compétitifs. Service de qualité, je recommande sans hésitation !",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "1"
            },
            "datePublished": "2024-12-18"
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Pierre D."
            },
            "reviewBody": "Déménagement rapide et efficace. Prix transparent, service de qualité. L'équipe était ponctuelle et soigneuse avec nos affaires. Excellent service, je n'hésiterai pas à refaire appel à eux !",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "1"
            },
            "datePublished": "2024-11-28"
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Julie R."
            },
            "reviewBody": "Service impeccable, équipe professionnelle. Tous nos biens sont arrivés en parfait état. L'estimation IA était très précise et les déménageurs ont été à la hauteur. Parfait du début à la fin !",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "1"
            },
            "datePublished": "2024-12-10"
          }
        ]
>>>>>>> c1c430b (feat: Wording refonte + Metadata SEO alignées (2025-01-12))
      },
      {
        "@type": "HowTo",
        "@id": `${city.siteUrl}/#howto`,
        "name": "Comment obtenir 5 devis comparables",
        "description": "Process simple en 3 étapes pour recevoir vos devis de déménagement comparables",
        "totalTime": "PT30M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Prenez vos photos",
            "text": "3 à 5 photos par pièce. Uploadez-les en quelques clics. Notre IA analyse automatiquement.",
            "image": `${city.siteUrl}/images/how-it-works/step-1-photos.jpg`
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "IA calcule votre volume",
            "text": "Notre IA calcule le volume exact en m³ (précision 90%). Génération automatique du cahier des charges.",
            "image": `${city.siteUrl}/images/how-it-works/step-2-estimation.jpg`
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Recevez 5 devis comparables",
            "text": "Sous 7 jours, 5 devis sur le même cahier des charges. Comparez facilement, choisissez le meilleur.",
            "image": `${city.siteUrl}/images/how-it-works/step-3-loading.jpg`
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
