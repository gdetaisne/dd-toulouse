import React from "react";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-helper";

export const metadata: Metadata = {
  title: "FAQ — Déménagement à lille | Déménageurs lille (IA)",
  description:
    "Toutes les réponses sur le déménagement à lille : prix, volume en m³, cartons, quartiers difficiles, autorisations de stationnement, périodes, etc.",
  alternates: {
    canonical: getCanonicalUrl('faq'),
  },
  openGraph: {
    title: "FAQ Déménagement Lille",
    description: "Toutes vos questions sur le déménagement à Lille",
    url: getCanonicalUrl('faq'),
    type: 'website',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


