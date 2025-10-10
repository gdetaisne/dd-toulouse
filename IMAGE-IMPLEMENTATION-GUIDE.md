# 📸 Guide d'Implémentation des Images - Moverz toulouse

## ✅ Modifications Effectuées

### 1. Structure des Répertoires
Créé la structure d'organisation des images :
```
public/images/
├── hero/              # Hero section
├── how-it-works/      # Process en 3 étapes
├── quartiers/         # Vignettes quartiers
├── testimonials/      # Avatars clients
└── blog/             # Covers articles
```

### 2. Configuration Next.js (`next.config.js`)
✅ **Optimisations appliquées** :
- Formats AVIF + WebP activés (conversion automatique)
- Support images externes (Unsplash)
- Device sizes optimisés
- Image sizes configurés

### 3. Composants Mis à Jour

#### **Hero.tsx** ✅
- ✅ Next/Image avec `priority` (chargement prioritaire)
- ✅ Image de fond optimisée
- ✅ Mockup IA avec overlay toulouse
- ✅ Alt text SEO descriptif local

**Image requise** :
- `/images/hero/hero-ai-mockup.jpg` (16:9, ~150KB)

#### **HowItWorks.tsx** ✅
- ✅ 3 images format 4:3 par étape
- ✅ Lazy loading automatique
- ✅ Overlay avec numéros d'étapes
- ✅ Responsive avec `sizes` attribute

**Images requises** :
- `/images/how-it-works/step-1-photos.jpg` (main prenant photo)
- `/images/how-it-works/step-2-estimation.jpg` (écran IA)
- `/images/how-it-works/step-3-loading.jpg` (équipe chargeant carton)

#### **Testimonials.tsx** ✅
- ✅ Avatars 1:1 (48px)
- ✅ Layout amélioré avec photos
- ✅ Lazy loading

**Images requises** :
- `/images/testimonials/avatar-1.jpg` (Marie L.)
- `/images/testimonials/avatar-2.jpg` (Thomas B.)
- `/images/testimonials/avatar-3.jpg` (Sophie M.)

#### **QuartierTemplate.tsx** ✅
- ✅ Support `coverImage` prop (optionnelle)
- ✅ Overlay avec nom du quartier
- ✅ Alt text contextualisé

**Usage** :
```tsx
<QuartierTemplate
  title="Chartrons"
  coverImage="/images/quartiers/chartrons.jpg"
  // ... autres props
/>
```

#### **LocalPage.tsx** ✅
- ✅ Support `coverImage` prop (optionnelle)
- ✅ Affichage Hero amélioré
- ✅ Badge localisation

**Exemple d'implémentation** :
- ✅ Page Chartrons mise à jour avec coverImage

**Images suggérées** (par quartier) :
- `/images/quartiers/chartrons.jpg`
- `/images/quartiers/saint-pierre.jpg`
- `/images/quartiers/cauderan.jpg`
- `/images/quartiers/merignac.jpg`
- `/images/quartiers/pessac.jpg`

#### **BlogTeaser.tsx** ✅
- ✅ Covers 16:9 par article
- ✅ Hover effects
- ✅ Layout carte amélioré

**Images requises** :
- `/images/blog/cover-guide-toulouse.jpg`
- `/images/blog/cover-quartiers.jpg`
- `/images/blog/cover-estimation.jpg`

---

## 🎯 Checklist Images à Créer

### Priorité Haute 🔴

- [ ] **Hero** : `hero-ai-mockup.jpg` (16:9, ~150KB)
  - Mockup interface IA stylisé
  - Filigrane toulouse (Place de la Bourse)
  - Filtre bleu/vert (#04163a / #2b7a78)

- [ ] **How It Works** (3 images, 4:3, ~120KB chacune)
  - [ ] `step-1-photos.jpg` - Main prenant photo d'une pièce
  - [ ] `step-2-estimation.jpg` - Écran montrant estimation IA
  - [ ] `step-3-loading.jpg` - Équipe chargeant carton

### Priorité Moyenne 🟡

- [ ] **Testimonials** (3 avatars, 1:1, 256x256px, ~30KB)
  - [ ] `avatar-1.jpg` - Silhouette/avatar propre
  - [ ] `avatar-2.jpg` - Silhouette/avatar propre
  - [ ] `avatar-3.jpg` - Silhouette/avatar propre

- [ ] **Quartiers** (2+ images minimum, 16:9, ~100KB)
  - [ ] `chartrons.jpg` - Façades pierre, rues étroites
  - [ ] `saint-pierre.jpg` - Rues pavées, accès
  - [ ] Autres quartiers selon besoins

### Priorité Basse 🟢

- [ ] **Blog Covers** (3+ images, 16:9, ~120KB)
  - [ ] `cover-guide-toulouse.jpg`
  - [ ] `cover-quartiers.jpg`
  - [ ] `cover-estimation.jpg`

---

## 🎨 Spécifications Techniques

### Formats & Compression

| Type | Ratio | Dimensions | Poids Max | Format |
|------|-------|------------|-----------|--------|
| Hero | 16:9 | 1920x1080px | 150KB | AVIF/WebP/JPG |
| Steps | 4:3 | 1200x900px | 120KB | AVIF/WebP/JPG |
| Quartiers | 16:9 | 1600x900px | 100KB | AVIF/WebP/JPG |
| Avatars | 1:1 | 256x256px | 30KB | AVIF/WebP/JPG |
| Blog | 16:9 | 1600x900px | 120KB | AVIF/WebP/JPG |

### Traitement Couleur
Appliquer à toutes les images :
1. **Désaturation** : -15 à -20%
2. **Filtre bleu/vert** : Teinte vers `#2b7a78` / `#6bcfcf`
3. **Contraste** : +5 à +10%

### Alt Text Format
`[Action/Sujet] — [Contexte local toulouse] [Détails accès]`

**Exemples** :
- ✅ `"Estimation de volume en m³ à partir de photos — déménagement à toulouse"`
- ✅ `"Chartrons — accès camion déménagement, façades typiques"`
- ✅ `"Équipe de déménagement chargeant un carton dans un camion"`

---

## 🚀 Comment Ajouter de Nouvelles Images

### 1. Préparer l'Image
```bash
# Optimiser avec ImageOptim, Squoosh ou TinyPNG
# Convertir en AVIF/WebP si possible
```

### 2. Placer dans le Bon Répertoire
```bash
# Exemple
cp mon-image.jpg public/images/quartiers/bastide.jpg
```

### 3. Utiliser dans un Composant
```tsx
import Image from "next/image";

<Image 
  src="/images/quartiers/bastide.jpg"
  alt="Bastide — accès camion déménagement, parking"
  fill
  sizes="(min-width: 1024px) 50vw, 100vw"
  className="object-cover"
  quality={85}
/>
```

### 4. Ajouter à une Page Quartier
```tsx
const bastideData = {
  zone: "toulouse/bastide",
  zoneDisplay: "Bastide",
  coverImage: "/images/quartiers/bastide.jpg", // ← Ajouter cette ligne
  // ... reste des props
};
```

---

## 📊 Impact Performance

### Avant (HTML img tags)
- ❌ Pas de lazy loading
- ❌ Pas d'optimisation format
- ❌ Pas de responsive
- ❌ LCP élevé

### Après (Next/Image)
- ✅ Lazy loading automatique (sauf Hero)
- ✅ AVIF/WebP automatique
- ✅ Responsive avec srcset
- ✅ LCP optimisé (< 2.5s)

### Gains Attendus
- **Poids page** : -40 à -60%
- **LCP** : -30 à -50%
- **PageSpeed Score** : +10 à +20 points

---

## 🔍 Sources d'Images Recommandées

### Gratuites (Usage Commercial OK)
1. **[Unsplash](https://unsplash.com/)**
   - Recherches : `toulouse architecture`, `moving boxes`, `apartment interior`
   
2. **[Pexels](https://www.pexels.com/)**
   - Recherches : `moving truck`, `packing boxes`, `empty room`
   
3. **[Pixabay](https://pixabay.com/)**
   - Recherches : `relocation`, `furniture moving`

### Création Mockups
- **Figma** : Design mockup interface IA
- **Canva** : Templates mockup mobile/desktop
- **Captures d'écran** : Interface réelle (quand disponible)

### Photos Locales toulouse
- **Flickr** : Recherche `toulouse chartrons`, `place de la bourse`
- **Wikimedia Commons** : Photos libres de droits toulouse
- **Google Maps** : Street View (attention licence)

---

## 🛠️ Outils d'Optimisation

### Compression
- **[Squoosh](https://squoosh.app/)** (en ligne, gratuit)
- **[ImageOptim](https://imageoptim.com/)** (Mac, gratuit)
- **[TinyPNG](https://tinypng.com/)** (en ligne, gratuit)

### Conversion Format
- **[Convertio](https://convertio.co/fr/image-converter/)** (AVIF/WebP)
- **[CloudConvert](https://cloudconvert.com/)** (batch)

### Édition Rapide
- **[Photopea](https://www.photopea.com/)** (Photoshop en ligne)
- **[Canva](https://www.canva.com/)** (filtres, overlays)

---

## 📝 Naming Convention

### Format
`[categorie]-[descriptif]-[variant].[ext]`

### Exemples ✅
- `hero-ai-mockup.jpg`
- `chartrons-facades-typiques.jpg`
- `step-1-photos.jpg`
- `avatar-marie.jpg`

### À Éviter ❌
- `IMG_1234.jpg`
- `photo finale (1).jpg`
- `déménagement v2.jpg`

---

## ⚡ Quick Start

### Ajouter une Image Hero
```tsx
// 1. Placer l'image
public/images/hero/hero-ai-mockup.jpg

// 2. Déjà configuré dans Hero.tsx ✅
// Rien à faire !
```

### Ajouter une Image Quartier
```tsx
// 1. Placer l'image
public/images/quartiers/nom-quartier.jpg

// 2. Ajouter dans la page
const quartierData = {
  // ... autres props
  coverImage: "/images/quartiers/nom-quartier.jpg",
};
```

### Ajouter une Image Blog
```tsx
// 1. Placer l'image
public/images/blog/cover-titre-article.jpg

// 2. Mettre à jour BlogTeaser.tsx
const articles = [
  {
    title: "Mon article",
    cover: "/images/blog/cover-titre-article.jpg",
    // ...
  }
];
```

---

## 📞 Aide & Questions

### Problèmes Courants

**Q: Image ne s'affiche pas**
- Vérifier le chemin (commence par `/images/`)
- Vérifier l'extension (.jpg, .webp, .avif)
- Redémarrer le serveur Next.js

**Q: Image floue**
- Augmenter `quality` (85-90)
- Vérifier dimensions source
- Utiliser image 2x pour retina

**Q: Erreur "unoptimized image"**
- Ajouter domaine dans `next.config.js`
- Vérifier `remotePatterns`

---

## 📚 Documentation Complète

Voir `/public/images/README.md` pour :
- Shotlist détaillée (12 photos)
- Guidelines style & brand
- Exemples d'intégration complets
- Checklist avant upload
- Tests performance

---

**Dernière mise à jour** : Octobre 2025  
**Status** : ✅ Prêt pour intégration images  
**Prochaines étapes** : Créer/uploader les images selon checklist priorité

