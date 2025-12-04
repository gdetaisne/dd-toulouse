# 📝 Blog Cover Images

## Images Requises

### `cover-guide-toulouse.jpg`
- **Format**: 16:9
- **Dimensions**: 1600x900px
- **Poids max**: 120KB
- **Contenu**: 
  - Vue panoramique toulouse (Place de la Bourse, quais)
  - Ambiance moderne, dynamique
  - Identifiable comme toulouse
- **Alt**: `"Guide déménagement toulouse 2024 — conseils et astuces"`

### `cover-quartiers.jpg`
- **Format**: 16:9
- **Dimensions**: 1600x900px
- **Poids max**: 120KB
- **Contenu**: 
  - Collage ou mosaïque de quartiers bordelais
  - OU rue typique représentative
  - Architecture variée
- **Alt**: `"Quartiers de toulouse — guide pratique déménagement"`

### `cover-estimation.jpg`
- **Format**: 16:9
- **Dimensions**: 1600x900px
- **Poids max**: 120KB
- **Contenu**: 
  - Cartons empilés ou étiquetés
  - Intérieur en cours de déménagement
  - Mètre ruban, liste d'inventaire visible
- **Alt**: `"Estimation volume déménagement — méthodes et astuces"`

## Utilisé Dans
- `components/BlogTeaser.tsx` (homepage)
- Pages blog (futur: articles individuels)

## Images Additionnelles (Optionnelles)

### Catégories Blog
Créer des covers par catégorie pour cohérence :
- `cover-etudiant.jpg` - Ambiance jeune, campus
- `cover-entreprise.jpg` - Bureaux, déménagement pro
- `cover-prix.jpg` - Calculatrice, devis, euros
- `cover-international.jpg` - Cartes, drapeaux, monde
- `cover-piano.jpg` - Piano en déménagement

## Guidelines
- Cohérence visuelle entre toutes les covers
- Ratio 16:9 strict (affichage grille)
- Overlay sombre en bas (texte lisible)
- Éviter texte incrusté dans l'image
- Filtre bleu/vert brand appliqué

## Templates Canva Recommandés
- "Blog Header" (1600x900px)
- "YouTube Thumbnail" (adapté)
- "Facebook Cover" (resize)

## Sources
- **Unsplash**: `"toulouse city"`, `"moving boxes"`, `"packing"`
- **Pexels**: `"relocation"`, `"cardboard boxes"`, `"apartment"`
- **Pixabay**: `"déménagement"`, `"cartons"`

## Naming Convention Future
```
cover-[slug-article].jpg
cover-[categorie]-[theme].jpg
```

Exemples:
- `cover-demenagement-etudiant-toulouse.jpg`
- `cover-prix-demenagement-2025.jpg`
- `cover-garde-meuble-conseils.jpg`

