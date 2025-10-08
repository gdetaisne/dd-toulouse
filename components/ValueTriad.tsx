export default function ValueTriad() {
  const values = [
    {
      title: "IA précise",
      description: "Estimation volumétrique ultra‑fiable à partir de vos photos"
    },
    {
      title: "Transparence totale",
      description: "Devis détaillés, aucun frais caché"
    },
    {
      title: "100% gratuit",
      description: "Comparez en toute liberté, sans engagement"
    },
    {
      title: "Experts locaux",
      description: "Déménageurs qualifiés (ex. Toulouse & Gironde)"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
        Nos garanties
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, i) => (
          <div key={i} className="card-glass rounded-2xl p-6 text-center">
            <h3 className="text-xl font-semibold">{value.title}</h3>
            <p className="mt-2 text-white/80">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}