# Guide des Images Moverz toulouse

## 📁 Structure des Répertoires

```
public/images/
├── hero/              # Hero section - mockup IA + toulouse
├── how-it-works/      # 3 étapes du process (4:3)
├── quartiers/         # Vignettes par quartier/commune
├── testimonials/      # Avatars clients (1:1)
└── blog/             # Covers articles (16:9)
```

## 🎯 Shotlist Prioritaire (12 Photos Essentielles)

### 1. Hero Section (1 image)
- **hero/hero-ai-mockup.jpg** (16:9, ≤150KB)
  - Mockup stylisé de l'interface IA
  - Collage toulouse en filigrane (Place de la Bourse, Garonne)
  - Désaturation légère + filtre bleu/vert (#04163a / #2b7a78 / #6bcfcf)

### 2. Comment ça Marche (3 images, format 4:3)
- **how-it-works/step-1-photos.jpg**
  - Main prenant une photo d'une pièce
  - Vue réelle d'intérieur (salon/chambre)
  
- **how-it-works/step-2-estimation.jpg**
  - Écran montrant l'estimation IA
  - Interface avec volume en m³
  
- **how-it-works/step-3-loading.jpg**
  - Équipe chargeant un carton dans le camion
  - Détail de manutention professionnelle

### 3. Intérieurs & Détails (5 images, format 4:3)
Utilisables pour blog/pages services:
- 3x vues larges (salon, chambre, cuisine)
- 2x détails (cartons étiquetés, protection TV/tableau)
- 2x accès (ascenseur, cage d'escalier)

### 4. Quartiers toulouse (2 images minimum, format 16:9 ou 4:3)
- **quartiers/chartrons.jpg** - Façades pierre typiques, rue étroite
- **quartiers/saint-pierre.jpg** - Rues pavées, accès camion
- Ajouter selon besoins: Caudéran, Mérignac, Pessac...

### 5. Témoignages (3 avatars, format 1:1, 48x48px minimum)
- **testimonials/avatar-1.jpg** - Silhouette/avatar propre
- **testimonials/avatar-2.jpg** - Silhouette/avatar propre
- **testimonials/avatar-3.jpg** - Silhouette/avatar propre

### 6. Blog Covers (3+ images, format 16:9)
- **blog/cover-guide-toulouse.jpg** - Vue toulouse générique
- **blog/cover-quartiers.jpg** - Collage quartiers
- **blog/cover-estimation.jpg** - Process/cartons

## 🎨 Style & Brand Guidelines

### Palette de Couleurs
- Primaire: `#04163a` (bleu marine foncé)
- Secondaire: `#2b7a78` (vert émeraude)
- Accent: `#6bcfcf` (cyan lumineux)

### Traitement des Images
1. **Désaturation légère** (réduction de 15-20%)
2. **Filtre bleu/vert** pour homogénéiser avec la palette
3. **Éviter** les stocks "déménageurs qui sourient" 😅
4. **Privilégier** vrais intérieurs + détails de manutention

### Formats & Résolutions

| Usage | Ratio | Dimensions recommandées | Poids max |
|-------|-------|-------------------------|-----------|
| Hero | 16:9 | 1920x1080px | 150KB |
| Cards/Steps | 4:3 | 1200x900px | 120KB |
| Quartiers | 16:9 ou 4:3 | 1600x900px | 100KB |
| Avatars | 1:1 | 256x256px | 30KB |
| Blog covers | 16:9 | 1600x900px | 120KB |

### Formats de Fichiers
- **Préférence**: AVIF (meilleure compression)
- **Fallback**: WebP
- **Legacy**: JPG (uniquement si nécessaire)

## 🚀 Optimisations Next/Image

### Configuration Globale
Les images sont automatiquement optimisées par Next.js avec:
- Formats: AVIF → WebP → JPG
- Lazy loading par défaut (sauf Hero avec `priority`)
- Responsive avec `sizes` attribute

### Exemples d'Intégration

#### Hero (Priority)
```tsx
<Image
  src="/images/hero/hero-ai-mockup.jpg"
  alt="Estimation de volume en m³ à partir de photos — déménagement à toulouse"
  fill
  priority
  sizes="(min-width: 1024px) 50vw, 100vw"
  className="object-cover"
  quality={90}
/>
```

#### Cards 4:3 (Lazy)
```tsx
<Image
  src="/images/how-it-works/step-1-photos.jpg"
  alt="Main prenant une photo d'une pièce pour estimation"
  fill
  sizes="(min-width: 768px) 33vw, 100vw"
  className="object-cover"
  quality={85}
/>
```

#### Avatars 1:1
```tsx
<Image
  src="/images/testimonials/avatar-1.jpg"
  alt="Photo de Marie L."
  fill
  sizes="48px"
  className="object-cover"
  quality={85}
/>
```

## 📝 Naming Convention

### Structure des Noms
`[categorie]-[descriptif]-[optional-variant].[ext]`

#### Exemples
- ✅ `hero-ai-mockup.jpg`
- ✅ `step-1-photos.jpg`
- ✅ `chartrons-facades.jpg`
- ✅ `avatar-1.jpg`
- ✅ `cover-guide-toulouse.jpg`

#### À Éviter
- ❌ `IMG_1234.jpg`
- ❌ `photo finale 2.jpg`
- ❌ `déménagement (1).jpg`

## 🎯 Alt Text SEO

### Format Recommandé
`[Action/Sujet] — [Contexte local] [Détails accès si pertinent]`

#### Exemples
- ✅ `"Estimation de volume en m³ à partir de photos — déménagement à toulouse"`
- ✅ `"Chartrons — accès camion déménagement, façades typiques, rues étroites"`
- ✅ `"Cartons étiquetés et protégés — déménagement professionnel toulouse"`
- ✅ `"Camion stationné rue Saint-Pierre — accès étroit, déménagement centre-ville"`

#### À Éviter
- ❌ `"Image"`
- ❌ `"Photo déménagement"`
- ❌ `"Chartrons"`

## 🔍 Sources d'Images Recommandées

### Gratuites
- [Unsplash](https://unsplash.com/) - Haute qualité, usage commercial
- [Pexels](https://www.pexels.com/) - Diversité, bonne pour intérieurs
- [Pixabay](https://pixabay.com/) - Alternative variée

### Recherches Utiles
- `"moving boxes interior"`
- `"apartment empty room"`
- `"toulouse architecture street"`
- `"staircase access building"`
- `"moving truck loading"`
- `"phone taking photo room"`

### Créer Mockups AI
- [Figma](https://figma.com) + export PNG
- [Canva](https://canva.com) - templates mockup mobile
- Captures d'écran réelles de l'interface IA (quand prête)

## ✅ Checklist Avant Upload

- [ ] Image optimisée (compression)
- [ ] Poids ≤ limite recommandée
- [ ] Dimensions correctes pour le ratio
- [ ] Nom de fichier descriptif
- [ ] Placée dans le bon répertoire
- [ ] Alt text préparé (avec contexte local)
- [ ] Filtre couleur appliqué si nécessaire
- [ ] Format AVIF ou WebP de préférence

## 🚨 Performance

### Règles d'Or
1. **Hero uniquement**: utiliser `priority`
2. **Reste**: lazy loading automatique
3. **Poids cible global**: < 2MB pour toute la page
4. **LCP (Largest Contentful Paint)**: < 2.5s

### Outils de Test
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Chrome DevTools → Lighthouse

---

**Dernière mise à jour**: Octobre 2025  
**Maintenue par**: Équipe Moverz toulouse

