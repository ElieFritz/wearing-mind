# Script de redéploiement Vercel pour wearing-mind
Write-Host "?? Déploiement Vercel - WEARING MIND" -ForegroundColor Cyan

# Aller dans le dossier frontend
Set-Location "C:\Users\mappo\source\repos\wearing mind\frontend"

Write-Host "`n?? Configuration du projet..." -ForegroundColor Yellow

# Créer le fichier de configuration Vercel
$vercelConfig = @{
    "name" = "wearing-mind"
    "version" = 2
} | ConvertTo-Json

$vercelConfig | Out-File -FilePath ".vercel\project.json" -Encoding UTF8 -Force

Write-Host "`n?? Déploiement en cours..." -ForegroundColor Yellow
Write-Host "Projet: wearing-mind" -ForegroundColor White
Write-Host "Organisation: enollafritzs-projects" -ForegroundColor White

# Déployer
vercel --prod --yes

Write-Host "`n? Déploiement terminé!" -ForegroundColor Green
Write-Host "URL du projet: https://vercel.com/enollafritzs-projects/wearing-mind" -ForegroundColor Cyan
