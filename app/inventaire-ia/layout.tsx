import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-helper";

export const metadata: Metadata = {
  title: "Inventaire IA - Estimation Déménagement Lille | Moverz",
  description: "Estimation automatique par IA de votre volume de déménagement à Lille. Uploadez vos photos, recevez une estimation précise en 2 minutes. 100% gratuit.",
  alternates: {
    canonical: getCanonicalUrl('inventaire-ia'),
  },
  openGraph: {
    title: "Inventaire IA Déménagement Lille",
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

