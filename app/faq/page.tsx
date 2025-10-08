"use client";

import React, { useState } from "react";

type QA = { q: string; a: string[]; category: string };

const faqs: QA[] = [
  // Constitution du dossier (photos & inventaire)
  {
    q: "Combien de photos faut-il?",
    a: [
      "Tout ce qui doit être déménagé doit être pris en photo: 3 à 10 photos par pièce. Pensez aux plafonniers et lampes. Vous pouvez photographier un même objet sous plusieurs angles : il ne sera compté qu'une seule fois dans l'inventaire."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  {
    q: "Comment estimer le volume en m³ à déménager?",
    a: [
      "Nos outils calculent automatiquement une première estimation à partir de vos photos (fiabilité =90%). Vous pouvez la corriger avant envoi aux partenaires."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  {
    q: "L'estimation en m³ est-elle fiable?",
    a: [
      "La première estimation liste tout votre mobilier et elle est très fiable (90%). Vous pouvez ensuite apporter des modifications. Enfin, le dossier est revu par nos partenaires: l'estimation devient alors très précise."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  {
    q: "Objets fragiles (art, instruments): comment sont-ils gérés ?",
    a: [
      "Nous identifions les objets fragiles et adaptons le cubage nécessaire en conséquence."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  {
    q: "Pourquoi ne me demandez-vous pas mon adresse au dépôt du dossier ?",
    a: [
      "L'adresse exacte n'impacte pas le coût de la prestation à ce stade. Nous n'en avons donc pas besoin pour obtenir des devis."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  {
    q: "Puis-je utiliser une vidéo?",
    a: [
      "Nous avons constaté des résultats moins fiables avec les vidéos. Nous recommandons les photos pour une estimation optimale."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  {
    q: "Puis-je modifier l'inventaire après envoi?",
    a: [
      "Après validation et envoi aux partenaires, il est préférable de ne pas modifier l'inventaire pour ne pas biaiser la comparaison. De petites retouches n'ont généralement pas d'impact, mais en cas de changement significatif vous pouvez annuler votre dossier et en soumettre un nouveau (sans frais)."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  {
    q: "Quels éléments dois-je obligatoirement fournir pour créer mon dossier?",
    a: [
      "Des photos de chaque pièce et des objets à déménager, les grandes contraintes (accès, étages, ascenseur, stationnement), et vos préférences de prestations (emballage, démontage)."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  {
    q: "Qui remplit la déclaration de valeur?",
    a: [
      "Vous, avec nos conseils. Les déménageurs la valident avant intervention."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  {
    q: "Étudiant : comment déménager à petit budget?",
    a: [
      "Conseils d'optimisation, jours creux, entraide. Comparez gratuitement plusieurs offres."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  {
    q: "Aides financières / seniors",
    a: [
      "Liens/infos utiles selon votre situation et votre ville."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  {
    q: "Dois-je fournir mes cartons?",
    a: [
      "Souvent oui pour l'option économique. Des options \"emballage inclus\" existent dans les devis."
    ],
    category: "Constitution du dossier (photos & inventaire)",
  },
  // Processus & délais
  {
    q: "Puis-je obtenir un devis sans visite technique ?",
    a: [
      "Oui. Dans la plupart des cas, les déménageurs établissent un devis sans visite. Pour se couvrir en cas d'informations incomplètes, ils ajoutent souvent une marge de sécurité ce qui peut conduire à une légère surfacturation pour le client. À l'inverse, si le volume est sous-estimé, le professionnel peut être en perte et demander un ajustement. Certaines entreprises réalisent des visites techniques, mais leur coût (temps, déplacement) est généralement répercuté dans le prix final. Avec Moverz, vous obtenez le meilleur des deux mondes: un dossier photo complet (30 min) qui offre la précision d'une visite, sans en supporter le coût; les déménageurs reçoivent des informations standardisées et comparables, ce qui limite les marges d'incertitude."
    ],
    category: "Processus & délais",
  },
  {
    q: "Quand vais-je recevoir des devis ?",
    a: [
      "Nous laissons une semaine à nos partenaires pour répondre. Dans 90% des cas, vous recevez 3 à 5 devis sous une semaine."
    ],
    category: "Processus & délais",
  },
  {
    q: "Que se passe-t-il si je n'ai pas 3 devis après une semaine ?",
    a: [
      "Nous vous informons de l'état des retours et vous proposons gratuitement d'étendre le délai et/ou d'élargir la recherche de partenaires."
    ],
    category: "Processus & délais",
  },
  {
    q: "Que se passe-t-il une fois mon dossier terminé?",
    a: [
      "Le dossier est anonymisé et partagé avec nos partenaires pendant une semaine. À l'issue, nous vous présentons une synthèse homogène et détaillée des devis reçus."
    ],
    category: "Processus & délais",
  },
  {
    q: "Quelle est la meilleure période pour déménager ?",
    a: [
      "Les tarifs sont généralement plus bas hors haute saison. Évitez si possible l'été (mai-septembre), les week-ends et les fins/débuts de mois. Privilégiez l'automne/hiver, en semaine et en milieu de mois, en réservant tôt si vous visez l'été."
    ],
    category: "Processus & délais",
  },
  // Prestations & logistique
  {
    q: "Accès difficile/pas d'ascenseur: est-ce un problème?",
    a: [
      "Ces informations font partie de votre dossier. Signalez-les: elles seront prises en compte dans les devis des déménageurs."
    ],
    category: "Prestations & logistique",
  },
  {
    q: "Combien de cartons prévoir pour un déménagement à toulouse ?",
    a: [
      "Repères utiles: studio 8-15 cartons; T1 15-20; T2 25-40; T3 35-55; T4 45-60+; maison 60+. Le nombre varie selon vos livres/jouets/archives et objets fragiles. Pensez aux formats adaptés (livres, vaisselle, penderie) et à l'étiquetage par pièce."
    ],
    category: "Prestations & logistique",
  },
  {
    q: "Comment protéger au mieux mes meubles et objets fragiles?",
    a: [
      "Règle d'or: dans le carton, rien ne doit bouger. Utilisez papier bulle et calage (papier kraft, chips), cartons double cannelure pour le lourd, croisillons pour vaisselle/verres, housses pour literie/canapé. Remplissez les vides, marquez Fragile, et évitez de surcharger."
    ],
    category: "Prestations & logistique",
  },
  {
    q: "Dois-je demander une autorisation de stationnement à toulouse ?",
    a: [
      "Oui. Pour réserver un emplacement de déménagement, faites une demande d'occupation exceptionnelle de l'espace public (domaine public) auprès de la Ville de toulouse, de préférence en ligne et quelques jours à l'avance. En secteur piéton, l'accès est régulé par bornes et des horaires de livraison. Votre déménageur peut s'en charger."
    ],
    category: "Prestations & logistique",
  },
  {
    q: "Dois-je démonter les meubles ?",
    a: [
      "Vous précisez votre besoin lors de la demande. Cette information figure dans la présentation des devis que nous vous soumettons."
    ],
    category: "Prestations & logistique",
  },
  {
    q: "Dois-je me procurer mes propres cartons ?",
    a: [
      "Non, sauf si vous le souhaitez: la plupart de nos partenaires proposent la livraison de cartons et de matériel d'emballage (souvent inclus dans le devis). Vous pouvez utiliser vos cartons si ils sont solides et adaptés. Des cartons spécifiques (verres, penderies, bouteilles, etc.) sont disponibles sur demande."
    ],
    category: "Prestations & logistique",
  },
  {
    q: "Déménager seul ou faire appel à une entreprise ?",
    a: [
      "Seul: moins cher si petit volume et entraide, mais demande du temps, du matériel, comporte un risque de blessure et n'inclut pas d'assurance pro. Entreprise: manutention maîtrisée, garanties/assurances et moins de stress, mais coût plus élevé; comparez toujours plusieurs devis."
    ],
    category: "Prestations & logistique",
  },
  {
    q: "Quels sont les quartiers les plus complexes pour déménager à toulouse?",
    a: [
      "Les déménagements sont plus délicats dans l'hypercentre piéton (secteurs Saint-Éloi/Saint-Pierre, Pey-Berland, Bouffard, Mably et toulouse Sud) où l'accès est régulé par des bornes et les livraisons se font sur des créneaux autorisés. Anticipez l'autorisation/occupation du domaine public et les horaires de livraison."
    ],
    category: "Prestations & logistique",
  },
  // Tarifs & paiement
  {
    q: "Comment payer le dépôt de 30%?",
    a: [
      "Lorsque vous validez un devis, un acompte de 30% est réglé par carte sur notre site. Ce taux de 30% est une norme de marché imposée par nos partenaires déménageurs. Cet acompte confirme votre engagement. Après paiement, nous vous présentons le professionnel retenu et lui versons ces 30% sous 15 jours. Durant ces 15 jours, si vous n'êtes pas satisfait du partenaire sélectionné, nous vous remboursons sous 48 h via le moyen de paiement utilisé."
    ],
    category: "Tarifs & paiement",
  },
  {
    q: "Existe-t-il des aides au déménagement?",
    a: [
      "Oui, selon votre situation (étudiants, familles, salariés en mobilité, seniors). Certaines aides peuvent provenir d'organismes publics (ex. CAF) ou de l'employeur. Renseignez-vous selon votre cas."
    ],
    category: "Tarifs & paiement",
  },
  {
    q: "Le service comporte-t-il des frais cachés pour le client ?",
    a: [
      "Non. Le service est gratuit pour le client; la commission est facturée au partenaire déménageur sélectionné."
    ],
    category: "Tarifs & paiement",
  },
  {
    q: "Quel est le prix moyen d'un déménagement à toulouse ?",
    a: [
      "Selon les données récentes des comparateurs professionnels, à toulouse un déménagement de 20 m³ coûte en moyenne ~890-1 040 € en local (<100 km) et 1 710-1 960 € en longue distance. Pour un T3 intra-muros, on observe souvent 1 000-1 300 €, et 1 700-2 000 € au-delà de 500 km. Le prix exact dépend du volume, de la distance, de l'accès (ascenseur, stationnement) et de la formule choisie."
    ],
    category: "Tarifs & paiement",
  },
  {
    q: "Quels frais supplémentaires peuvent s'appliquer?",
    a: [
      "Selon les cas: portage à pied si le camion ne peut pas stationner près (distance/temps); étages sans ascenseur; objets lourds/volumineux (ex. piano) et monte-meubles; emballage spécifique (fragiles); démontage/remontage; péages/longue distance; stockage (garde-meubles); modification tardive de date; réservation/autorisation de stationnement."
    ],
    category: "Tarifs & paiement",
  },
  // Fonctionnement & partenaires
  {
    q: "Le service est-il gratuit pour moi?",
    a: [
      "Oui, le service est 100% gratuit pour vous. Nous facturons une commission au déménageur sélectionné (environ 50 €, peut varier)."
    ],
    category: "Fonctionnement & partenaires",
  },
  {
    q: "Que signifie « devis anonymisés » ?",
    a: [
      "Nous centralisons les échanges et anonymisons votre dossier pendant la période de consultation afin d'éviter les sollicitations directes. Une fois le devis et le partenaire validés, nous transmettons vos coordonnées avec votre accord."
    ],
    category: "Fonctionnement & partenaires",
  },
  // Assurances & données
  {
    q: "Assurance et garanties?",
    a: [
      "Tous nos partenaires sont couverts par une assurance Responsabilité Civile Professionnelle (RC Pro) couvrant les dommages dans le cadre normal du déménagement. Pour des objets de grande valeur, une assurance complémentaire spécifique peut être souscrite (ordre de grandeur indicatif: 0,5% à 1% de la valeur déclarée)."
    ],
    category: "Assurances & données",
  },
  {
    q: "Comment est protégée ma vie privée si mes photos contiennent des éléments sensibles?",
    a: [
      "Les photos sont conservées sur nos serveurs et détruites 45 jours après la date prévue du déménagement (gestion de litiges). Elles ne sont utilisées que pour votre dossier et ne sont jamais diffusées en dehors de l'application. Conformément au RGPD, vous pouvez demander l'effacement de toutes vos données, photos incluses, à tout moment via contact@moverz.fr."
    ],
    category: "Assurances & données",
  },
];

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a.join("\\n\\n") },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");
  
  // Récupérer toutes les catégories uniques
  const categories = ["Toutes", ...Array.from(new Set(faqs.map(faq => faq.category)))];
  
  // Filtrer les FAQs selon la catégorie sélectionnée
  const filteredFaqs = selectedCategory === "Toutes" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop"
            alt="FAQ Déménagement toulouse - Questions fréquentes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/92"></div>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-2xl">❓</span>
              <span className="text-sm font-medium text-white">Questions Fréquentes</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              FAQ — Déménagement à toulouse
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Vous trouverez ici les réponses aux questions les plus fréquentes. Pour un chiffrage précis, utilisez notre{" "}
              <a className="underline text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors" href="/devis-demenagement-toulouse/">devis de déménagement à toulouse</a>.
            </p>
          </div>
        </div>
      </section>

      <div className="section">
        <div className="container">

        {/* Filtres par catégorie */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-white/90 mb-4">Filtrer par catégorie :</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-accent text-white shadow-lg"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {selectedCategory === "Toutes" ? (
            // Affichage groupé par catégories quand "Toutes" est sélectionné
            Object.entries(
              faqs.reduce((acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push(item);
                return acc;
              }, {} as Record<string, QA[]>)
            ).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h2 className="text-2xl font-semibold text-accent border-b border-accent/20 pb-2">
                  {category}
                </h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <details key={item.q} className="card-glass rounded-2xl p-5 open:shadow-lg">
                      <summary className="cursor-pointer text-lg font-medium">{item.q}</summary>
                      <div className="mt-3 space-y-3 text-white/85">
                        {item.a.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                        {/* Maillage contextuel quand pertinent */}
                        {item.q.includes("prix") && (
                          <p className="text-sm text-white/70">
                            Voir aussi :{" "}
                            <a className="underline text-accent" href="/prix-demenagement-toulouse/">Prix d'un déménagement à toulouse</a>.
                          </p>
                        )}
                        {item.q.includes("quartiers") && (
                          <p className="text-sm text-white/70">
                            Utile :{" "}
                            <a className="underline text-accent" href="/devis-demenagement-toulouse-chartrons/">Chartrons</a>,{" "}
                            <a className="underline text-accent" href="/devis-demenagement-toulouse-saint-pierre/">Saint-Pierre</a>,{" "}
                            <a className="underline text-accent" href="/devis-demenagement-toulouse-cauderan/">Caudéran</a>.
                          </p>
                        )}
                        {item.q.includes("estimer le volume") && (
                          <p className="text-sm text-white/70">
                            Lancez votre{" "}
                            <a className="underline text-accent" href="/estimation-demenagement-toulouse/">estimation de déménagement</a>{" "}
                            en quelques minutes.
                          </p>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Affichage simple quand une catégorie spécifique est sélectionnée
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-accent border-b border-accent/20 pb-2">
                {selectedCategory}
              </h2>
              {filteredFaqs.map((item) => (
                <details key={item.q} className="card-glass rounded-2xl p-5 open:shadow-lg">
                  <summary className="cursor-pointer text-lg font-medium">{item.q}</summary>
                  <div className="mt-3 space-y-3 text-white/85">
                    {item.a.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    {/* Maillage contextuel quand pertinent */}
                    {item.q.includes("prix") && (
                      <p className="text-sm text-white/70">
                        Voir aussi :{" "}
                        <a className="underline text-accent" href="/prix-demenagement-toulouse/">Prix d'un déménagement à toulouse</a>.
                      </p>
                    )}
                    {item.q.includes("quartiers") && (
                      <p className="text-sm text-white/70">
                        Utile :{" "}
                        <a className="underline text-accent" href="/devis-demenagement-toulouse-chartrons/">Chartrons</a>,{" "}
                        <a className="underline text-accent" href="/devis-demenagement-toulouse-saint-pierre/">Saint-Pierre</a>,{" "}
                        <a className="underline text-accent" href="/devis-demenagement-toulouse-cauderan/">Caudéran</a>.
                      </p>
                    )}
                    {item.q.includes("estimer le volume") && (
                      <p className="text-sm text-white/70">
                        Lancez votre{" "}
                        <a className="underline text-accent" href="/estimation-demenagement-toulouse/">estimation de déménagement</a>{" "}
                        en quelques minutes.
                      </p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            Prêt à déménager ?
          </h2>
          <a href="/inventaire-ia/" className="inline-flex rounded-2xl bg-[#6bcfcf] px-8 py-4 text-lg font-semibold text-[#04163a] hover:bg-[#6bcfcf]/90 transition duration-300">
            Obtenez vos devis précis gratuitement
          </a>
        </div>
        </div>
      </div>
      <JsonLd />
    </main>
  );
}


