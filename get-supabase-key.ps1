# Script Simple - Obtenir la Clé Supabase

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  GET SUPABASE API KEY" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "?? Étapes pour obtenir votre clé Supabase:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Le dashboard Supabase va s'ouvrir" -ForegroundColor White
Write-Host "2. Descendez jusqu'à 'Project API keys'" -ForegroundColor White
Write-Host "3. Cherchez 'anon' 'public'" -ForegroundColor White
Write-Host "4. Cliquez sur l'icône ??? (oeil) pour révéler la clé" -ForegroundColor White
Write-Host "5. Cliquez sur l'icône ?? (copier) à côté" -ForegroundColor White
Write-Host ""

Write-Host "Appuyez sur Entrée pour ouvrir Supabase Dashboard..." -ForegroundColor Green
Read-Host

Start-Process "https://supabase.com/dashboard/project/vbunghyafwsubpjvrvju/settings/api"

Write-Host ""
Write-Host "? Dashboard Supabase ouvert!" -ForegroundColor Green
Write-Host ""
Write-Host "? Une fois la clé copiée, revenez ici..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Appuyez sur Entrée quand vous avez copié la clé..." -ForegroundColor Green
Read-Host

Write-Host ""
Write-Host "?? Maintenant, collez la clé ici (Ctrl+V puis Entrée):" -ForegroundColor Cyan
$key = Read-Host

if ([string]::IsNullOrWhiteSpace($key)) {
    Write-Host ""
    Write-Host "? Pas de clé détectée. Réessayez!" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "? Clé reçue! Longueur: $($key.Length) caractères" -ForegroundColor Green

if ($key.Length -lt 100) {
    Write-Host "??  ATTENTION: La clé semble trop courte!" -ForegroundColor Yellow
    Write-Host "   Une clé Supabase valide fait environ 200-250 caractères" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Continuer quand même? (Y/N)" -ForegroundColor Yellow
    $continue = Read-Host
    if ($continue -ne "Y" -and $continue -ne "y") {
        exit
    }
}

Write-Host ""
Write-Host "???????????????????????????????????????" -ForegroundColor Cyan
Write-Host ""
Write-Host "?? ÉTAPES SUIVANTES:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Aller sur Render Dashboard" -ForegroundColor White
Write-Host "2. wearing-mind > Environment" -ForegroundColor White
Write-Host "3. Modifier SUPABASE_KEY" -ForegroundColor White
Write-Host "4. Coller cette valeur:" -ForegroundColor White
Write-Host ""
Write-Host $key -ForegroundColor Green
Write-Host ""
Write-Host "5. Save Changes" -ForegroundColor White
Write-Host "6. Attendre 2-3 min" -ForegroundColor White
Write-Host ""

# Copier dans le presse-papiers
Set-Clipboard -Value $key
Write-Host "? Clé copiée dans le presse-papiers!" -ForegroundColor Green
Write-Host ""

Write-Host "Ouvrir Render Dashboard? (Y/N)" -ForegroundColor Yellow
$openRender = Read-Host

if ($openRender -eq "Y" -or $openRender -eq "y") {
    Start-Process "https://dashboard.render.com/"
    Write-Host "? Dashboard Render ouvert!" -ForegroundColor Green
}

Write-Host ""
Write-Host "???????????????????????????????????????" -ForegroundColor Cyan
Write-Host ""
Write-Host "? Après avoir mis à jour sur Render:" -ForegroundColor Cyan
Write-Host "   1. Attendez que le statut soit 'Live'" -ForegroundColor White
Write-Host "   2. Lancez: .\test-render-apis.ps1" -ForegroundColor White
Write-Host ""

Write-Host "Mettre à jour backend\.env local aussi? (Y/N)" -ForegroundColor Yellow
$updateLocal = Read-Host

if ($updateLocal -eq "Y" -or $updateLocal -eq "y") {
    try {
        $envPath = "backend\.env"
        $envContent = Get-Content $envPath -Raw
        
        # Mettre à jour SUPABASE_ANON_KEY
        $envContent = $envContent -replace 'SUPABASE_ANON_KEY=.*', "SUPABASE_ANON_KEY=$key"
        
        $envContent | Set-Content $envPath -NoNewline
        
        Write-Host "? backend\.env mis à jour!" -ForegroundColor Green
    } catch {
        Write-Host "??  Erreur lors de la mise à jour du fichier local: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "? Configuration terminée!" -ForegroundColor Green
Write-Host ""
