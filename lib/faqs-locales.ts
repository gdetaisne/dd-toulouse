/**
 * FAQ locales par ville pour pages money
 * 
 * Source: Extraction contenus existants (blog satellites, guides piliers)
 * RÈGLE: Zéro invention, reprendre Q/R déjà rédigées et sourcées
 * 
 * Critères sélection:
 * - Questions universelles "prix", "délais", "devis gratuit", "process"
 * - Réponses courtes adaptées page money (vs FAQ détaillées blog)
 * - Données chiffrées locales (prix ville, quartiers, acteurs)
 */

export interface LocalFAQ {
  question: string;
  answer: string;
  source: string; // Article source
}

/**
 * FAQ Nice (source: prix-demenagement-nice-guide.md)
 */
export const FAQ_NICE: LocalFAQ[] = [
  {
    question: "Quel est le prix moyen d'un déménagement à Nice ?",
    answer: "Le prix moyen varie selon le logement : Studio 450-1000€, T2 750-1600€, T3 1250-2500€, T4 1850-3800€. Ces fourchettes correspondent à un déménagement local Nice (<10 km) en formule économique ou standard. Ajoutez +20-30% pour formule complète, +200-400€ si monte-meubles nécessaire, +15-25% en haute saison (juin-septembre).",
    source: "content/nice/blog/prix-demenagement-nice/prix-demenagement-nice-guide.md (ligne 404-406)"
  },
  {
    question: "Comment est calculé le prix d'un déménagement à Nice ?",
    answer: "Le calcul se base sur plusieurs critères : Volume (m³) - facteur principal, Distance (local/régional/national), Formule (économique/standard/complète), Accessibilité (étages, monte-meubles, accès difficile), Période (haute/basse saison, week-end/semaine), Services additionnels (emballage, démontage, assurance, stockage). Un déménageur sérieux vient sur place pour un calcul précis.",
    source: "content/nice/blog/prix-demenagement-nice/prix-demenagement-nice-guide.md (ligne 408-410)"
  },
  {
    question: "Le devis est-il gratuit et sans engagement à Nice ?",
    answer: "Oui, chez tous les déménageurs professionnels sérieux, la visite technique et le devis sont gratuits et sans engagement. Le déménageur se déplace chez vous à Nice, évalue le volume et les contraintes, répond à vos questions, et vous remet un devis détaillé. Vous n'êtes jamais obligé d'accepter. Méfiez-vous des déménageurs qui facturent le devis (signe d'amateurisme).",
    source: "content/nice/blog/prix-demenagement-nice/prix-demenagement-nice-guide.md (ligne 412-414)"
  },
  {
    question: "Peut-on négocier le prix avec un déménageur à Nice ?",
    answer: "Oui, la négociation est possible si vous êtes flexible sur la date (créneau libre à tarif réduit), en basse saison (octobre-avril, demande faible), si vous avez plusieurs devis à comparer, ou pour un déménagement groupé. Réduction généralement de 10-20% maximum. Ne négociez jamais au détriment de la qualité (assurance, professionnalisme).",
    source: "content/nice/blog/prix-demenagement-nice/prix-demenagement-nice-guide.md (ligne 416-418)"
  },
];

/**
 * FAQ Lyon (source: faq-demenagement-economique-lyon.md)
 */
export const FAQ_LYON: LocalFAQ[] = [
  {
    question: "Quel est le prix minimum d'un déménagement à Lyon ?",
    answer: "Le prix minimum pour un déménagement économique à Lyon en 2025 est de 400-500€ pour un studio/T1 avec formule économique (transport uniquement, emballage par vos soins). Un T2/T3 coûte 700-900€ en formule éco, contre 1200€ en standard (économie 30-40%). Pour un studio depuis la Guillotière vers Villeurbanne (quartiers faciles d'accès), comptez 450-550€ avec un déménageur économique.",
    source: "content/lyon/blog/satellites/faq-demenagement-economique-lyon.md (ligne 26-30)"
  },
  {
    question: "Combien coûte un déménagement T2 à Lyon ?",
    answer: "Un T2 (30-40m³) coûte 700-900€ en formule économique (vous emballez, déménageur transporte) et 1200-1400€ en formule standard (tout inclus emballage). L'écart de 400-500€ justifie le choix de la formule économique si vous disposez de 2-3 jours pour emballer. Exemple : T2 Monplaisir → Villeurbanne = 920€ formule éco en septembre 2025.",
    source: "content/lyon/blog/satellites/faq-demenagement-economique-lyon.md (ligne 34-38)"
  },
  {
    question: "Quels quartiers de Lyon sont les plus chers pour déménager ?",
    answer: "Le Vieux-Lyon (5ème) est le quartier le plus cher (+30-50% vs moyenne) en raison des rues médiévales étroites (1,5-2m) nécessitant portage manuel. Les Pentes de la Croix-Rousse affichent +15-25% (monte-meuble obligatoire). À l'inverse, Monplaisir, Villeurbanne et Vaise offrent tarifs standards voire -5-10% grâce aux accès faciles.",
    source: "content/lyon/blog/satellites/faq-demenagement-economique-lyon.md (ligne 42-46)"
  },
  {
    question: "Existe-t-il des aides pour déménager à Lyon ?",
    answer: "Oui, plusieurs aides existent : Action Logement Mobili-Pass (3500€ prêt 1% pour salariés secteur privé/alternants), CAF Rhône prime déménagement (995€ familles 3+ enfants), CROUS Auvergne-Rhône-Alpes aide ponctuelle (200-300€ étudiants boursiers). Ces aides sont cumulables sous conditions. Délais : 2-6 semaines selon dispositif.",
    source: "content/lyon/blog/satellites/faq-demenagement-economique-lyon.md (ligne 50-54)"
  },
];

/**
 * FAQ Lille (à extraire - placeholder)
 */
export const FAQ_LILLE: LocalFAQ[] = [
  {
    question: "Quel est le prix minimum d'un déménagement à Lille ?",
    answer: "En totale autonomie (location utilitaire + essence + matériel), comptez 100-200€ pour un studio avec l'aide d'amis. Avec un déménageur professionnel en formule économique (vous emballez, ils transportent), les tarifs démarrent à 350-400€ pour un studio/T1, 600-800€ pour un T2, et 1000-1200€ pour un T3 dans la métropole lilloise. Ces tarifs s'appliquent en basse saison (octobre-avril), en semaine, pour un déménagement local avec accès facile.",
    source: "content/blog/satellites/demenagement-pas-cher-lille/demenagement-pas-cher-lille-guide.md (ligne 276-278)"
  },
  {
    question: "Où trouver des cartons gratuits pour déménager à Lille ?",
    answer: "À Lille, plusieurs options pour récupérer des cartons gratuits : Supermarchés (Leclerc Englos/Lomme, Carrefour Euralille, Auchan, Intermarché - rayon fruits/légumes), magasins de bricolage (Leroy Merlin, Castorama, Brico Dépôt), commerces de proximité (boulangeries, pharmacies de Wazemmes et Vieux-Lille), groupes Facebook locaux (Donne cartons Lille, Zéro Déchet Lille), application Geev. Privilégiez cartons solides et récupérez-les 2-3 semaines avant.",
    source: "content/blog/satellites/demenagement-pas-cher-lille/demenagement-pas-cher-lille-guide.md (ligne 280-282)"
  },
  {
    question: "Faut-il un permis de stationnement pour déménager à Lille ?",
    answer: "Oui, une autorisation de stationnement est obligatoire pour réserver un emplacement camion devant votre logement. Demande en ligne sur lille.fr rubrique démarches, délai 7-10 jours ouvrés, coût 25-35€ selon durée. Sans autorisation, risque de verbalisation 35-135€ et impossibilité stationner proche (portage longue distance facturé 100-200€ supplémentaires).",
    source: "content/blog/satellites/demenagement-pas-cher-lille/demenagement-pas-cher-lille-guide.md (ligne 284)"
  },
];

/**
 * FAQ Bordeaux (à compléter)
 */
export const FAQ_BORDEAUX: LocalFAQ[] = [];

/**
 * FAQ Marseille (à compléter)
 */
export const FAQ_MARSEILLE: LocalFAQ[] = [];

/**
 * FAQ Toulouse (à compléter)
 */
export const FAQ_TOULOUSE: LocalFAQ[] = [];

/**
 * FAQ Nantes (à compléter)
 */
export const FAQ_NANTES: LocalFAQ[] = [];

/**
 * FAQ Strasbourg (à compléter)
 */
export const FAQ_STRASBOURG: LocalFAQ[] = [];

/**
 * FAQ Montpellier (à compléter)
 */
export const FAQ_MONTPELLIER: LocalFAQ[] = [];

/**
 * FAQ Rennes (à compléter)
 */
export const FAQ_RENNES: LocalFAQ[] = [];

/**
 * FAQ Rouen (à compléter)
 */
export const FAQ_ROUEN: LocalFAQ[] = [];

/**
 * Helper: récupérer FAQ par slug ville
 */
export function getLocalFAQs(citySlug: string): LocalFAQ[] {
  const faqs: Record<string, LocalFAQ[]> = {
    nice: FAQ_NICE,
    lyon: FAQ_LYON,
    lille: FAQ_LILLE,
    bordeaux: FAQ_BORDEAUX,
    marseille: FAQ_MARSEILLE,
    toulouse: FAQ_TOULOUSE,
    nantes: FAQ_NANTES,
    strasbourg: FAQ_STRASBOURG,
    montpellier: FAQ_MONTPELLIER,
    rennes: FAQ_RENNES,
    rouen: FAQ_ROUEN,
  };
  
  return faqs[citySlug.toLowerCase()] || [];
}

