import { getBlogPostsByCleanCategory, getAllBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/canonical-helper';
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const city = getCityDataFromUrl(env.SITE_URL);

// Category labels mapping
const categoryLabels: { [key: string]: string } = {
  'etudiant': 'Déménagement Étudiant',
  'entreprise': 'Déménagement Entreprise',
  'piano': 'Déménagement Piano',
  'international': 'Déménagement International',
  'longue-distance': 'Longue Distance',
  'pas-cher': 'Déménagement Économique',
  'urgent': 'Déménagement Urgent',
  'devis': 'Devis Déménagement',
  'garde-meuble': 'Garde Meuble',
  'prix': 'Prix Déménagement',
  'prix-piano': 'Prix Piano'
};

const categoryDescriptions: { [key: string]: string } = {
  'etudiant': `Tous nos guides et conseils pour réussir votre déménagement étudiant à ${city.nameCapitalized} : astuces budget, aides financières, et solutions pratiques.`,
  'entreprise': `Guides complets pour organiser votre déménagement d'entreprise à ${city.nameCapitalized} : planification, logistique, et conseils professionnels.`,
  'piano': `Conseils d'experts pour déménager votre piano à ${city.nameCapitalized} en toute sécurité : tarifs, techniques, et précautions.`,
  'international': `Tout savoir sur le déménagement international depuis ${city.nameCapitalized} : formalités, transport, et organisation.`,
  'longue-distance': `Guides pratiques pour vos déménagements longue distance depuis ${city.nameCapitalized} : préparation, coûts, et astuces.`,
  'pas-cher': `Astuces et conseils pour déménager à petit prix à ${city.nameCapitalized} sans compromettre la qualité.`,
  'urgent': `Solutions et conseils pour organiser un déménagement urgent à ${city.nameCapitalized} dans les meilleures conditions.`,
  'devis': `Guides pour comprendre et obtenir les meilleurs devis de déménagement à ${city.nameCapitalized}.`,
  'garde-meuble': `Tout savoir sur les solutions de garde-meuble à ${city.nameCapitalized} : tarifs, options, et conseils.`,
  'prix': `Guides détaillés sur les prix de déménagement à ${city.nameCapitalized} pour tous types de projets.`,
  'prix-piano': `Informations complètes sur les tarifs de déménagement de piano à ${city.nameCapitalized}.`
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryLabel = categoryLabels[params.category] || params.category;
  const categoryDescription = categoryDescriptions[params.category] || `Découvrez tous nos articles sur ${categoryLabel.toLowerCase()}.`;
  
  const canonicalUrl = getCanonicalUrl(`blog/${params.category}`);
  
  return {
    title: `${categoryLabel} - Blog Déménagement ${city.nameCapitalized}`,
    description: categoryDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${categoryLabel} - Blog Déménagement ${city.nameCapitalized}`,
      description: categoryDescription,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryMapping: { [key: string]: string[] } = {
    'piano': ['demenagement-piano-lille'],
    'garde-meuble': ['garde-meuble-lille-guide-complet'],
    'international': ['demenagement-international-lille'],
    'entreprise': ['demenagement-d-entreprise-lille'],
    'prix': ['prix-demenagement-lille'],
    'pas-cher': ['demenagement-lille-pas-cher'],
    'urgent': [], 'etudiant': [], 'devis': [], 'longue-distance': [],
  };
  const allPosts = getAllBlogPosts();
  const categoryFilter = categoryMapping[params.category];
  let posts: any[] = [];
  if (categoryFilter && categoryFilter.length > 0) {
    posts = allPosts.filter(post => categoryFilter.includes(post.cleanSlug));
  } else {
    posts = getBlogPostsByCleanCategory(params.category);
  }
  if (!posts || posts.length === 0) {
    notFound();
  }

  const pilierPosts = posts.filter(post => post.type === 'pilier');
  const satellitePosts = posts.filter(post => post.type === 'satellite');
  
  const categoryLabel = categoryLabels[params.category] || params.category;
  const categoryDescription = categoryDescriptions[params.category] || `Découvrez tous nos articles sur ${categoryLabel.toLowerCase()}.`;

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      {/* Hero - Fond sombre */}
      <section className="section section-contrast relative overflow-hidden">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: categoryLabel, href: `/blog/${params.category}` }
              ]}
            />
            
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF] animate-pulse" />
              Blog
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              {categoryLabel}
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              {categoryDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Guide Pilier - Fond clair */}
      {pilierPosts.length > 0 && (
        <section className="section section-light">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#04163a] mb-4">
                Guide complet
              </h2>
              <p className="text-[#4b5c6b] max-w-2xl">
                Notre guide détaillé pour tout comprendre
              </p>
            </div>
            {pilierPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                className="group block"
              >
                <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-lg hover:border-[#6BCFCF]/30 transition-all duration-300">
                  <div className="grid md:grid-cols-[2fr_1fr] gap-8">
                    {/* Contenu texte */}
                    <div className="flex flex-col justify-center space-y-6">
                      <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[#6bcfcf]/10 text-[#04163a] border border-[#6bcfcf]/20">
                          Guide Complet
                        </span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-[#04163a] leading-tight group-hover:text-[#6bcfcf] transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-lg text-[#4b5c6b] leading-relaxed">
                        {post.meta_description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#4b5c6b]">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-[#6BCFCF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span>{post.word_count} mots</span>
                        </div>
                        <span className="text-[#E3E5E8]">·</span>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-[#6BCFCF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{Math.ceil(post.word_count / 200)} min de lecture</span>
                        </div>
                        <span className="text-[#E3E5E8]">·</span>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-[#6BCFCF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date(post.publish_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <span className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#6BCFCF] to-[#4FB8B8] text-[#04141f] font-semibold group-hover:shadow-lg transition-all duration-300">
                          Lire le guide complet
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="hidden md:flex flex-col justify-center space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#F8F9FA] border border-[#E3E5E8] rounded-2xl p-4 text-center">
                          <div className="text-3xl font-bold text-[#6bcfcf] mb-1">100%</div>
                          <div className="text-xs text-[#4b5c6b] font-medium">Complet</div>
                        </div>
                        <div className="bg-[#F8F9FA] border border-[#E3E5E8] rounded-2xl p-4 text-center">
                          <div className="text-3xl font-bold text-[#6bcfcf] mb-1">{Math.ceil(post.word_count / 200)}'</div>
                          <div className="text-xs text-[#4b5c6b] font-medium">Lecture</div>
                        </div>
                      </div>
                      <div className="bg-[#F8F9FA] border border-[#E3E5E8] rounded-2xl p-4 text-center">
                        <div className="text-3xl font-bold text-[#6bcfcf] mb-1">{Math.floor(post.word_count / 1000)}k</div>
                        <div className="text-xs text-[#4b5c6b] font-medium">Mots</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Articles Satellites - Fond sombre */}
      {satellitePosts.length > 0 && (
        <section className="section section-contrast">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Conseils et Astuces
              </h2>
              <p className="text-white/80 max-w-2xl">
                Découvrez nos articles détaillés pour approfondir vos connaissances
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {satellitePosts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                  className="group"
                >
                  <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
                    <div className="p-6 h-full flex flex-col">
                      <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {post.word_count} mots
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#6bcfcf] transition-colors mb-3 flex-grow">
                        {post.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {post.meta_description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/60 mt-auto pt-4 border-t border-white/10">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(post.publish_date).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="text-[#6bcfcf] group-hover:text-white flex items-center gap-1 font-medium">
                          Lire
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final - Fond clair */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#04163a] mb-6">
              Prêt à déménager à {city.nameCapitalized} ?
            </h2>
            <p className="text-[#4b5c6b] mb-8 max-w-2xl mx-auto text-lg">
              Comparez 5+ devis de déménageurs certifiés sous 7 jours
            </p>
            <Link
              href="/devis-gratuits/"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative">Obtenez vos devis gratuitement</span>
              <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
