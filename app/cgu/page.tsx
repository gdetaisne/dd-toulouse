import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation (CGU) | Moverz",
  description:
    "CGU de Moverz (GSLV) — service gratuit pour particuliers, rôle d'intermédiaire B2B, données (60 jours).",
  alternates: {
    canonical: getCanonicalUrl('cgu'),
  },
};

export default function CGUPage() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
            alt="CGU Moverz"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/92"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "CGU", href: "/cgu/" }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-6">Conditions Générales d'Utilisation</h1>
          <p className="text-white/85 mt-3 max-w-3xl">Service opéré par GSLV (RCS La Rochelle 914 499 876).</p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl text-white/90 space-y-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">1. Objet et périmètre</h2>
            <p>Moverz est un service gratuit pour les particuliers: dossier (photos), inventaire/estimation, mise en relation. GSLV agit comme intermédiaire B2B; aucun contrat n'est conclu avec les consommateurs.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">2. Accès et comptes</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Identifiant de session anonyme.</li>
              <li>Email collecté pour la communication.</li>
              <li>Suppression des données (photos, email) sous 60 jours.</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">3. Description du service</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Photos → analyse IA → inventaire → estimation → demandes de devis.</li>
              <li>Service gratuit; plusieurs déménageurs peuvent répondre.</li>
              <li>Estimation indicative; pas de garantie de résultat.</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">4. Conditions financières</h2>
            <p>Le cas échéant, un acompte peut être encaissé comme mandataire du déménageur; remboursement sous 5 jours ouvrés si non reversé.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">5. Responsabilités</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>GSLV est un intermédiaire technique.</li>
              <li>Les prestations de déménagement relèvent des partenaires.</li>
              <li>Service « tel quel » sans garantie; absence de responsabilité pour dommages indirects.</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">6. Données, IA et cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Suppression automatique sous 60 jours.</li>
              <li>Pas d'entraînement de modèles avec vos contenus sans accord.</li>
              <li>Cookies techniques nécessaires uniquement (susceptible d'évoluer).</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">7. Droit applicable</h2>
            <p>Droit français — Tribunal judiciaire de La Rochelle.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">8. Contact</h2>
            <p>Support & RGPD: gdetaisne@gmail.com — 5 rue Jean Coyttar, 17290 Thairé, France.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
