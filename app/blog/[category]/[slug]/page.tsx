import { getBlogPostByCleanSlug, getBlogPostsByCleanCategory, getAllBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

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

  return {
    title: post.meta_title || post.title,
    description: post.meta_description,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.title,
      description: post.meta_description,
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

  // Convert markdown content to HTML (simplified version)
  const formatContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mb-6 mt-8 first:mt-0">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-white mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium text-white mb-3 mt-6">$1</h3>')
      .replace(/^\- \[ \] (.*$)/gim, '<li class="flex items-start mb-2 text-white/90"><span class="inline-block w-4 h-4 border border-white/30 rounded mr-2 mt-1"></span>$1</li>')
      .replace(/^\- \[x\] (.*$)/gim, '<li class="flex items-start mb-2 text-white/90"><span class="inline-block w-4 h-4 bg-[#6bcfcf] rounded mr-2 mt-1"></span>$1</li>')
      .replace(/^\- (.*$)/gim, '<li class="mb-3 text-white/90 ml-4">• $1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-white/95">$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#6bcfcf] hover:text-[#2b7a78] underline font-medium transition-colors">$1</a>')
      .replace(/\n\n/g, '</p><p class="mb-5 text-white/90 leading-relaxed text-base">')
      .replace(/\n/g, '<br>');
  };

  const formattedContent = formatContent(post.content);
  
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
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04163a] via-[#2b7a78] to-[#6bcfcf] text-white">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Breadcrumbs 
            items={[
              { label: "Accueil", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: categoryLabel, href: `/blog/${post.cleanCategory}` },
              { label: post.title, href: `/blog/${post.cleanCategory}/${post.cleanSlug}` }
            ]}
          />
          
          <div className="mt-6 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              post.type === 'pilier' 
                ? 'bg-[#6bcfcf] text-[#04163a]' 
                : 'bg-[#2b7a78] text-white'
            }`}>
              {post.type === 'pilier' ? '📚 Guide Complet' : '📝 Article'}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {post.h1 || post.title}
          </h1>
          
          <div className="flex items-center text-white/70 text-sm">
            <span className="mr-4">{post.word_count} mots</span>
            <span className="mr-4">•</span>
            <span>{new Date(post.publish_date).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10">
            <article 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: `<p class="mb-5 text-white/90 leading-relaxed text-base">${formattedContent}</p>` 
              }}
            />
          </div>

        {/* CTA */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Besoin d'aide pour votre déménagement ?
          </h3>
          <p className="text-white/80 mb-6">
            Notre équipe de déménageurs professionnels à toulouse est à votre disposition 
            pour vous accompagner dans votre projet.
          </p>
          <Link 
            href="/inventaire-ia" 
            className="inline-flex items-center px-6 py-3 rounded-2xl bg-[#2b7a78] text-white font-medium hover:brightness-110 transition duration-300"
          >
            Obtenir un devis gratuit
          </Link>
        </div>

        {/* À lire aussi */}
        {recommendedPosts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="text-3xl">📚</div>
              <h3 className="text-2xl font-bold text-white">
                À lire aussi
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedPosts.map((recommendedPost) => {
                // Déterminer le badge de catégorie
                const categoryBadges: { [key: string]: { icon: string; label: string; color: string } } = {
                  'etudiant': { icon: '🎓', label: 'Étudiant', color: 'bg-blue-500' },
                  'entreprise': { icon: '🏢', label: 'Entreprise', color: 'bg-purple-500' },
                  'prix': { icon: '💰', label: 'Prix', color: 'bg-green-500' },
                  'devis': { icon: '📋', label: 'Devis', color: 'bg-orange-500' },
                  'pas-cher': { icon: '💡', label: 'Économique', color: 'bg-yellow-500' },
                  'urgent': { icon: '⚡', label: 'Urgent', color: 'bg-red-500' },
                  'longue-distance': { icon: '🚛', label: 'Longue distance', color: 'bg-indigo-500' },
                  'garde-meuble': { icon: '📦', label: 'Stockage', color: 'bg-teal-500' },
                  'international': { icon: '🌍', label: 'International', color: 'bg-cyan-500' },
                  'piano': { icon: '🎹', label: 'Piano', color: 'bg-pink-500' },
                };
                
                const badge = categoryBadges[recommendedPost.cleanCategory] || { icon: '📝', label: recommendedPost.cleanCategory, color: 'bg-gray-500' };
                
                return (
                  <Link 
                    key={recommendedPost.slug} 
                    href={`/blog/${recommendedPost.cleanCategory}/${recommendedPost.cleanSlug}`}
                    className="group"
                  >
                    <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#6bcfcf]/50 transition-all duration-300 overflow-hidden h-full">
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">{badge.icon}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${badge.color} text-white font-medium`}>
                            {badge.label}
                          </span>
                          {recommendedPost.type === 'pilier' && (
                            <span className="text-xs px-2 py-1 rounded-full bg-[#6bcfcf] text-[#04163a] font-medium">
                              Guide
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-semibold text-white group-hover:text-[#6bcfcf] transition-colors mb-2 line-clamp-2">
                          {recommendedPost.title}
                        </h4>
                        <p className="text-white/70 text-sm line-clamp-2 flex-grow mb-4">
                          {recommendedPost.meta_description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-white/50 mt-auto pt-3 border-t border-white/10">
                          <span>{recommendedPost.word_count} mots</span>
                          <span className="text-[#6bcfcf] font-medium group-hover:text-[#2b7a78] transition-colors">
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
    </main>
  );
}
