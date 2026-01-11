# Script de déploiement rapide
Write-Host "?? Préparation du déploiement..." -ForegroundColor Cyan

# Aller à la racine du projet
Set-Location "C:\Users\mappo\source\repos\wearing mind"

Write-Host "`n?? Ajout des fichiers..." -ForegroundColor Yellow
git add -A

Write-Host "`n?? Commit des changements..." -ForegroundColor Yellow
git commit -m "Add Vercel deployment configuration and documentation"

Write-Host "`n?? Push vers GitHub..." -ForegroundColor Yellow
git push origin master

Write-Host "`n? Push terminé!" -ForegroundColor Green
Write-Host "`n?? Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Aller sur: https://vercel.com/enollafritzs-projects" -ForegroundColor White
Write-Host "2. Cliquer sur 'Add New' > 'Project'" -ForegroundColor White
Write-Host "3. Importer: ElieFritz/wearing-mind" -ForegroundColor White
Write-Host "4. Root Directory: frontend" -ForegroundColor White
Write-Host "5. Ajouter la variable: NEXT_PUBLIC_API_URL" -ForegroundColor White
Write-Host "6. Cliquer sur 'Deploy'" -ForegroundColor White

Write-Host "`n?? Guide complet: VERCEL_DEPLOYMENT_GUIDE.md" -ForegroundColor Magenta

# Ouvrir le guide dans le navigateur par défaut
Write-Host "`n?? Ouverture du dashboard Vercel..." -ForegroundColor Cyan
Start-Process "https://vercel.com/enollafritzs-projects"
