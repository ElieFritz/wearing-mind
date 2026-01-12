# Script pour marquer plusieurs produits comme Featured

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MARQUER PRODUITS COMME FEATURED" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Clé Supabase
$anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZidW5naHlhZndzdWJwanZydmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzUxODcsImV4cCI6MjA4MzcxMTE4N30.cb_WU502UXW2DV28plHTPR3VUm3HAYjs5e2lG03caJg"
$supabaseUrl = "https://vbunghyafwsubpjvrvju.supabase.co"
$headers = @{
    "apikey" = $anonKey
    "Authorization" = "Bearer $anonKey"
    "Content-Type" = "application/json"
    "Prefer" = "return=representation"
}

# Étape 1: Lister tous les produits
Write-Host "?? Étape 1: Liste de tous les produits" -ForegroundColor Yellow
Write-Host ""

try {
    $allProducts = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/products?select=id,name,is_featured,is_new" -Headers $headers -Method GET
    
    Write-Host "   Total: $($allProducts.Count) produits dans la base" -ForegroundColor White
    Write-Host ""
    
    $allProducts | Format-Table @{Label="ID"; Expression={$_.id.Substring(0,8)}}, name, is_featured, is_new -AutoSize
    
    Write-Host ""
    Write-Host "   Produits Featured actuels: " -NoNewline
    $featuredCount = ($allProducts | Where-Object { $_.is_featured -eq $true }).Count
    if ($featuredCount -eq 0) {
        Write-Host "$featuredCount ?" -ForegroundColor Red
    } else {
        Write-Host "$featuredCount ?" -ForegroundColor Green
    }
    
} catch {
    Write-Host "   ? Erreur: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "??????????????????????????????????????" -ForegroundColor Gray
Write-Host ""

# Étape 2: Marquer tous les produits comme featured
Write-Host "?? Étape 2: Marquer tous les produits comme FEATURED" -ForegroundColor Yellow
Write-Host ""

$success = 0
$failed = 0

foreach ($product in $allProducts) {
    try {
        Write-Host "   Marquage: $($product.name)..." -NoNewline
        
        $body = @{
            is_featured = $true
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod `
            -Uri "$supabaseUrl/rest/v1/products?id=eq.$($product.id)" `
            -Headers $headers `
            -Method PATCH `
            -Body $body
        
        Write-Host " ?" -ForegroundColor Green
        $success++
        
    } catch {
        Write-Host " ?" -ForegroundColor Red
        Write-Host "      Erreur: $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "??????????????????????????????????????" -ForegroundColor Gray
Write-Host ""

# Étape 3: Vérification
Write-Host "? Étape 3: Vérification finale" -ForegroundColor Yellow
Write-Host ""

try {
    $updatedProducts = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/products?select=id,name,is_featured" -Headers $headers -Method GET
    
    $featuredProducts = $updatedProducts | Where-Object { $_.is_featured -eq $true }
    
    Write-Host "   Total produits: $($updatedProducts.Count)" -ForegroundColor White
    Write-Host "   Produits featured: $($featuredProducts.Count)" -ForegroundColor Green
    Write-Host ""
    
    if ($featuredProducts.Count -gt 0) {
        Write-Host "   Produits qui s'afficheront sur la page d'accueil:" -ForegroundColor Cyan
        $featuredProducts | ForEach-Object {
            Write-Host "      • $($_.name)" -ForegroundColor Gray
        }
    }
    
} catch {
    Write-Host "   ? Erreur: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Résumé
Write-Host "?? RÉSUMÉ:" -ForegroundColor Cyan
Write-Host "   Succès: $success produits" -ForegroundColor Green
Write-Host "   Échecs: $failed produits" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Gray" })
Write-Host ""

if ($success -gt 0) {
    Write-Host "?? Les produits sont maintenant marqués comme featured!" -ForegroundColor Green
    Write-Host ""
    Write-Host "?? Testez votre site:" -ForegroundColor Cyan
    Write-Host "   https://frontend-iota-flax-11.vercel.app" -ForegroundColor White
    Write-Host ""
    Write-Host "   Vous devriez voir $success produits sur la page d'accueil" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
