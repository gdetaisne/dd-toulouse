import { CityData, getCityData, getCityDataFromUrl } from './cityData';

export type ReviewProfile = {
  author: string;
  role: string;
  rating: number;
  summary: string;
  body: string;
};

const reviewProfiles: Record<string, ReviewProfile[]> = {
  marseille: [
    {
      author: 'Julie — 42 m², Vieux-Port',
      role: 'Consultante',
      rating: 4.9,
      summary: '5 devis comparables sous 5 jours',
      body: "J'ai reçu cinq devis alignés sur le même cahier des charges, sans un seul appel intrusif. La plateforme a bouclé mon dossier en 30 minutes et j'ai pu comparer sereinement."
    },
    {
      author: 'Nicolas — Prado',
      role: 'Ingénieur',
      rating: 4.8,
      summary: 'Dossier anonyme, pros vraiment filtrés',
      body: "Le dossier anonyme a évité les appels commerciaux. Les déménageurs shortlistés avaient tous un score financier irréprochable et des tarifs cohérents."
    },
    {
      author: 'Karima — Euromed',
      role: 'Responsable RH',
      rating: 5,
      summary: 'Process ultra rapide',
      body: "J'ai juste pris des photos de mon T3. Le dossier a estimé le volume, et j'ai reçu 5 devis fiables pile sur mes contraintes en moins d'une semaine."
    }
  ],
  nice: [
    {
      author: "Axel — Carré d'Or",
      role: 'Product manager',
      rating: 4.9,
      summary: 'Comparaison limpide des offres',
      body: "Les 5 devis reçus étaient structurés exactement pareil. Impossible de me tromper sur les options ou les prix, même pour un déménagement express vers Paris."
    },
    {
      author: 'Sophie — Fabron',
      role: 'Avocate',
      rating: 4.8,
      summary: 'Zéro démarchage téléphonique',
      body: "Grâce au dossier anonyme, aucun déménageur ne m'a appelée en direct. Je garde le contrôle et je choisis quand je veux rappeler."
    },
    {
      author: 'Laura — Cimiez',
      role: 'Coach sportive',
      rating: 5,
      summary: 'Estimation de volume très précise',
      body: "J'ai téléchargé 10 photos depuis mon mobile. L'estimation fournie m'a donné 38 m³ et chaque devis proposait la bonne taille de camion du premier coup."
    }
  ],
  lyon: [
    {
      author: 'Théo — Confluence',
      role: 'Entrepreneur',
      rating: 4.9,
      summary: 'Devis comparables sur la même base',
      body: "Les 5 propositions reçues utilisaient toutes le même cahier des charges, donc comparer les options premium a été un jeu d'enfant."
    },
    {
      author: 'Émilie — Croix-Rousse',
      role: 'Chargée de communication',
      rating: 4.8,
      summary: 'Dossier anonyme rassurant',
      body: "Pas de chasse aux numéros de téléphone : Moverz filtre pour moi et ne remonte que des déménageurs vérifiés."
    },
    {
      author: 'Antoine — Monplaisir',
      role: 'Consultant IT',
      rating: 5,
      summary: 'Volumétrie précise en 30 minutes',
      body: "La collecte photo sur mobile a pris 20 minutes. En retour, j'ai reçu 5 devis fiables, avec la liste exacte des prestations incluses."
    }
  ],
  toulouse: [
    {
      author: 'Sara — Saint-Cyprien',
      role: 'UX designer',
      rating: 4.9,
      summary: 'Comparaison claire des formules',
      body: "Les devis reçus étaient alignés sur le même dossier. J'ai choisi la formule standard en confiance."
    },
    {
      author: 'Julien — Capitole',
      role: 'Chef de projet',
      rating: 4.8,
      summary: 'Aucun appel intempestif',
      body: "Je gérais un planning serré : le dossier anonyme m'a évité les sollicitations. Je relance quand je veux."
    },
    {
      author: 'Clara — Purpan',
      role: 'Infirmière',
      rating: 5,
      summary: 'Des pros contrôlés',
      body: "Moverz ne m'a proposé que des déménageurs vérifiés, avec avis clients et assurances à jour. Très rassurant pour mon déménagement vers Nantes."
    }
  ],
  bordeaux: [
    {
      author: 'Hugo — Chartrons',
      role: 'Designer',
      rating: 4.9,
      summary: '5 devis alignés sur mon cahier des charges',
      body: "Je voulais comparer prix et options pour un volume de 52 m³. Les 5 devis étaient lisibles et comparables ligne par ligne."
    },
    {
      author: 'Jeanne — Bastide',
      role: 'Professeure',
      rating: 4.8,
      summary: 'Process anonyme très confortable',
      body: "Aucun démarchage. Je décide des contacts et je maintiens la relation par écrit jusqu'au choix final."
    },
    {
      author: 'Marc — Caudéran',
      role: 'Responsable supply chain',
      rating: 5,
      summary: 'Estimation bluffante',
      body: "Les photos ont suffi pour dimensionner mon déménagement Bordeaux vers Lyon. Les pros proposés étaient déjà briefés."
    }
  ],
  lille: [
    {
      author: 'Élise — Wazemmes',
      role: 'Cheffe de produit',
      rating: 4.9,
      summary: 'Comparaison en quelques minutes',
      body: "La plateforme synthétise les 5 devis avec les mêmes rubriques. On voit tout de suite qui est le plus pertinent."
    },
    {
      author: 'Baptiste — Euralille',
      role: 'Consultant finance',
      rating: 4.8,
      summary: 'Pas de harcèlement commercial',
      body: "Je craignais les coups de fil en cascade. Le dossier anonyme me protège et je ne suis contacté qu'après mon accord."
    },
    {
      author: 'Myriam — Vieux-Lille',
      role: 'Juriste',
      rating: 5,
      summary: 'Pros triés sur le volet',
      body: "Moverz ne sélectionne que des déménageurs audités. Résultat : devis fiables et planning respecté jusqu'à l'arrivée à Paris."
    }
  ],
  strasbourg: [
    {
      author: 'Pierre — Krutenau',
      role: 'Chef de projet digital',
      rating: 4.9,
      summary: 'Devis comparables tout de suite',
      body: "Les 5 propositions étaient structurées pareil, avec le même volume estimé à partir de mon dossier. J'ai pu arbitrer rapidement."
    },
    {
      author: 'Claire — Neudorf',
      role: 'Pharmacienne',
      rating: 4.8,
      summary: 'Dossier anonyme rassurant',
      body: "Aucun prestataire ne m'a appelée sans mon accord. Je garde la main sur le choix et le timing."
    },
    {
      author: 'Florian — Robertsau',
      role: 'Ingénieur qualité',
      rating: 5,
      summary: 'Sélection fiable',
      body: "Les déménageurs proposés affichaient assurances et notes vérifiées. Très pro pour mon départ vers Zurich."
    }
  ],
  rennes: [
    {
      author: 'Agathe — Thabor',
      role: 'Responsable marketing',
      rating: 4.9,
      summary: 'Comparaison claire des offres',
      body: "Les 5 devis suivent le même cahier des charges. Je compare les options premium facilement."
    },
    {
      author: 'Romain — Saint-Hélier',
      role: 'Consultant data',
      rating: 4.8,
      summary: 'Fin du démarchage agressif',
      body: "Le dossier anonyme me laisse choisir quand je souhaite échanger. Fini les relances non sollicitées."
    },
    {
      author: 'Camille — Beaulieu',
      role: 'Enseignante',
      rating: 5,
      summary: 'Process efficace',
      body: "En 30 minutes j'ai obtenu un volume précis, et les devis reçus étaient parfaitement adaptés à mon trajet Rennes - Brest."
    }
  ],
  rouen: [
    {
      author: 'Manon — Vieux-Marché',
      role: 'Architecte',
      rating: 4.9,
      summary: '5 devis vraiment comparables',
      body: "Chaque devis reprend les mêmes lignes tarifaires, donc je compare facilement prix et options."
    },
    {
      author: 'Guillaume — Mont-Saint-Aignan',
      role: 'Chef de chantier',
      rating: 4.8,
      summary: 'Aucun appel non sollicité',
      body: "Le dossier anonyme filtre les commerçants. Je garde un canal unique jusqu'à ma décision."
    },
    {
      author: 'Aïcha — Saint-Sever',
      role: 'Responsable logistique',
      rating: 5,
      summary: 'Pros vérifiés',
      body: "Les déménageurs proposés avaient tous des assurances à jour et de vraies références. Très rassurant pour un départ vers Lille."
    }
  ],
  nantes: [
    {
      author: 'Léa — Île de Nantes',
      role: 'UX researcher',
      rating: 4.9,
      summary: 'Comparaison instantanée des devis',
      body: "Les 5 propositions alignées sur le même cahier des charges m'ont permis de choisir une formule premium sans stress."
    },
    {
      author: 'Vincent — Talensac',
      role: 'Chef de cuisine',
      rating: 4.8,
      summary: 'Dossier anonyme = tranquillité',
      body: "Je déteste le démarchage. Là, je contacte les pros uniquement quand je suis prêt."
    },
    {
      author: 'Julie — Trentemoult',
      role: 'Photographe',
      rating: 5,
      summary: 'Plateforme ultra pratique',
      body: "Mes photos envoyées sur mobile ont suffi. Les déménageurs avaient tous préparé un devis précis et adapté."
    }
  ],
  montpellier: [
    {
      author: 'Chloé — Beaux-Arts',
      role: 'Freelance',
      rating: 4.9,
      summary: '5 devis calibrés sur mon volume',
      body: "Le dossier a estimé 34 m³, et les 5 devis reçus respectaient exactement ce volume. Choix facile."
    },
    {
      author: 'Paul — Antigone',
      role: 'Responsable commercial',
      rating: 4.8,
      summary: 'Zéro démarchage',
      body: "Le dossier anonyme me laisse gérer les échanges. Aucun appel intrusif, même en haute saison."
    },
    {
      author: 'Inès — Port Marianne',
      role: 'Cheffe de projet immobilier',
      rating: 5,
      summary: 'Pros triés',
      body: "Moverz vérifie les déménageurs. Résultat : devis fiables, planning tenu pour mon transfert vers Toulouse."
    }
  ]
};

const DEFAULT_RATING = 4.9;

function buildFallbackReviews(city: CityData): ReviewProfile[] {
  const neighborhoods = city.neighborhoods.map((neighborhood) => neighborhood.name);
  const pickNeighborhood = (index: number) => neighborhoods[index] ?? city.nameCapitalized;

  return [
    {
      author: `${city.nameCapitalized} — ${pickNeighborhood(0)}`,
      role: 'Utilisateur Moverz',
      rating: 4.9,
      summary: '5 devis comparables, zéro stress',
      body: `Les 5 devis reçus suivaient le même cahier des charges. Comparer les options pour ${city.nameCapitalized} devient simple.`
    },
    {
      author: `${city.nameCapitalized} — ${pickNeighborhood(1)}`,
      role: 'Client satisfait',
      rating: 4.8,
      summary: 'Dossier anonyme et pros contrôlés',
      body: `Le dossier anonyme évite les appels intrusifs. Moverz ne propose que des déménageurs vérifiés pour ${city.nameCapitalized}.`
    },
    {
      author: `${city.nameCapitalized} — ${pickNeighborhood(2)}`,
      role: 'Utilisateur',
      rating: 5,
      summary: 'Estimation volume en 30 minutes',
      body: `Quelques photos suffisent pour calculer le volume. Les devis reçus sont fiables et adaptés à ${city.nameCapitalized}.`
    }
  ];
}

export function getReviewsForCity(city: CityData, limit = 3): ReviewProfile[] {
  const list = reviewProfiles[city.slug] ?? buildFallbackReviews(city);
  return list.slice(0, limit);
}

export function getReviewsForSiteUrl(siteUrl: string, limit = 3): ReviewProfile[] {
  const city = getCityDataFromUrl(siteUrl);
  return getReviewsForCity(city, limit);
}

export function getReviewsForCitySlug(slug: string, limit = 3): ReviewProfile[] {
  const city = getCityData(slug);
  return getReviewsForCity(city, limit);
}

export function getAverageRating(reviews: ReviewProfile[]): number {
  if (!reviews.length) return DEFAULT_RATING;
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  return Number(average.toFixed(1));
}

export function getAverageRatingForCity(city: CityData): number {
  return getAverageRating(getReviewsForCity(city));
}

export function getAverageRatingForSiteUrl(siteUrl: string): number {
  return getAverageRating(getReviewsForSiteUrl(siteUrl));
}

export function getReviewProfiles(): Record<string, ReviewProfile[]> {
  return reviewProfiles;
}
