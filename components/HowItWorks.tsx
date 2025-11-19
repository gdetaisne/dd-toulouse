export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Créez votre dossier unique",
      description: "Quelques infos clés, un seul dossier pour tous les déménageurs.",
    },
    {
      number: "2", 
      title: "Nous filtrons les déménageurs",
      description: "Seuls les pros fiables, bien notés et assurés reçoivent votre demande.",
    },
    {
      number: "3",
      title: "Vous comparez 5+ devis fiables",
      description: "Même volume, mêmes options : des devis comparables, sans spam.",
    }
  ];

  return (
    <div className="relative overflow-hidden space-y-10 rounded-3xl bg-gradient-to-br from-[#0A1929] via-[#04141f] to-[#0b3b46] p-8 md:p-12 lg:p-16 text-white shadow-[0_32px_90px_rgba(0,0,0,0.6)]">
      {/* Halos lumineux multiples (Stripe-style) */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(107,207,207,0.25),_transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.15),_transparent_70%)] blur-3xl" />
      
      {/* Header avec espacement généreux */}
      <div className="relative space-y-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
          Processus en 3 étapes
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Comment fonctionne le comparateur ?
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
          Un dossier unique, des pros filtrés, des devis enfin comparables.
        </p>
      </div>

      {/* Cards avec hover lift + animations staggered */}
      <div className="relative mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="group relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-white/20 motion-safe:animate-fade-up-soft"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Glow effect au hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6BCFCF]/0 to-[#4FB8B8]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
            
            <div className="relative flex justify-center md:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#6BCFCF] bg-[#0A1929] text-base font-bold text-[#6BCFCF] shadow-[0_0_0_6px_rgba(107,207,207,0.15)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(107,207,207,0.4)] group-hover:scale-110">
                {step.number}
              </div>
            </div>
            
            <div className="relative space-y-2">
              <h3 className="text-lg md:text-xl font-bold text-white text-center md:text-left leading-tight">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed text-center md:text-left">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTAs avec espacement généreux */}
      <div className="relative mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:justify-center">
        <a
          href="/inventaire-ia/"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-base md:text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          aria-label="Recevez 5+ devis fiables gratuitement"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          <span className="relative">Recevez 5+ devis fiables gratuitement</span>
        </a>
        <a 
          href="/comment-ca-marche/" 
          className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm md:text-base font-medium text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
        >
          <span>Voir le détail du fonctionnement</span>
          <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </div>
    </div>
  );
}
