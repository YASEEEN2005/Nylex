Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\hnith\.gemini\antigravity-ide\brain\0de7fc80-1076-40f4-a3c7-ec07c193eb27\.user_uploaded\media_1791147784269.png"
$outFull = "c:\Users\hnith\OneDrive\Desktop\Nylex\public\nylex-logo.png"
$outIcon = "c:\Users\hnith\OneDrive\Desktop\Nylex\public\nylex-icon.png"
$outNewN = "c:\Users\hnith\OneDrive\Desktop\Nylex\public\new n logo.png"

$orig = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $orig.Width
$h = $orig.Height

Write-Host "Original size: $w x $h"

# Create target bitmap with 32bppArgb
$bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$minX = $w
$maxX = 0
$minY = $h
$maxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $orig.GetPixel($x, $y)
        $r = $c.R
        $g = $c.G
        $b = $c.B

        # Check whiteness
        # If color is close to white (e.g. min(r,g,b) > 240 or sum > 720)
        $minVal = [Math]::Min($r, [Math]::Min($g, $b))
        $maxVal = [Math]::Max($r, [Math]::Max($g, $b))

        # Alpha calculation
        # distance from white
        $dist = 255 - $minVal
        
        if ($minVal -ge 250) {
            # Completely transparent
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($minVal -ge 230) {
            # Anti-aliased transition edge
            $alpha = [int]([Math]::Min(255, [Math]::Max(0, ($dist * 4.0))))
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        } else {
            # Solid foreground
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Bounding box: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"

# Crop to content bounding box
$cropW = ($maxX - $minX) + 1
$cropH = ($maxY - $minY) + 1

$rect = New-Object System.Drawing.Rectangle($minX, $minY, $cropW, $cropH)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)

# Save full logo (cropped)
$cropped.Save($outFull, [System.Drawing.Imaging.ImageFormat]::Png)
# Also overwrite new n logo.png so everywhere using it gets updated
$cropped.Save($outNewN, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved full logo: $outFull"

# Also let's crop just the icon (top 60% of bounding box)
# Find the gap between icon and text
$iconHeight = [int]($cropH * 0.62)
$iconRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $iconHeight)
$iconCrop = $cropped.Clone($iconRect, $cropped.PixelFormat)

# Find true icon bbox inside iconCrop
$iMinX = $cropW
$iMaxX = 0
$iMinY = $iconHeight
$iMaxY = 0

for ($y = 0; $y -lt $iconHeight; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $c = $iconCrop.GetPixel($x, $y)
        if ($c.A -gt 20) {
            if ($x -lt $iMinX) { $iMinX = $x }
            if ($x -gt $iMaxX) { $iMaxX = $x }
            if ($y -lt $iMinY) { $iMinY = $y }
            if ($y -gt $iMaxY) { $iMaxY = $y }
        }
    }
}

if ($iMaxX -gt $iMinX -and $iMaxY -gt $iMinY) {
    $iW = ($iMaxX - $iMinX) + 1
    $iH = ($iMaxY - $iMinY) + 1
    $finalIconRect = New-Object System.Drawing.Rectangle($iMinX, $iMinY, $iW, $iH)
    $finalIcon = $iconCrop.Clone($finalIconRect, $iconCrop.PixelFormat)
    $finalIcon.Save($outIcon, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Saved icon: $outIcon ($iW x $iH)"
    $finalIcon.Dispose()
}

$orig.Dispose()
$bmp.Dispose()
$cropped.Dispose()
$iconCrop.Dispose()
Write-Host "Logo processing complete!"
