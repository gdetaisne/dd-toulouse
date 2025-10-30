#!/usr/bin/env node

const { getAllBlogPosts } = require('../lib/blog.ts');

console.log('🔍 Test des nouvelles URLs du blog\n');

const posts = getAllBlogPosts();

console.log('📊 Résumé:');
console.log(`- Total articles: ${posts.length}`);
console.log(`- Catégories uniques: ${new Set(posts.map(p => p.cleanCategory)).size}\n`);

console.log('📝 Exemples de nouvelles URLs:\n');

// Afficher quelques exemples
posts.slice(0, 10).forEach(post => {
  const newUrl = `/blog/${post.cleanCategory}/${post.cleanSlug}`;
  console.log(`✅ ${newUrl}`);
  console.log(`   Titre: ${post.title}`);
  console.log(`   Catégorie: ${post.category} → ${post.cleanCategory}`);
  console.log(`   Slug: ${post.slug} → ${post.cleanSlug}\n`);
});

// Vérifier les doublons
const urls = posts.map(p => `/blog/${p.cleanCategory}/${p.cleanSlug}`);
const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index);

if (duplicates.length > 0) {
  console.log('⚠️  URLs dupliquées détectées:');
  duplicates.forEach(url => console.log(`   ${url}`));
} else {
  console.log('✅ Aucune URL dupliquée détectée');
}

// Statistiques des longueurs d'URLs
const lengths = urls.map(url => url.length);
const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
const maxLength = Math.max(...lengths);

console.log(`\n📏 Statistiques des URLs:`);
console.log(`   Longueur moyenne: ${avgLength.toFixed(1)} caractères`);
console.log(`   Longueur maximale: ${maxLength} caractères`);
console.log(`   URLs > 80 chars: ${lengths.filter(l => l > 80).length}`);
