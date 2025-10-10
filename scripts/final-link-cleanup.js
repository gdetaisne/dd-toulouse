const fs = require('fs');
const path = require('path');

function cleanupFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = content;
    let changes = 0;

    // Fix malformed links like "[text" → text without link
    // Cas 1: "[déménagement étudiant" sans fermeture ni lien -> ajouter fermeture et lien
    const brokenLinkPatterns = [
      { 
        pattern: /\[déménagement étudiant(?!\])/g, 
        replacement: '[déménagement étudiant](', 
        url: '/blog/etudiant/guide)',
        fullReplacement: '[déménagement étudiant](/blog/etudiant/guide)'
      },
      { 
        pattern: /\[self-stockage(?!\])/g, 
        replacement: 'self-stockage'  // Retirer le [ cassé
      }
    ];

    brokenLinkPatterns.forEach(({pattern, replacement, url, fullReplacement}) => {
      const matches = modified.match(pattern);
      if (matches) {
        if (fullReplacement) {
          modified = modified.replace(pattern, fullReplacement);
        } else {
          modified = modified.replace(pattern, replacement);
        }
        changes += matches.length;
      }
    });

    // Fix les liens auto-référentiels (un article qui pointe vers lui-même)
    const fileName = path.basename(filePath, '.md');
    const categoryFolder = path.basename(path.dirname(filePath));
    
    const categoryMapping = {
      'demenagement-etudiant-toulouse': 'etudiant',
      'demenagement-entreprise-toulouse': 'entreprise',
      'garde-meuble-toulouse': 'garde-meuble',
      'demenagement-urgent-toulouse': 'urgent',
      'prix-demenagement-toulouse': 'prix',
    };
    
    const cleanCategory = categoryMapping[categoryFolder] || categoryFolder;
    
    // Clean le slug
    let cleanSlug = fileName;
    const patterns = [
      'demenagement-etudiant-toulouse-',
      'garde-meuble-toulouse-',
      'demenagement-urgent-toulouse-',
      'prix-garde-meuble-toulouse-',
    ];
    
    patterns.forEach(pattern => {
      if (cleanSlug.startsWith(pattern)) {
        cleanSlug = cleanSlug.replace(pattern, '');
      }
    });
    
    cleanSlug = cleanSlug.replace(/-toulouse$/i, '');
    cleanSlug = cleanSlug.replace(/-guide-complet$/i, '-guide');
    
    const selfUrl = `/blog/${cleanCategory}/${cleanSlug}`;
    
    // Retirer les liens auto-référentiels (transformer en texte normal)
    const selfLinkRegex = new RegExp(`\\[([^\\]]+)\\]\\(${selfUrl.replace(/\//g, '\\/')}\\)`, 'g');
    const selfLinkMatches = modified.match(selfLinkRegex);
    if (selfLinkMatches) {
      modified = modified.replace(selfLinkRegex, '$1');
      changes += selfLinkMatches.length;
    }

    if (changes > 0) {
      fs.writeFileSync(filePath, modified, 'utf8');
      console.log(`✓ Cleaned up ${changes} issues in ${path.basename(filePath)}`);
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
      totalFixed += cleanupFile(fullPath);
    }
  });
  
  return totalFixed;
}

// Main execution
const blogContentPath = path.join(process.cwd(), 'content', 'blog');
console.log('Final cleanup of blog links...');
console.log('Starting directory:', blogContentPath);
console.log('---');

const totalFixed = processDirectory(blogContentPath);

console.log('---');
console.log(`✓ Completed! Cleaned up ${totalFixed} link issues.`);

