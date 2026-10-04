import { Jimp } from "jimp";
import path from "path";

async function processLogo() {
  const srcPath = "C:\\Users\\hnith\\.gemini\\antigravity-ide\\brain\\0de7fc80-1076-40f4-a3c7-ec07c193eb27\\.user_uploaded\\media_1791147784269.png";
  const outFull = "c:\\Users\\hnith\\OneDrive\\Desktop\\Nylex\\public\\nylex-logo.png";
  const outNewN = "c:\\Users\\hnith\\OneDrive\\Desktop\\Nylex\\public\\new n logo.png";
  const outIcon = "c:\\Users\\hnith\\OneDrive\\Desktop\\Nylex\\public\\nylex-icon.png";

  console.log("Reading image...");
  const image = await Jimp.read(srcPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  console.log(`Dimensions: ${width}x${height}`);

  let minX = width, maxX = 0, minY = height, maxY = 0;

  image.scan(0, 0, width, height, (x, y, idx) => {
    const r = image.bitmap.data[idx + 0];
    const g = image.bitmap.data[idx + 1];
    const b = image.bitmap.data[idx + 2];

    const minVal = Math.min(r, g, b);
    const dist = 255 - minVal;

    if (minVal >= 245) {
      image.bitmap.data[idx + 3] = 0;
    } else if (minVal >= 220) {
      const alpha = Math.min(255, Math.max(0, dist * 4));
      image.bitmap.data[idx + 3] = alpha;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    } else {
      image.bitmap.data[idx + 3] = 255;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  });

  console.log(`BBox: [${minX}, ${minY}, ${maxX}, ${maxY}]`);

  const cropW = Math.max(1, maxX - minX + 1);
  const cropH = Math.max(1, maxY - minY + 1);

  // Full logo crop
  const fullLogo = image.clone();
  fullLogo.crop({ x: minX, y: minY, w: cropW, h: cropH });
  await fullLogo.write(outFull);
  await fullLogo.write(outNewN);
  console.log(`Saved full logo: ${cropW}x${cropH}`);

  // Icon crop (top ~60% of bounding box)
  const iconH = Math.round(cropH * 0.62);
  const iconImg = image.clone();
  iconImg.crop({ x: minX, y: minY, w: cropW, h: iconH });
  
  // Find tighter bounding box for icon
  let iMinX = cropW, iMaxX = 0, iMinY = iconH, iMaxY = 0;
  iconImg.scan(0, 0, cropW, iconH, (x, y, idx) => {
    if (iconImg.bitmap.data[idx + 3] > 20) {
      if (x < iMinX) iMinX = x;
      if (x > iMaxX) iMaxX = x;
      if (y < iMinY) iMinY = y;
      if (y > iMaxY) iMaxY = y;
    }
  });

  if (iMaxX > iMinX && iMaxY > iMinY) {
    const iw = iMaxX - iMinX + 1;
    const ih = iMaxY - iMinY + 1;
    iconImg.crop({ x: iMinX, y: iMinY, w: iw, h: ih });
    await iconImg.write(outIcon);
    console.log(`Saved icon: ${iw}x${ih}`);
  }

  console.log("Processing complete!");
}

processLogo().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
