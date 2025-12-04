#!/usr/bin/env node

/**
 * Analyse complète de la structure du blog Lille
 * - Lit tous les frontmatters
 * - Génère le mapping slug → URL réelle
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../');
const domain = 'https://devis-demenageur-toulousain.fr';

// CATEGORY_MAPPING (copié de lib/blog.ts)
const CATEGORY_MAPPING = {
  'déménagement-economique': 'pas-cher',
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
  // Gestion des catégories avec espaces (fallback)
  'Déménagement entreprise': 'entreprise',
  'Déménagement étudiant': 'etudiant',
  'Déménagement piano': 'piano',
  'Déménagement international': 'international',
  'Déménagement économique': 'pas-cher'
};

// cleanSlug (VRAIE logique de lib/blog.ts Lille)
function cleanSlug(originalSlug) {
  let cleanSlug = originalSlug;
  
  // Lille utilise les patterns Bordeaux qui ne font rien pour Lille
  // Seuls patterns actifs pour Lille:
  cleanSlug = cleanSlug.replace(/-guide-complet$/, '-guide');
  cleanSlug = cleanSlug.replace(/-reperes-2025$/, '');
  
  return cleanSlug;
}

// Analyse un fichier markdown
function analyzeMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);
  
  const fileName = path.basename(filePath, '.md');
  // Utiliser slug frontmatter si présent (comme blog.ts ligne 124)
  const originalSlug = data.slug || fileName;
  const category = data.category || 'default';
  
  // Appliquer CATEGORY_MAPPING
  const cleanCategory = CATEGORY_MAPPING[category] || category;
  
  // Appliquer cleanSlug
  const slug = cleanSlug(originalSlug);
  
  // Construire l'URL
  const url = `/blog/${cleanCategory}/${slug}/`;
  
  return {
    file: filePath.replace(root, ''),
    fileName: fileName,
    originalSlug: originalSlug,
    cleanSlug: slug,
    category,
    cleanCategory,
    url,
    fullUrl: `${domain}${url}`
  };
}

// Main
console.log('🔍 Analyse de la structure du blog Lille\n');

const blogDir = path.join(root, 'content/blog');
const allFiles = [];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.md') && file !== 'README.md') {
      allFiles.push(filePath);
    }
  });
}

walkDir(blogDir);

console.log(`📁 ${allFiles.length} articles trouvés\n`);

// Analyser tous les fichiers
const mapping = {};
const urls = [];

allFiles.forEach(file => {
  const result = analyzeMarkdownFile(file);
  mapping[result.originalSlug] = result;
  urls.push(result);
});

// Statistiques par catégorie
const categoryStats = {};
urls.forEach(item => {
  if (!categoryStats[item.category]) {
    categoryStats[item.category] = 0;
  }
  categoryStats[item.category]++;
});

console.log('📊 Répartition par catégorie:\n');
Object.entries(categoryStats)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    const cleanCat = CATEGORY_MAPPING[cat] || cat;
    console.log(`  ${cat.padEnd(40)} → ${cleanCat.padEnd(30)} (${count} articles)`);
  });

// Sauvegarder le mapping
const outputPath = path.join(__dirname, 'blog-url-mapping.json');
fs.writeFileSync(
  outputPath,
  JSON.stringify(mapping, null, 2),
  'utf8'
);

console.log(`\n✅ Mapping sauvegardé: ${outputPath}`);
console.log(`\n📝 ${urls.length} URLs générées`);

// Afficher quelques exemples
console.log('\n📌 Exemples de mapping:');
urls.slice(0, 10).forEach(item => {
  console.log(`  ${item.originalSlug.padEnd(50)} → ${item.url}`);
});
