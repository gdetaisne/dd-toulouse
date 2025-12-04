export default function BlogTeaser() {
  const articles = [
    {
      title: "Guide déménagement Nantes 2024",
      excerpt: "Tout savoir pour déménager sereinement dans la métropole.",
      href: "/blog/"
    },
    {
      title: "Quartiers de Nantes : guide pratique",
      excerpt: "Chartrons, Saint-Pierre, Caudéran... découvrez les spécificités.",
      href: "/blog/"
    },
    {
      title: "Estimation volume : méthodes et astuces",
      excerpt: "Comment bien évaluer ses affaires avant un déménagement.",
      href: "/blog/"
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center">Ressources</h2>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <a key={i} href={article.href} className="card-glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group p-6">
            <div className="w-full h-32 bg-gradient-to-br from-[#6bcfcf]/20 to-[#04163a]/40 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-[#6bcfcf] text-2xl font-bold">📦</span>
            </div>
            <h3 className="text-xl font-semibold group-hover:text-[#6bcfcf] transition-colors">{article.title}</h3>
            <p className="mt-2 text-white/80">{article.excerpt}</p>
            <div className="mt-4 text-[#6bcfcf] font-medium group-hover:text-[#2b7a78] transition-colors">
              Lire →
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}