# Fix All UTF-8 Errors in Frontend
# PowerShell script

Write-Host "`n=== FIXING UTF-8 ERRORS ===" -ForegroundColor Cyan
Write-Host ""

$files = @(
    "frontend/src/app/checkout/page.tsx",
    "frontend/src/app/order-success/page.tsx",
    "frontend/src/app/admin/products/[id]/page.tsx",
    "frontend/src/app/admin/products/new/page.tsx"
)

$replacements = @{
    # Euro symbols
    '€' = 'EUR '
    '£' = 'GBP '
    '$' = 'USD '
    
    # Quotes
    '"' = '"'
    '"' = '"'
    ''' = "'"
    ''' = "'"
    '`' = "'"
    
    # Dashes
    '—' = '-'
    '–' = '-'
    
    # Bullets and symbols
    '•' = '-'
    '?' = '*'
    '?' = '*'
    '?' = 'v'
    '?' = '[v]'
    '?' = '[x]'
    '??' = '[!]'
    
    # Emojis
    '??' = '[email]'
    '??' = '[lock]'
    '??' = '[truck]'
    '???' = '[shield]'
}

$fixed = 0
$errors = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing: $file" -ForegroundColor Yellow
        
        try {
            $content = Get-Content $file -Raw -Encoding UTF8
            $modified = $false
            
            foreach ($key in $replacements.Keys) {
                if ($content -match [regex]::Escape($key)) {
                    $content = $content -replace [regex]::Escape($key), $replacements[$key]
                    $modified = $true
                    Write-Host "  - Replaced: $key" -ForegroundColor Gray
                }
            }
            
            if ($modified) {
                Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
                Write-Host "  ? Fixed" -ForegroundColor Green
                $fixed++
            } else {
                Write-Host "  ? Already clean" -ForegroundColor Gray
            }
        } catch {
            Write-Host "  ? Error: $($_.Exception.Message)" -ForegroundColor Red
            $errors++
        }
    } else {
        Write-Host "File not found: $file" -ForegroundColor Red
        $errors++
    }
    
    Write-Host ""
}

Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "  Files fixed: $fixed" -ForegroundColor Green
Write-Host "  Errors: $errors" -ForegroundColor $(if ($errors -gt 0) { "Red" } else { "Gray" })
Write-Host ""

if ($fixed -gt 0) {
    Write-Host "? UTF-8 errors fixed! Restart dev server:" -ForegroundColor Green
    Write-Host "  cd frontend" -ForegroundColor White
    Write-Host "  npm run dev" -ForegroundColor White
} else {
    Write-Host "? All files are clean!" -ForegroundColor Green
}

Write-Host ""
