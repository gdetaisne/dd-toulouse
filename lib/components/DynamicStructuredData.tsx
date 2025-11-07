'use client';

import { usePathname } from 'next/navigation';
import { env } from '@/lib/env';
import { getCityDataFromUrl } from '@/lib/cityData';
import { getCanonicalUrl } from '@/lib/canonical-helper';
import { buildServiceSchema } from '@/lib/schema/service';
import { buildFaqPageSchema } from '@/lib/schema/faq';

/**
 * Composant Client qui injecte dynamiquement les schemas JSON-LD
 * en fonction de l'URL actuelle (détectée via usePathname)
 * 
 * Schemas injectés:
 * - Organization + LocalBusiness (toutes pages)
 * - HowTo (homepage uniquement)
 * - Service + FAQPage (pages /services/demenagement-{type}-{ville}/)
 * - Service (pages corridors /{ville}-vers-{destination}/)
 * - Service (pages quartiers /{ville}/{quartier}/)
 * - Service (page index /services/)
 * - Article (pages blog - future)
 */
export default function DynamicStructuredData() {
  const pathname = usePathname();
  const city = getCityDataFromUrl(env.SITE_URL);

  // 1. Organization + LocalBusiness (toutes pages)
  const graph: any[] = [
    {
      '@type': 'Organization',
      '@id': `${city.siteUrl}/#organization`,
      name: `Déménageurs ${city.nameCapitalized} (IA)`,
      url: city.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${city.siteUrl}/icons/android-chrome-512x512.png`,
        width: 512,
        height: 512,
      },
      description:
        'Comparateur de devis déménagement avec estimation IA par photos. Service gratuit, 5 devis personnalisés sous 7 jours.',
      sameAs: [],
      email: `contact@${new URL(city.siteUrl).hostname}`,
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${city.siteUrl}/#localbusiness`,
      name: `Déménageurs ${city.nameCapitalized} (IA)`,
      description:
        '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
      url: city.siteUrl,
      email: `contact@${new URL(city.siteUrl).hostname}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.nameCapitalized,
        addressRegion: city.region,
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.coordinates.latitude,
        longitude: city.coordinates.longitude,
      },
      areaServed: city.areaServed.map((area) => ({
        '@type': 'City',
        name: area,
      })),
      priceRange: '€€',
    },
  ];

  // 2. HowTo (homepage uniquement)
  if (pathname === '/') {
    graph.push({
      '@type': 'HowTo',
      '@id': `${city.siteUrl}/#howto`,
      name: 'Comment obtenir 5 devis comparables',
      description:
        'Process simple en 3 étapes pour recevoir vos devis de déménagement comparables',
      totalTime: 'PT30M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Prenez vos photos',
          text: '3 à 5 photos par pièce. Uploadez-les en quelques clics. Notre IA analyse automatiquement.',
          image: `${city.siteUrl}/images/how-it-works/step-1-photos.jpg`,
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'IA calcule votre volume',
          text: 'Notre IA calcule le volume exact en m³ (précision 90%). Génération automatique du cahier des charges.',
          image: `${city.siteUrl}/images/how-it-works/step-2-estimation.jpg`,
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Recevez 5 devis comparables',
          text: 'Sous 7 jours, 5 devis sur le même cahier des charges. Comparez facilement, choisissez le meilleur.',
          image: `${city.siteUrl}/images/how-it-works/step-3-loading.jpg`,
        },
      ],
    });
  }

  // 3. Service + FAQPage (pages services individuelles)
  const serviceMatch = pathname?.match(/^\/services\/demenagement-(economique|standard|premium)-/);
  if (serviceMatch) {
    const serviceType = serviceMatch[1];
    const serviceTypeCapitalized =
      serviceType === 'economique'
        ? 'Économique'
        : serviceType === 'standard'
        ? 'Standard'
        : 'Premium';
    const priceRange = serviceType === 'economique' ? '€' : serviceType === 'standard' ? '€€' : '€€€';

    // Service schema
    const serviceSchema = {
      ...buildServiceSchema({
        name: `Déménagement ${serviceTypeCapitalized} ${city.nameCapitalized}`,
        serviceType: `Déménagement ${serviceTypeCapitalized}`,
        url: getCanonicalUrl(`services/demenagement-${serviceType}-${city.slug}`),
        areaServed: [city.nameCapitalized],
        priceRange,
      }),
      provider: {
        '@type': 'Organization',
        '@id': `${city.siteUrl}/#organization`,
        name: `Déménageurs ${city.nameCapitalized} (IA)`,
        url: city.siteUrl,
      },
    };

    // FAQ schemas par type
    const faqData = {
      economique: [
        {
          question: 'Est-ce que je dois préparer mes cartons moi-même ?',
          answer:
            "Oui, dans la formule économique vous préparez vous-même l'emballage. Nous assurons uniquement le transport et le portage. C'est la solution idéale si vous avez le temps de vous organiser.",
        },
        {
          question: 'Puis-je ajouter des services à la carte ?',
          answer:
            "Oui, vous pouvez ajouter des services supplémentaires comme l'emballage, le démontage/remontage de meubles, ou la protection renforcée. Ces options sont facturées en supplément.",
        },
        {
          question: 'Quelle est la différence avec la formule standard ?',
          answer:
            "La formule économique inclut uniquement le transport et le portage. La formule standard ajoute : emballage standard, protection des meubles avec housses, et assurance renforcée. C'est un meilleur rapport qualité-prix si vous voulez un service plus complet.",
        },
      ],
      standard: [
        {
          question: "Est-ce que l'emballage est fourni ?",
          answer:
            'Oui, les cartons standard sont inclus dans la formule. Nous fournissons tous les cartons nécessaires pour emballer vos affaires. Pour les objets très fragiles, nous recommandons la formule premium.',
        },
        {
          question: 'Puis-je ajouter un service "fragile" ?',
          answer:
            "Oui, vous pouvez ajouter des services à la carte comme l'emballage d'objets très fragiles. Ces options sont facturées en supplément. Pour un service complet, nous recommandons la formule premium.",
        },
        {
          question: 'Quelle est la différence avec la formule économique ?',
          answer:
            "La formule standard inclut en plus : protection des meubles avec housses, emballage standard avec cartons fournis, et une assurance renforcée. C'est le meilleur rapport qualité-prix pour un déménagement complet.",
        },
      ],
      premium: [
        {
          question: 'Puis-je ne rien faire moi-même ?',
          answer:
            "Oui, dans la formule premium, nos partenaires gèrent tout : emballage soigné avec matériaux adaptés, démontage/remontage, protection maximale, transport sécurisé, et même l'installation électroménager si vous le souhaitez. Vous n'avez rien à faire.",
        },
        {
          question: 'Que couvre l\'assurance "tous risques" ?',
          answer:
            "L'assurance tous risques couvre tous vos biens pendant le déménagement : casse, vol, perte, dégâts pendant le transport. Objets de valeur inclus (avec déclaration). C'est la protection maximale pour votre tranquillité d'esprit.",
        },
        {
          question: "Quelle est la différence avec la formule standard ?",
          answer:
            "La formule premium ajoute : emballage soigné de tous les objets fragiles, assurance tous risques, matériaux premium (caisses bois piano, housses anti-chocs), installation électroménager, et conciergerie (changements d'adresse). C'est le service le plus complet pour un déménagement sans stress.",
        },
      ],
    };

    const faqSchema = buildFaqPageSchema(
      faqData[serviceType as keyof typeof faqData] || faqData.standard
    );

    // Ajouter les schemas au graph
    graph.push(serviceSchema, faqSchema);
  }

  // 4. Service (page index /services/)
  if (pathname === '/services' || pathname === '/services/') {
    const serviceSchema = {
      ...buildServiceSchema({
        name: `Services Déménagement ${city.nameCapitalized}`,
        serviceType: 'Déménagement',
        url: getCanonicalUrl('services'),
        areaServed: [city.nameCapitalized],
        priceRange: '€-€€€',
      }),
      provider: {
        '@type': 'Organization',
        '@id': `${city.siteUrl}/#organization`,
        name: `Déménageurs ${city.nameCapitalized} (IA)`,
        url: city.siteUrl,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Formules de déménagement',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Déménagement Économique',
              description: 'Pour les budgets serrés',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Déménagement Standard',
              description: 'Le plus populaire',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Déménagement Premium',
              description: 'Service haut de gamme',
            },
          },
        ],
      },
    };
    graph.push(serviceSchema);
  }

  // 5. Service (pages corridors /{ville}-vers-{destination}/)
  const corridorMatch = pathname?.match(new RegExp(`^/${city.slug}-vers-([a-z-]+)/?$`));
  if (corridorMatch) {
    const destination = corridorMatch[1];
    const destinationCapitalized = destination
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const serviceSchema = {
      ...buildServiceSchema({
        name: `Déménagement ${city.nameCapitalized} → ${destinationCapitalized}`,
        serviceType: 'Déménagement Longue Distance',
        url: getCanonicalUrl(`${city.slug}-vers-${destination}`),
        areaServed: [city.nameCapitalized, destinationCapitalized],
        priceRange: '€€€',
      }),
      provider: {
        '@type': 'Organization',
        '@id': `${city.siteUrl}/#organization`,
        name: `Déménageurs ${city.nameCapitalized} (IA)`,
        url: city.siteUrl,
      },
    };
    graph.push(serviceSchema);
  }

  // 6. Service (pages quartiers /{ville}/{quartier}/)
  const quartierMatch = pathname?.match(new RegExp(`^/${city.slug}/([a-z-]+)/?$`));
  if (quartierMatch) {
    const quartierSlug = quartierMatch[1];
    const quartier = city.neighborhoods.find((n) => n.slug === quartierSlug);
    
    if (quartier) {
      const serviceSchema = {
        ...buildServiceSchema({
          name: `Déménagement ${quartier.name} (${city.nameCapitalized})`,
          serviceType: 'Déménagement Local',
          url: getCanonicalUrl(`${city.slug}/${quartierSlug}`),
          areaServed: [quartier.name, city.nameCapitalized],
          priceRange: '€€',
        }),
        provider: {
          '@type': 'Organization',
          '@id': `${city.siteUrl}/#organization`,
          name: `Déménageurs ${city.nameCapitalized} (IA)`,
          url: city.siteUrl,
        },
      };
      graph.push(serviceSchema);
    }
  }

  // Retourner le script JSON-LD
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          searchIntent: 'transactional',
          '@graph': graph,
        }),
      }}
    />
  );
}

