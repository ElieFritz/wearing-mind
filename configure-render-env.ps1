# Script pour configurer les variables d'environnement Render via API

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  RENDER ENV VARS CONFIGURATION" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Variables depuis le fichier .env local
$SUPABASE_URL = "https://vbunghyafwsubpjvrvju.supabase.co"
$SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZidW5naHlhZndzdWJwanZydmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1NTY3NTksImV4cCI6MjA1MjEzMjc1OX0.kjJGXbPNBfhZfaJFzmBJ_qfkmNKzApHYYlpV9vWQdYQ"
$FRONTEND_URL = "https://frontend-iota-flax-11.vercel.app"
$RESEND_API_KEY = "re_4MNyCY58_8EEggjyHy1CnsMChTxyBypHg"
$ADMIN_EMAIL = "admin@wearingmind.com"

Write-Host "??  OPTION 1: Configuration Manuelle (Recommandé)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Allez sur Render Dashboard et ajoutez ces variables:" -ForegroundColor White
Write-Host ""
Write-Host "1. SUPABASE_URL" -ForegroundColor Green
Write-Host "   $SUPABASE_URL" -ForegroundColor Gray
Write-Host ""
Write-Host "2. SUPABASE_KEY" -ForegroundColor Green
Write-Host "   $SUPABASE_KEY" -ForegroundColor Gray
Write-Host ""
Write-Host "3. FRONTEND_URL" -ForegroundColor Green
Write-Host "   $FRONTEND_URL" -ForegroundColor Gray
Write-Host ""
Write-Host "4. RESEND_API_KEY" -ForegroundColor Green
Write-Host "   $RESEND_API_KEY" -ForegroundColor Gray
Write-Host ""
Write-Host "5. ADMIN_EMAIL" -ForegroundColor Green
Write-Host "   $ADMIN_EMAIL" -ForegroundColor Gray
Write-Host ""
Write-Host "6. PORT" -ForegroundColor Green
Write-Host "   10000" -ForegroundColor Gray
Write-Host ""
Write-Host "7. NODE_ENV" -ForegroundColor Green
Write-Host "   production" -ForegroundColor Gray
Write-Host ""
Write-Host "8. EMAIL_FROM" -ForegroundColor Green
Write-Host "   WEARING MIND <onboarding@resend.dev>" -ForegroundColor Gray
Write-Host ""

Write-Host "???????????????????????????????????????" -ForegroundColor Cyan
Write-Host ""

Write-Host "?? Copier toutes les valeurs dans le presse-papiers? (Y/N)" -ForegroundColor Yellow
$copyChoice = Read-Host

if ($copyChoice -eq "Y" -or $copyChoice -eq "y") {
    $clipboardText = @"
SUPABASE_URL=$SUPABASE_URL
SUPABASE_KEY=$SUPABASE_KEY
FRONTEND_URL=$FRONTEND_URL
RESEND_API_KEY=$RESEND_API_KEY
ADMIN_EMAIL=$ADMIN_EMAIL
PORT=10000
NODE_ENV=production
EMAIL_FROM=WEARING MIND <onboarding@resend.dev>
"@
    
    Set-Clipboard -Value $clipboardText
    Write-Host "? Variables copiées dans le presse-papiers!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Maintenant:" -ForegroundColor Yellow
    Write-Host "1. Ouvrez Render Dashboard" -ForegroundColor White
    Write-Host "2. Allez dans Environment" -ForegroundColor White
    Write-Host "3. Collez les variables une par une" -ForegroundColor White
    Write-Host ""
}

Write-Host "Ouvrir Render Dashboard maintenant? (Y/N)" -ForegroundColor Yellow
$openDash = Read-Host

if ($openDash -eq "Y" -or $openDash -eq "y") {
    Start-Process "https://dashboard.render.com/"
    Write-Host "? Dashboard Render ouvert!" -ForegroundColor Green
}

Write-Host ""
Write-Host "???????????????????????????????????????" -ForegroundColor Cyan
Write-Host ""
Write-Host "? Après avoir ajouté les variables:" -ForegroundColor Cyan
Write-Host "   1. Cliquez sur 'Save Changes'" -ForegroundColor White
Write-Host "   2. Attendez 2-3 minutes le redémarrage" -ForegroundColor White
Write-Host "   3. Lancez: .\test-render-apis.ps1" -ForegroundColor White
Write-Host ""
