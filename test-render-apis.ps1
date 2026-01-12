# Script de test des APIs Render après configuration

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  TEST RENDER BACKEND APIs" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "https://wearing-mind.onrender.com/api"
$passed = 0
$failed = 0

# Test 1: Health Check
Write-Host "Test 1: Health Check (/api)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://wearing-mind.onrender.com/api" -Method GET -UseBasicParsing -ErrorAction Stop
    Write-Host "   ? PASSED - Status: $($response.StatusCode)" -ForegroundColor Green
    $passed++
} catch {
    Write-Host "   ? FAILED - $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 2: Products List
Write-Host "Test 2: Products List (/api/products)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/products" -Method GET
    Write-Host "   ? PASSED - Found $($response.length) products" -ForegroundColor Green
    $passed++
} catch {
    Write-Host "   ? FAILED - $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        $errorBody = $_.ErrorDetails.Message | ConvertFrom-Json
        Write-Host "   Error Details: $($errorBody.message)" -ForegroundColor Red
    }
    $failed++
}
Write-Host ""

# Test 3: Featured Products
Write-Host "Test 3: Featured Products (/api/products/featured)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/products/featured?limit=4" -Method GET
    Write-Host "   ? PASSED - Found $($response.length) featured products" -ForegroundColor Green
    $passed++
} catch {
    Write-Host "   ? FAILED - $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        $errorBody = $_.ErrorDetails.Message | ConvertFrom-Json
        Write-Host "   Error Details: $($errorBody.message)" -ForegroundColor Red
    }
    $failed++
}
Write-Host ""

# Test 4: Orders
Write-Host "Test 4: Orders List (/api/orders)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/orders" -Method GET
    Write-Host "   ? PASSED - Found $($response.length) orders" -ForegroundColor Green
    $passed++
} catch {
    Write-Host "   ? FAILED - $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        $errorBody = $_.ErrorDetails.Message | ConvertFrom-Json
        Write-Host "   Error Details: $($errorBody.message)" -ForegroundColor Red
    }
    $failed++
}
Write-Host ""

# Test 5: Customers
Write-Host "Test 5: Customers List (/api/customers)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/customers" -Method GET
    Write-Host "   ? PASSED - Found $($response.length) customers" -ForegroundColor Green
    $passed++
} catch {
    Write-Host "   ? FAILED - $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        $errorBody = $_.ErrorDetails.Message | ConvertFrom-Json
        Write-Host "   Error Details: $($errorBody.message)" -ForegroundColor Red
    }
    $failed++
}
Write-Host ""

# Test 6: Single Product
Write-Host "Test 6: Single Product by ID" -ForegroundColor Yellow
try {
    # First get a product ID
    $products = Invoke-RestMethod -Uri "$baseUrl/products" -Method GET
    if ($products.length -gt 0) {
        $productId = $products[0].id
        $product = Invoke-RestMethod -Uri "$baseUrl/products/$productId" -Method GET
        Write-Host "   ? PASSED - Product: $($product.name)" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "   ??  SKIPPED - No products in database" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ? FAILED - $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Results Summary
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  TEST RESULTS" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
Write-Host ""

if ($failed -eq 0) {
    Write-Host "?? ALL TESTS PASSED!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Votre backend est maintenant fonctionnel!" -ForegroundColor White
    Write-Host "Vous pouvez tester le frontend:" -ForegroundColor White
    Write-Host "   https://frontend-iota-flax-11.vercel.app" -ForegroundColor Cyan
} else {
    Write-Host "??  SOME TESTS FAILED" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Vérifiez:" -ForegroundColor White
    Write-Host "   1. Les variables d'environnement sur Render" -ForegroundColor White
    Write-Host "   2. Que le service a bien redémarré" -ForegroundColor White
    Write-Host "   3. Les logs Render pour plus de détails" -ForegroundColor White
    Write-Host ""
    Write-Host "Dashboard Render: https://dashboard.render.com/" -ForegroundColor Cyan
}

Write-Host ""
