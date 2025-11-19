export default function ProofStrip() {
  const stats = [
    {
      value: "1200+",
      label: "clients ont comparé grâce au comparateur",
      caption: "Dossiers pilotés depuis 2022.",
    },
    {
      value: "4,9/5",
      label: "note moyenne vérifiée",
      caption: "Avis sur des dossiers réellement comparés.",
    },
    {
      value: "5+ devis",
      label: "fiables à comparer",
      caption: "Tous chiffrés sur le même dossier, ligne par ligne.",
    },
    {
      value: "-18%",
      label: "économies moyennes",
      caption: "Écart moyen vs devis le plus cher.",
    },
  ];

  const chips = ["Déménageurs contrôlés", "Dossier anonyme"];

  return (
    <div className="space-y-6 rounded-3xl bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-6 md:p-8 text-white shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6BCFCF]">
            Chiffres clés
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-white">
            Le comparateur en quelques chiffres
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/75">
            Des données issues de dossiers réellement comparés, pas de promesses
            marketing.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF]" />
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.value}
            className="rounded-2xl border border-white/15 bg-white/5 p-5 md:p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-black/40"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
              {stat.label}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-white">
              {stat.value}
              </span>
            </div>
            <p className="mt-3 text-sm text-white/75">{stat.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}