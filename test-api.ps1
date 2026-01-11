# WEARING MIND - API Testing Script
# PowerShell script to test all backend endpoints

$baseUrl = "http://localhost:3001/api"
$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "  WEARING MIND - API Tests" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Base URL: $baseUrl`n" -ForegroundColor Yellow

# Test counter
$totalTests = 0
$passedTests = 0
$failedTests = 0

function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Endpoint,
        [string]$Description,
        [object]$Body = $null
    )
    
    $global:totalTests++
    
    try {
        $url = "$baseUrl$Endpoint"
        
        Write-Host "[TEST $totalTests] $Description" -ForegroundColor White
        Write-Host "  $Method $Endpoint" -ForegroundColor Gray
        
        $params = @{
            Uri = $url
            Method = $Method
            Headers = $headers
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-RestMethod @params -ErrorAction Stop
        
        Write-Host "  Status: SUCCESS" -ForegroundColor Green
        
        if ($response -is [array]) {
            Write-Host "  Result: Array with $($response.Count) items" -ForegroundColor Green
        } elseif ($response) {
            $preview = ($response | ConvertTo-Json -Compress).Substring(0, [Math]::Min(100, ($response | ConvertTo-Json -Compress).Length))
            Write-Host "  Result: $preview..." -ForegroundColor Green
        }
        
        $global:passedTests++
        return $response
        
    } catch {
        Write-Host "  Status: FAILED" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        $global:failedTests++
        return $null
    }
    
    Write-Host ""
}

# ============================================
# PRODUCTS API TESTS
# ============================================

Write-Host "`n[PRODUCTS API]`n" -ForegroundColor Magenta

# Test 1: Get all products
$products = Test-Endpoint -Method "GET" -Endpoint "/products" -Description "Get all products"

# Test 2: Get featured products
$featured = Test-Endpoint -Method "GET" -Endpoint "/products/featured?limit=4" -Description "Get featured products"

# Test 3: Create a new product
$newProduct = @{
    name = "PowerShell Test Hoodie"
    sku = "WM-PS-001"
    price = 99.99
    category = "Hoodie"
    description = "Created via PowerShell test"
    stock = 15
    is_new = $true
    is_featured = $true
}

$createdProduct = Test-Endpoint -Method "POST" -Endpoint "/products" -Description "Create new product" -Body $newProduct

# Test 4: Get product by ID (if created)
if ($createdProduct) {
    $productId = $createdProduct.id
    Test-Endpoint -Method "GET" -Endpoint "/products/$productId" -Description "Get product by ID"
    
    # Test 5: Update product stock
    $stockUpdate = @{ quantity = -3 }
    Test-Endpoint -Method "PUT" -Endpoint "/products/$productId/stock" -Description "Update product stock" -Body $stockUpdate
    
    # Test 6: Update product
    $updateData = @{
        price = 89.99
        stock = 20
    }
    Test-Endpoint -Method "PUT" -Endpoint "/products/$productId" -Description "Update product" -Body $updateData
}

# Test 7: Search products
Test-Endpoint -Method "GET" -Endpoint "/products?search=hoodie" -Description "Search products by keyword"

# Test 8: Filter by category
Test-Endpoint -Method "GET" -Endpoint "/products?category=Hoodie" -Description "Filter products by category"

# ============================================
# ORDERS API TESTS
# ============================================

Write-Host "`n[ORDERS API]`n" -ForegroundColor Magenta

# Test 9: Get all orders
$orders = Test-Endpoint -Method "GET" -Endpoint "/orders" -Description "Get all orders"

# Test 10: Get order stats
Test-Endpoint -Method "GET" -Endpoint "/orders/stats" -Description "Get order statistics"

# Test 11: Create a new order
$newOrder = @{
    customer_email = "test@powershell.com"
    customer_name = "PowerShell Test User"
    subtotal = 120.00
    shipping_cost = 5.00
    total = 125.00
    items = @(
        @{
            product_name = "Test Product"
            product_sku = "WM-TEST-001"
            quantity = 1
            unit_price = 120.00
        }
    )
    shipping_address = @{
        street = "123 Test St"
        city = "Paris"
        country = "France"
    }
    payment_method = "credit_card"
}

$createdOrder = Test-Endpoint -Method "POST" -Endpoint "/orders" -Description "Create new order" -Body $newOrder

# Test 12: Get order by ID (if created)
if ($createdOrder) {
    $orderId = $createdOrder.id
    Test-Endpoint -Method "GET" -Endpoint "/orders/$orderId" -Description "Get order by ID"
    
    # Test 13: Update order status
    $statusUpdate = @{ status = "processing" }
    Test-Endpoint -Method "PUT" -Endpoint "/orders/$orderId/status" -Description "Update order status" -Body $statusUpdate
}

# Test 14: Filter orders by status
Test-Endpoint -Method "GET" -Endpoint "/orders?status=pending" -Description "Filter orders by status"

# ============================================
# CUSTOMERS API TESTS
# ============================================

Write-Host "`n[CUSTOMERS API]`n" -ForegroundColor Magenta

# Test 15: Get all customers
$customers = Test-Endpoint -Method "GET" -Endpoint "/customers" -Description "Get all customers"

# Test 16: Create a new customer
$newCustomer = @{
    email = "powershell@test.com"
    name = "PowerShell Test Customer"
    phone = "+33 6 00 00 00 00"
}

$createdCustomer = Test-Endpoint -Method "POST" -Endpoint "/customers" -Description "Create new customer" -Body $newCustomer

# Test 17: Get customer by ID (if created)
if ($createdCustomer) {
    $customerId = $createdCustomer.id
    Test-Endpoint -Method "GET" -Endpoint "/customers/$customerId" -Description "Get customer by ID"
    
    # Test 18: Get customer orders
    Test-Endpoint -Method "GET" -Endpoint "/customers/$customerId/orders" -Description "Get customer orders"
    
    # Test 19: Get customer stats
    Test-Endpoint -Method "GET" -Endpoint "/customers/$customerId/stats" -Description "Get customer statistics"
    
    # Test 20: Update customer
    $updateCustomer = @{
        phone = "+33 6 11 22 33 44"
    }
    Test-Endpoint -Method "PUT" -Endpoint "/customers/$customerId" -Description "Update customer" -Body $updateCustomer
}

# Test 21: Get customer by email
Test-Endpoint -Method "GET" -Endpoint "/customers/email/demo@wearingmind.com" -Description "Get customer by email"

# ============================================
# CLEANUP (Optional - Delete test data)
# ============================================

Write-Host "`n[CLEANUP]`n" -ForegroundColor Magenta

if ($createdProduct) {
    Write-Host "Cleaning up test product..." -ForegroundColor Yellow
    Test-Endpoint -Method "DELETE" -Endpoint "/products/$productId" -Description "Delete test product"
}

# ============================================
# SUMMARY
# ============================================

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "       TEST SUMMARY" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Total Tests:  $totalTests" -ForegroundColor White
Write-Host "Passed:       $passedTests" -ForegroundColor Green
Write-Host "Failed:       $failedTests" -ForegroundColor Red
Write-Host "Success Rate: $([Math]::Round(($passedTests/$totalTests)*100, 2))%" -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor Cyan

if ($failedTests -eq 0) {
    Write-Host "`nALL TESTS PASSED!" -ForegroundColor Green
    Write-Host "Backend is working correctly!`n" -ForegroundColor Green
} else {
    Write-Host "`nSOME TESTS FAILED!" -ForegroundColor Red
    Write-Host "Please check the errors above.`n" -ForegroundColor Red
}

Write-Host "Backend URL: $baseUrl" -ForegroundColor Yellow
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
