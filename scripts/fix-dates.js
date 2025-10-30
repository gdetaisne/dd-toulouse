#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Dates échelonnées réalistes (2024-2025)
const dates = [
  '2024-01-15', '2024-01-22', '2024-02-05', '2024-02-12', '2024-02-19',
  '2024-03-05', '2024-03-12', '2024-03-19', '2024-04-02', '2024-04-09',
  '2024-04-16', '2024-05-07', '2024-05-14', '2024-05-21', '2024-06-04',
  '2024-06-11', '2024-06-18', '2024-07-02', '2024-07-09', '2024-07-16',
  '2024-08-06', '2024-08-13', '2024-08-20', '2024-09-03', '2024-09-10',
  '2024-09-17', '2024-10-01', '2024-10-08'
];

// Lire la liste des fichiers sans dates
const filesWithoutDates = fs.readFileSync('/tmp/files_without_dates.txt', 'utf8')
  .trim()
  .split('\n')
  .filter(file => file.length > 0);

console.log(`🔧 Correction des dates pour ${filesWithoutDates.length} articles\n`);

filesWithoutDates.forEach((filePath, index) => {
  if (index >= dates.length) {
    console.log(`⚠️  Plus de dates disponibles pour ${filePath}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const date = dates[index];
    
    // Vérifier si le fichier a déjà un frontmatter
    if (content.startsWith('---')) {
      // Trouver la fin du frontmatter
      const frontmatterEnd = content.indexOf('---', 3);
      if (frontmatterEnd !== -1) {
        // Insérer la date dans le frontmatter
        const frontmatter = content.substring(0, frontmatterEnd + 3);
        const body = content.substring(frontmatterEnd + 3);
        
        // Vérifier si date existe déjà
        if (!frontmatter.includes('date:') && !frontmatter.includes('publish_date:')) {
          // Insérer après title ou en fin de frontmatter
          const insertPosition = frontmatter.lastIndexOf('---');
          const newFrontmatter = frontmatter.substring(0, insertPosition) + 
            `date: "${date}"\n` + 
            frontmatter.substring(insertPosition);
          
          fs.writeFileSync(filePath, newFrontmatter + body);
          console.log(`✅ ${date} → ${filePath}`);
        } else {
          console.log(`⚠️  Date déjà présente dans ${filePath}`);
        }
      }
    } else {
      console.log(`⚠️  Pas de frontmatter dans ${filePath}`);
    }
  } catch (error) {
    console.log(`❌ Erreur avec ${filePath}: ${error.message}`);
  }
});

console.log('\n🎉 Correction des dates terminée !');
