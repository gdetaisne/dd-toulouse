import { getAllBlogPosts, getPilierPosts } from '@/lib/blog';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

// Catégories du blog
const blogCategories = [
  { 
    slug: 'etudiant', 
    name: 'Déménagement Étudiant', 
    description: 'Guides et astuces pour déménager à petit budget quand on est étudiant',
    icon: '🎓',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    slug: 'entreprise', 
    name: 'Déménagement Entreprise', 
    description: 'Solutions professionnelles pour déménager vos bureaux et locaux',
    icon: '🏢',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    slug: 'prix', 
    name: 'Prix & Tarifs', 
    description: 'Comprendre les prix et optimiser votre budget déménagement',
    icon: '💰',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    slug: 'devis', 
    name: 'Devis Déménagement', 
    description: 'Comment obtenir et comparer des devis de déménagement',
    icon: '📋',
    color: 'from-orange-500 to-red-500'
  },
  { 
    slug: 'pas-cher', 
    name: 'Déménagement Économique', 
    description: 'Astuces pour déménager à moindre coût sans sacrifier la qualité',
    icon: '💡',
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    slug: 'urgent', 
    name: 'Déménagement Urgent', 
    description: 'Solutions rapides pour déménager dans l\'urgence',
    icon: '⚡',
    color: 'from-red-500 to-pink-500'
  },
  { 
    slug: 'longue-distance', 
    name: 'Longue Distance', 
    description: 'Déménager de toulouse vers toute la France',
    icon: '🚛',
    color: 'from-indigo-500 to-purple-500'
  },
  { 
    slug: 'garde-meuble', 
    name: 'Garde-Meuble', 
    description: 'Solutions de stockage temporaire ou longue durée',
    icon: '📦',
    color: 'from-teal-500 to-cyan-500'
  },
  { 
    slug: 'international', 
    name: 'International', 
    description: 'Déménager à l\'étranger depuis toulouse',
    icon: '🌍',
    color: 'from-blue-600 to-indigo-600'
  },
  { 
    slug: 'piano', 
    name: 'Déménagement Piano', 
    description: 'Transport sécurisé de pianos et instruments',
    icon: '🎹',
    color: 'from-pink-500 to-rose-500'
  },
];

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  const pilierPosts = getPilierPosts();

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=2000&auto=format&fit=crop"
            alt="Blog déménagement - Guides et conseils"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/90"></div>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" }
              ]}
            />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 mt-6">
              <span className="text-2xl">📚</span>
              <span className="text-sm font-medium text-white">Guides & Conseils</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Blog Déménagement toulouse
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Conseils, guides et astuces pour réussir votre déménagement à toulouse. 
              Que vous soyez étudiant, famille ou professionnel, trouvez tous les conseils dont vous avez besoin.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Explorez nos catégories
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Trouvez rapidement les conseils dont vous avez besoin selon votre situation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {blogCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/${category.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl p-6 h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#6bcfcf] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/70 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="mt-4 text-[#6bcfcf] text-sm font-medium group-hover:text-[#2b7a78] transition-colors">
                      Voir les articles →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Pilier */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Guides Complets
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pilierPosts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                  className="group"
                >
                  <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
                    <div className="p-6 h-full flex flex-col">
                      <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6bcfcf] text-[#04163a]">
                          📚 Guide Complet
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-[#6bcfcf] transition-colors mb-3">
                        {post.title}
                      </h3>
                      <p className="text-white/80 mb-4 line-clamp-3 flex-grow">
                        {post.meta_description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-white/60 mt-auto">
                        <span>{post.word_count} mots</span>
                        <span>{new Date(post.publish_date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

        {/* Tous les articles */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Tous nos Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                className="group"
              >
                <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
                  <div className="p-6 h-full flex flex-col">
                    <div className="mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        post.type === 'pilier' 
                          ? 'bg-[#6bcfcf] text-[#04163a]' 
                          : 'bg-[#2b7a78] text-white'
                      }`}>
                        {post.type === 'pilier' ? '📚 Guide Complet' : '📝 Article'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#6bcfcf] transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-white/80 mb-4 text-sm line-clamp-2 flex-grow">
                      {post.meta_description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-white/60 mt-auto">
                      <span>{post.word_count} mots</span>
                      <span>{new Date(post.publish_date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}
