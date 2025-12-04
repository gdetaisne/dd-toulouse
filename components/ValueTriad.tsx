export default function ValueTriad() {
  const items = [
    {
      icon: "🛡️",
      title: "Pros vérifiés",
      punchline: "0 déménageur douteux dans votre dossier",
      description:
        "Solvabilité, assurances, historique de litiges : on filtre les dossiers pour ne garder que les déménageurs sérieux.",
    },
    {
      icon: "📂",
      title: "Dossier prêt pour devis",
      punchline: "5 minutes, pas 5 rendez-vous",
      description:
        "Photos ou infos rapides : un seul dossier standardisé remplace les visites techniques répétées.",
    },
    {
      icon: "🔒",
      title: "Anonymat garanti",
      punchline: "Vous gardez la main sur les échanges",
      description:
        "Les déménageurs ne voient que votre dossier. Ils ne peuvent pas vous appeler tant que vous n’avez pas décidé.",
    },
    {
      icon: "💶",
      title: "Comparaison claire",
      punchline: "Pas de petites lignes surprises",
      description:
        "Devis structurés de la même façon pour voir les écarts de prix et de services en un coup d’œil.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6bcfcf]">
          Nos garanties
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Nos garanties anti-arnaque
        </h2>
        <p className="text-white/80 max-w-3xl mx-auto text-sm md:text-base">
          Pros vérifiés, dossier prêt pour devis, anonymat et devis comparables : tout est fait pour
          éviter les arnaques et les mauvaises surprises.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl md:text-3xl leading-none">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-[#6bcfcf]">{item.punchline}</p>
                <p className="mt-2 text-sm text-white/80">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}