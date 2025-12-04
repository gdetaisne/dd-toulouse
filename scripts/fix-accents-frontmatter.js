#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Mapping des corrections à faire
const replacements = {
  'category: "deménagement-economique"': 'category: "demenagement-economique"',
  'category: "déménagement-economique"': 'category: "demenagement-economique"',
  'category: "deménagement-etudiant"': 'category: "demenagement-etudiant"',
  'category: "déménagement-etudiant"': 'category: "demenagement-etudiant"',
  'category: "deménagement-entreprise"': 'category: "demenagement-entreprise"',
  'category: "déménagement-entreprise"': 'category: "demenagement-entreprise"',
  'category: "prix-deménagement"': 'category: "prix-demenagement"',
  'category: "prix-déménagement"': 'category: "prix-demenagement"',
  'category: "aide-deménagement"': 'category: "aide-demenagement"',
  'category: "aide-déménagement"': 'category: "aide-demenagement"',
  'category: "deménageur-professionnel"': 'category: "demenageur-professionnel"',
  'category: "déménageur-professionnel"': 'category: "demenageur-professionnel"',
  'category: "emballage-deménagement"': 'category: "emballage-demenagement"',
  'category: "emballage-déménagement"': 'category: "emballage-demenagement"',
  'category: "équipe-deménagement"': 'category: "equipe-demenagement"',
  'category: "équipe-déménagement"': 'category: "equipe-demenagement"',
  'category: "satisfaction-deménagement"': 'category: "satisfaction-demenagement"',
  'category: "satisfaction-déménagement"': 'category: "satisfaction-demenagement"',
  'category: "nettoyage-deménagement"': 'category: "nettoyage-demenagement"',
  'category: "nettoyage-déménagement"': 'category: "nettoyage-demenagement"',
  'category: "matériel-deménagement"': 'category: "materiel-demenagement"',
  'category: "matériel-déménagement"': 'category: "materiel-demenagement"',
  'category: "garantie-deménagement"': 'category: "garantie-demenagement"',
  'category: "garantie-déménagement"': 'category: "garantie-demenagement"',
  'category: "débarras-deménagement"': 'category: "debarras-demenagement"',
  'category: "débarras-déménagement"': 'category: "debarras-demenagement"',
  'category: "devis-deménagement"': 'category: "devis-demenagement"',
  'category: "devis-déménagement"': 'category: "devis-demenagement"',
  'category: "deménagement-éclair-24h"': 'category: "demenagement-eclair-24h"',
  'category: "déménagement-éclair-24h"': 'category: "demenagement-eclair-24h"',
  'category: "deménagement-éclair"': 'category: "demenagement-eclair"',
  'category: "déménagement-éclair"': 'category: "demenagement-eclair"',
  'category: "deménagement-téléski"': 'category: "demenagement-teleski"',
  'category: "déménagement-téléski"': 'category: "demenagement-teleski"',
  // Ajouter d'autres variantes si nécessaire
};

function fixAccentsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [from, to] of Object.entries(replacements)) {
      if (content.includes(from)) {
        content = content.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
        modified = true;
        console.log(`  ✓ ${path.basename(filePath)}: ${from} → ${to}`);
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return 1;
    }
    return 0;
  } catch (error) {
    console.error(`  ✗ Erreur sur ${filePath}:`, error.message);
    return 0;
  }
}

function scanDirectory(dir) {
  let fixedCount = 0;
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      fixedCount += scanDirectory(fullPath);
    } else if (file.name.endsWith('.md') && file.name !== 'README.md') {
      fixedCount += fixAccentsInFile(fullPath);
    }
  }

  return fixedCount;
}

console.log('🔧 Correction des accents dans les frontmatter Toulouse\n');

const blogDir = path.join(__dirname, '../content/blog');
const fixedCount = scanDirectory(blogDir);

console.log(`\n✅ Terminé : ${fixedCount} fichier(s) modifié(s)`);

