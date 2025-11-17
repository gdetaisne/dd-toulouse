interface KeyMetric {
  label: string;
  value: string;
  description: string;
  accent?: "green" | "blue";
}

const metrics: KeyMetric[] = [
  {
    label: "Dossiers calculés en photos",
    value: "1 200+",
    description: "Inventaires finalisés depuis 2022 sur nos 11 villes.",
    accent: "green",
  },
  {
    label: "Note moyenne clients",
    value: "4,9/5",
    description: "Basée sur 1 200 avis vérifiés (Google + Trustpilot).",
  },
  {
    label: "Économies moyennes",
    value: "-18%",
    description: "Écart moyen vs devis le plus cher grâce à la comparaison.",
    accent: "green",
  },
];

export default function KeyMetrics() {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2b7a78]">
          Chiffres clés
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#04163a]">
          Ce que disent les chiffres
        </h2>
        <p className="text-[#04163a]/70 max-w-3xl mx-auto">
          Basés sur les dossiers réellement traités : volume calculé en photos, avis clients et économies
          constatées.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-[#dfeaea] bg-white p-5 text-[#04163a] shadow-sm hover:shadow-md transition"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#04163a]/50">
              {metric.label}
            </span>
            <div className="mt-4 text-3xl md:text-4xl font-semibold text-[#04163a]">
              {metric.value}
            </div>
            <p className="mt-3 text-sm text-[#04163a]/75">{metric.description}</p>
            <div
              className={`mt-4 h-1 w-16 rounded-full ${
                metric.accent === "green"
                  ? "bg-emerald-400"
                  : metric.accent === "blue"
                    ? "bg-[#2b7a78]"
                    : "bg-[#04163a]/20"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

