# Quick Fix: Mark Products as Featured
# PowerShell script to automatically feature products

$baseUrl = "http://localhost:3001/api"

Write-Host "`n=== QUICK FIX: FEATURE PRODUCTS ===`n" -ForegroundColor Cyan

try {
    # Get all products
    Write-Host "Fetching all products..." -ForegroundColor Yellow
    $products = Invoke-RestMethod -Uri "$baseUrl/products" -Method GET
    
    if ($products.Count -eq 0) {
        Write-Host "ERROR: No products found in database!" -ForegroundColor Red
        Write-Host "Please create products first in the admin panel." -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "Found $($products.Count) products" -ForegroundColor Green
    Write-Host ""
    
    # Take first 4 products
    $toFeature = $products | Select-Object -First 4
    
    Write-Host "Marking first 4 products as featured..." -ForegroundColor Yellow
    Write-Host ""
    
    foreach ($product in $toFeature) {
        Write-Host "  ? $($product.name)" -ForegroundColor White
        
        try {
            $body = @{
                is_featured = $true
            } | ConvertTo-Json
            
            $response = Invoke-RestMethod -Uri "$baseUrl/products/$($product.id)" `
                -Method PUT -Body $body -ContentType "application/json"
            
            Write-Host "    ? Featured!" -ForegroundColor Green
        } catch {
            Write-Host "    ? Failed: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "=== DONE! ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Go to http://localhost:3000" -ForegroundColor White
    Write-Host "  2. Refresh the page (Ctrl+F5)" -ForegroundColor White
    Write-Host "  3. Scroll to 'Featured Collection'" -ForegroundColor White
    Write-Host "  4. Your products should now appear! ?" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure:" -ForegroundColor Yellow
    Write-Host "  1. Backend is running (npm run start:dev)" -ForegroundColor White
    Write-Host "  2. Products exist in database" -ForegroundColor White
    Write-Host ""
}
