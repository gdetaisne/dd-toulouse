import type { Metadata } from "next";
import { getCanonicalAlternates } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Devis Précis ${city.nameCapitalized} — Volume IA Identique Pour Tous`,
    description: "Comparez des devis vraiment comparables grâce à l'IA. Volume identique envoyé à tous les déménageurs → 3-5 devis précis sous 7j. Gratuit.",
    ...getCanonicalAlternates('inventaire-ia'),
  };
})();

export default function InventaireIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
