# Test Products API Only
# Detailed testing of products endpoints

$baseUrl = "http://localhost:3001/api"

Write-Host "`n=== PRODUCTS API TESTING ===`n" -ForegroundColor Cyan

# 1. Get all products
Write-Host "[1] GET /products - Fetch all products" -ForegroundColor Yellow
try {
    $products = Invoke-RestMethod -Uri "$baseUrl/products" -Method GET
    Write-Host "  SUCCESS: Found $($products.Count) products" -ForegroundColor Green
    
    # Display products
    $products | ForEach-Object {
        Write-Host "    - $($_.name) (€$($_.price)) - Stock: $($_.stock)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 2. Get featured products
Write-Host "[2] GET /products/featured - Fetch featured products" -ForegroundColor Yellow
try {
    $featured = Invoke-RestMethod -Uri "$baseUrl/products/featured?limit=4" -Method GET
    Write-Host "  SUCCESS: Found $($featured.Count) featured products" -ForegroundColor Green
    
    $featured | ForEach-Object {
        Write-Host "    - $($_.name) $(if($_.is_new){'[NEW]'})" -ForegroundColor Gray
    }
} catch {
    Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 3. Create a test product
Write-Host "[3] POST /products - Create new product" -ForegroundColor Yellow
$newProduct = @{
    name = "Test Hoodie PowerShell"
    sku = "WM-PS-TEST-$(Get-Random -Maximum 9999)"
    price = 125.00
    category = "Hoodie"
    description = "Test product created via PowerShell"
    stock = 20
    is_new = $true
    is_featured = $true
} | ConvertTo-Json

try {
    $created = Invoke-RestMethod -Uri "$baseUrl/products" -Method POST -Body $newProduct -ContentType "application/json"
    Write-Host "  SUCCESS: Product created with ID: $($created.id)" -ForegroundColor Green
    Write-Host "    Name: $($created.name)" -ForegroundColor Gray
    Write-Host "    SKU: $($created.sku)" -ForegroundColor Gray
    Write-Host "    Price: €$($created.price)" -ForegroundColor Gray
    
    $createdId = $created.id
    
    Write-Host ""
    
    # 4. Get product by ID
    Write-Host "[4] GET /products/$createdId - Fetch by ID" -ForegroundColor Yellow
    try {
        $product = Invoke-RestMethod -Uri "$baseUrl/products/$createdId" -Method GET
        Write-Host "  SUCCESS: Product found" -ForegroundColor Green
    } catch {
        Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    
    # 5. Update stock
    Write-Host "[5] PUT /products/$createdId/stock - Update stock" -ForegroundColor Yellow
    $stockUpdate = @{ quantity = -5 } | ConvertTo-Json
    try {
        $updated = Invoke-RestMethod -Uri "$baseUrl/products/$createdId/stock" -Method PUT -Body $stockUpdate -ContentType "application/json"
        Write-Host "  SUCCESS: Stock updated to $($updated.stock)" -ForegroundColor Green
    } catch {
        Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    
    # 6. Delete test product
    Write-Host "[6] DELETE /products/$createdId - Clean up" -ForegroundColor Yellow
    try {
        Invoke-RestMethod -Uri "$baseUrl/products/$createdId" -Method DELETE
        Write-Host "  SUCCESS: Test product deleted" -ForegroundColor Green
    } catch {
        Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
    }
    
} catch {
    Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 7. Search products
Write-Host "[7] GET /products?search=hoodie - Search products" -ForegroundColor Yellow
try {
    $results = Invoke-RestMethod -Uri "$baseUrl/products?search=hoodie" -Method GET
    Write-Host "  SUCCESS: Found $($results.Count) results for 'hoodie'" -ForegroundColor Green
} catch {
    Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 8. Filter by category
Write-Host "[8] GET /products?category=Hoodie - Filter by category" -ForegroundColor Yellow
try {
    $hoodies = Invoke-RestMethod -Uri "$baseUrl/products?category=Hoodie" -Method GET
    Write-Host "  SUCCESS: Found $($hoodies.Count) hoodies" -ForegroundColor Green
} catch {
    Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== PRODUCTS API TEST COMPLETE ===`n" -ForegroundColor Cyan
