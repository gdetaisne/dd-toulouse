#!/usr/bin/env node

/**
 * Correction des liens 404 dans 
 * Utilise UNIQUEMENT le mapping JSON généré
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../');

// Charger le mapping
const mappingPath = path.join(__dirname, 'blog-url-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Guides principaux avec category: "demenagement-toulouse"
const guides = Object.values(mapping).filter(item => item.category === 'demenagement-toulouse');

console.log(`🔍 ${guides.length} guides principaux identifiés\n`);

// Construire les corrections
const corrections = {};

guides.forEach(guide => {
  const oldSlug = guide.originalSlug;
  const correctUrl = guide.url.replace(/\/$/, ''); // Sans trailing slash pour markdown
  
  // Patterns basés sur les dossiers (faux)
  const dossier = guide.file.split('/')[2]; // Ex: "garde-meuble-lille", "demenageur-lille"
  
  // Les liens cassés utilisent le dossier au lieu de "demenagement-lille"
  if (dossier && dossier !== 'satellites') {
    const wrongUrl = `/blog/${dossier}/${oldSlug}`;
    corrections[wrongUrl] = correctUrl;
  }
});

console.log('📝 Corrections à appliquer:\n');
Object.entries(corrections).forEach(([from, to]) => {
  console.log(`  ${from} → ${to}`);
});

// Parcourir tous les fichiers
const blogDir = path.join(root, 'content/blog');
let totalCorrections = 0;
let filesModified = 0;

function fixLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fileCorrections = 0;
  
  Object.entries(corrections).forEach(([from, to]) => {
    // Chercher le pattern dans markdown: ]({from})
    const searchPattern = `](${from})`;
    if (content.includes(searchPattern)) {
      const replacePattern = `](${to})`;
      const regex = new RegExp(searchPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = (content.match(regex) || []).length;
      
      if (matches > 0) {
        content = content.replace(regex, replacePattern);
        fileCorrections += matches;
        modified = true;
      }
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    totalCorrections += fileCorrections;
    console.log(`✅ ${path.relative(root, filePath)}: ${fileCorrections} corrections`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.md') && file !== 'README.md') {
      fixLinksInFile(filePath);
    }
  });
}

console.log('\n🔧 Application des corrections...\n');
walkDir(blogDir);

console.log(`\n✅ Terminé!`);
console.log(`📝 ${filesModified} fichiers modifiés`);
console.log(`🔗 ${totalCorrections} liens corrigés`);

