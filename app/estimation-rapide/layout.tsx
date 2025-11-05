import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

const city = getCityDataFromUrl(env.SITE_URL);

export const metadata: Metadata = {
  title: `Estimation Rapide Déménagement ${city.nameCapitalized} | Calcul Volume | Moverz`,
  description: `Estimez rapidement le volume et le coût de votre déménagement à ${city.nameCapitalized}. Calculateur simple et rapide. Résultats instantanés.`,
  alternates: {
    canonical: getCanonicalUrl('estimation-rapide'),
  },
  openGraph: {
    title: `Estimation Rapide Déménagement ${city.nameCapitalized}`,
    description: "Calculez le volume et coût de votre déménagement",
    url: getCanonicalUrl('estimation-rapide'),
    type: 'website',
  },
};

export default function EstimationRapideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

