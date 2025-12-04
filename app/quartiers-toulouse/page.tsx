import { QUARTIERS, COMMUNES, urlForQuartier, urlForCommune } from "@/components/NeighborhoodsData";
import NeighborhoodsIndex from "@/components/NeighborhoodsIndex";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

const city = getCityDataFromUrl(env.SITE_URL);

// Générer liste quartiers dynamique depuis NeighborhoodsData
const quartiersNoms = QUARTIERS.slice(0, 5).map(q => q.title).join(', ');
const communesNoms = COMMUNES.slice(0, 5).map(c => c.title).join(', ');

export const metadata = {
  title: `Quartiers & communes — Déménagement à ${city.nameCapitalized} | IA & transparence`,
  description: `Trouvez votre page quartier/commune pour estimer votre déménagement à ${city.nameCapitalized} : ${quartiersNoms}… ${communesNoms}.`,
  alternates: {
    canonical: getCanonicalUrl(`quartiers-${city.slug}`),
  },
};

function JsonLd() {
  const items = [
    ...QUARTIERS.map((q, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: urlForQuartier(q.slug),
      name: `Devis de déménagement – ${q.title} (${city.nameCapitalized})`,
    })),
    ...COMMUNES.map((c, i) => ({
      "@type": "ListItem",
      position: QUARTIERS.length + i + 1,
      url: urlForCommune(c.slug),
      name: `Devis de déménagement à ${c.title}`,
    })),
  ];
  const json = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: items };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function Page() {
  return (
    <>
      <NeighborhoodsIndex />
      <JsonLd />
    </>
  );
}


