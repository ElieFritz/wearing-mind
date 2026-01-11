# Script de demarrage complet - WEARING MIND
# Demarre le frontend et le backend simultanement

Write-Host "?? Demarrage de WEARING MIND..." -ForegroundColor Cyan
Write-Host ""

# Verifier si Node.js est installe
try {
    $nodeVersion = node --version
    Write-Host "? Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "? Node.js n'est pas installe!" -ForegroundColor Red
    Write-Host "   Telechargez-le sur: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Verifier si npm est installe
try {
    $npmVersion = npm --version
    Write-Host "? npm: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "? npm n'est pas installe!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "????????????????????????????????????????????" -ForegroundColor Cyan
Write-Host "?? Verification des dependencies..." -ForegroundColor Yellow
Write-Host ""

# Verifier frontend
if (-Not (Test-Path "frontend\node_modules")) {
    Write-Host "??  Installation des dependencies frontend..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
    Write-Host "? Dependencies frontend installees" -ForegroundColor Green
} else {
    Write-Host "? Dependencies frontend OK" -ForegroundColor Green
}

# Verifier backend
if (-Not (Test-Path "backend\node_modules")) {
    Write-Host "??  Installation des dependencies backend..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
    Write-Host "? Dependencies backend installees" -ForegroundColor Green
} else {
    Write-Host "? Dependencies backend OK" -ForegroundColor Green
}

Write-Host ""
Write-Host "????????????????????????????????????????????" -ForegroundColor Cyan
Write-Host "?? Demarrage des serveurs..." -ForegroundColor Cyan
Write-Host ""

# Fonction pour demarrer un serveur dans un nouveau terminal
function Start-Server {
    param(
        [string]$Name,
        [string]$Path,
        [string]$Command,
        [string]$Port
    )
    
    Write-Host "?? Demarrage $Name sur le port $Port..." -ForegroundColor Yellow
    
    $scriptBlock = "cd '$PWD\$Path'; $Command"
    
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $scriptBlock
    
    Start-Sleep -Seconds 2
    Write-Host "? $Name demarre (nouvelle fenetre)" -ForegroundColor Green
}

# Demarrer le backend
Start-Server -Name "Backend API" -Path "backend" -Command "npm run start:dev" -Port "3001"

# Attendre que le backend soit pret
Write-Host "? Attente du backend (5s)..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Demarrer le frontend
Start-Server -Name "Frontend Next.js" -Path "frontend" -Command "npm run dev" -Port "3000"

# Attendre que le frontend soit pret
Write-Host "? Attente du frontend (5s)..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "????????????????????????????????????????????" -ForegroundColor Cyan
Write-Host "?? WEARING MIND demarre avec succes!" -ForegroundColor Green
Write-Host ""
Write-Host "?? URLs disponibles:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor White
Write-Host ""
Write-Host "?? Consoles ouvertes dans de nouvelles fenetres" -ForegroundColor Yellow
Write-Host ""
Write-Host "?? Pour arreter les serveurs:" -ForegroundColor Cyan
Write-Host "   Fermez les fenetres PowerShell ou tapez Ctrl+C" -ForegroundColor White
Write-Host ""

# Ouvrir le navigateur automatiquement
Write-Host "?? Ouverture du navigateur..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "? Le projet WEARING MIND est maintenant accessible!" -ForegroundColor Green
Write-Host ""
