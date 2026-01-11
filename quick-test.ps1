# Quick API Health Check
# Fast verification of backend status

$baseUrl = "http://localhost:3001/api"

Write-Host "`nWEARING MIND - Quick API Check`n" -ForegroundColor Cyan

function Quick-Test {
    param([string]$Endpoint, [string]$Name)
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl$Endpoint" -Method GET -TimeoutSec 5
        $count = if ($response -is [array]) { $response.Count } else { 1 }
        Write-Host "  OK  $Name ($count items)" -ForegroundColor Green
        return $true
    } catch {
        Write-Host " FAIL $Name - $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

$results = @()
$results += Quick-Test -Endpoint "/products" -Name "Products"
$results += Quick-Test -Endpoint "/products/featured" -Name "Featured Products"
$results += Quick-Test -Endpoint "/orders" -Name "Orders"
$results += Quick-Test -Endpoint "/orders/stats" -Name "Order Stats"
$results += Quick-Test -Endpoint "/customers" -Name "Customers"

$passed = ($results | Where-Object { $_ -eq $true }).Count
$total = $results.Count

Write-Host "`nResult: $passed/$total endpoints working" -ForegroundColor $(if($passed -eq $total){"Green"}else{"Yellow"})
