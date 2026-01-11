# Script de demarrage rapide - Frontend uniquement
# WEARING MIND

Write-Host "?? Demarrage du Frontend WEARING MIND..." -ForegroundColor Cyan
Write-Host ""

# Verifier si les dependencies sont installees
if (-Not (Test-Path "frontend\node_modules")) {
    Write-Host "??  Installation des dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
    Write-Host ""
}

# Demarrer le frontend
Write-Host "?? Demarrage de Next.js..." -ForegroundColor Yellow
Write-Host ""
Set-Location frontend
npm run dev
