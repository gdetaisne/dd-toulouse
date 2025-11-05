import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

const city = getCityDataFromUrl(env.SITE_URL);

export const metadata: Metadata = {
  title: `Inventaire IA - Estimation Déménagement ${city.nameCapitalized} | Moverz`,
  description: `Estimation automatique par IA de votre volume de déménagement à ${city.nameCapitalized}. Uploadez vos photos, recevez une estimation précise en 2 minutes. 100% gratuit.`,
  alternates: {
    canonical: getCanonicalUrl('inventaire-ia'),
  },
  openGraph: {
    title: `Inventaire IA Déménagement ${city.nameCapitalized}`,
    description: "Estimation automatique par IA de votre volume",
    url: getCanonicalUrl('inventaire-ia'),
    type: 'website',
  },
};

export default function InventaireIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

