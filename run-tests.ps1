# WEARING MIND - Master Test Runner
# Run all API tests with menu selection

function Show-Menu {
    Clear-Host
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "   WEARING MIND - API Test Suite" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Backend: http://localhost:3001/api" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Select a test to run:" -ForegroundColor White
    Write-Host ""
    Write-Host "  [1] Quick Health Check (30 sec)" -ForegroundColor Green
    Write-Host "  [2] Full API Test Suite (2 min)" -ForegroundColor Green
    Write-Host "  [3] Products API Only" -ForegroundColor Green
    Write-Host "  [4] Performance Benchmark" -ForegroundColor Green
    Write-Host "  [5] Run All Tests" -ForegroundColor Magenta
    Write-Host ""
    Write-Host "  [0] Exit" -ForegroundColor Red
    Write-Host ""
}

function Test-BackendRunning {
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3001/api/products" -Method GET -TimeoutSec 3 -ErrorAction Stop
        return $true
    } catch {
        Write-Host "`nERROR: Backend is not running!" -ForegroundColor Red
        Write-Host "Please start the backend first:" -ForegroundColor Yellow
        Write-Host "  cd backend" -ForegroundColor Gray
        Write-Host "  npm run start:dev`n" -ForegroundColor Gray
        return $false
    }
}

do {
    Show-Menu
    $choice = Read-Host "Enter your choice (0-5)"
    
    Write-Host ""
    
    if ($choice -ne "0") {
        # Check if backend is running
        if (-not (Test-BackendRunning)) {
            Write-Host "Press any key to continue..." -ForegroundColor Gray
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
            continue
        }
    }
    
    switch ($choice) {
        "1" {
            Write-Host "Running Quick Health Check...`n" -ForegroundColor Cyan
            & ".\quick-test.ps1"
            Write-Host "`nPress any key to continue..." -ForegroundColor Gray
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "2" {
            Write-Host "Running Full API Test Suite...`n" -ForegroundColor Cyan
            & ".\test-api.ps1"
        }
        "3" {
            Write-Host "Running Products API Tests...`n" -ForegroundColor Cyan
            & ".\test-products.ps1"
            Write-Host "`nPress any key to continue..." -ForegroundColor Gray
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "4" {
            Write-Host "Running Performance Benchmark...`n" -ForegroundColor Cyan
            & ".\benchmark-api.ps1"
            Write-Host "`nPress any key to continue..." -ForegroundColor Gray
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "5" {
            Write-Host "Running ALL Tests...`n" -ForegroundColor Magenta
            
            Write-Host "[1/4] Quick Health Check..." -ForegroundColor Yellow
            & ".\quick-test.ps1"
            Start-Sleep -Seconds 2
            
            Write-Host "`n[2/4] Products API Tests..." -ForegroundColor Yellow
            & ".\test-products.ps1"
            Start-Sleep -Seconds 2
            
            Write-Host "`n[3/4] Performance Benchmark..." -ForegroundColor Yellow
            & ".\benchmark-api.ps1"
            Start-Sleep -Seconds 2
            
            Write-Host "`n[4/4] Full API Test Suite..." -ForegroundColor Yellow
            & ".\test-api.ps1"
        }
        "0" {
            Write-Host "Exiting...`n" -ForegroundColor Yellow
        }
        default {
            Write-Host "Invalid choice. Please try again.`n" -ForegroundColor Red
            Start-Sleep -Seconds 2
        }
    }
} while ($choice -ne "0")

Write-Host "Goodbye!`n" -ForegroundColor Cyan
