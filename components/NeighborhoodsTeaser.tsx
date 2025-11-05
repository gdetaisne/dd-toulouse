import Link from "next/link";

export default function NeighborhoodsTeaser() {
  // Quartiers populaires avec liens vers les pages zones desservies
  const picks = [
    { title: "Capitole", href: "/toulouse/capitole/" },
    { title: "Saint-Cyprien", href: "/toulouse/saint-cyprien/" },
    { title: "Carmes", href: "/toulouse/carmes/" },
    { title: "Jean Jaurès", href: "/toulouse/jean-jaures/" },
    { title: "Compans", href: "/toulouse/compans/" },
  ];
  const items = [
    ...picks,
    { title: "Ajouter votre quartier", href: "/contact/", isAdd: true as const },
  ];
  
  return (
    <div>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Zones couvertes</h2>
        <Link href="/quartiers-toulouse/" className="btn-secondary px-4 py-2 text-sm">Voir tous les quartiers</Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {items.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className={
              "card-glass rounded-2xl p-4 hover:translate-y-[2px] hover:shadow-lg transition " +
              ("isAdd" in p ? "border-dashed border-white/30 bg-white/5" : "")
            }
          >
            {"isAdd" in p ? (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white text-lg">+</div>
                <div>
                  <div className="text-white font-medium">{p.title}</div>
                  <div className="text-white/70 text-xs mt-1">Dites‑nous où vous déménagez</div>
                </div>
              </div>
            ) : (
              <>
                <div className="text-white font-medium">{p.title}</div>
                <div className="text-white/70 text-xs mt-1">Déménageurs locaux</div>
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
