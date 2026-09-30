Add-Type -AssemblyName System.Drawing

New-Item -ItemType Directory -Force -Path 'd:\abusha\src\assets\logo'
New-Item -ItemType Directory -Force -Path 'd:\abusha\src\assets\hero'
New-Item -ItemType Directory -Force -Path 'd:\abusha\src\assets\categories'
New-Item -ItemType Directory -Force -Path 'd:\abusha\src\assets\products'
New-Item -ItemType Directory -Force -Path 'd:\abusha\src\assets\banners'
New-Item -ItemType Directory -Force -Path 'd:\abusha\src\assets\gallery'
New-Item -ItemType Directory -Force -Path 'd:\abusha\src\data'
New-Item -ItemType Directory -Force -Path 'd:\abusha\src\components'

Copy-Item 'D:\source\logo-abusha.png' 'd:\abusha\src\assets\logo\logo-abusha.png' -Force

function Crop-Image($srcPath, $x, $y, $w, $h, $destPath) {
    $src = [System.Drawing.Image]::FromFile($srcPath)
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $srcRect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
    $src.Dispose()
}

$ref = 'D:\source\reference-img.jpeg'

# 1. Hero 1 (right side composition: velvet stand, heart necklace, earrings, bracelet, baby's breath)
Crop-Image $ref 480 170 544 440 'd:\abusha\src\assets\hero\hero-1.jpg'

# 2. Hero 2 & 3: create variations
Crop-Image $ref 540 180 484 430 'd:\abusha\src\assets\hero\hero-2.jpg'
Crop-Image $ref 600 220 424 390 'd:\abusha\src\assets\hero\hero-3.jpg'

# 3. Categories (5 circles in reference)
# In 1024x1536:
# Y is ~538 to 680
Crop-Image $ref 42 538 142 142 'd:\abusha\src\assets\categories\necklaces.jpg'
Crop-Image $ref 232 538 142 142 'd:\abusha\src\assets\categories\earrings.jpg'
Crop-Image $ref 422 538 142 142 'd:\abusha\src\assets\categories\bracelets.jpg'
Crop-Image $ref 612 538 142 142 'd:\abusha\src\assets\categories\rings.jpg'
Crop-Image $ref 802 538 142 142 'd:\abusha\src\assets\categories\anklets.jpg'

# 4. Products (4 products in reference + extra 2 for grid)
# Product 1: Heart Pendant Necklace
Crop-Image $ref 46 712 216 145 'd:\abusha\src\assets\products\product-1.jpg'
# Product 2: Crystal Hoop Earrings
Crop-Image $ref 280 712 216 145 'd:\abusha\src\assets\products\product-2.jpg'
# Product 3: Floral Bracelet
Crop-Image $ref 514 712 216 145 'd:\abusha\src\assets\products\product-3.jpg'
# Product 4: Elegant Ring
Crop-Image $ref 748 712 216 145 'd:\abusha\src\assets\products\product-4.jpg'
# Product 5: Butterfly Necklace (from hero / category detail)
Crop-Image $ref 580 200 216 145 'd:\abusha\src\assets\products\product-5.jpg'
# Product 6: Heart Stud Earrings
Crop-Image $ref 740 200 216 145 'd:\abusha\src\assets\products\product-6.jpg'

# 5. Promo banner graphic / background
Crop-Image $ref 30 870 964 80 'd:\abusha\src\assets\banners\lifestyle-banner.jpg'

# 6. Social Gallery Images (6 items)
Crop-Image $ref 46 712 200 200 'd:\abusha\src\assets\gallery\insta-1.jpg'
Crop-Image $ref 280 712 200 200 'd:\abusha\src\assets\gallery\insta-2.jpg'
Crop-Image $ref 514 712 200 200 'd:\abusha\src\assets\gallery\insta-3.jpg'
Crop-Image $ref 748 712 200 200 'd:\abusha\src\assets\gallery\insta-4.jpg'
Crop-Image $ref 580 180 200 200 'd:\abusha\src\assets\gallery\insta-5.jpg'
Crop-Image $ref 700 270 200 200 'd:\abusha\src\assets\gallery\insta-6.jpg'

Write-Host "Asset extraction complete."
