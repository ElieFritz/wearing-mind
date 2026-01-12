# Script pour télécharger des images de catégories pour la section Philosophy

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  DOWNLOAD CATEGORY IMAGES" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$brandDir = "frontend\public\images\brand"

# Créer le dossier si nécessaire
if (!(Test-Path $brandDir)) {
    New-Item -ItemType Directory -Path $brandDir -Force | Out-Null
    Write-Host "? Dossier créé: $brandDir" -ForegroundColor Green
}

Write-Host "?? Téléchargement des images de catégories..." -ForegroundColor Yellow
Write-Host ""

# Images Unsplash de qualité pour les catégories
$images = @(
    @{
        Name = "hoodies.jpg"
        Url = "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop&q=80"
        Description = "Hoodie collection - Philosophy section"
    },
    @{
        Name = "tshirts.jpg"
        Url = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop&q=80"
        Description = "T-Shirt collection - Philosophy section"
    },
    @{
        Name = "sweatshirts.jpg"
        Url = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=600&fit=crop&q=80"
        Description = "Sweatshirt collection - Philosophy section"
    },
    @{
        Name = "craftsmanship.jpg"
        Url = "https://images.unsplash.com/photo-1558769132-cb1aea24f296?w=800&h=600&fit=crop&q=80"
        Description = "Craftsmanship detail - Philosophy section"
    }
)

$success = 0
$failed = 0

foreach ($img in $images) {
    $filePath = Join-Path $brandDir $img.Name
    
    try {
        Write-Host "   Downloading $($img.Name)..." -NoNewline
        
        $response = Invoke-WebRequest -Uri $img.Url -OutFile $filePath -UseBasicParsing
        
        if (Test-Path $filePath) {
            $size = (Get-Item $filePath).Length / 1KB
            Write-Host " ? ($([math]::Round($size, 2)) KB)" -ForegroundColor Green
            $success++
        } else {
            Write-Host " ?" -ForegroundColor Red
            $failed++
        }
        
    } catch {
        Write-Host " ?" -ForegroundColor Red
        Write-Host "      Error: $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "?? Résumé:" -ForegroundColor Cyan
Write-Host "   Succès: $success images" -ForegroundColor Green
Write-Host "   Échecs: $failed images" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Gray" })
Write-Host ""

if ($success -gt 0) {
    Write-Host "? Images téléchargées dans:" -ForegroundColor Green
    Write-Host "   $brandDir" -ForegroundColor White
    Write-Host ""
    
    # Liste des images téléchargées
    Write-Host "?? Images disponibles:" -ForegroundColor Cyan
    Get-ChildItem $brandDir -Filter "*.jpg" | ForEach-Object {
        $sizeMB = [math]::Round($_.Length / 1MB, 2)
        Write-Host "   • $($_.Name) - $sizeMB MB" -ForegroundColor Gray
    }
    Write-Host ""
}

Write-Host "?? Prochaine étape:" -ForegroundColor Yellow
Write-Host "   Les images seront utilisées dans BrandStory.tsx" -ForegroundColor White
Write-Host "   pour afficher les catégories de produits" -ForegroundColor White
Write-Host ""

Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
