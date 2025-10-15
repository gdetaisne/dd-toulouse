# 🚀 Checklist Mise en Production - SEO

## ✅ AVANT LA MISE EN PRODUCTION

### 1. URLs et Domaines
- [ ] Changer `metadataBase` dans `layout.tsx` : `https://www.toulouse-demenageur.fr`
- [ ] Mettre à jour toutes les URLs canoniques dans les templates
- [ ] Vérifier les URLs dans `sitemap.ts`
- [ ] Tester les redirections

### 2. Bloquer l'Indexation (STAGING → PRODUCTION)
- [ ] Supprimer `robots.txt` de `/public/` (ou le remplacer par un vrai)
- [ ] Retirer les headers `X-Robots-Tag` du middleware
- [ ] Modifier `robots` dans `layout.tsx` pour permettre l'indexation
- [ ] Retirer "- STAGING" des titres

### 3. Métadonnées SEO
- [ ] Ajouter favicon.ico dans `/public/`
- [ ] Créer image Open Graph (1200x630px) dans `/public/og-image.jpg`
- [ ] Ajouter `viewport` meta tag
- [ ] Vérifier tous les `title` et `description`

### 4. Sitemap et Robots
- [ ] Générer `sitemap.xml` via `next-sitemap`
- [ ] Créer `robots.txt` de production
- [ ] Soumettre le sitemap à Google Search Console

### 5. Données Structurées
- [ ] Ajouter JSON-LD sur toutes les pages
- [ ] Tester avec Google Rich Results Test
- [ ] Ajouter breadcrumbs schema

### 6. Performance
- [ ] Optimiser les images (WebP, lazy loading)
- [ ] Minifier CSS/JS
- [ ] Tester Core Web Vitals
- [ ] Vérifier la compression

### 7. Contenu
- [ ] Vérifier tous les H1 sur chaque page
- [ ] Ajouter des liens internes
- [ ] Vérifier l'orthographe et la grammaire
- [ ] Tester tous les liens

## 🔧 COMMANDES À EXÉCUTER

```bash
# Générer le sitemap
pnpm run build
npx next-sitemap

# Vérifier la production
pnpm run build
pnpm run start
```

## 🧪 TESTS POST-DÉPLOIEMENT

- [ ] Tester avec Google Search Console
- [ ] Vérifier les métadonnées avec des outils SEO
- [ ] Tester la vitesse avec PageSpeed Insights
- [ ] Vérifier l'indexation après 24-48h

## ⚠️ RAPPEL IMPORTANT

**Ne JAMAIS déployer en production sans avoir retiré tous les blocages d'indexation !**
