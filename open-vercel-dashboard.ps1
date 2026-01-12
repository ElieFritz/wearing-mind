# Script pour redéployer via le dashboard Vercel
Write-Host "?? Redéploiement WEARING MIND via Dashboard" -ForegroundColor Cyan

Write-Host "`n?? Instructions:" -ForegroundColor Yellow
Write-Host "1. Le dashboard Vercel va s'ouvrir" -ForegroundColor White
Write-Host "2. Cliquez sur le projet 'wearing-mind'" -ForegroundColor White
Write-Host "3. Allez dans l'onglet 'Deployments'" -ForegroundColor White
Write-Host "4. Sur le dernier déploiement, cliquez sur les 3 points '...'" -ForegroundColor White
Write-Host "5. Sélectionnez 'Redeploy'" -ForegroundColor White
Write-Host "6. Confirmez le redéploiement" -ForegroundColor White

Write-Host "`n?? Ouverture du dashboard..." -ForegroundColor Cyan
Start-Sleep -Seconds 2

# Ouvrir le dashboard du projet
Start-Process "https://vercel.com/enollafritzs-projects/wearing-mind"

Write-Host "`n? Dashboard ouvert!" -ForegroundColor Green
Write-Host "`nSi le projet n'existe pas encore:" -ForegroundColor Yellow
Write-Host "1. Cliquez sur 'Add New' > 'Project'" -ForegroundColor White
Write-Host "2. Importez: ElieFritz/wearing-mind" -ForegroundColor White
Write-Host "3. Root Directory: frontend" -ForegroundColor White
Write-Host "4. Variable: NEXT_PUBLIC_API_URL" -ForegroundColor White
Write-Host "5. Déployez" -ForegroundColor White
