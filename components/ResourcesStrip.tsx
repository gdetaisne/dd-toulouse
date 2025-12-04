interface ResourcesStripProps {
  citySlug: string;
  cityName: string;
}

export default function ResourcesStrip({ citySlug, cityName }: ResourcesStripProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2b7a78]">
          Ressources utiles
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#04163a]">
          Tout pour préparer votre déménagement
        </h2>
        <p className="text-[#04163a]/70 max-w-3xl mx-auto">
          Guides pratiques, exemples de prix et réponses aux questions les plus fréquentes pour{" "}
          {cityName}.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Services */}
        <div className="rounded-2xl border border-[#dfeaea] bg-white p-8 shadow-sm hover:shadow-md transition-all">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-[#04163a] mb-3">
            Nos formules de déménagement
          </h3>
          <p className="text-[#04163a]/70 text-sm mb-5">
            Comparez rapidement nos formules éco, standard et premium selon votre budget et votre
            niveau d’accompagnement.
          </p>
          <div className="space-y-3 text-sm">
            <a
              href="/services/"
              className="block text-[#2b7a78] hover:text-[#2b7a78]/80 transition-colors font-medium"
            >
              → Voir les formules
            </a>
            <a
              href={`/services/demenagement-economique-${citySlug}/`}
              className="block text-[#04163a]/70 hover:text-[#04163a] transition-colors"
            >
              Déménagement économique (dès 280€)
            </a>
            <a
              href={`/services/demenagement-standard-${citySlug}/`}
              className="block text-[#04163a]/70 hover:text-[#04163a] transition-colors"
            >
              Déménagement standard (dès 600€)
            </a>
          </div>
        </div>

        {/* Guides */}
        <div className="rounded-2xl border border-[#dfeaea] bg-white p-8 shadow-sm hover:shadow-md transition-all">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-[#04163a] mb-3">Guides & conseils</h3>
          <p className="text-[#04163a]/70 text-sm mb-5">
            Checklists, prix, cartons, démarches… tous nos articles pour préparer votre déménagement
            sereinement.
          </p>
          <div className="space-y-3 text-sm">
            <a
              href="/blog/"
              className="block text-[#2b7a78] hover:text-[#2b7a78]/80 transition-colors font-medium"
            >
              → Voir tous les guides
            </a>
            <a
              href="/blog/"
              className="block text-[#04163a]/70 hover:text-[#04163a] transition-colors"
            >
              Combien de cartons prévoir ?
            </a>
            <a
              href="/blog/"
              className="block text-[#04163a]/70 hover:text-[#04163a] transition-colors"
            >
              Prix d’un déménagement en 2025
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border border-[#dfeaea] bg-white p-8 shadow-sm hover:shadow-md transition-all">
          <div className="text-4xl mb-4">❓</div>
          <h3 className="text-xl font-semibold text-[#04163a] mb-3">
            FAQ déménagement {cityName}
          </h3>
          <p className="text-[#04163a]/70 text-sm mb-5">
            Délais, acompte, assurances… on a regroupé les réponses aux questions les plus fréquentes
            avant un déménagement.
          </p>
          <div className="space-y-3 text-sm">
            <a
              href="/faq/"
              className="block text-[#2b7a78] hover:text-[#2b7a78]/80 transition-colors font-medium"
            >
              → Voir toutes les FAQ
            </a>
            <a
              href="/estimation-rapide/"
              className="block text-[#04163a]/70 hover:text-[#04163a] transition-colors"
            >
              Estimation rapide sans photos
            </a>
            <a
              href={`/quartiers-${citySlug}/`}
              className="block text-[#04163a]/70 hover:text-[#04163a] transition-colors"
            >
              Quartiers desservis à {cityName}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

