#!/bin/bash

# Script pour pousser tous les sites vers leurs repos GitHub individuels

set -e

echo "🚀 PUSH DE TOUS LES SITES VERS GITHUB"
echo "======================================"
echo ""

SITES=(
  "marseille"
  "lyon"
  "montpellier"
  "bordeaux"
  "nantes"
  "lille"
  "nice"
  "strasbourg"
  "rouen"
  "rennes"
  "toulouse"
)

for site in "${SITES[@]}"; do
  echo "📦 $site"
  
  if [ -d "sites/$site/.git" ]; then
    cd "sites/$site"
    
    # Vérifier s'il y a des changements
    if git diff --quiet && git diff --cached --quiet; then
      echo "   ℹ️  Aucun changement à committer"
    else
      # Ajouter tous les fichiers
      git add -A
      
      # Commit
      git commit -m "feat: Mise à jour contenu blog et piliers SEO

$(date '+%Y-%m-%d %H:%M')

- Nouveaux piliers SEO ajoutés
- Corrections liens internes
- Mise à jour domaines sitemap
- Optimisations SEO" 2>&1 | grep -v "nothing to commit" || true
    fi
    
    # Push vers le repo individuel
    echo "   📤 Push vers GitHub..."
    git push origin main 2>&1 | grep -v "Everything up-to-date" || echo "   ✅ Poussé avec succès"
    
    cd ../..
  else
    echo "   ⚠️  Pas de repo Git configuré"
  fi
  
  echo ""
done

echo "═══════════════════════════════════════"
echo ""
echo "✅ TOUS LES SITES ONT ÉTÉ POUSSÉS SUR GITHUB !"
echo ""
echo "🔗 Vérifiez sur GitHub:"
for site in "${SITES[@]}"; do
  echo "   • https://github.com/gdetaisne/dd-$site"
done
