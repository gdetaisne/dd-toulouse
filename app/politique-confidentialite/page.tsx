import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Moverz",
  description:
    "Politique RGPD de Moverz (GSLV) : données collectées, finalités, durées (60 jours), droits et sous-traitants.",
  alternates: {
    canonical: getCanonicalUrl('politique-confidentialite'),
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop"
            alt="Politique de confidentialité"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/92"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Confidentialité", href: "/politique-confidentialite/" }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-6">Politique de confidentialité</h1>
          <p className="text-white/85 mt-3 max-w-3xl">
            Ce document décrit la manière dont Moverz, marque exploitée par GSLV
            (17290, France) traite vos données personnelles conformément au RGPD.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl">
          <div className="space-y-10 text-white/90">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Responsable de traitement</h2>
              <p>
                GSLV (17290, France) — contact: gdetaisne@gmail.com. Marque: Moverz.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Données collectées</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Identité et contact: nom, email, téléphone.</li>
                <li>Contenu du dossier: photos des pièces/objets, contraintes, préférences.</li>
                <li>Traces techniques: logs, adresse IP, user-agent (sécurité/analytics non nominatif).</li>
                <li>Échanges et sélection de devis.</li>
              </ul>
              <p className="mt-2 text-white/80">Nous limitons la collecte au strict nécessaire. Vous pouvez flouter des éléments personnels sur les photos.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Finalités et bases légales</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fourniture du service/mise en relation — exécution du contrat (art. 6-1-b).</li>
                <li>Support/fraude — intérêt légitime (art. 6-1-f).</li>
                <li>Facturation au partenaire/obligations légales — (art. 6-1-c).</li>
                <li>Amélioration/statistiques — consentement lorsque requis.</li>
              </ul>
              <p className="mt-2 text-white/80">Nous n'entraînons pas de modèles IA avec vos contenus sans accord. Mesures d'audience limitées et non nominatives.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Durées de conservation</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Photos, inventaires et coordonnées: suppression sous 60 jours.</li>
                <li>Logs techniques non identifiants: durée raisonnable de sécurité.</li>
                <li>Documents comptables: 10 ans (obligation légale).</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Destinataires et transferts</h2>
              <p>
                Partage avec les déménageurs partenaires (devis) et sous-traitants
                techniques: hébergeur VPS en France (Hostinger), Neon.tech (PostgreSQL),
                fournisseurs IA/vision susceptibles d'évoluer (ex. OpenAI, Anthropic, Google Vision, AWS Rekognition).
              </p>
              <p className="mt-2">Hébergement majoritairement dans l'UE. En cas de transfert hors UE, garanties appropriées (CCT).</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Droits des personnes</h2>
              <p>
                Droits d'accès, rectification, effacement, limitation, opposition, portabilité, et directives post‑mortem. Exercer vos droits: gdetaisne@gmail.com.
              </p>
              <p className="mt-2">Adresse postale: 5 rue Jean Coyttar, 17290 Thairé. Réclamation: CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Cookies et traceurs</h2>
              <p>
                L'application peut utiliser des cookies strictement nécessaires. Aucun cookie non nécessaire sur le site public à ce jour (susceptible d'évoluer).
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Sécurité</h2>
              <p>
                Mesures raisonnables: chiffrement en transit, contrôle d'accès, journalisation. Aucune décision automatisée produisant des effets juridiques n'est prise. Notification CNIL en cas d'incident.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-white/80">
                <li>Évitez de charger des documents d'identité; limitez les visages.</li>
                <li>Effacement anticipé possible sur simple demande par email.</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
              <p>
                gdetaisne@gmail.com — 5 rue Jean Coyttar, 17290 Thairé, France.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
