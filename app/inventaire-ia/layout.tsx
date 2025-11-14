import type { Metadata } from "next";
import { getCanonicalAlternates } from "@/lib/canonical-helper";

export const metadata: Metadata = {
  title: "Inventaire IA — Analyse Automatique de vos Objets",
  description: "Analyse automatique de vos objets pour un inventaire précis et optimisé. Obtenez un inventaire détaillé avec dimensions et volumes.",
  ...getCanonicalAlternates('inventaire-ia'),
};

export default function InventaireIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
