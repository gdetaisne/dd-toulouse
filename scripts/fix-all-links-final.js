const fs = require('fs');
const path = require('path');

// Tous les mappings de liens à corriger
const linkMappings = {
  // Self-stockage
  '/blog/garde-meuble/self-stockage-toulouse-mode-emploi-prix': '/blog/garde-meuble/self-stockage-mode-emploi-prix',
  
  // Etudiant
  '/blog/etudiant/cartons-gratuits-toulouse': '/blog/etudiant/cartons-gratuits',
  '/blog/etudiant/stockage-etudiant-toulouse': '/blog/etudiant/stockage-etudiant',
  '/blog/etudiant/camion-demenagement-etudiant-toulouse': '/blog/etudiant/camion-demenagement-etudiant',
  
  // Urgent
  '/blog/urgent/demenager-48h-toulouse-realites-solutions': '/blog/urgent/demenager-48h-realites-solutions',
  
  // Prix garde-meuble
  '/blog/prix/prix-garde-meuble-toulouse-solutions-tarifs': '/blog/prix/prix-garde-meuble-solutions-tarifs',
  
  // International
  '/blog/international/assurance-demenagement-international-toulouse': '/blog/international/assurance-demenagement-international',
  '/blog/international/prix-demenagement-international-toulouse': '/blog/international/prix-demenagement-international',
  '/blog/international/emballage-demenagement-international-toulouse': '/blog/international/emballage-demenagement-international',
  '/blog/international/formalites-douanieres-demenagement-international-toulouse': '/blog/international/formalites-douanieres-demenagement-international',
};

function fixLinksInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = content;
    let changes = 0;

    Object.entries(linkMappings).forEach(([oldUrl, newUrl]) => {
      const regex = new RegExp(`\\]\\(${oldUrl.replace(/\//g, '\\/')}\\)`, 'g');
      const matches = modified.match(regex);
      
      if (matches) {
        modified = modified.replace(regex, `](${newUrl})`);
        changes += matches.length;
      }
    });

    if (changes > 0) {
      fs.writeFileSync(filePath, modified, 'utf8');
      console.log(`✓ Fixed ${changes} links in ${path.basename(filePath)}`);
      return changes;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return 0;
  }
}

function processDirectory(dirPath) {
  let totalFixed = 0;
  
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      totalFixed += processDirectory(fullPath);
    } else if (item.isFile() && item.name.endsWith('.md') && item.name !== 'README.md') {
      totalFixed += fixLinksInFile(fullPath);
    }
  });
  
  return totalFixed;
}

// Main execution
const blogContentPath = path.join(process.cwd(), 'content', 'blog');
console.log('Fixing all remaining broken links...');
console.log('---');

const totalFixed = processDirectory(blogContentPath);

console.log('---');
console.log(`✓ Completed! Fixed ${totalFixed} broken links.`);

