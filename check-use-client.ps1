# Check for Invalid "use client" Directives
# PowerShell script

Write-Host "`n=== CHECKING 'use client' DIRECTIVES ===" -ForegroundColor Cyan
Write-Host ""

$invalidFiles = @()
$validFiles = @()
$totalChecked = 0

# Scan all .tsx and .ts files
Get-ChildItem -Path "frontend/src" -Recurse -Include "*.tsx","*.ts" | ForEach-Object {
    $totalChecked++
    $file = $_
    $content = Get-Content $file.FullName -Raw
    
    # Check for invalid backtick "use client"
    if ($content -match '^\s*`use client`') {
        Write-Host "  ? INVALID: $($file.FullName.Replace($PWD, '.'))" -ForegroundColor Red
        Write-Host "     ? Uses backticks instead of quotes" -ForegroundColor Yellow
        $invalidFiles += $file
    }
    # Check for valid "use client"
    elseif ($content -match '^\s*["\']use client["\']') {
        Write-Host "  ? VALID: $($file.FullName.Replace($PWD, '.'))" -ForegroundColor Green
        $validFiles += $file
    }
}

Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "  Total files checked: $totalChecked" -ForegroundColor White
Write-Host "  Valid 'use client': $($validFiles.Count)" -ForegroundColor Green
Write-Host "  Invalid backticks: $($invalidFiles.Count)" -ForegroundColor Red

if ($invalidFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "??  ACTION REQUIRED:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Fix invalid files by replacing:" -ForegroundColor White
    Write-Host "  `use client`  ?  " -NoNewline; Write-Host '"use client";' -ForegroundColor Green
    Write-Host ""
    
    foreach ($file in $invalidFiles) {
        Write-Host "  File: $($file.FullName.Replace($PWD, '.'))" -ForegroundColor Yellow
        
        # Offer to fix automatically
        $fix = Read-Host "  Fix automatically? (y/n)"
        if ($fix -eq 'y') {
            $content = Get-Content $file.FullName -Raw
            $fixed = $content -replace '^\s*`use client`\s*;?', '"use client";'
            Set-Content -Path $file.FullName -Value $fixed -NoNewline
            Write-Host "    ? Fixed!" -ForegroundColor Green
        }
    }
} else {
    Write-Host ""
    Write-Host "? All 'use client' directives are valid!" -ForegroundColor Green
}

Write-Host ""
