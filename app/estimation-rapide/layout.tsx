import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-helper";

export const metadata: Metadata = {
  title: "Estimation Rapide Déménagement Lille | Calcul Volume | Moverz",
  description: "Estimez rapidement le volume et le coût de votre déménagement à Lille. Calculateur simple et rapide. Résultats instantanés.",
  alternates: {
    canonical: getCanonicalUrl('estimation-rapide'),
  },
  openGraph: {
    title: "Estimation Rapide Déménagement Lille",
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

