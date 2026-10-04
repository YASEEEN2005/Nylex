$csharp = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class LogoProcessor {
    public static void Process(string srcPath, string outFull, string outIcon, string outNewN) {
        using (Bitmap orig = new Bitmap(srcPath)) {
            int w = orig.Width;
            int h = orig.Height;
            
            Bitmap result = new Bitmap(w, h, PixelFormat.Format32bppArgb);
            
            BitmapData srcData = orig.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            BitmapData dstData = result.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
            
            int bytes = Math.Abs(srcData.Stride) * h;
            byte[] srcRgba = new byte[bytes];
            byte[] dstRgba = new byte[bytes];
            
            Marshal.Copy(srcData.Scan0, srcRgba, 0, bytes);
            
            int minX = w, maxX = 0, minY = h, maxY = 0;
            
            for (int y = 0; y < h; y++) {
                int rowIdx = y * srcData.Stride;
                for (int x = 0; x < w; x++) {
                    int idx = rowIdx + x * 4;
                    byte b = srcRgba[idx];
                    byte g = srcRgba[idx + 1];
                    byte r = srcRgba[idx + 2];
                    
                    int minVal = Math.Min(r, Math.Min(g, b));
                    int dist = 255 - minVal;
                    
                    if (minVal >= 248) {
                        // Pure transparent
                        dstRgba[idx] = 0;
                        dstRgba[idx + 1] = 0;
                        dstRgba[idx + 2] = 0;
                        dstRgba[idx + 3] = 0;
                    } else if (minVal >= 225) {
                        // Anti-aliased edge
                        byte a = (byte)Math.Min(255, Math.Max(0, dist * 4));
                        dstRgba[idx] = b;
                        dstRgba[idx + 1] = g;
                        dstRgba[idx + 2] = r;
                        dstRgba[idx + 3] = a;
                        
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    } else {
                        dstRgba[idx] = b;
                        dstRgba[idx + 1] = g;
                        dstRgba[idx + 2] = r;
                        dstRgba[idx + 3] = 255;
                        
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }
            
            orig.UnlockBits(srcData);
            Marshal.Copy(dstRgba, 0, dstData.Scan0, bytes);
            result.UnlockBits(dstData);
            
            int cropW = Math.Max(1, (maxX - minX) + 1);
            int cropH = Math.Max(1, (maxY - minY) + 1);
            
            Rectangle cropRect = new Rectangle(minX, minY, cropW, cropH);
            using (Bitmap cropped = result.Clone(cropRect, result.PixelFormat)) {
                cropped.Save(outFull, ImageFormat.Png);
                cropped.Save(outNewN, ImageFormat.Png);
                Console.WriteLine("Cropped Full Logo saved: " + cropW + "x" + cropH);
                
                // Also extract icon
                int iconH = (int)(cropH * 0.62);
                Rectangle iconRect = new Rectangle(0, 0, cropW, iconH);
                using (Bitmap iconTemp = cropped.Clone(iconRect, cropped.PixelFormat)) {
                    // Find bbox in icon
                    BitmapData iconData = iconTemp.LockBits(new Rectangle(0, 0, cropW, iconH), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                    byte[] iconBytes = new byte[Math.Abs(iconData.Stride) * iconH];
                    Marshal.Copy(iconData.Scan0, iconBytes, 0, iconBytes.Length);
                    iconTemp.UnlockBits(iconData);
                    
                    int iMinX = cropW, iMaxX = 0, iMinY = iconH, iMaxY = 0;
                    for (int y = 0; y < iconH; y++) {
                        int rowIdx = y * iconData.Stride;
                        for (int x = 0; x < cropW; x++) {
                            int idx = rowIdx + x * 4;
                            if (iconBytes[idx + 3] > 20) {
                                if (x < iMinX) iMinX = x;
                                if (x > iMaxX) iMaxX = x;
                                if (y < iMinY) iMinY = y;
                                if (y > iMaxY) iMaxY = y;
                            }
                        }
                    }
                    
                    if (iMaxX > iMinX && iMaxY > iMinY) {
                        int iw = (iMaxX - iMinX) + 1;
                        int ih = (iMaxY - iMinY) + 1;
                        Rectangle finalIconRect = new Rectangle(iMinX, iMinY, iw, ih);
                        using (Bitmap finalIcon = iconTemp.Clone(finalIconRect, iconTemp.PixelFormat)) {
                            finalIcon.Save(outIcon, ImageFormat.Png);
                            Console.WriteLine("Icon saved: " + iw + "x" + ih);
                        }
                    }
                }
            }
            result.Dispose();
        }
    }
}
"@

Add-Type -TypeDefinition $csharp -ReferencedAssemblies "System.Drawing.dll"

$src = "C:\Users\hnith\.gemini\antigravity-ide\brain\0de7fc80-1076-40f4-a3c7-ec07c193eb27\.user_uploaded\media_1791147784269.png"
$full = "c:\Users\hnith\OneDrive\Desktop\Nylex\public\nylex-logo.png"
$icon = "c:\Users\hnith\OneDrive\Desktop\Nylex\public\nylex-icon.png"
$newN = "c:\Users\hnith\OneDrive\Desktop\Nylex\public\new n logo.png"

[LogoProcessor]::Process($src, $full, $icon, $newN)
Write-Host "Done!"
