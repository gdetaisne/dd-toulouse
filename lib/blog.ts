import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Mapping des catégories pour URLs courtes
const CATEGORY_MAPPING = {
  'demenagement-etudiant-toulouse': 'etudiant',
  'demenagement-entreprise-toulouse': 'entreprise', 
  'demenagement-piano-toulouse': 'piano',
  'demenagement-international-toulouse': 'international',
  'demenagement-longue-distance-toulouse': 'longue-distance',
  'demenagement-pas-cher-toulouse': 'pas-cher',
  'demenagement-urgent-toulouse': 'urgent',
  'devis-demenagement-toulouse': 'devis',
  'garde-meuble-toulouse': 'garde-meuble',
  'prix-demenagement-toulouse': 'prix',
  'prix-demenagement-piano-toulouse': 'prix-piano',
  // Gestion des catégories avec espaces (fallback)
  'Déménagement entreprise': 'entreprise',
  'Déménagement étudiant': 'etudiant',
  'Déménagement piano': 'piano',
  'Déménagement international': 'international'
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
    { from: /-toulouse$/, to: '' },
    // Retirer les doublons et simplifications
    { from: /-guide-complet$/, to: '-guide' },
    { from: /-reperes-2025$/, to: '-2025' }
  ];

  cleanPatterns.forEach(pattern => {
    cleanSlug = cleanSlug.replace(pattern.from, pattern.to);
  });

  return cleanSlug;
}

export function getAllBlogPosts(): BlogPost[] {
  const blogDirectory = path.join(process.cwd(), 'content/blog');
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

      allPosts.push({
        slug: originalSlug,
        title: data.title,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        h1: data.h1,
        category: category,
        type: data.type,
        keywords: keywordsArray,
        word_count: data.word_count,
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
