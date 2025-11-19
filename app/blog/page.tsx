import type { Metadata } from 'next'
import { getAllBlogPosts, getPilierPosts } from '@/lib/blog';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCanonicalUrl } from '@/lib/canonical-helper';
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';
import { SatelliteArticlesSection } from '@/components/blog/SatelliteArticlesSection';

const city = getCityDataFromUrl(env.SITE_URL);

export const metadata: Metadata = {
  title: `Blog Déménagement ${city.nameCapitalized} 2025 : Guides & Conseils | Moverz`,
  description: `Guides complets déménagement ${city.nameCapitalized} 2025 : Prix, astuces, checklist. 99+ articles experts. Comparez 5 devis gratuits en 7j.`,
  alternates: {
    canonical: getCanonicalUrl('blog'),
  },
  openGraph: {
    title: `Blog Déménagement ${city.nameCapitalized} 2025 - Tous nos guides pratiques`,
    description: `Guides complets déménagement ${city.nameCapitalized} 2025 : Prix, astuces, checklist. 99+ articles experts. Comparez 5 devis gratuits en 7j.`,
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
      
      {/* Hero Section - Version Stripe */}
      <section className="section section-contrast relative overflow-hidden">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" }
              ]}
            />
            
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
              Magazine Déménagement
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Guides Déménagement <span className="text-[#6BCFCF]">{city.nameCapitalized}</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Conseils d'experts, astuces pratiques et guides complets pour un déménagement réussi
            </p>
          </div>
        </div>
      </section>

      {/* Guides Pilier Premium - Version Stripe */}
      <section className="section section-light">
        <div className="container">
          <div className="mb-12 text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B7A78]">
              Nos meilleurs guides
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#04163a] leading-tight">
              Guides Complets
            </h2>
            <p className="text-base md:text-lg text-[#4b5c6b] max-w-2xl mx-auto leading-relaxed font-light">
              Tout ce que vous devez savoir pour réussir votre déménagement
            </p>
          </div>

          <div className="grid gap-8 max-w-6xl mx-auto">
            {pilierPosts.slice(0, 3).map((post, index) => {
              const image = getImageForPost(post, index);
              
              return (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                  className="group"
                >
                  <article className="relative overflow-hidden rounded-3xl bg-white border border-[#E3E5E8] shadow-lg hover:border-[#6BCFCF]/40 transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                    <div className="grid md:grid-cols-[350px_1fr] gap-0">
                      {/* Image */}
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#04163a]/60 via-transparent to-transparent z-10"></div>
                        <img 
                          src={image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-6 left-6 z-20">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6BCFCF] text-[#04163a] text-sm font-bold shadow-lg">
                            Guide #{index + 1}
                          </span>
                        </div>
                      </div>
                      
                      {/* Contenu */}
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl font-bold text-[#04163a] leading-tight mb-3 group-hover:text-[#2B7A78] transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-sm md:text-base text-[#4b5c6b] leading-relaxed mb-4 line-clamp-2">
                          {post.meta_description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-[#4b5c6b] mb-4">
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
                        
                        <div className="flex items-center gap-2 text-[#2B7A78] font-semibold text-sm md:text-base group-hover:gap-3 transition-all">
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
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl font-bold text-[#04163a] mb-8 text-center">Autres Guides Essentiels</h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {pilierPosts.slice(3).map((post, index) => {
                  const image = getImageForPost(post, index + 3);
                  
                  return (
                    <Link 
                      key={post.slug} 
                      href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                      className="group"
                    >
                      <article className="bg-white border border-[#E3E5E8] rounded-3xl overflow-hidden hover:border-[#6BCFCF]/40 hover:scale-105 transition-all duration-300 hover:shadow-lg">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#04163a]/60 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-base md:text-lg font-semibold text-[#04163a] group-hover:text-[#2B7A78] transition-colors mb-3 line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-[#4b5c6b]">
                            <span>{(post.word_count || 0).toLocaleString()} mots</span>
                            <span className="text-[#2B7A78] font-medium group-hover:text-[#04163a]">
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

      {/* CTA Premium - Version Stripe */}
      <section className="section section-contrast">
        <div className="container max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-8 md:p-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
                Sans engagement · 0 spam · 5+ devis fiables
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Prêt à déménager à {city.nameCapitalized} ?
              </h2>
              <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
                Comparez gratuitement les devis de déménageurs professionnels.{" "}
                <span className="font-semibold text-white">Rapide, gratuit, et sans engagement.</span>
              </p>
              <Link 
                href="/devis-gratuits/"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative">Obtenir 5 devis gratuits</span>
                <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
