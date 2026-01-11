# Diagnostic Featured Products
# PowerShell script to check why products don't display

$baseUrl = "http://localhost:3001/api"

Write-Host "`n=== DIAGNOSTIC FEATURED PRODUCTS ===`n" -ForegroundColor Cyan

# Test 1: Check if backend is running
Write-Host "[1] Testing Backend Connection..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/products" -Method GET -TimeoutSec 3
    Write-Host "  SUCCESS: Backend is running" -ForegroundColor Green
    Write-Host "  Total products in DB: $($health.Count)" -ForegroundColor Gray
} catch {
    Write-Host "  FAILED: Backend not responding" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nPlease start the backend:" -ForegroundColor Yellow
    Write-Host "  cd backend" -ForegroundColor Gray
    Write-Host "  npm run start:dev" -ForegroundColor Gray
    exit 1
}

Write-Host ""

# Test 2: Check featured products endpoint
Write-Host "[2] Testing Featured Products Endpoint..." -ForegroundColor Yellow
try {
    $featured = Invoke-RestMethod -Uri "$baseUrl/products/featured?limit=4" -Method GET
    Write-Host "  SUCCESS: Featured endpoint works" -ForegroundColor Green
    Write-Host "  Featured products found: $($featured.Count)" -ForegroundColor Gray
    
    if ($featured.Count -eq 0) {
        Write-Host "  WARNING: No featured products in database!" -ForegroundColor Red
        Write-Host "`n  Solutions:" -ForegroundColor Yellow
        Write-Host "    1. Go to http://localhost:3000/admin/products/new" -ForegroundColor White
        Write-Host "    2. Create a product" -ForegroundColor White
        Write-Host "    3. Check 'Feature on Homepage' checkbox" -ForegroundColor White
        Write-Host "    4. Save the product" -ForegroundColor White
    } else {
        Write-Host "`n  Featured Products Details:" -ForegroundColor Cyan
        foreach ($product in $featured) {
            Write-Host "    - $($product.name) (€$($product.price))" -ForegroundColor White
            Write-Host "      SKU: $($product.sku)" -ForegroundColor Gray
            Write-Host "      Images: $($product.images.Count)" -ForegroundColor Gray
            Write-Host "      Is Featured: $($product.is_featured)" -ForegroundColor Gray
            Write-Host ""
        }
    }
} catch {
    Write-Host "  FAILED: Featured endpoint error" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Check all products
Write-Host "[3] Checking All Products..." -ForegroundColor Yellow
try {
    $allProducts = Invoke-RestMethod -Uri "$baseUrl/products" -Method GET
    Write-Host "  Total products: $($allProducts.Count)" -ForegroundColor Green
    
    $featuredCount = ($allProducts | Where-Object { $_.is_featured -eq $true }).Count
    Write-Host "  Products marked as featured: $featuredCount" -ForegroundColor Gray
    
    if ($featuredCount -eq 0) {
        Write-Host "`n  ACTION REQUIRED:" -ForegroundColor Red
        Write-Host "  No products are marked as 'featured' in the database" -ForegroundColor Yellow
        Write-Host "`n  To fix:" -ForegroundColor Cyan
        Write-Host "    1. Edit an existing product" -ForegroundColor White
        Write-Host "    2. Check the 'Feature on Homepage' option" -ForegroundColor White
        Write-Host "    3. Save" -ForegroundColor White
    }
} catch {
    Write-Host "  FAILED: Could not fetch all products" -ForegroundColor Red
}

Write-Host ""

# Test 4: Frontend API call simulation
Write-Host "[4] Simulating Frontend API Call..." -ForegroundColor Yellow
try {
    $frontendUrl = "http://localhost:3000"
    Write-Host "  Frontend URL: $frontendUrl" -ForegroundColor Gray
    Write-Host "  API URL: $baseUrl" -ForegroundColor Gray
    
    # Check if .env.local exists
    $envPath = "frontend\.env.local"
    if (Test-Path $envPath) {
        $envContent = Get-Content $envPath
        Write-Host "  .env.local exists: YES" -ForegroundColor Green
        Write-Host "  Content:" -ForegroundColor Gray
        $envContent | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
    } else {
        Write-Host "  .env.local exists: NO" -ForegroundColor Red
        Write-Host "  Creating .env.local..." -ForegroundColor Yellow
        "NEXT_PUBLIC_API_URL=http://localhost:3001/api" | Out-File -FilePath $envPath -Encoding UTF8
        Write-Host "  Created! Restart frontend to apply." -ForegroundColor Green
    }
} catch {
    Write-Host "  ERROR checking frontend config" -ForegroundColor Red
}

Write-Host ""

# Summary
Write-Host "=== DIAGNOSTIC SUMMARY ===" -ForegroundColor Cyan
Write-Host ""

if ($featured.Count -gt 0) {
    Write-Host "STATUS: OK" -ForegroundColor Green
    Write-Host "Featured products are available and should display on homepage" -ForegroundColor White
    Write-Host ""
    Write-Host "If products still don't show:" -ForegroundColor Yellow
    Write-Host "  1. Open browser console (F12)" -ForegroundColor White
    Write-Host "  2. Check for API errors" -ForegroundColor White
    Write-Host "  3. Refresh the page (Ctrl+F5)" -ForegroundColor White
} else {
    Write-Host "STATUS: NEEDS ATTENTION" -ForegroundColor Red
    Write-Host "No featured products found in database" -ForegroundColor White
    Write-Host ""
    Write-Host "Quick Fix:" -ForegroundColor Cyan
    Write-Host "  1. http://localhost:3000/admin/products" -ForegroundColor White
    Write-Host "  2. Edit any product" -ForegroundColor White
    Write-Host "  3. Enable 'Feature on Homepage'" -ForegroundColor White
    Write-Host "  4. Save" -ForegroundColor White
}

Write-Host "`n=== END DIAGNOSTIC ===`n" -ForegroundColor Cyan
