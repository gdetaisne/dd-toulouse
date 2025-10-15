# ✅ Quick Image Checklist - Moverz toulouse

## 🎯 Priorité HAUTE (Pour lancement)

### Hero Section (1 image)
- [ ] `/images/hero/hero-ai-mockup.jpg` (16:9, 1920x1080px, ~150KB)
  - 💡 Mockup IA + filigrane Place de la Bourse

### How It Works (3 images)
- [ ] `/images/how-it-works/step-1-photos.jpg` (4:3, 1200x900px, ~120KB)
  - 💡 Main prenant photo d'une pièce
- [ ] `/images/how-it-works/step-2-estimation.jpg` (4:3, 1200x900px, ~120KB)
  - 💡 Écran montrant estimation IA
- [ ] `/images/how-it-works/step-3-loading.jpg` (4:3, 1200x900px, ~120KB)
  - 💡 Équipe chargeant carton

---

## 🟡 Priorité MOYENNE (Amélioration UX)

### Testimonials (3 avatars)
- [ ] `/images/testimonials/avatar-1.jpg` (1:1, 256x256px, ~30KB)
- [ ] `/images/testimonials/avatar-2.jpg` (1:1, 256x256px, ~30KB)
- [ ] `/images/testimonials/avatar-3.jpg` (1:1, 256x256px, ~30KB)
  - 💡 Silhouettes propres ou initiales sur fond gradient

### Quartiers (2 minimum pour commencer)
- [ ] `/images/quartiers/chartrons.jpg` (16:9, 1600x900px, ~100KB)
  - 💡 Façades pierre, rues étroites
- [ ] `/images/quartiers/saint-pierre.jpg` (16:9, 1600x900px, ~100KB)
  - 💡 Rues pavées, centre historique

---

## 🟢 Priorité BASSE (Nice to have)

### Blog Covers (3 minimum)
- [ ] `/images/blog/cover-guide-toulouse.jpg` (16:9, 1600x900px, ~120KB)
- [ ] `/images/blog/cover-quartiers.jpg` (16:9, 1600x900px, ~120KB)
- [ ] `/images/blog/cover-estimation.jpg` (16:9, 1600x900px, ~120KB)

### Autres Quartiers (au besoin)
- [ ] `/images/quartiers/cauderan.jpg`
- [ ] `/images/quartiers/merignac.jpg`
- [ ] `/images/quartiers/pessac.jpg`
- [ ] `/images/quartiers/bastide.jpg`

---

## 📋 Pour Chaque Image

### Avant Upload
- [ ] Dimensions correctes selon le type
- [ ] Poids optimisé (≤ limite)
- [ ] Désaturation + filtre bleu/vert appliqué
- [ ] Nom de fichier descriptif (pas IMG_1234.jpg)
- [ ] Format AVIF ou WebP (ou JPG si nécessaire)

### Après Upload
- [ ] Vérifier affichage en local (npm run dev)
- [ ] Tester responsive (mobile, tablet, desktop)
- [ ] Vérifier alt text dans le code

---

## 🚀 Workflow Rapide

### 1. Trouver/Créer Image
**Sources recommandées :**
- [Unsplash](https://unsplash.com/) - `"toulouse"`, `"moving boxes"`
- [Pexels](https://www.pexels.com/) - `"relocation"`, `"apartment"`
- [Figma](https://figma.com) - Pour mockups IA

### 2. Optimiser
**Outils :**
- [Squoosh](https://squoosh.app/) - Compression + conversion AVIF/WebP
- [TinyPNG](https://tinypng.com/) - Compression rapide
- [Canva](https://www.canva.com/) - Filtres couleur

### 3. Appliquer Filtre Brand
- Désaturation : -15 à -20%
- Teinte : Vers #2b7a78 / #6bcfcf
- Contraste : +5 à +10%

### 4. Upload
```bash
# Exemple
cp mon-image.jpg public/images/hero/hero-ai-mockup.jpg
```

### 5. Tester
```bash
npm run dev
# Ouvrir http://localhost:3000
```

---

## 🎨 Specs Rapides par Type

| Type | Ratio | Dimensions | Max | Où |
|------|-------|------------|-----|-----|
| **Hero** | 16:9 | 1920×1080 | 150KB | `/hero/` |
| **Steps** | 4:3 | 1200×900 | 120KB | `/how-it-works/` |
| **Avatars** | 1:1 | 256×256 | 30KB | `/testimonials/` |
| **Quartiers** | 16:9 | 1600×900 | 100KB | `/quartiers/` |
| **Blog** | 16:9 | 1600×900 | 120KB | `/blog/` |

---

## ⚠️ Notes Importantes

### Images Prioritaires (4 minimum)
Pour un lancement basique fonctionnel :
1. Hero mockup IA ✅
2. Step 1 (prendre photo) ✅
3. Step 2 (estimation) ✅
4. Step 3 (chargement) ✅

### Temporaire Sans Images
Le site fonctionne sans images grâce à :
- Fallback Unsplash (Hero background)
- Emojis (Testimonials sans avatars fonctionnent)
- Quartiers OK sans cover (optionnel)

### Progression Recommandée
1. **Jour 1** : Hero + 3 steps (priorité haute) → Site présentable
2. **Jour 2** : Avatars + 2 quartiers → UX améliorée
3. **Jour 3+** : Blog covers + autres quartiers → Complet

---

## 🔗 Documentation Complète

- **Guide implémentation** : `/IMAGE-IMPLEMENTATION-GUIDE.md`
- **Guide détaillé images** : `/public/images/README.md`
- **READMEs par catégorie** : `/public/images/[categorie]/README.md`

---

## ✨ Status Actuel

### ✅ Fait (Code)
- [x] Structure répertoires créée
- [x] Next.js config optimisée
- [x] Hero.tsx mis à jour
- [x] HowItWorks.tsx mis à jour
- [x] Testimonials.tsx mis à jour
- [x] QuartierTemplate.tsx mis à jour
- [x] LocalPage.tsx mis à jour
- [x] BlogTeaser.tsx mis à jour
- [x] Documentation complète

### ⏳ À Faire (Contenu)
- [ ] Créer/uploader les images selon checklist
- [ ] Tester affichage
- [ ] Ajuster filtres couleur si nécessaire
- [ ] Optimiser poids si > limite

---

**Prêt pour l'intégration des images !** 🎉  
Le code est en place, il ne reste plus qu'à créer/uploader les fichiers images.

