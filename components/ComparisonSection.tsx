export default function ComparisonSection() {
  const rows = [
    {
      label: "Prix",
      without: "Devis reçus au fil de l'eau, écarts de prix peu lisibles.",
      with: "5+ devis alignés sur le même volume et les mêmes options.",
    },
    {
      label: "Temps passé",
      without: "2–3 jours de recherches, appels et visites techniques.",
      with: "Un dossier unique, devis reçus sans relances ni visites.",
    },
    {
      label: "Stress & risques",
      without: "Qualité des déménageurs difficile à vérifier, risque d'arnaque.",
      with: "Pros contrôlés (assurances, avis) et support en cas de souci.",
    },
    {
      label: "Lisibilité des devis",
      without: "Formats différents, difficile de comparer ligne par ligne.",
      with: "Même dossier, colonnes alignées : vous voyez qui propose quoi.",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-[#0A1929] via-[#04141f] to-[#0b3b46] p-6 md:p-10 lg:p-12 shadow-[0_32px_90px_rgba(0,0,0,0.6)]">
      {/* Halo lumineux */}
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(107,207,207,0.2),_transparent_70%)] blur-3xl" />
      
      <div className="relative overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-white/85">
          <thead>
            <tr>
              <th className="w-32 px-4 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white/50 border-b border-white/10">
                Aspect
              </th>
              <th className="px-4 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white/60 border-b border-white/10">
                Sans comparateur
              </th>
              <th className="px-4 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#6BCFCF] border-b border-[#6BCFCF]/30">
                Avec notre comparateur
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr 
                key={row.label}
                className="group hover:bg-white/5 transition-colors duration-200"
              >
                <td className="align-top px-4 py-5 text-xs font-bold uppercase tracking-[0.16em] text-white/60 border-b border-white/5">
                  {row.label}
                </td>
                <td className="align-top px-4 py-5 border-b border-white/5">
                  <div className="flex items-start gap-3 text-sm md:text-base text-white/70 leading-relaxed">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-300 font-bold transition-all duration-300 group-hover:bg-red-500/25 group-hover:scale-110">
                      ×
                    </span>
                    <span>{row.without}</span>
                  </div>
                </td>
                <td className="align-top px-4 py-5 border-b border-white/5">
                  <div className="flex items-start gap-3 text-sm md:text-base text-emerald-100 leading-relaxed">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200 font-bold transition-all duration-300 group-hover:bg-emerald-400/25 group-hover:scale-110">
                      ✓
                    </span>
                    <span>{row.with}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
