# Migrate Existing Products - Add Sizes and Colors
# PowerShell script

$baseUrl = "http://localhost:3001/api"

Write-Host "`n=== MIGRATE PRODUCTS: ADD SIZES & COLORS ===`n" -ForegroundColor Cyan

# Default sizes for products without sizes
$defaultSizes = @("S", "M", "L", "XL")

# Color detection map
$colorMap = @{
    "black" = "#000000"
    "white" = "#FFFFFF"
    "grey" = "#808080"
    "gray" = "#808080"
    "navy" = "#001F3F"
    "blue" = "#0066CC"
    "red" = "#CC0000"
    "green" = "#00CC00"
    "beige" = "#F5F5DC"
}

# Fetch all products
Write-Host "[1] Fetching all products..." -ForegroundColor Yellow
try {
    $products = Invoke-RestMethod -Uri "$baseUrl/products" -Method GET
    Write-Host "  ? Found $($products.Count) products" -ForegroundColor Green
} catch {
    Write-Host "  ? Failed to fetch products" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[2] Migrating products..." -ForegroundColor Yellow
Write-Host ""

$updated = 0
$skipped = 0

foreach ($product in $products) {
    $needsUpdate = $false
    $changes = @()
    
    # Check if sizes need to be added
    if (!$product.sizes -or $product.sizes.Count -eq 0) {
        $product | Add-Member -NotePropertyName "sizes" -NotePropertyValue $defaultSizes -Force
        $needsUpdate = $true
        $changes += "sizes"
    }
    
    # Detect colors from name
    if (!$product.colors -or $product.colors.Count -eq 0) {
        $detectedColors = @()
        $lowerName = $product.name.ToLower()
        
        foreach ($colorName in $colorMap.Keys) {
            if ($lowerName.Contains($colorName)) {
                $detectedColors += $colorMap[$colorName]
            }
        }
        
        # Default to black if no color detected
        if ($detectedColors.Count -eq 0) {
            $detectedColors = @("#000000")
        }
        
        $product | Add-Member -NotePropertyName "colors" -NotePropertyValue $detectedColors -Force
        $needsUpdate = $true
        $changes += "colors"
    }
    
    # Update product if needed
    if ($needsUpdate) {
        Write-Host "  ? $($product.name)" -ForegroundColor White
        Write-Host "    Changes: $($changes -join ', ')" -ForegroundColor Gray
        
        if ($product.sizes) {
            Write-Host "    Sizes: $($product.sizes -join ', ')" -ForegroundColor Green
        }
        if ($product.colors) {
            Write-Host "    Colors: $($product.colors -join ', ')" -ForegroundColor Green
        }
        
        try {
            $body = $product | ConvertTo-Json -Depth 10
            
            $response = Invoke-RestMethod -Uri "$baseUrl/products/$($product.id)" `
                -Method PUT -Body $body -ContentType "application/json"
            
            Write-Host "    ? Updated" -ForegroundColor Green
            $updated++
        } catch {
            Write-Host "    ? Failed: $($_.Exception.Message)" -ForegroundColor Red
        }
        
        Write-Host ""
    } else {
        Write-Host "  ? $($product.name) - Already has sizes & colors" -ForegroundColor Gray
        $skipped++
    }
}

Write-Host ""
Write-Host "=== MIGRATION COMPLETE ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:" -ForegroundColor White
Write-Host "  Updated: $updated products" -ForegroundColor Green
Write-Host "  Skipped: $skipped products (already configured)" -ForegroundColor Gray
Write-Host "  Total: $($products.Count) products" -ForegroundColor White
Write-Host ""

if ($updated -gt 0) {
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Verify products in admin panel" -ForegroundColor White
    Write-Host "  2. Check product pages for correct sizes" -ForegroundColor White
    Write-Host "  3. Test add to cart with different sizes" -ForegroundColor White
    Write-Host ""
}
