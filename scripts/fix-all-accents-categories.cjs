const fs = require('fs');
const path = require('path');

const satellitesDir = path.join(__dirname, '../content/blog/satellites');

// Mapping accents → sans accents
const replacements = [
  { from: 'assurance-deménagement', to: 'assurance-demenagement' },
  { from: 'avis-deménagement', to: 'avis-demenagement' },
  { from: 'contact-deménagement', to: 'contact-demenagement' },
  { from: 'deménagement-avion', to: 'demenagement-avion' },
  { from: 'deménagement-ascenseur', to: 'demenagement-ascenseur' },
  { from: 'deménagement-bateau', to: 'demenagement-bateau' },
  { from: 'deménagement-bus', to: 'demenagement-bus' },
  { from: 'deménagement-camion', to: 'demenagement-camion' },
  { from: 'deménagement-escalier', to: 'demenagement-escalier' },
  { from: 'deménagement-express', to: 'demenagement-express' },
  { from: 'deménagement-express-24h', to: 'demenagement-express-24h' },
  { from: 'deménagement-express-critique', to: 'demenagement-express-critique' },
  { from: 'deménagement-express-nuit', to: 'demenagement-express-nuit' },
  { from: 'deménagement-express-soir', to: 'demenagement-express-soir' },
  { from: 'deménagement-express-urgent', to: 'demenagement-express-urgent' },
  { from: 'deménagement-express-weekend', to: 'demenagement-express-weekend' },
  { from: 'deménagement-flash', to: 'demenagement-flash' },
  { from: 'deménagement-funiculaire', to: 'demenagement-funiculaire' },
  { from: 'deménagement-hélicoptère', to: 'demenagement-helicoptere' },
  { from: 'deménagement-immédiat', to: 'demenagement-immediat' },
  { from: 'deménagement-immédiat-24h', to: 'demenagement-immediat-24h' },
  { from: 'deménagement-instantané', to: 'demenagement-instantane' },
  { from: 'deménagement-instantané-24h', to: 'demenagement-instantane-24h' },
  { from: 'deménagement-métro', to: 'demenagement-metro' },
  { from: 'deménagement-moto', to: 'demenagement-moto' },
  { from: 'deménagement-rapide', to: 'demenagement-rapide' },
  { from: 'deménagement-remonte-pente', to: 'demenagement-remonte-pente' },
  { from: 'deménagement-téléphérique', to: 'demenagement-telepherique' },
  { from: 'deménagement-télésiège', to: 'demenagement-telesiege' },
  { from: 'deménagement-tram', to: 'demenagement-tram' },
  { from: 'deménagement-train', to: 'demenagement-train' },
  { from: 'deménagement-trolley', to: 'demenagement-trolley' },
  { from: 'deménagement-ultra-rapide', to: 'demenagement-ultra-rapide' },
  { from: 'deménagement-ultra-rapide-24h', to: 'demenagement-ultra-rapide-24h' },
  { from: 'deménagement-urgent', to: 'demenagement-urgent' },
  { from: 'deménagement-urgent-24h', to: 'demenagement-urgent-24h' },
  { from: 'deménagement-urgence', to: 'demenagement-urgence' },
  { from: 'deménagement-vélo', to: 'demenagement-velo' },
  { from: 'deménagement-voiture', to: 'demenagement-voiture' },
  { from: 'deménagement-weekend', to: 'demenagement-weekend' },
];

let totalFiles = 0;
let totalReplacements = 0;

const files = fs.readdirSync(satellitesDir).filter(f => f.endsWith('.md'));

files.forEach(filename => {
  const filepath = path.join(satellitesDir, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = false;
  
  replacements.forEach(({ from, to }) => {
    const regex = new RegExp(`category: "${from}"`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `category: "${to}"`);
      modified = true;
      totalReplacements++;
      console.log(`  ✅ ${filename}: ${from} → ${to}`);
    }
  });
  
  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    totalFiles++;
  }
});

console.log('');
console.log('════════════════════════════════════════════════');
console.log(`✅ TERMINÉ: ${totalFiles} fichiers modifiés`);
console.log(`   ${totalReplacements} catégories corrigées`);
console.log('════════════════════════════════════════════════');

