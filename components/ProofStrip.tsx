export default function ProofStrip() {
  const stats = [
    {
      value: "1200+",
      label: "clients ont comparé grâce à notre IA",
      caption: "Dossiers pilotés depuis 2022",
    },
    {
      value: "4,9/5",
      label: "note moyenne vérifiée",
      caption: "Avis authentifiés sur 11 villes",
    },
    {
      value: "5+ devis",
      label: "fiables à comparer",
      caption: "Tous reçoivent le même inventaire (28 m³)",
    },
  ];

  const chips = [
    "Déménageurs contrôlés",
    "Dossier anonyme",
    "IA volume identique",
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2b7a78]">
            Preuves instantanées
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-[#04163a]">
            1200+ déménagements pilotés sans arnaques
          </h2>
          <p className="mt-2 text-[#04163a]/70">
            Notes, volumes et garanties mis à jour en temps réel sur nos 11
            villes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-[#d8ecec] bg-white px-4 py-2 text-sm font-medium text-[#1a3c3c]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2b7a78]" />
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.value}
            className="rounded-2xl border border-[#dfeaea] bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-sm font-semibold uppercase tracking-wide text-[#2b7a78]/80">
              {stat.label}
            </div>
            <div className="mt-3 text-4xl font-bold text-[#04163a]">
              {stat.value}
            </div>
            <p className="mt-3 text-sm text-[#04163a]/70">{stat.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}