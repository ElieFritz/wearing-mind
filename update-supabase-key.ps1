# Script pour mettre à jour UNIQUEMENT la clé Supabase sur Render

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  UPDATE SUPABASE KEY ON RENDER" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "??  IMPORTANT: Vous devez obtenir la VRAIE clé depuis Supabase" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Sur Supabase Dashboard ? Settings ? API" -ForegroundColor White
Write-Host "2. Copiez la clé 'anon public'" -ForegroundColor White
Write-Host ""

Write-Host "Collez la nouvelle clé Supabase ici:" -ForegroundColor Green
$newKey = Read-Host

if ([string]::IsNullOrWhiteSpace($newKey)) {
    Write-Host "? Aucune clé fournie. Annulation." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Nouvelle clé reçue (longueur: $($newKey.Length) caractères)" -ForegroundColor Gray
Write-Host ""

Write-Host "?? Voici ce que vous devez faire sur Render:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Aller sur Render Dashboard > wearing-mind > Environment" -ForegroundColor White
Write-Host "2. Trouver la variable 'SUPABASE_KEY'" -ForegroundColor White
Write-Host "3. Cliquer sur 'Edit' (crayon)" -ForegroundColor White
Write-Host "4. Remplacer l'ancienne valeur par:" -ForegroundColor White
Write-Host ""
Write-Host $newKey -ForegroundColor Green
Write-Host ""
Write-Host "5. Cliquer 'Save Changes'" -ForegroundColor White
Write-Host "6. Attendre 2-3 minutes le redémarrage" -ForegroundColor White
Write-Host ""

Write-Host "Copier la nouvelle clé dans le presse-papiers? (Y/N)" -ForegroundColor Yellow
$copy = Read-Host

if ($copy -eq "Y" -or $copy -eq "y") {
    Set-Clipboard -Value $newKey
    Write-Host "? Clé copiée dans le presse-papiers!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Ouvrir Render Dashboard maintenant? (Y/N)" -ForegroundColor Yellow
$open = Read-Host

if ($open -eq "Y" -or $open -eq "y") {
    Start-Process "https://dashboard.render.com/"
    Write-Host "? Dashboard Render ouvert!" -ForegroundColor Green
}

Write-Host ""
Write-Host "???????????????????????????????????????" -ForegroundColor Cyan
Write-Host ""
Write-Host "? Après avoir mis à jour la clé:" -ForegroundColor Cyan
Write-Host "   1. Attendez le redémarrage (statut 'Live')" -ForegroundColor White
Write-Host "   2. Testez avec: .\test-render-apis.ps1" -ForegroundColor White
Write-Host ""

# Aussi mettre à jour le fichier .env local
Write-Host "Mettre à jour aussi le fichier backend\.env local? (Y/N)" -ForegroundColor Yellow
$updateLocal = Read-Host

if ($updateLocal -eq "Y" -or $updateLocal -eq "y") {
    $envContent = Get-Content "backend\.env" -Raw
    $envContent = $envContent -replace 'SUPABASE_ANON_KEY=.*', "SUPABASE_ANON_KEY=$newKey"
    $envContent | Set-Content "backend\.env" -NoNewline
    Write-Host "? Fichier backend\.env mis à jour!" -ForegroundColor Green
}

Write-Host ""
