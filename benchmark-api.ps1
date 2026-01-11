# API Performance Benchmark
# Measure response times of all endpoints

$baseUrl = "http://localhost:3001/api"

Write-Host "`n=== API PERFORMANCE BENCHMARK ===`n" -ForegroundColor Cyan

function Measure-Endpoint {
    param([string]$Method, [string]$Endpoint, [string]$Name)
    
    $times = @()
    $runs = 5
    
    Write-Host "Testing $Name..." -ForegroundColor Yellow
    
    for ($i = 1; $i -le $runs; $i++) {
        try {
            $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
            $response = Invoke-RestMethod -Uri "$baseUrl$Endpoint" -Method $Method -TimeoutSec 10
            $stopwatch.Stop()
            $times += $stopwatch.ElapsedMilliseconds
            Write-Host "  Run $i : $($stopwatch.ElapsedMilliseconds)ms" -ForegroundColor Gray
        } catch {
            Write-Host "  Run $i : FAILED" -ForegroundColor Red
        }
    }
    
    if ($times.Count -gt 0) {
        $avg = ($times | Measure-Object -Average).Average
        $min = ($times | Measure-Object -Minimum).Minimum
        $max = ($times | Measure-Object -Maximum).Maximum
        
        $color = if($avg -lt 100){"Green"}elseif($avg -lt 500){"Yellow"}else{"Red"}
        Write-Host "  Average: $([Math]::Round($avg, 2))ms | Min: $($min)ms | Max: $($max)ms" -ForegroundColor $color
    }
    
    Write-Host ""
    return $avg
}

# Test all endpoints
$results = @{}
$results["Products List"] = Measure-Endpoint -Method "GET" -Endpoint "/products" -Name "GET /products"
$results["Featured Products"] = Measure-Endpoint -Method "GET" -Endpoint "/products/featured" -Name "GET /products/featured"
$results["Orders List"] = Measure-Endpoint -Method "GET" -Endpoint "/orders" -Name "GET /orders"
$results["Order Stats"] = Measure-Endpoint -Method "GET" -Endpoint "/orders/stats" -Name "GET /orders/stats"
$results["Customers List"] = Measure-Endpoint -Method "GET" -Endpoint "/customers" -Name "GET /customers"

# Summary
Write-Host "=== PERFORMANCE SUMMARY ===`n" -ForegroundColor Cyan

$results.GetEnumerator() | Sort-Object Value | ForEach-Object {
    $ms = [Math]::Round($_.Value, 2)
    $rating = if($ms -lt 100){"EXCELLENT"}elseif($ms -lt 200){"GOOD"}elseif($ms -lt 500){"AVERAGE"}else{"SLOW"}
    $color = if($ms -lt 100){"Green"}elseif($ms -lt 500){"Yellow"}else{"Red"}
    
    Write-Host "$($_.Key.PadRight(20)) : $($ms)ms [$rating]" -ForegroundColor $color
}

$overall = [Math]::Round(($results.Values | Measure-Object -Average).Average, 2)
Write-Host "`nOverall Average: $overall ms" -ForegroundColor $(if($overall -lt 200){"Green"}else{"Yellow"})

Write-Host "`n=== BENCHMARK COMPLETE ===`n" -ForegroundColor Cyan
