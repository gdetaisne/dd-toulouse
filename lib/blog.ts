import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Mapping des catégories pour URLs courtes
const CATEGORY_MAPPING = {
  // Variantes sans accent
  'demenagement-economique': 'pas-cher',
  'demenagement-etudiant': 'etudiant',
  'demenagement-entreprise': 'entreprise', 
  'demenagement-piano': 'piano',
  'demenagement-international': 'international',
  'demenagement-longue-distance': 'longue-distance',
  'demenagement-pas-cher': 'pas-cher',
  'demenagement-urgent': 'urgent',
  'devis-demenagement': 'devis',
  'garde-meuble': 'garde-meuble',
  'prix-demenagement': 'prix',
  'piliers': 'general',
  'satellites': 'conseils',
  
  // Variantes AVEC accents (catégories frontmatter Toulouse - COPIÉES EXACTEMENT)
  'deménagement-economique': 'pas-cher',
  'deménagement-entreprise': 'entreprise',
  'deménagement-etudiant': 'etudiant',
  'déménageur-professionnel': 'demenageur',
  'prix-deménagement': 'prix',
  'aide-deménagement': 'aide',
  'demenagement-piano': 'piano',
  'location-camion': 'location',
  'international': 'international',
  'garde-meuble': 'garde-meuble',
  
  // Mappings automatiques pour toutes les catégories accentuées (56 catégories)
  'assurance-deménagement': 'assurance-demenagement',
  'avis-deménagement': 'avis-demenagement',
  'contact-deménagement': 'contact-demenagement',
  'débarras-deménagement': 'debarras-demenagement',
  'deménagement-ascenseur': 'demenagement-ascenseur',
  'deménagement-avion': 'demenagement-avion',
  'deménagement-bateau': 'demenagement-bateau',
  'deménagement-bus': 'demenagement-bus',
  'deménagement-camion': 'demenagement-camion',
  'deménagement-éclair': 'demenagement-eclair',
  'deménagement-éclair-24h': 'demenagement-eclair-24h',
  'deménagement-escalier': 'demenagement-escalier',
  'deménagement-express': 'demenagement-express',
  'deménagement-express-24h': 'demenagement-express-24h',
  'deménagement-express-critique': 'demenagement-express-critique',
  'deménagement-express-nuit': 'demenagement-express-nuit',
  'deménagement-express-soir': 'demenagement-express-soir',
  'deménagement-express-urgent': 'demenagement-express-urgent',
  'deménagement-express-weekend': 'demenagement-express-weekend',
  'deménagement-flash': 'demenagement-flash',
  'deménagement-funiculaire': 'demenagement-funiculaire',
  'deménagement-hélicoptère': 'demenagement-helicoptere',
  'deménagement-immédiat': 'demenagement-immediat',
  'deménagement-immédiat-24h': 'demenagement-immediat-24h',
  'deménagement-instantané': 'demenagement-instantane',
  'deménagement-instantané-24h': 'demenagement-instantane-24h',
  'deménagement-métro': 'demenagement-metro',
  'deménagement-moto': 'demenagement-moto',
  'deménagement-rapide': 'demenagement-rapide',
  'deménagement-remonte-pente': 'demenagement-remonte-pente',
  'deménagement-téléphérique': 'demenagement-telepherique',
  'deménagement-télésiège': 'demenagement-telesiege',
  'deménagement-téléski': 'demenagement-teleski',
  'deménagement-train': 'demenagement-train',
  'deménagement-tram': 'demenagement-tram',
  'deménagement-trolley': 'demenagement-trolley',
  'deménagement-ultra-rapide': 'demenagement-ultra-rapide',
  'deménagement-ultra-rapide-24h': 'demenagement-ultra-rapide-24h',
  'deménagement-urgence': 'demenagement-urgence',
  'deménagement-urgent': 'demenagement-urgent',
  'deménagement-urgent-24h': 'demenagement-urgent-24h',
  'deménagement-vélo': 'demenagement-velo',
  'deménagement-voiture': 'demenagement-voiture',
  'deménagement-weekend': 'demenagement-weekend',
  'devis-deménagement': 'devis-demenagement',
  'emballage-deménagement': 'emballage-demenagement',
  'équipe-deménagement': 'equipe-demenagement',
  'garantie-deménagement': 'garantie-demenagement',
  'matériel-deménagement': 'materiel-demenagement',
  'nettoyage-deménagement': 'nettoyage-demenagement',
  'satisfaction-deménagement': 'satisfaction-demenagement',
  
  // Gestion des catégories avec espaces (fallback)
  'Déménagement entreprise': 'entreprise',
  'Déménagement étudiant': 'etudiant',
  'Déménagement piano': 'piano',
  'Déménagement international': 'international',
  'Déménagement économique': 'pas-cher'
};

// Fonction pour extraire la catégorie du chemin du fichier
function extractCategoryFromPath(filePath: string): string {
  const pathParts = filePath.split('/');
  const categoryDir = pathParts[pathParts.length - 2]; // Le dossier parent du fichier .md
  return categoryDir || 'default';
}

export interface BlogPost {
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  category: string;
  type: 'pilier' | 'satellite';
  keywords: string[];
  word_count: number;
  publish_date: string;
  featured: boolean;
  content: string;
  // URLs optimisées (nouvelles URLs propres)
  cleanSlug: string;
  cleanCategory: string;
}

// Fonction pour nettoyer les slugs
function cleanSlug(originalSlug: string, category: string): string {
  // Retirer le préfixe de catégorie redondant
  let cleanSlug = originalSlug;
  
  // Patterns de nettoyage spécifiques (ordre important!)
    const cleanPatterns = [
    // D'abord, retirer les préfixes de catégorie complets
    { from: /^demenagement-etudiant-toulouse-/, to: '' },
    { from: /^demenagement-entreprise-toulouse-/, to: '' },
    { from: /^demenagement-piano-toulouse-/, to: '' },
    { from: /^demenagement-international-toulouse-/, to: '' },
    { from: /^demenagement-longue-distance-toulouse-/, to: '' },
    { from: /^demenagement-pas-cher-toulouse-/, to: '' },
    { from: /^demenagement-urgent-toulouse-/, to: '' },
    { from: /^devis-demenagement-toulouse-/, to: '' },
    { from: /^garde-meuble-toulouse-/, to: '' },
    { from: /^prix-demenagement-toulouse-/, to: '' },
    { from: /^prix-demenagement-piano-toulouse-/, to: '' },
    { from: /^prix-garde-meuble-toulouse-/, to: '' },
    // Ensuite, retirer les patterns partiels en début
    { from: /^stockage-etudiant-toulouse/, to: 'stockage-etudiant' },
    { from: /^cartons-gratuits-toulouse/, to: 'cartons-gratuits' },
    { from: /^camion-demenagement-etudiant-toulouse/, to: 'camion-demenagement-etudiant' },
    { from: /^assurance-demenagement-international-toulouse/, to: 'assurance-demenagement-international' },
    { from: /^prix-demenagement-international-toulouse/, to: 'prix-demenagement-international' },
    { from: /^emballage-demenagement-international-toulouse/, to: 'emballage-demenagement-international' },
    { from: /^formalites-douanieres-demenagement-international-toulouse/, to: 'formalites-douanieres-demenagement-international' },
    // Retirer "-toulouse" en milieu de slug
    { from: /-toulouse-/, to: '-' },
    // Retirer "-toulouse" en fin
    // { from: /-toulouse$/, to: '' },  // ✅ Option B: Garder ville dans slug (SEO local)
    // Simplifications uniformes
    { from: /-guide-complet$/, to: '-guide' },
    { from: /-reperes-2025$/, to: '' },  // Retirer complètement pour éviter duplicates
  ];

  cleanPatterns.forEach(pattern => {
    cleanSlug = cleanSlug.replace(pattern.from, pattern.to);
  });

  return cleanSlug;
}

export function getAllBlogPosts(): BlogPost[] {
  const monorepoDir = path.join(process.cwd(), 'sites/toulouse/content/blog');
  const standaloneDir = path.join(process.cwd(), 'content/blog');
  const blogDirectory = fs.existsSync(monorepoDir)
    ? monorepoDir
    : (fs.existsSync(standaloneDir) ? standaloneDir : null);

  if (!blogDirectory) {
    return [];
  }
  const categories = fs.readdirSync(blogDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const allPosts: BlogPost[] = [];

  categories.forEach(category => {
    const categoryPath = path.join(blogDirectory, category);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md');

    files.forEach(file => {
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      const originalSlug = data.slug || file.replace('.md', '');
      
      // Utiliser la catégorie du frontmatter ou extraire du chemin
      const category = data.category || extractCategoryFromPath(filePath);
      const cleanCategorySlug = cleanSlug(originalSlug, category);
      const cleanCategory = CATEGORY_MAPPING[category as keyof typeof CATEGORY_MAPPING] || category;

      // Gérer les keywords (peuvent être string ou array)
      let keywordsArray: string[] = [];
      if (data.keywords) {
        if (typeof data.keywords === 'string') {
          keywordsArray = data.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
        } else if (Array.isArray(data.keywords)) {
          keywordsArray = data.keywords;
        }
      }

      // Détection automatique du type si non spécifié
      let postType: 'pilier' | 'satellite' = data.type || 'satellite';
      if (!data.type) {
        // Si le dossier s'appelle "satellites", c'est un satellite
        if (category === 'satellites') {
          postType = 'satellite';
        }
        // Sinon si le fichier contient "guide-complet" ou "guide.md", c'est un pilier
        else if (file.includes('guide-complet') || file.includes('guide.md') || data.featured === true) {
          postType = 'pilier';
        }
      }

      allPosts.push({
        slug: originalSlug,
        title: data.title,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        h1: data.h1,
        category: category,
        type: postType,
        keywords: keywordsArray,
        word_count: data.word_count || content.split(/\s+/).filter(word => word.length > 0).length,
        publish_date: data.publish_date || data.date || new Date().toISOString().split('T')[0],
        featured: data.featured || false,
        content,
        // URLs optimisées
        cleanSlug: cleanCategorySlug,
        cleanCategory,
      });
    });
  });

  return allPosts.sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());
}

// Fonction pour trouver un article par son nouveau slug
export function getBlogPostByCleanSlug(cleanCategory: string, cleanSlug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.cleanCategory === cleanCategory && post.cleanSlug === cleanSlug) || null;
}

// Fonction legacy pour compatibilité
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.category === category);
}

// Nouvelle fonction pour les catégories propres
export function getBlogPostsByCleanCategory(cleanCategory: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.cleanCategory === cleanCategory);
}

export function getPilierPosts(): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.type === 'pilier');
}

export function getFeaturedPosts(): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.featured);
}
