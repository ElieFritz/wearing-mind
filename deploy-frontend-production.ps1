# Deploy Frontend to Vercel
# This script configures and deploys the frontend to Vercel with production backend

Write-Host "?? Deploying Frontend to Vercel..." -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
Set-Location -Path "frontend"

# Check if Vercel CLI is installed
Write-Host "?? Checking Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "Installing Vercel CLI globally..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "? Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
    Write-Host "? Vercel CLI installed" -ForegroundColor Green
} else {
    Write-Host "? Vercel CLI already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "?? Configuration:" -ForegroundColor Cyan
Write-Host "  Backend URL: https://wearing-mind.onrender.com/api" -ForegroundColor White
Write-Host ""

# Set environment variable for deployment
Write-Host "?? Setting environment variables..." -ForegroundColor Yellow
vercel env add NEXT_PUBLIC_API_URL production --force

# Deploy to Vercel
Write-Host ""
Write-Host "?? Deploying to Vercel (production)..." -ForegroundColor Cyan
Write-Host "This will:"
Write-Host "  1. Build the Next.js application" -ForegroundColor Gray
Write-Host "  2. Upload to Vercel" -ForegroundColor Gray
Write-Host "  3. Deploy to production" -ForegroundColor Gray
Write-Host ""

vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "? Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "?? Your application is now live!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Open the deployment URL provided above" -ForegroundColor White
    Write-Host "  2. Test the shop and checkout flow" -ForegroundColor White
    Write-Host "  3. Verify orders are created in backend" -ForegroundColor White
    Write-Host "  4. Check email notifications" -ForegroundColor White
    Write-Host ""
    Write-Host "?? Monitor your deployment:" -ForegroundColor Cyan
    Write-Host "  https://vercel.com/dashboard" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "? Deployment failed" -ForegroundColor Red
    Write-Host "Check the error messages above for details." -ForegroundColor Yellow
    exit 1
}

# Return to root directory
Set-Location -Path ".."
