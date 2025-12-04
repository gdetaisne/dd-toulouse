'use client';

import React, { useState } from "react";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import { QUARTIERS } from "@/components/NeighborhoodsData";
import Breadcrumbs from "@/components/Breadcrumbs";

type QA = { q: string; a: string[]; category: string };

const city = getCityDataFromUrl(env.SITE_URL);

const faqs: QA[] = [
  // Utilisation du comparateur
  {
    q: "Comment fonctionne le comparateur de devis ?",
    a: [
      "Vous créez un dossier unique avec les détails de votre déménagement (volume estimé, adresses, contraintes d'accès, prestations souhaitées). Nous le transmettons à 5+ déménageurs certifiés qui vous envoient des devis sur la même base. Vous comparez et choisissez en toute transparence."
    ],
    category: "Utilisation du comparateur",
  },
  {
    q: "Est-ce vraiment gratuit ?",
    a: [
      "Oui, 100% gratuit. Vous ne payez rien pour utiliser le comparateur, recevoir les devis ou être accompagné. Nous sommes rémunérés par les déménageurs partenaires uniquement si vous choisissez l'un d'eux."
    ],
    category: "Utilisation du comparateur",
  },
  {
    q: "Suis-je engagé après avoir reçu les devis ?",
    a: [
      "Non, aucun engagement. Vous êtes libre de choisir un devis, d'en refuser tous, ou de ne pas donner suite. Aucune obligation, aucun frais caché."
    ],
    category: "Utilisation du comparateur",
  },
  {
    q: "Quelles informations dois-je fournir ?",
    a: [
      "Les informations essentielles : type de logement (studio, T2, maison...), adresses de départ et d'arrivée, date souhaitée, contraintes d'accès (étages, ascenseur, stationnement), et prestations souhaitées (emballage, démontage, garde-meuble...)."
    ],
    category: "Utilisation du comparateur",
  },
  {
    q: "Puis-je estimer mon volume sans photos ?",
    a: [
      "Oui. Vous pouvez fournir une estimation rapide basée sur votre type de logement et le nombre de pièces. Les photos sont optionnelles et permettent d'affiner l'estimation, mais ne sont pas obligatoires."
    ],
    category: "Utilisation du comparateur",
  },
  {
    q: "Pourquoi ne me demandez-vous pas mon adresse complète au départ ?",
    a: [
      "Pour protéger vos données et éviter les appels intempestifs. Nous anonymisons votre dossier (ville/quartier uniquement) tant que vous n'avez pas choisi un déménageur. L'adresse exacte est partagée uniquement au moment où vous validez une proposition."
    ],
    category: "Utilisation du comparateur",
  },
  // Devis & comparaison
  {
    q: "Combien de devis vais-je recevoir ?",
    a: [
      "Vous recevez minimum 5 devis de déménageurs certifiés. Dans 95% des cas, vous en recevez entre 5 et 8. Tous sont basés sur le même dossier, ce qui garantit une comparaison équitable."
    ],
    category: "Devis & comparaison",
  },
  {
    q: "Quand vais-je recevoir les devis ?",
    a: [
      "Les déménageurs ont une semaine pour répondre. Dans la majorité des cas, vous recevez les premiers devis sous 48-72h, et l'ensemble sous 7 jours maximum."
    ],
    category: "Devis & comparaison",
  },
  {
    q: "Pourquoi 5+ devis plutôt qu'un seul ?",
    a: [
      "Comparer plusieurs devis vous permet de voir la fourchette de prix du marché, d'identifier les prestations incluses/non incluses, et de choisir le meilleur rapport qualité/prix. Vous évitez aussi de payer trop cher ou de tomber sur une offre trop basse (souvent synonyme de mauvaises surprises)."
    ],
    category: "Devis & comparaison",
  },
  {
    q: "Les devis sont-ils vraiment comparables ?",
    a: [
      "Oui. Tous les déménageurs reçoivent exactement le même dossier (volume, adresses, contraintes, prestations). Vous pouvez comparer les prix, les prestations incluses, les assurances, et les avis clients sur une base commune."
    ],
    category: "Devis & comparaison",
  },
  {
    q: "Puis-je obtenir un devis sans visite technique ?",
    a: [
      "Oui, et c'est même recommandé. Les visites sont coûteuses et souvent répercutées dans le prix. Avec un dossier détaillé (volume, contraintes, photos optionnelles), les déménageurs disposent de toutes les informations nécessaires pour établir un devis précis."
    ],
    category: "Devis & comparaison",
  },
  {
    q: "Que se passe-t-il si je n'ai pas 5 devis après une semaine ?",
    a: [
      "Notre équipe vous informe de l'état des retours, relance les déménageurs et peut élargir gratuitement la recherche à d'autres pros contrôlés jusqu'à atteindre 5+ propositions comparables."
    ],
    category: "Devis & comparaison",
  },
  // Sécurité & confiance
  {
    q: "Vais-je être harcelé par des appels ?",
    a: [
      "Non, 0 spam garanti. Votre dossier est anonymisé (pas de numéro de téléphone partagé). Vous recevez les devis par email et c'est vous qui contactez le déménageur de votre choix. Aucun démarchage téléphonique."
    ],
    category: "Sécurité & confiance",
  },
  {
    q: "Comment sont contrôlés les déménageurs partenaires ?",
    a: [
      "Tous nos partenaires sont certifiés, assurés et vérifiés (solvabilité, 0 litige majeur). Nous vérifions régulièrement leur qualité de service via les avis clients et les retours terrain."
    ],
    category: "Sécurité & confiance",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: [
      "Oui. Votre dossier est anonymisé (ville/quartier uniquement, pas d'adresse exacte ni de téléphone) tant que vous n'avez pas choisi un déménageur. Vos données sont protégées selon le RGPD et ne sont jamais revendues."
    ],
    category: "Sécurité & confiance",
  },
  {
    q: "Que se passe-t-il en cas de problème avec un déménageur ?",
    a: [
      "Notre équipe vous accompagne jusqu'au jour J. En cas de litige, nous intervenons comme médiateur entre vous et le déménageur pour trouver une solution. Tous nos partenaires sont assurés professionnellement."
    ],
    category: "Sécurité & confiance",
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
    q: "Quelle est la meilleure période pour déménager ?",
    a: [
      "Les tarifs sont généralement plus bas hors haute saison. Évitez si possible l'été (mai-septembre), les week-ends et les fins/débuts de mois. Privilégiez l'automne/hiver, en semaine et en milieu de mois. Réservez tôt si vous visez l'été."
    ],
    category: "Prestations & logistique",
  },
  {
    q: "Dois-je fournir mes cartons ?",
    a: [
      "Non, la plupart des déménageurs proposent la fourniture de cartons (souvent inclus dans le devis). Vous pouvez aussi utiliser vos propres cartons s'ils sont solides. Des cartons spécifiques (verres, penderies) sont disponibles sur demande."
    ],
    category: "Prestations & logistique",
  },
  {
    q: "Combien de cartons prévoir pour un déménagement à ${city.nameCapitalized} ?",
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
    q: "Dois-je demander une autorisation de stationnement à ${city.nameCapitalized} ?",
    a: [
      "Oui. Pour réserver un emplacement de déménagement, faites une demande d'occupation exceptionnelle de l'espace public (domaine public) auprès de la Ville de ${city.nameCapitalized}, de préférence en ligne et quelques jours à l'avance. En secteur piéton, l'accès est régulé par bornes et des horaires de livraison. Votre déménageur peut s'en charger."
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
    q: "Quels sont les quartiers les plus complexes pour déménager à ${city.nameCapitalized}?",
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
    q: "Quel est le prix moyen d'un déménagement à ${city.nameCapitalized} ?",
    a: [
      "Selon les données récentes des comparateurs professionnels, à ${city.nameCapitalized} un déménagement de 20 m³ coûte en moyenne ~890-1 040 € en local (<100 km) et 1 710-1 960 € en longue distance. Pour un T3 intra-muros, on observe souvent 1 000-1 300 €, et 1 700-2 000 € au-delà de 500 km. Le prix exact dépend du volume, de la distance, de l'accès (ascenseur, stationnement) et de la formule choisie."
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
      "Les photos sont conservées sur nos serveurs et détruites 45 jours après la date prévue du déménagement (gestion de litiges). Elles ne sont utilisées que pour votre dossier et ne sont jamais diffusées en dehors de l'application. Conformément au RGPD, vous pouvez demander l'effacement de toutes vos données, photos incluses, à tout moment via gdetaisne@gmail.com."
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  
  // Scroll to top handler
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Pictogrammes SVG par catégorie
  const categoryIcons: Record<string, JSX.Element> = {
    "Toutes": (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    "Constitution du dossier (photos & inventaire)": (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    "Processus & délais": (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "Prestations & logistique": (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    "Tarifs & paiement": (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "Fonctionnement & partenaires": (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    "Assurances & données": (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  };
  
  // Récupérer toutes les catégories uniques
  const categories = ["Toutes", ...Array.from(new Set(faqs.map(faq => faq.category)))];
  
  // Filtrer les FAQs selon la catégorie ET la recherche
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "Toutes" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.some(answer => answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      {/* Hero Section - Version Stripe */}
      <section className="section section-contrast relative overflow-hidden">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Breadcrumbs
              items={[
                { label: "Accueil", href: "/" },
                { label: "FAQ", href: "/faq/" }
              ]}
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
              Questions Fréquentes
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              FAQ — Déménagement à {city.nameCapitalized}
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Vous trouverez ici les réponses aux questions les plus fréquentes. Pour un chiffrage précis, utilisez notre{" "}
              <a className="underline text-[#6BCFCF] hover:text-[#6BCFCF]/80 transition-colors font-medium" href="/estimation-rapide/">devis de déménagement à {city.nameCapitalized}</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Section FAQ - Fond clair */}
      <section className="section section-light">
        <div className="container">

        {/* Barre de recherche */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une question... (ex: prix, cartons, assurance)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-white border border-[#E3E5E8] text-[#04163a] placeholder-[#4b5c6b]/50 focus:outline-none focus:ring-2 focus:ring-[#6bcfcf] focus:border-transparent transition-all shadow-sm"
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4b5c6b]/50"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4b5c6b]/50 hover:text-[#04163a] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-[#4b5c6b] mt-2 text-center">
              {filteredFaqs.length} résultat{filteredFaqs.length > 1 ? 's' : ''} trouvé{filteredFaqs.length > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Filtres par catégorie */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-[#04163a] mb-4">Filtrer par catégorie :</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const count = faqs.filter(faq => category === "Toutes" || faq.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchQuery(""); // Reset search when changing category
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#6BCFCF] text-[#04163a] shadow-lg scale-105"
                      : "bg-white text-[#4b5c6b] hover:bg-[#F8F9FA] hover:text-[#04163a] border border-[#E3E5E8] hover:border-[#6BCFCF]/30 shadow-sm"
                  }`}
                >
                  <span className={selectedCategory === category ? "text-[#04163a]" : "text-[#4b5c6b]"}>
                    {categoryIcons[category] || categoryIcons["Toutes"]}
                  </span>
                  <span className="truncate max-w-[200px]">{category}</span>
                  <span className="text-xs opacity-70">({count})</span>
                </button>
              );
            })}
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
                <h2 className="text-2xl font-semibold text-[#2B7A78] border-b border-[#2B7A78]/20 pb-2">
                  {category}
                </h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <details key={item.q} className="bg-white border border-[#E3E5E8] rounded-3xl p-5 open:shadow-lg hover:border-[#6BCFCF]/30 transition-all duration-300">
                      <summary className="cursor-pointer text-lg font-medium text-[#04163a]">{item.q}</summary>
                      <div className="mt-3 space-y-3 text-[#04163a]">
                        {item.a.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                        {/* Maillage contextuel quand pertinent */}
                        {item.q.includes("prix") && (
                          <p className="text-sm text-[#4b5c6b]">
                            Voir aussi :{" "}
                            <a className="underline text-[#6BCFCF] hover:text-[#2B7A78] transition-colors" href={`/${city.slug}/`}>Prix d'un déménagement à {city.nameCapitalized}</a>.
                          </p>
                        )}
                        {item.q.includes("quartiers") && QUARTIERS.length >= 3 && (
                          <p className="text-sm text-[#4b5c6b]">
                            Utile :{" "}
                            <a className="underline text-[#6BCFCF] hover:text-[#2B7A78] transition-colors" href={`/${city.slug}/${QUARTIERS[0].slug}/`}>{QUARTIERS[0].title}</a>,{" "}
                            <a className="underline text-[#6BCFCF] hover:text-[#2B7A78] transition-colors" href={`/${city.slug}/${QUARTIERS[1].slug}/`}>{QUARTIERS[1].title}</a>,{" "}
                            <a className="underline text-[#6BCFCF] hover:text-[#2B7A78] transition-colors" href={`/${city.slug}/${QUARTIERS[2].slug}/`}>{QUARTIERS[2].title}</a>.
                          </p>
                        )}
                        {item.q.includes("estimer le volume") && (
                          <p className="text-sm text-[#4b5c6b]">
                            Lancez votre{" "}
                            <a className="underline text-[#6BCFCF] hover:text-[#2B7A78] transition-colors" href="/estimation-rapide/">estimation de déménagement</a>{" "}
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
                        <a className="underline text-accent" href={`/${city.slug}/`}>Prix d'un déménagement à {city.nameCapitalized}</a>.
                      </p>
                    )}
                    {item.q.includes("quartiers") && QUARTIERS.length >= 3 && (
                      <p className="text-sm text-white/70">
                        Utile :{" "}
                        <a className="underline text-accent" href={`/${city.slug}/${QUARTIERS[0].slug}/`}>{QUARTIERS[0].title}</a>,{" "}
                        <a className="underline text-accent" href={`/${city.slug}/${QUARTIERS[1].slug}/`}>{QUARTIERS[1].title}</a>,{" "}
                        <a className="underline text-accent" href={`/${city.slug}/${QUARTIERS[2].slug}/`}>{QUARTIERS[2].title}</a>.
                      </p>
                    )}
                    {item.q.includes("estimer le volume") && (
                      <p className="text-sm text-white/70">
                        Lancez votre{" "}
                        <a className="underline text-accent" href="/estimation-rapide/">estimation de déménagement</a>{" "}
                        en quelques minutes.
                      </p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
        </div>
      </section>

      {/* Ressources complémentaires - Fond sombre */}
      <section className="section section-contrast">
        <div className="container">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Ressources utiles pour votre déménagement
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Services */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30">
                  <svg className="w-5 h-5 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Nos formules</h3>
              </div>
              <div className="space-y-3">
                <a href="/services/" className="block text-[#6BCFCF] hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span>Comparer les 3 formules</span>
                </a>
                <a href="/services/demenagement-economique-nice/" className="block text-[#6BCFCF] hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span>Formule Économique (dès 280€)</span>
                </a>
                <a href="/services/demenagement-standard-nice/" className="block text-[#6BCFCF] hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span>Formule Standard (dès 600€)</span>
                </a>
              </div>
            </div>

            {/* Blog */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30">
                  <svg className="w-5 h-5 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Guides pratiques</h3>
              </div>
              <div className="space-y-3">
                <a href="/blog/" className="block text-[#6BCFCF] hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span>Guide complet déménagement</span>
                </a>
                <a href="/blog/" className="block text-[#6BCFCF] hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span>Combien de cartons prévoir ?</span>
                </a>
                <a href="/blog/prix/" className="block text-[#6BCFCF] hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span>Prix 2025 : tout comprendre</span>
                </a>
              </div>
            </div>

            {/* Local */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6BCFCF]/20 border border-[#6BCFCF]/30">
                  <svg className="w-5 h-5 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Infos locales</h3>
              </div>
              <div className="space-y-3">
                <a href={`/${city.slug}/`} className="block text-[#6BCFCF] hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span>Déménagement {city.nameCapitalized}</span>
                </a>
                <a href="/quartiers-nice/" className="block text-[#6BCFCF] hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span>Tous les quartiers</span>
                </a>
                <a href="/estimation-rapide/" className="block text-[#6BCFCF] hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span>Estimation rapide</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Fond clair */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#04163a] mb-6">
              Prêt à déménager ?
            </h2>
          <a 
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative">Obtenez vos devis précis gratuitement</span>
            <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          </div>
        </div>
      </section>

      {/* Bouton Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#6bcfcf] text-[#04163a] shadow-lg hover:bg-[#6bcfcf]/90 transition-all duration-300 transform hover:scale-110"
          aria-label="Retour en haut"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <JsonLd />
    </main>
  );
}


