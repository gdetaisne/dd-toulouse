import type { Metadata } from "next";
import { getCanonicalAlternates } from "@/lib/canonical-helper";

export const metadata: Metadata = {
  title: "Devis Gratuits — Estimation Rapide de votre Déménagement",
  description: "Obtenez 5+ devis gratuits et personnalisés pour votre déménagement. Estimation rapide en 30 minutes, sans engagement.",
  ...getCanonicalAlternates('devis-gratuits'),
};

export default function DevisGratuitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
