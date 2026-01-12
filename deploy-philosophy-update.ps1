# Script pour déployer les changements de la section Philosophy

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DEPLOY PHILOSOPHY UPDATE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier les fichiers modifiés
Write-Host "?? Fichiers modifiés:" -ForegroundColor Yellow
Write-Host ""

$files = @(
    "frontend/src/components/BrandStory.tsx",
    "frontend/public/images/brand/hoodies.jpg",
    "frontend/public/images/brand/tshirts.jpg",
    "frontend/public/images/brand/sweatshirts.jpg",
    "PHILOSOPHY_CATEGORIES_UPDATE.md",
    "download-category-images.ps1"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "   ? $file" -ForegroundColor Green
    } else {
        Write-Host "   ? $file (manquant)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "????????????????????????????????????????" -ForegroundColor Cyan
Write-Host ""

Write-Host "?? Déployer en production?" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Tester localement d'abord (npm run dev)" -ForegroundColor White
Write-Host "2. Si OK, pousser vers Vercel" -ForegroundColor White
Write-Host ""
Write-Host "Voulez-vous démarrer le serveur local? (Y/N)" -ForegroundColor Yellow
$start = Read-Host

if ($start -eq "Y" -or $start -eq "y") {
    Write-Host ""
    Write-Host "?? Démarrage du serveur local..." -ForegroundColor Cyan
    Write-Host ""
    Set-Location frontend
    npm run dev
}
