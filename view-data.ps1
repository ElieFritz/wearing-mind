# Live Data Viewer
# Display current data from backend in real-time

$baseUrl = "http://localhost:3001/api"

function Show-Products {
    Clear-Host
    Write-Host "`n=== PRODUCTS (Live Data) ===`n" -ForegroundColor Cyan
    
    try {
        $products = Invoke-RestMethod -Uri "$baseUrl/products" -Method GET
        
        Write-Host "Total Products: $($products.Count)`n" -ForegroundColor Yellow
        
        $products | Format-Table -Property @(
            @{Label="Name"; Expression={$_.name}; Width=25},
            @{Label="SKU"; Expression={$_.sku}; Width=15},
            @{Label="Price"; Expression={"€$($_.price)"}; Width=10},
            @{Label="Stock"; Expression={$_.stock}; Width=8},
            @{Label="Category"; Expression={$_.category}; Width=12},
            @{Label="New"; Expression={if($_.is_new){"?"}else{""}}; Width=5},
            @{Label="Featured"; Expression={if($_.is_featured){"?"}else{""}}; Width=10}
        ) -AutoSize
        
    } catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
}

function Show-Orders {
    Clear-Host
    Write-Host "`n=== ORDERS (Live Data) ===`n" -ForegroundColor Cyan
    
    try {
        $orders = Invoke-RestMethod -Uri "$baseUrl/orders" -Method GET
        
        Write-Host "Total Orders: $($orders.Count)`n" -ForegroundColor Yellow
        
        $orders | Format-Table -Property @(
            @{Label="Order #"; Expression={$_.order_number}; Width=20},
            @{Label="Customer"; Expression={$_.customer_name}; Width=20},
            @{Label="Total"; Expression={"€$($_.total)"}; Width=10},
            @{Label="Status"; Expression={$_.status}; Width=12},
            @{Label="Date"; Expression={(Get-Date $_.created_at -Format "dd/MM/yyyy HH:mm")}; Width=18}
        ) -AutoSize
        
    } catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
}

function Show-Customers {
    Clear-Host
    Write-Host "`n=== CUSTOMERS (Live Data) ===`n" -ForegroundColor Cyan
    
    try {
        $customers = Invoke-RestMethod -Uri "$baseUrl/customers" -Method GET
        
        Write-Host "Total Customers: $($customers.Count)`n" -ForegroundColor Yellow
        
        $customers | Format-Table -Property @(
            @{Label="Name"; Expression={$_.name}; Width=25},
            @{Label="Email"; Expression={$_.email}; Width=30},
            @{Label="Phone"; Expression={$_.phone}; Width=18},
            @{Label="Since"; Expression={(Get-Date $_.created_at -Format "dd/MM/yyyy")}; Width=12}
        ) -AutoSize
        
    } catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
}

function Show-Stats {
    Clear-Host
    Write-Host "`n=== STATISTICS (Live Data) ===`n" -ForegroundColor Cyan
    
    try {
        $products = Invoke-RestMethod -Uri "$baseUrl/products" -Method GET
        $orders = Invoke-RestMethod -Uri "$baseUrl/orders" -Method GET
        $customers = Invoke-RestMethod -Uri "$baseUrl/customers" -Method GET
        $orderStats = Invoke-RestMethod -Uri "$baseUrl/orders/stats" -Method GET
        
        Write-Host "DATABASE OVERVIEW`n" -ForegroundColor Yellow
        Write-Host "  Products:  $($products.Count)" -ForegroundColor White
        Write-Host "    - Featured: $(($products | Where-Object {$_.is_featured}).Count)" -ForegroundColor Gray
        Write-Host "    - New: $(($products | Where-Object {$_.is_new}).Count)" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  Orders:    $($orders.Count)" -ForegroundColor White
        Write-Host "    - Pending: $(($orders | Where-Object {$_.status -eq 'pending'}).Count)" -ForegroundColor Gray
        Write-Host "    - Processing: $(($orders | Where-Object {$_.status -eq 'processing'}).Count)" -ForegroundColor Gray
        Write-Host "    - Completed: $(($orders | Where-Object {$_.status -eq 'completed'}).Count)" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  Customers: $($customers.Count)" -ForegroundColor White
        Write-Host ""
        Write-Host "ORDER STATISTICS`n" -ForegroundColor Yellow
        Write-Host "  Total Orders:    $($orderStats.total_orders)" -ForegroundColor White
        Write-Host "  Total Revenue:   €$([Math]::Round($orderStats.total_revenue, 2))" -ForegroundColor Green
        Write-Host "  Avg Order Value: €$([Math]::Round($orderStats.avg_order_value, 2))" -ForegroundColor White
        
    } catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Main menu
do {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "   WEARING MIND - Live Data Viewer" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  [1] View Products" -ForegroundColor Green
    Write-Host "  [2] View Orders" -ForegroundColor Green
    Write-Host "  [3] View Customers" -ForegroundColor Green
    Write-Host "  [4] View Statistics" -ForegroundColor Green
    Write-Host "  [R] Refresh Current View" -ForegroundColor Yellow
    Write-Host "  [0] Exit" -ForegroundColor Red
    Write-Host ""
    
    $choice = Read-Host "Enter your choice"
    
    switch ($choice) {
        "1" { Show-Products; $lastView = "1" }
        "2" { Show-Orders; $lastView = "2" }
        "3" { Show-Customers; $lastView = "3" }
        "4" { Show-Stats; $lastView = "4" }
        "R" { 
            if ($lastView) {
                switch ($lastView) {
                    "1" { Show-Products }
                    "2" { Show-Orders }
                    "3" { Show-Customers }
                    "4" { Show-Stats }
                }
            }
        }
        "0" { Write-Host "`nExiting...`n" -ForegroundColor Yellow }
        default { Write-Host "Invalid choice" -ForegroundColor Red; Start-Sleep -Seconds 1 }
    }
    
    if ($choice -ne "0") {
        Write-Host "`nPress any key to continue..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
    
} while ($choice -ne "0")
