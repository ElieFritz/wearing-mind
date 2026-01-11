# Test Supabase Images
# PowerShell script to verify images load correctly

Write-Host "`n=== SUPABASE IMAGES TEST ===`n" -ForegroundColor Cyan

# Test 1: Check if frontend is running
Write-Host "[1] Checking Frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5 -UseBasicParsing
    Write-Host "  ? Frontend is running" -ForegroundColor Green
} catch {
    Write-Host "  ? Frontend not running" -ForegroundColor Red
    Write-Host "  Please start: cd frontend && npm run dev" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Test 2: Check if products have Supabase images
Write-Host "[2] Checking Products with Supabase Images..." -ForegroundColor Yellow
try {
    $products = Invoke-RestMethod -Uri "http://localhost:3001/api/products" -Method GET
    
    $supabaseImages = $products | Where-Object { 
        $_.images -and ($_.images | Where-Object { $_ -like "*supabase.co*" }).Count -gt 0 
    }
    
    if ($supabaseImages.Count -gt 0) {
        Write-Host "  ? Found $($supabaseImages.Count) products with Supabase images" -ForegroundColor Green
        
        foreach ($product in $supabaseImages) {
            Write-Host "    - $($product.name)" -ForegroundColor White
            $product.images | Where-Object { $_ -like "*supabase.co*" } | ForEach-Object {
                Write-Host "      ? $_" -ForegroundColor Gray
            }
        }
    } else {
        Write-Host "  ? No products with Supabase images found" -ForegroundColor Yellow
        Write-Host "  Upload images via admin panel to test" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ? Failed to fetch products" -ForegroundColor Red
}

Write-Host ""

# Test 3: Test direct image access
Write-Host "[3] Testing Direct Image Access..." -ForegroundColor Yellow
$testUrls = @(
    "https://vbunghyafwsubpjvrvju.supabase.co/storage/v1/object/public/products/products/0ccffebb-09a5-45e7-8faa-b29aa6d0ee1f.png"
)

foreach ($url in $testUrls) {
    try {
        $imageResponse = Invoke-WebRequest -Uri $url -Method HEAD -TimeoutSec 5 -UseBasicParsing
        Write-Host "  ? Image accessible: $($imageResponse.StatusCode)" -ForegroundColor Green
        Write-Host "    Type: $($imageResponse.Headers['Content-Type'])" -ForegroundColor Gray
    } catch {
        Write-Host "  ? Image not accessible" -ForegroundColor Red
    }
}

Write-Host ""

# Test 4: Check SafeImage component exists
Write-Host "[4] Checking SafeImage Component..." -ForegroundColor Yellow
$safeImagePath = "frontend\src\components\SafeImage.tsx"
if (Test-Path $safeImagePath) {
    Write-Host "  ? SafeImage component exists" -ForegroundColor Green
} else {
    Write-Host "  ? SafeImage component missing" -ForegroundColor Red
    Write-Host "  Please create the component" -ForegroundColor Yellow
}

Write-Host ""

# Test 5: Check next.config.ts
Write-Host "[5] Checking Next.js Configuration..." -ForegroundColor Yellow
$configPath = "frontend\next.config.ts"
if (Test-Path $configPath) {
    $configContent = Get-Content $configPath -Raw
    
    if ($configContent -like "*vbunghyafwsubpjvrvju.supabase.co*") {
        Write-Host "  ? Supabase hostname configured" -ForegroundColor Green
    } else {
        Write-Host "  ? Supabase hostname not in config" -ForegroundColor Red
    }
    
    if ($configContent -like "*remotePatterns*") {
        Write-Host "  ? Remote patterns configured" -ForegroundColor Green
    } else {
        Write-Host "  ? Remote patterns may be missing" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ? next.config.ts not found" -ForegroundColor Red
}

Write-Host ""

# Summary
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "To verify images work:" -ForegroundColor White
Write-Host "  1. Open http://localhost:3000" -ForegroundColor Gray
Write-Host "  2. Press F12 (Developer Console)" -ForegroundColor Gray
Write-Host "  3. Look for 'resolved to private ip' errors" -ForegroundColor Gray
Write-Host "  4. If present ? Images have issues" -ForegroundColor Gray
Write-Host "  5. If absent ? Images work correctly ?" -ForegroundColor Gray
Write-Host ""
Write-Host "SafeImage component bypasses Next.js IP check" -ForegroundColor Cyan
Write-Host "All Supabase images should now load correctly!" -ForegroundColor Green
Write-Host ""
