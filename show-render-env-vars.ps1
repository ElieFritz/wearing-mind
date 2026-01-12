# Script pour afficher les variables d'environnement à configurer sur Render

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  RENDER ENVIRONMENT VARIABLES" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "?? Copiez ces variables dans Render Dashboard:" -ForegroundColor Yellow
Write-Host "   https://dashboard.render.com/ > wearing-mind > Environment" -ForegroundColor Gray
Write-Host ""

# Lire le fichier .env
$envFile = "backend\.env"
$envContent = Get-Content $envFile

# Extraire les valeurs
$supabaseUrl = ($envContent | Select-String "SUPABASE_URL=").ToString().Split("=")[1]
$supabaseKey = ($envContent | Select-String "SUPABASE_ANON_KEY=").ToString().Split("=")[1]
$resendKey = ($envContent | Select-String "RESEND_API_KEY=").ToString().Split("=")[1]
$adminEmail = ($envContent | Select-String "ADMIN_EMAIL=").ToString().Split("=")[1]

Write-Host "??????????????????????????????????????????????????????????" -ForegroundColor White
Write-Host "? Variables à Ajouter/Modifier sur Render               ?" -ForegroundColor White
Write-Host "??????????????????????????????????????????????????????????" -ForegroundColor White
Write-Host ""

Write-Host "1. SUPABASE_URL" -ForegroundColor Green
Write-Host "   $supabaseUrl" -ForegroundColor White
Write-Host ""

Write-Host "2. SUPABASE_KEY" -ForegroundColor Green
Write-Host "   $supabaseKey" -ForegroundColor White
Write-Host ""

Write-Host "3. FRONTEND_URL" -ForegroundColor Green
Write-Host "   https://frontend-iota-flax-11.vercel.app" -ForegroundColor White
Write-Host ""

Write-Host "4. PORT" -ForegroundColor Green
Write-Host "   10000" -ForegroundColor White
Write-Host ""

Write-Host "5. NODE_ENV" -ForegroundColor Green
Write-Host "   production" -ForegroundColor White
Write-Host ""

Write-Host "6. RESEND_API_KEY" -ForegroundColor Green
Write-Host "   $resendKey" -ForegroundColor White
Write-Host ""

Write-Host "7. ADMIN_EMAIL" -ForegroundColor Green
Write-Host "   $adminEmail" -ForegroundColor White
Write-Host ""

Write-Host "8. EMAIL_FROM" -ForegroundColor Green
Write-Host "   WEARING MIND <onboarding@resend.dev>" -ForegroundColor White
Write-Host ""

Write-Host "????????????????????????????????????????????????????????" -ForegroundColor Cyan
Write-Host ""
Write-Host "?? Instructions:" -ForegroundColor Yellow
Write-Host "   1. Ouvrir Render Dashboard" -ForegroundColor White
Write-Host "   2. Aller dans Environment" -ForegroundColor White
Write-Host "   3. Cliquer sur 'Add Environment Variable'" -ForegroundColor White
Write-Host "   4. Copier-coller chaque variable (nom + valeur)" -ForegroundColor White
Write-Host "   5. Cliquer sur 'Save Changes'" -ForegroundColor White
Write-Host "   6. Attendre le redémarrage (2-3 minutes)" -ForegroundColor White
Write-Host ""
Write-Host "? Après configuration:" -ForegroundColor Cyan
Write-Host "   - Le service redémarre automatiquement" -ForegroundColor White
Write-Host "   - Attendre que le statut soit 'Live'" -ForegroundColor White
Write-Host "   - Tester avec: .\test-render-apis.ps1" -ForegroundColor White
Write-Host ""

Write-Host "Voulez-vous ouvrir le dashboard Render maintenant? (Y/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq "Y" -or $response -eq "y") {
    Start-Process "https://dashboard.render.com/"
    Write-Host "? Dashboard Render ouvert!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
