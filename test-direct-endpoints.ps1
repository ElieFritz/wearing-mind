# Test Direct des Endpoints avec Nouvelles Clés

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TEST DIRECT ENDPOINTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Nouvelles clés
$anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZidW5naHlhZndzdWJwanZydmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzUxODcsImV4cCI6MjA4MzcxMTE4N30.cb_WU502UXW2DV28plHTPR3VUm3HAYjs5e2lG03caJg"
$supabaseUrl = "https://vbunghyafwsubpjvrvju.supabase.co"

Write-Host "?? Clé Supabase (208 caractères): " -NoNewline -ForegroundColor Gray
Write-Host "?" -ForegroundColor Green
Write-Host ""

# ========================================
# TEST 1: Direct Supabase API
# ========================================
Write-Host "??????????????????????????????????????" -ForegroundColor Gray
Write-Host "TEST 1: Supabase Direct API" -ForegroundColor Yellow
Write-Host "??????????????????????????????????????" -ForegroundColor Gray

$headers = @{
    "apikey" = $anonKey
    "Authorization" = "Bearer $anonKey"
    "Content-Type" = "application/json"
}

try {
    Write-Host "   GET /rest/v1/products..." -NoNewline
    $response = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/products?select=id,name,price&limit=5" -Headers $headers -Method GET
    Write-Host " ?" -ForegroundColor Green
    Write-Host "   Produits trouvés: $($response.Count)" -ForegroundColor White
    
    if ($response.Count -gt 0) {
        Write-Host ""
        $response | Select-Object -First 3 | ForEach-Object {
            Write-Host "      • $($_.name) - EUR $($_.price)" -ForegroundColor Gray
        }
    }
} catch {
    Write-Host " ?" -ForegroundColor Red
    Write-Host "   Erreur: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# ========================================
# TEST 2: Render Backend (avec ancienne clé?)
# ========================================
Write-Host "??????????????????????????????????????" -ForegroundColor Gray
Write-Host "TEST 2: Render Backend API" -ForegroundColor Yellow
Write-Host "??????????????????????????????????????" -ForegroundColor Gray

$renderUrl = "https://wearing-mind.onrender.com/api"

try {
    Write-Host "   GET /api/products..." -NoNewline
    $response = Invoke-RestMethod -Uri "$renderUrl/products?limit=5" -Method GET
    Write-Host " ?" -ForegroundColor Green
    Write-Host "   Produits trouvés: $($response.Count)" -ForegroundColor White
    
    if ($response.Count -gt 0) {
        Write-Host ""
        $response | Select-Object -First 3 | ForEach-Object {
            Write-Host "      • $($_.name) - EUR $($_.price)" -ForegroundColor Gray
        }
    }
} catch {
    Write-Host " ?" -ForegroundColor Red
    
    # Essayer de récupérer le message d'erreur détaillé
    try {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorBody = $reader.ReadToEnd() | ConvertFrom-Json
        Write-Host "   Erreur: $($errorBody.message)" -ForegroundColor Red
    } catch {
        Write-Host "   Erreur: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# ========================================
# TEST 3: Featured Products
# ========================================
Write-Host "??????????????????????????????????????" -ForegroundColor Gray
Write-Host "TEST 3: Featured Products" -ForegroundColor Yellow
Write-Host "??????????????????????????????????????" -ForegroundColor Gray

try {
    Write-Host "   GET /api/products/featured..." -NoNewline
    $response = Invoke-RestMethod -Uri "$renderUrl/products/featured?limit=4" -Method GET
    Write-Host " ?" -ForegroundColor Green
    Write-Host "   Produits featured: $($response.Count)" -ForegroundColor White
} catch {
    Write-Host " ?" -ForegroundColor Red
    try {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorBody = $reader.ReadToEnd() | ConvertFrom-Json
        Write-Host "   Erreur: $($errorBody.message)" -ForegroundColor Red
    } catch {
        Write-Host "   Erreur: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# ========================================
# TEST 4: Orders
# ========================================
Write-Host "??????????????????????????????????????" -ForegroundColor Gray
Write-Host "TEST 4: Orders API" -ForegroundColor Yellow
Write-Host "??????????????????????????????????????" -ForegroundColor Gray

try {
    Write-Host "   GET /api/orders..." -NoNewline
    $response = Invoke-RestMethod -Uri "$renderUrl/orders" -Method GET
    Write-Host " ?" -ForegroundColor Green
    Write-Host "   Commandes trouvées: $($response.Count)" -ForegroundColor White
} catch {
    Write-Host " ?" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Résumé
Write-Host "?? RÉSUMÉ:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Si TEST 1 (Supabase) passe:" -ForegroundColor White
Write-Host "   ? La nouvelle clé est VALIDE" -ForegroundColor Green
Write-Host ""
Write-Host "Si TEST 2-4 (Render) échouent:" -ForegroundColor White
Write-Host "   ??  Render utilise ENCORE l'ancienne clé" -ForegroundColor Yellow
Write-Host "   ? Mettez à jour SUPABASE_KEY sur Render" -ForegroundColor Yellow
Write-Host ""
Write-Host "Si tous les tests passent:" -ForegroundColor White
Write-Host "   ?? TOUT FONCTIONNE!" -ForegroundColor Green
Write-Host ""

Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
