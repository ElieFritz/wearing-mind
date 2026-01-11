# Test Image Upload API
# PowerShell script

$baseUrl = "http://localhost:3001/api"

Write-Host "`n=== IMAGE UPLOAD TEST ===`n" -ForegroundColor Cyan

# Test 1: Upload Image
Write-Host "[1] Testing Image Upload..." -ForegroundColor Yellow

$testImage = "C:\Users\mappo\source\repos\wearing mind\frontend\public\images\products\hoodie-black.jpg"

if (Test-Path $testImage) {
    Write-Host "  Found test image: $testImage" -ForegroundColor Gray
    
    try {
        $form = @{
            file = Get-Item -Path $testImage
        }
        
        $response = Invoke-RestMethod -Uri "$baseUrl/upload/image" `
            -Method POST -Form $form -ContentType "multipart/form-data"
        
        Write-Host "  SUCCESS: Image uploaded!" -ForegroundColor Green
        Write-Host "  URL: $($response.url)" -ForegroundColor Green
        
        $uploadedUrl = $response.url
        
        # Test 2: Verify image is accessible
        Write-Host "`n[2] Testing Image Access..." -ForegroundColor Yellow
        try {
            $imageResponse = Invoke-WebRequest -Uri $uploadedUrl -Method GET
            Write-Host "  SUCCESS: Image is publicly accessible!" -ForegroundColor Green
            Write-Host "  Status: $($imageResponse.StatusCode)" -ForegroundColor Gray
        } catch {
            Write-Host "  FAILED: Image not accessible" -ForegroundColor Red
            Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        }
        
        # Test 3: Delete image
        Write-Host "`n[3] Testing Image Deletion..." -ForegroundColor Yellow
        try {
            $deleteBody = @{
                path = $uploadedUrl
            } | ConvertTo-Json
            
            $deleteResponse = Invoke-RestMethod -Uri "$baseUrl/upload/image" `
                -Method DELETE -Body $deleteBody -ContentType "application/json"
            
            Write-Host "  SUCCESS: Image deleted!" -ForegroundColor Green
        } catch {
            Write-Host "  FAILED: Could not delete image" -ForegroundColor Red
            Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        }
        
    } catch {
        Write-Host "  FAILED: Upload failed" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "  ERROR: Test image not found at $testImage" -ForegroundColor Red
    Write-Host "  Please provide a valid image path" -ForegroundColor Yellow
}

Write-Host "`n=== TEST COMPLETE ===`n" -ForegroundColor Cyan
