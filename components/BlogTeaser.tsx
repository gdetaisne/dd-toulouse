import Image from "next/image";

export default function BlogTeaser() {
  const articles = [
    {
      title: "Guide déménagement Toulouse 2024",
      excerpt: "Tout savoir pour déménager sereinement dans la métropole.",
      cover: "https://images.unsplash.com/photo-1559564484-e48d68ea2c8f?w=1600&h=900&fit=crop&q=80",
      href: "/blog/"
    },
    {
      title: "Quartiers de Toulouse : guide pratique",
      excerpt: "Chartrons, Saint-Pierre, Caudéran... découvrez les spécificités.",
      cover: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=900&fit=crop&q=80",
      href: "/blog/"
    },
    {
      title: "Estimation volume : méthodes et astuces",
      excerpt: "Comment bien évaluer ses affaires avant un déménagement.",
      cover: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1600&h=900&fit=crop&q=80",
      href: "/blog/"
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center">Ressources</h2>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <a key={i} href={article.href} className="card-glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group">
            {/* Cover Image 16:9 */}
            <div className="relative w-full aspect-video">
              <Image 
                src={article.cover}
                alt={`${article.title} — Guide déménagement Toulouse`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04163a]/60 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold group-hover:text-[#6bcfcf] transition-colors">{article.title}</h3>
              <p className="mt-2 text-white/80">{article.excerpt}</p>
              <div className="mt-4 text-[#6bcfcf] font-medium group-hover:text-[#2b7a78] transition-colors">
                Lire →
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}