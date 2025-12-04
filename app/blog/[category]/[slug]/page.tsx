import { getBlogPostByCleanSlug, getBlogPostsByCleanCategory, getAllBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCanonicalUrl } from '@/lib/canonical-helper';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface BlogPostPageProps {
  params: {
    category: string;
    slug: string;
  };
}

// Catégories connexes pour les recommandations intelligentes
const relatedCategories: { [key: string]: string[] } = {
  'etudiant': ['pas-cher', 'urgent', 'garde-meuble', 'devis'],
  'entreprise': ['devis', 'urgent', 'garde-meuble', 'longue-distance'],
  'prix': ['devis', 'pas-cher', 'garde-meuble'],
  'devis': ['prix', 'etudiant', 'entreprise'],
  'pas-cher': ['etudiant', 'devis', 'prix'],
  'urgent': ['devis', 'etudiant', 'entreprise'],
  'longue-distance': ['international', 'devis', 'prix', 'garde-meuble'],
  'garde-meuble': ['devis', 'international', 'longue-distance', 'etudiant'],
  'international': ['longue-distance', 'devis', 'garde-meuble'],
  'piano': ['devis', 'prix', 'urgent'],
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostByCleanSlug(params.category, params.slug);
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  const canonicalUrl = getCanonicalUrl(`blog/${params.category}/${params.slug}`);

  return {
    title: post.meta_title || post.title,
    description: post.meta_description,
    keywords: post.keywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.meta_description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publish_date,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostByCleanSlug(params.category, params.slug);
  
  if (!post) {
    notFound();
  }

  // Articles de la même catégorie
  const sameCategoryPosts = getBlogPostsByCleanCategory(post.cleanCategory)
    .filter(p => p.cleanSlug !== post.cleanSlug)
    .slice(0, 2);
  
  // Articles de catégories connexes (guides piliers prioritaires)
  const allPosts = getAllBlogPosts();
  const connectedCategories = relatedCategories[post.cleanCategory] || [];
  const connectedPosts = allPosts
    .filter(p => 
      connectedCategories.includes(p.cleanCategory) && 
      p.cleanSlug !== post.cleanSlug
    )
    .sort((a, b) => {
      // Prioriser les guides piliers
      if (a.type === 'pilier' && b.type !== 'pilier') return -1;
      if (a.type !== 'pilier' && b.type === 'pilier') return 1;
      return 0;
    })
    .slice(0, 4);
  
  // Combiner et limiter à 6 articles max
  const recommendedPosts = [...sameCategoryPosts, ...connectedPosts].slice(0, 6);

  // ReactMarkdown custom components for styling (Stripe-like)
  const markdownComponents = {
    h1: ({node, ...props}: any) => <h1 className="text-3xl md:text-4xl font-bold text-[#04163a] mb-6 mt-8 first:mt-0" {...props} />,
    h2: ({node, ...props}: any) => <h2 className="text-2xl md:text-3xl font-bold text-[#04163a] mb-4 mt-8" {...props} />,
    h3: ({node, ...props}: any) => <h3 className="text-xl md:text-2xl font-semibold text-[#04163a] mb-3 mt-6" {...props} />,
    p: ({node, ...props}: any) => <p className="mb-5 text-[#4b5c6b] leading-relaxed text-base md:text-lg" {...props} />,
    ul: ({node, ...props}: any) => <ul className="list-none ml-0 mb-6 space-y-3" {...props} />,
    ol: ({node, ...props}: any) => <ol className="list-decimal ml-6 mb-6 space-y-3 text-[#4b5c6b]" {...props} />,
    li: ({node, ...props}: any) => (
      <li className="text-[#4b5c6b] pl-6 relative flex items-start" {...props}>
        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#6BCFCF] flex-shrink-0" />
      </li>
    ),
    strong: ({node, ...props}: any) => <strong className="font-semibold text-[#04163a]" {...props} />,
    em: ({node, ...props}: any) => <em className="italic text-[#4b5c6b]" {...props} />,
    a: ({node, ...props}: any) => <a className="text-[#6bcfcf] hover:text-[#2b7a78] underline font-medium transition-colors" {...props} />,
    blockquote: ({node, ...props}: any) => (
      <blockquote className="border-l-4 border-[#6bcfcf] pl-6 py-2 italic text-[#4b5c6b] my-6 bg-[#F8F9FA] rounded-r-xl" {...props} />
    ),
  };
  
  // Determine category label
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
  
  const categoryLabel = categoryLabels[post.cleanCategory] || post.category;

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      {/* Hero - Fond sombre */}
      <section className="section section-contrast relative overflow-hidden">
        <div className="container relative">
          <div className="max-w-4xl mx-auto space-y-6">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: categoryLabel, href: `/blog/${post.cleanCategory}` },
                { label: post.title, href: `/blog/${post.cleanCategory}/${post.cleanSlug}` }
              ]}
            />
            
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                post.type === 'pilier' 
                  ? 'bg-[#6bcfcf] text-[#04163a]' 
                  : 'bg-white/10 text-white border border-white/20'
              }`}>
                {post.type === 'pilier' ? (
                  <>
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Guide Complet
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Article
                  </>
                )}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {post.h1 || post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6BCFCF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>{post.word_count} mots</span>
              </div>
              <span className="text-white/40">·</span>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6BCFCF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{Math.ceil(post.word_count / 200)} min de lecture</span>
              </div>
              <span className="text-white/40">·</span>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6BCFCF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(post.publish_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content - Fond clair */}
      <section className="section section-light">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-[#E3E5E8] rounded-3xl p-8 md:p-12 shadow-sm">
              <article className="prose prose-lg max-w-none markdown-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={markdownComponents}
                >
                  {post.content}
                </ReactMarkdown>
              </article>
            </div>

            {/* CTA - Dans la section claire */}
            <div className="mt-12 bg-gradient-to-br from-[#6BCFCF]/10 to-[#4FB8B8]/10 border border-[#6BCFCF]/20 rounded-3xl p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#04163a] mb-4">
                Besoin d'aide pour votre déménagement ?
              </h3>
              <p className="text-[#4b5c6b] mb-6 max-w-2xl mx-auto">
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
        </div>
      </section>

      {/* À lire aussi - Fond sombre */}
      {recommendedPosts.length > 0 && (
        <section className="section section-contrast">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <svg className="w-8 h-8 text-[#6BCFCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  À lire aussi
                </h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedPosts.map((recommendedPost) => (
                  <Link 
                    key={recommendedPost.slug} 
                    href={`/blog/${recommendedPost.cleanCategory}/${recommendedPost.cleanSlug}`}
                    className="group"
                  >
                    <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                          {recommendedPost.type === 'pilier' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#6bcfcf] text-[#04163a]">
                              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              Guide
                            </span>
                          )}
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                            {recommendedPost.word_count} mots
                          </span>
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-white group-hover:text-[#6bcfcf] transition-colors mb-3 line-clamp-2 flex-grow">
                          {recommendedPost.title}
                        </h4>
                        <p className="text-white/70 text-sm line-clamp-2 mb-4 leading-relaxed">
                          {recommendedPost.meta_description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-white/60 mt-auto pt-4 border-t border-white/10">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {Math.ceil(recommendedPost.word_count / 200)} min
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
          </div>
        </section>
      )}
    </main>
  );
}
