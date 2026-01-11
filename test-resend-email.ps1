# Test Resend Email Integration
# PowerShell script

Write-Host "`n=== RESEND EMAIL INTEGRATION TEST ===" -ForegroundColor Cyan
Write-Host ""

# Check if backend is running
Write-Host "[1] Checking backend status..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod "http://localhost:3001/api" -ErrorAction Stop
    Write-Host "  ? Backend is running" -ForegroundColor Green
} catch {
    Write-Host "  ? Backend is not running" -ForegroundColor Red
    Write-Host "  ? Start backend: cd backend && npm run start:dev" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "[2] Creating test order..." -ForegroundColor Yellow

# Get user email
$userEmail = Read-Host "Enter your email to receive test confirmation"

if ([string]::IsNullOrWhiteSpace($userEmail)) {
    Write-Host "  ? Email is required" -ForegroundColor Red
    exit 1
}

# Create test order
$order = @{
    customer_email = $userEmail
    customer_name = "Test Customer"
    items = @(
        @{
            product_id = "test-product-id"
            product_name = "Test Hoodie Black"
            product_sku = "TEST-001-BLK"
            size = "M"
            color = "Black"
            quantity = 1
            unit_price = 120.00
            total_price = 120.00
        }
    )
    subtotal = 120.00
    shipping_cost = 5.00
    total = 125.00
    shipping_address = @{
        firstName = "Test"
        lastName = "Customer"
        address = "123 Rue Example"
        apartment = "Apt 4B"
        city = "Paris"
        country = "France"
        postalCode = "75001"
        phone = "+33612345678"
    }
    payment_method = "credit_card"
    payment_status = "completed"
    status = "pending"
} | ConvertTo-Json -Depth 10

Write-Host "  Creating order for: $userEmail" -ForegroundColor Gray

try {
    $result = Invoke-RestMethod -Uri "http://localhost:3001/api/orders" `
        -Method POST `
        -Body $order `
        -ContentType "application/json" `
        -ErrorAction Stop
    
    Write-Host "  ? Order created successfully" -ForegroundColor Green
    Write-Host "  Order Number: $($result.order_number)" -ForegroundColor White
    
    Write-Host ""
    Write-Host "[3] Email Status" -ForegroundColor Yellow
    
    # Check environment variable
    $envPath = "backend\.env"
    if (Test-Path $envPath) {
        $envContent = Get-Content $envPath -Raw
        
        if ($envContent -match "RESEND_API_KEY=re_") {
            Write-Host "  ? RESEND_API_KEY configured" -ForegroundColor Green
            Write-Host ""
            Write-Host "  ?? Emails should be sent via Resend:" -ForegroundColor Cyan
            Write-Host "     - Customer confirmation ? $userEmail" -ForegroundColor White
            Write-Host "     - Admin notification ? admin@wearingmind.com" -ForegroundColor White
            Write-Host ""
            Write-Host "  ? Check your inbox!" -ForegroundColor Green
            Write-Host "  ? Check Resend Dashboard: https://resend.com/logs" -ForegroundColor Green
        } else {
            Write-Host "  ??  RESEND_API_KEY not configured" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "  ?? Emails are only logged (not sent)" -ForegroundColor Gray
            Write-Host "     Check backend console for email content" -ForegroundColor Gray
            Write-Host ""
            Write-Host "  To enable real emails:" -ForegroundColor Cyan
            Write-Host "  1. Get API key: https://resend.com/api-keys" -ForegroundColor White
            Write-Host "  2. Add to backend/.env:" -ForegroundColor White
            Write-Host "     RESEND_API_KEY=re_your_key_here" -ForegroundColor Gray
            Write-Host "  3. Restart backend" -ForegroundColor White
        }
    }
    
    Write-Host ""
    Write-Host "[4] Backend Logs" -ForegroundColor Yellow
    Write-Host "  Check backend console for email logs:" -ForegroundColor White
    Write-Host "  ? [EmailService] Sending email to..." -ForegroundColor Gray
    Write-Host "  ? [EmailService] Email sent successfully..." -ForegroundColor Gray
    
} catch {
    Write-Host "  ? Failed to create order" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "  Response: $responseBody" -ForegroundColor Red
    }
    
    exit 1
}

Write-Host ""
Write-Host "=== TEST SUMMARY ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "? Order created: $($result.order_number)" -ForegroundColor Green
Write-Host "? Customer email: $userEmail" -ForegroundColor Green
Write-Host "? Check your inbox for confirmation email" -ForegroundColor Green
Write-Host ""

# Check Resend configuration
if (Test-Path "backend\.env") {
    $env = Get-Content "backend\.env" -Raw
    if ($env -match "RESEND_API_KEY=re_") {
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "  1. Check inbox: $userEmail" -ForegroundColor White
        Write-Host "  2. Check spam folder if not received" -ForegroundColor White
        Write-Host "  3. Verify Resend Dashboard: https://resend.com/logs" -ForegroundColor White
    } else {
        Write-Host "To enable real emails:" -ForegroundColor Yellow
        Write-Host "  1. Get Resend API key: https://resend.com/api-keys" -ForegroundColor White
        Write-Host "  2. Edit backend/.env and add:" -ForegroundColor White
        Write-Host "     RESEND_API_KEY=re_your_key_here" -ForegroundColor Gray
        Write-Host "  3. Restart backend: npm run start:dev" -ForegroundColor White
    }
}

Write-Host ""
