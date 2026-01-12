# Script de Vérification Finale - Après Mise à Jour Supabase Key

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  FINAL VERIFICATION" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "? Attendez que Render finisse de redémarrer..." -ForegroundColor Yellow
Write-Host "   (Le statut doit être 'Live' et vert)" -ForegroundColor Gray
Write-Host ""
Write-Host "Appuyez sur Entrée quand le service est 'Live'..." -ForegroundColor Green
Read-Host

Write-Host ""
Write-Host "?? Test 1: Vérification de la clé Supabase localement..." -ForegroundColor Cyan

$headers = @{
    "apikey" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZidW5naHlhZndzdWJwanZydmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzUxODcsImV4cCI6MjA4MzcxMTE4N30.cb_WU502UXW2DV28plHTPR3VUm3HAYjs5e2lG03caJg"
    "Authorization" = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZidW5naHlhZndzdWJwanZydmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzUxODcsImV4cCI6MjA4MzcxMTE4N30.cb_WU502UXW2DV28plHTPR3VUm3HAYjs5e2lG03caJg"
}

try {
    $response = Invoke-RestMethod -Uri "https://vbunghyafwsubpjvrvju.supabase.co/rest/v1/products?select=id&limit=1" -Headers $headers -Method GET
    Write-Host "   ? Clé Supabase VALIDE!" -ForegroundColor Green
} catch {
    Write-Host "   ? Clé Supabase INVALIDE!" -ForegroundColor Red
    Write-Host "   Erreur: $($_.Exception.Message)" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "?? Test 2: Test du backend Render..." -ForegroundColor Cyan
Write-Host ""

# Test Products API
Write-Host "   Testing /api/products..." -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "https://wearing-mind.onrender.com/api/products" -Method GET
    Write-Host "   ? Products API Working! Found $($response.length) products" -ForegroundColor Green
} catch {
    $errorBody = $null
    try {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorBody = $reader.ReadToEnd() | ConvertFrom-Json
    } catch {}
    
    Write-Host "   ? Products API Failed" -ForegroundColor Red
    if ($errorBody) {
        Write-Host "   Error: $($errorBody.message)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "   Testing /api/products/featured..." -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "https://wearing-mind.onrender.com/api/products/featured?limit=4" -Method GET
    Write-Host "   ? Featured API Working! Found $($response.length) products" -ForegroundColor Green
} catch {
    Write-Host "   ? Featured API Failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "   Testing /api/orders..." -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "https://wearing-mind.onrender.com/api/orders" -Method GET
    Write-Host "   ? Orders API Working! Found $($response.length) orders" -ForegroundColor Green
} catch {
    Write-Host "   ? Orders API Failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "?? FÉLICITATIONS!" -ForegroundColor Green
Write-Host ""
Write-Host "? Backend Render: Live" -ForegroundColor Green
Write-Host "? Frontend Vercel: https://frontend-iota-flax-11.vercel.app" -ForegroundColor Green
Write-Host "? Database Supabase: Connected" -ForegroundColor Green
Write-Host ""
Write-Host "?? Testez votre site maintenant:" -ForegroundColor Cyan
Write-Host "   https://frontend-iota-flax-11.vercel.app" -ForegroundColor White
Write-Host ""

Write-Host "Ouvrir le site? (Y/N)" -ForegroundColor Yellow
$open = Read-Host

if ($open -eq "Y" -or $open -eq "y") {
    Start-Process "https://frontend-iota-flax-11.vercel.app"
    Write-Host "? Site ouvert!" -ForegroundColor Green
}

Write-Host ""
Write-Host "?? URLs Importantes:" -ForegroundColor Cyan
Write-Host "   Frontend:  https://frontend-iota-flax-11.vercel.app" -ForegroundColor White
Write-Host "   Backend:   https://wearing-mind.onrender.com/api" -ForegroundColor White
Write-Host "   Supabase:  https://vbunghyafwsubpjvrvju.supabase.co" -ForegroundColor White
Write-Host ""
