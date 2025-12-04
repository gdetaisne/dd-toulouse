"use client";
import Image from "next/image";

type PriceRow = { label: string; volume: string; price: string; notes?: string };

export default function QuartierTemplate(props: {
  title: string; // ex: "Chartrons"
  intro: string[]; // 2-3 paragraphes courts
  priceRows: PriceRow[]; // lignes de prix indicatifs
  parentLink?: string; // lien vers la page mère devis
  coverImage?: string; // image du quartier (optionnelle)
}) {
  const { title, intro, priceRows, parentLink = "/devis-demenagement-toulouse/", coverImage } = props;
  return (
    <main className="section">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Devis de déménagement – {title} (Toulouse)
        </h1>
        <p className="mt-2 text-white/75">
          Calculez votre volume en m³ avec notre outil photo IA et obtenez un devis instantané.
        </p>

        {/* Cover Image du quartier */}
        {coverImage && (
          <div className="mt-6 relative w-full h-48 md:h-64 rounded-2xl overflow-hidden">
            <Image 
              src={coverImage}
              alt={`${title} — accès camion déménagement, façades typiques, rues`}
              fill
              sizes="(min-width: 768px) 90vw, 100vw"
              className="object-cover"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04163a]/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">
              📍 {title}
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 card-glass rounded-2xl p-6">
            {intro.map((p, i) => (
              <p key={i} className="mb-3 text-white/90">{p}</p>
            ))}

            <h2 className="mt-6 text-xl font-semibold">Exemples de prix indicatifs</h2>
            <p className="text-sm text-white/80">Les fourchettes varient selon l'étage, l'ascenseur, la distance et les options.</p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-white/80">
                  <tr>
                    <th className="text-left py-2 pr-3">Logement</th>
                    <th className="text-left py-2 pr-3">Volume (m³)</th>
                    <th className="text-left py-2 pr-3">Prix TTC</th>
                    <th className="text-left py-2">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {priceRows.map((r, i) => (
                    <tr key={i}>
                      <td className="py-2 pr-3">{r.label}</td>
                      <td className="py-2 pr-3">{r.volume}</td>
                      <td className="py-2 pr-3">{r.price}</td>
                      <td className="py-2">{r.notes || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/devis-gratuits/" className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2b7a78] px-5 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300">
                Créer mon dossier
              </a>
              <a href={parentLink} className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/30 px-5 text-sm font-medium hover:bg-white/15 transition duration-300">
                Revenir à la page Devis Toulouse
              </a>
            </div>
          </div>

          <aside className="card-glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Bon à savoir</h3>
            <ul className="mt-3 space-y-2 text-white/85 text-sm">
              <li>• Téléversez 3–5 photos par pièce pour une estimation fiable.</li>
              <li>• Anticipez l’autorisation de stationnement si les accès sont limités.</li>
              <li>• Mentionnez étage, ascenseur, portage & objets lourds (piano, frigo US…).</li>
            </ul>
            <a href="/estimation-demenagement-Toulouse/" className="mt-4 inline-flex h-11 items-center justify-center rounded-2xl bg-[#2b7a78] px-5 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300">
              Estimation instantanée
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}


