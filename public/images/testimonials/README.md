# 💬 Testimonials Avatars

## Images Requises (3 avatars)

### `avatar-1.jpg` - Marie L.
- **Format**: 1:1 (carré)
- **Dimensions**: 256x256px
- **Poids max**: 30KB
- **Style**: Silhouette propre ou avatar stylisé
- **Alt**: `"Photo de Marie L."`

### `avatar-2.jpg` - Thomas B.
- **Format**: 1:1 (carré)
- **Dimensions**: 256x256px
- **Poids max**: 30KB
- **Style**: Silhouette propre ou avatar stylisé
- **Alt**: `"Photo de Thomas B."`

### `avatar-3.jpg` - Sophie M.
- **Format**: 1:1 (carré)
- **Dimensions**: 256x256px
- **Poids max**: 30KB
- **Style**: Silhouette propre ou avatar stylisé
- **Alt**: `"Photo de Sophie M."`

## Utilisé Dans
- `components/Testimonials.tsx` (homepage section)
- **Taille affichage**: 48x48px (Next/Image scale automatique)

## Options de Création

### Option 1: Silhouettes Stylisées
- Cercle avec initiales (ML, TB, SM)
- Fond dégradé (#2b7a78 → #6bcfcf)
- Typographie claire

### Option 2: Avatars Générés
- **[UI Faces](https://uifaces.co/)** - Avatars génériques
- **[Generated Photos](https://generated.photos/)** - IA générée
- **[Avatar Generator](https://getavataaars.com/)** - Illustrations

### Option 3: Photos Stock
- Unsplash: `"professional portrait"`
- Pexels: `"person smiling portrait"`
- Éviter looks trop "corporate"

## Style Guidelines
- Cercle (border-radius: 50%)
- Fond neutre ou dégradé brand
- Expression neutre/positive
- Pas de logos/marques visibles
- Cohérence visuelle entre les 3

## Quick Solution (Canva)
1. Créer design 256x256px
2. Cercle avec fond gradient
3. Initiales centrées (police bold)
4. Export PNG/JPG optimisé

## Exemple CSS (si besoin fallback)
```css
.avatar-placeholder {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #2b7a78, #6bcfcf);
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

