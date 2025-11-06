import type { Metadata } from 'next'
import { getAllBlogPosts, getPilierPosts } from '@/lib/blog';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCanonicalUrl } from '@/lib/canonical-helper';
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

const city = getCityDataFromUrl(env.SITE_URL);

import { SatelliteArticlesSection } from '@/components/blog/SatelliteArticlesSection';
export const metadata: Metadata = {
  title: `📦 Blog Déménagement ${city.nameCapitalized} 2025 : Guides & Conseils | Moverz`,
  description: `Guides complets déménagement ${city.nameCapitalized} 2025 : Prix 💰, astuces, checklist 📋. 99+ articles experts ⭐. Comparez 5 devis gratuits en 7j.`,
  alternates: {
    canonical: getCanonicalUrl('blog'),
  },
  openGraph: {
    title: `📦 Blog Déménagement ${city.nameCapitalized} 2025 - Tous nos guides pratiques`,
    description: `Guides complets déménagement ${city.nameCapitalized} 2025 : Prix 💰, astuces, checklist 📋. 99+ articles experts ⭐. Comparez 5 devis gratuits en 7j.`,
    url: getCanonicalUrl('blog'),
    type: 'website',
  },
}

// Images catégories (Unsplash - libre de droits)
const categoryImages: { [key: string]: string } = {
  'prix': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
  'demenageur': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
  'pas-cher': 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
  'garde-meuble': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  'international': 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80',
  'piano': 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80',
  'entreprise': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  'petit': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  'location': 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80',
  'aide': 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80',
  'default': 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80',
};

// Images satellites variées
const satelliteImages = [
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80',
  'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80',
  'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=400&q=80',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80',
];

function getImageForPost(post: any, index: number) {
  const slug = post.cleanSlug || post.slug || '';
  
  if (slug.includes('prix')) return categoryImages['prix'];
  if (slug.includes('garde-meuble')) return categoryImages['garde-meuble'];
  if (slug.includes('international')) return categoryImages['international'];
  if (slug.includes('piano')) return categoryImages['piano'];
  if (slug.includes('entreprise')) return categoryImages['entreprise'];
  if (slug.includes('pas-cher') || slug.includes('economique')) return categoryImages['pas-cher'];
  if (slug.includes('petit') || slug.includes('studio')) return categoryImages['petit'];
  if (slug.includes('location') || slug.includes('camion')) return categoryImages['location'];
  if (slug.includes('aide')) return categoryImages['aide'];
  
  return satelliteImages[index % satelliteImages.length];
}

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  const pilierPosts = getPilierPosts();
  const satellitePostsRaw = allPosts.filter(post => post.type === 'satellite');
  
  // Enrichir les posts avec les images côté serveur
  const satellitePosts = satellitePostsRaw.map((post, index) => ({
    ...post,
    imageUrl: getImageForPost(post, index)
  }));

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=2000&auto=format&fit=crop"
            alt="Blog déménagement - Guides et conseils"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/90"></div>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" }
              ]}
            />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 mt-6">
              <span className="text-2xl">✨</span>
              <span className="text-sm font-medium text-white">Magazine Déménagement</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
              Guides Déménagement <span className="text-[#6bcfcf]">{city.nameCapitalized}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
              Conseils d'experts, astuces pratiques et guides complets pour un déménagement réussi
            </p>
          </div>
        </div>
      </section>

      {/* Guides Pilier Premium avec Images */}
      <section className="section pb-0">
        <div className="container">
          <div className="mb-16 text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[#6bcfcf]/10 text-[#6bcfcf] text-sm font-semibold mb-4">
              NOS MEILLEURS GUIDES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              📖 Guides Complets
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
              Tout ce que vous devez savoir pour réussir votre déménagement
            </p>
          </div>

          <div className="grid gap-12 max-w-6xl mx-auto">
            {pilierPosts.slice(0, 3).map((post, index) => {
              const image = getImageForPost(post, index);
              const icons = ['🏆', '💰', '🎯'];
              
              return (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                  className="group"
                >
                  <article className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#6bcfcf]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#6bcfcf]/20">
                    <div className="grid md:grid-cols-[400px_1fr] gap-0">
                      {/* Image */}
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#04163a] via-transparent to-transparent z-10"></div>
                        <img 
                          src={image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-6 left-6 z-20">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6bcfcf] text-[#04163a] text-sm font-bold shadow-lg">
                            <span className="text-xl">{icons[index]}</span>
                            Guide #{index + 1}
                          </span>
                        </div>
                      </div>
                      
                      {/* Contenu */}
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 group-hover:text-[#6bcfcf] transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-lg text-white/70 leading-relaxed mb-6 line-clamp-2">
                          {post.meta_description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm text-white/50 mb-6">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span>{(post.word_count || 0).toLocaleString()} mots</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{Math.ceil((post.word_count || 0) / 200)} min</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-[#6bcfcf] font-semibold group-hover:gap-4 transition-all">
                          Lire le guide complet
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {/* Autres guides piliers */}
          {pilierPosts.length > 3 && (
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Autres Guides Essentiels</h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {pilierPosts.slice(3).map((post, index) => {
                  const image = getImageForPost(post, index + 3);
                  
                  return (
                    <Link 
                      key={post.slug} 
                      href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                      className="group"
                    >
                      <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#6bcfcf]/50 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#6bcfcf]/10">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#04163a] via-transparent to-transparent"></div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-white group-hover:text-[#6bcfcf] transition-colors mb-3 line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-white/50">
                            <span>{(post.word_count || 0).toLocaleString()} mots</span>
                            <span className="text-[#6bcfcf] font-medium group-hover:text-white">
                              Lire →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Articles Satellites - Style Magazine (Client Component) */}
      {satellitePosts.length > 0 && (
        <SatelliteArticlesSection 
          satellitePosts={satellitePosts}
        />
      )}

      {/* CTA Premium */}
      <section className="section pt-20">
        <div className="container max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background gradient animé */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2b7a78] via-[#6bcfcf] to-[#2b7a78] animate-gradient-xy"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80')] bg-cover bg-center opacity-10"></div>
            
            <div className="relative p-12 md:p-16 text-center">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à déménager à {city.nameCapitalized} ?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Comparez gratuitement les devis de déménageurs professionnels. 
                <strong> Rapide, gratuit, et sans engagement.</strong>
              </p>
              <Link 
                href="/inventaire-ia" 
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-[#04163a] font-bold text-lg hover:bg-[#04163a] hover:text-white hover:scale-110 transition-all duration-300 shadow-2xl"
              >
                Obtenir 5 devis gratuits
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
