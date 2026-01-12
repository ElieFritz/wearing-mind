# Quick Deploy to Vercel
Write-Host "?? Deploying to Vercel..." -ForegroundColor Cyan

# Set environment variable
$env:NEXT_PUBLIC_API_URL = "https://wearing-mind.onrender.com/api"

# Change to frontend directory
Push-Location "frontend"

# Deploy
Write-Host "Deploying frontend with production backend: https://wearing-mind.onrender.com/api" -ForegroundColor Yellow
vercel --prod --yes

Pop-Location

Write-Host ""
Write-Host "? Deployment initiated!" -ForegroundColor Green
Write-Host "Check the URL above to access your deployed application." -ForegroundColor Cyan
