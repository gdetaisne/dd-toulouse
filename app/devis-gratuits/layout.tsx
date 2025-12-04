import type { Metadata } from "next";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import { getCanonicalUrl } from "@/lib/canonical-helper";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Devis Déménagement ${city.nameCapitalized} | 5+ Offres 48h | Gratuit`,
    description: `280€ minimum. Formulaire 5 min → 5+ devis comparables en 48h à ${city.nameCapitalized}. Dossier anonyme, 0 harcèlement. Déménageurs contrôlés. Gratuit.`,
    alternates: {
      canonical: getCanonicalUrl("devis-gratuits"),
    },
    openGraph: {
      title: `Devis Déménagement ${city.nameCapitalized} | 5+ Offres 48h | Gratuit`,
      description: `280€ min. Formulaire 5 min → 5+ devis 48h. Anonyme, 0 spam. Gratuit.`,
      url: getCanonicalUrl("devis-gratuits"),
      type: "website",
    },
  };
})();

export default function DevisGratuitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
