// Liste simplifiée des codes postaux français pour autocomplete ultra-rapide
// Format: { "17290": ["Aigrefeuille-d'Aunis", "Le Thou", "Thairé", ...] }

export const FRENCH_POSTCODES: Record<string, string[]> = {
  // Charente-Maritime (17)
  "17000": ["La Rochelle"],
  "17290": ["Aigrefeuille-d'Aunis", "Le Thou", "Thairé", "Ciré-d'Aunis", "Forges"],
  "17137": ["Nieul-sur-Mer", "L'Houmeau"],
  "17138": ["Puilboreau"],
  "17180": ["Périgny"],
  "17340": ["Yves", "Châtelaillon-Plage"],
  "17440": ["Aytré"],
  
  // Gironde (33)
  "33000": ["Bordeaux"],
  "33100": ["Bordeaux"],
  "33200": ["Bordeaux"],
  "33300": ["Bordeaux"],
  "33700": ["Mérignac"],
  "33130": ["Bègles"],
  "33150": ["Cenon"],
  "33170": ["Gradignan"],
  "33270": ["Floirac"],
  "33400": ["Talence"],
  "33600": ["Pessac"],
  "33800": ["Bordeaux"],
  
  // Haute-Garonne (31)
  "31000": ["Toulouse"],
  "31100": ["Toulouse"],
  "31200": ["Toulouse"],
  "31300": ["Toulouse"],
  "31400": ["Toulouse"],
  "31500": ["Toulouse"],
  "31120": ["Portet-sur-Garonne"],
  "31140": ["Launaguet", "Aucamville"],
  "31150": ["Bruguières"],
  "31170": ["Tournefeuille"],
  "31200": ["Toulouse"],
  "31240": ["L'Union", "Saint-Jean"],
  "31270": ["Cugnaux", "Villeneuve-Tolosane"],
  "31300": ["Toulouse"],
  "31400": ["Toulouse"],
  "31520": ["Ramonville-Saint-Agne"],
  
  // Rhône (69)
  "69001": ["Lyon 1er"],
  "69002": ["Lyon 2e"],
  "69003": ["Lyon 3e"],
  "69004": ["Lyon 4e"],
  "69005": ["Lyon 5e"],
  "69006": ["Lyon 6e"],
  "69007": ["Lyon 7e"],
  "69008": ["Lyon 8e"],
  "69009": ["Lyon 9e"],
  "69100": ["Villeurbanne"],
  "69200": ["Vénissieux"],
  "69300": ["Caluire-et-Cuire"],
  "69500": ["Bron"],
  
  // Bouches-du-Rhône (13)
  "13001": ["Marseille 1er"],
  "13002": ["Marseille 2e"],
  "13003": ["Marseille 3e"],
  "13004": ["Marseille 4e"],
  "13005": ["Marseille 5e"],
  "13006": ["Marseille 6e"],
  "13007": ["Marseille 7e"],
  "13008": ["Marseille 8e"],
  "13009": ["Marseille 9e"],
  "13010": ["Marseille 10e"],
  "13011": ["Marseille 11e"],
  "13012": ["Marseille 12e"],
  "13013": ["Marseille 13e"],
  "13014": ["Marseille 14e"],
  "13015": ["Marseille 15e"],
  "13016": ["Marseille 16e"],
  "13090": ["Aix-en-Provence"],
  "13100": ["Aix-en-Provence"],
  
  // Alpes-Maritimes (06)
  "06000": ["Nice"],
  "06100": ["Nice"],
  "06200": ["Nice"],
  "06300": ["Nice"],
  "06400": ["Cannes"],
  "06150": ["Cannes"],
  "06160": ["Antibes", "Juan-les-Pins"],
  
  // Paris (75)
  "75001": ["Paris 1er"],
  "75002": ["Paris 2e"],
  "75003": ["Paris 3e"],
  "75004": ["Paris 4e"],
  "75005": ["Paris 5e"],
  "75006": ["Paris 6e"],
  "75007": ["Paris 7e"],
  "75008": ["Paris 8e"],
  "75009": ["Paris 9e"],
  "75010": ["Paris 10e"],
  "75011": ["Paris 11e"],
  "75012": ["Paris 12e"],
  "75013": ["Paris 13e"],
  "75014": ["Paris 14e"],
  "75015": ["Paris 15e"],
  "75016": ["Paris 16e"],
  "75017": ["Paris 17e"],
  "75018": ["Paris 18e"],
  "75019": ["Paris 19e"],
  "75020": ["Paris 20e"],
};

// Fonction de recherche instantanée
export function searchPostcode(query: string): Array<{ postcode: string; city: string; label: string }> {
  const q = query.toLowerCase().trim();
  
  if (q.length < 5) return [];
  
  const results: Array<{ postcode: string; city: string; label: string }> = [];
  
  // Chercher par code postal exact
  const cities = FRENCH_POSTCODES[q];
  if (cities) {
    cities.forEach(city => {
      results.push({
        postcode: q,
        city,
        label: `${q} ${city}`,
      });
    });
  }
  
  return results.slice(0, 5); // Limiter à 5 résultats
}

