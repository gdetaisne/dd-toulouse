import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente (CGV) | Moverz",
  description:
    "CGV Moverz (GSLV) — B2B uniquement: objet, processus, acompte mandataire, responsabilité, pénalités de retard.",
  alternates: {
    canonical: getCanonicalUrl('cgv'),
  },
};

export default function CGVPage() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
            alt="CGV"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/92"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "CGV", href: "/cgv/" }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-6">Conditions Générales de Vente</h1>
          <p className="text-white/85 mt-3 max-w-3xl">Applicables aux relations B2B entre GSLV (Moverz) et ses partenaires déménageurs.</p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl">
          <div className="space-y-10 text-white/90">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">1. Objet</h2>
              <p>Moverz prépare un dossier et met en relation des clients avec des déménageurs partenaires. Les prestations de déménagement sont exécutées par les partenaires.</p>
              <p className="mt-2 text-white/80">Exemple: un dossier photo est constitué; plusieurs professionnels proposent un devis; Moverz centralise et synthétise.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">2. Processus</h2>
              <p>Le donneur d'ordre professionnel (partenaire) conclut un contrat avec GSLV pour la préparation du dossier et la mise en relation. Les particuliers ne contractent pas avec GSLV.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">3. Prix et paiement</h2>
              <p>Service gratuit pour le client final. En cas de validation d'un devis, un acompte peut être collecté par GSLV en qualité de mandataire du déménageur (merchant of record = déménageur).</p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-white/80">
                <li>Remboursement sous 5 jours ouvrés si l'acompte n'a pas été reversé au partenaire.</li>
                <li>Les prix des prestations sont fixés par le partenaire et figurent sur le devis.</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">4. Droit de rétractation</h2>
              <p>Relations B2B uniquement: le droit de rétractation du Code de la consommation ne s'applique pas.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">5. Responsabilité</h2>
              <p>Moverz intervient en qualité d'intermédiaire. Les prestations des partenaires relèvent de leur responsabilité. Le service est fourni « tel quel » sans garantie.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">6. Paiement & Retards (B2B)</h2>
              <p>Tout retard de paiement entraîne, de plein droit et sans mise en demeure, des pénalités au taux légal et une indemnité forfaitaire de 40 € (C. com. L441‑10).</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">7. Données personnelles</h2>
              <p>Voir la <a className="underline text-[#6bcfcf]" href="/politique-confidentialite/">Politique de confidentialité</a>.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">8. Droit applicable</h2>
              <p>Droit français. Compétence des juridictions françaises.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
