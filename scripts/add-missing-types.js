const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function updateArticleType(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdown } = matter(content);
    
    // Si l'article n'a pas de type défini, lui donner type "satellite"
    if (!data.type) {
      data.type = 'satellite';
      
      const newContent = matter.stringify(markdown, data);
      fs.writeFileSync(filePath, newContent, 'utf8');
      
      console.log(`✓ Added type: satellite to ${path.basename(filePath)}`);
      return true;
    } else {
      console.log(`  ${path.basename(filePath)} already has type: ${data.type}`);
      return false;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processCategory(categoryPath) {
  const categoryFolder = path.basename(categoryPath);
  let updated = 0;
  
  const files = fs.readdirSync(categoryPath)
    .filter(file => file.endsWith('.md') && file !== 'README.md');
  
  console.log(`\n📁 ${categoryFolder} (${files.length} articles)`);
  console.log('─'.repeat(60));
  
  files.forEach(file => {
    const filePath = path.join(categoryPath, file);
    if (updateArticleType(filePath)) {
      updated++;
    }
  });
  
  if (updated === 0) {
    console.log('  ✓ All articles already have a type');
  }
  
  return updated;
}

// Main execution
const blogDirectory = path.join(process.cwd(), 'content', 'blog');
console.log('🔄 Adding missing article types...');
console.log('═'.repeat(60));

const categories = fs.readdirSync(blogDirectory, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let totalUpdated = 0;

categories.forEach(category => {
  const categoryPath = path.join(blogDirectory, category);
  totalUpdated += processCategory(categoryPath);
});

console.log('\n' + '═'.repeat(60));
console.log(`✅ Completed! Added type to ${totalUpdated} articles`);

