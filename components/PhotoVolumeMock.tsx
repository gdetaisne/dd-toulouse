export default function PhotoVolumeMock() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-center">
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2b7a78]">
          Calcul de volume en photos
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#04163a]">
          Envoyez vos photos, on calcule le m³ pour vous
        </h2>
        <p className="text-[#04163a]/75 max-w-xl">
          En 3 à 5 photos par pièce, notre IA reconstitue le volume de votre logement et génère un
          inventaire unique que tous les déménageurs utilisent. Vous comparez enfin des devis sur le
          même cahier des charges.
        </p>
        <ul className="space-y-3 text-sm md:text-base text-[#04163a]/80">
          <li className="flex items-start gap-3">
            <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#eef7f7] text-[#2b7a78]">
              1
            </span>
            <span>Ajoutez quelques photos par pièce (smartphone suffisant).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#eef7f7] text-[#2b7a78]">
              2
            </span>
            <span>L’IA estime le volume et crée un inventaire standardisé.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#eef7f7] text-[#2b7a78]">
              3
            </span>
            <span>Nous l’envoyons à 5+ déménageurs contrôlés pour obtenir vos devis.</span>
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-3">
            Calculer mon volume en photos (gratuit)
          </a>
          <span className="text-xs text-[#04163a]/60">
            Dossier anonyme • Aucun appel commercial sans votre accord
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 rounded-3xl bg-[#2b7a78]/5 blur-3xl" />
        <div className="relative rounded-3xl border border-[#dfeaea] bg-white p-5 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2b7a78]">
                Aperçu du calcul
              </p>
              <p className="mt-1 text-sm text-[#04163a]/80">Salon + Chambre + Cuisine</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eef7f7] px-3 py-1 text-xs font-semibold text-[#2b7a78]">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              IA en cours
            </span>
          </div>

          {/* Photos row */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative h-20 rounded-2xl bg-gradient-to-br from-[#e3f4f4] to-[#f5fbfb] overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center text-xs text-[#04163a]/50">
                  Photo {i}
                </div>
              </div>
            ))}
            <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-[#d0e4e4] text-xs text-[#2b7a78] bg-[#f6fbfb]">
              + Ajouter une photo
            </div>
          </div>

          {/* Volume bar */}
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#04163a]/70">
              <span>Volume estimé</span>
              <span className="font-semibold text-[#04163a]">28 m³</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#eef3f4]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#2b7a78] via-[#6bcfcf] to-[#9ff3f3]"
                style={{ width: "65%" }}
              />
            </div>
            <p className="text-[11px] text-[#04163a]/60">
              Volume basé sur les photos + meubles déclarés. Ajustable avant envoi aux déménageurs.
            </p>
          </div>

          {/* Footer badges */}
          <div className="mt-5 grid gap-3 text-[11px] text-[#04163a]/70 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#eef7f7] text-xs text-[#2b7a78]">
                🔒
              </span>
              <span>Dossier anonyme : vos coordonnées ne sont pas transmises aux déménageurs.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#eef7f7] text-xs text-[#2b7a78]">
                📊
              </span>
              <span>Le même volume est envoyé à tous → devis comparables ligne par ligne.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

