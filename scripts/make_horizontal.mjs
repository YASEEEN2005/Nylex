import { Jimp } from "jimp";

async function makeCleanHorizontal() {
  const full = await Jimp.read("c:\\Users\\hnith\\OneDrive\\Desktop\\Nylex\\public\\nylex-logo.png");
  const fw = full.bitmap.width;
  const fh = full.bitmap.height;

  // The text is strictly in the bottom 25% of the logo image
  const textStartY = Math.floor(fh * 0.76);
  const textH = fh - textStartY;

  const text = full.clone();
  text.crop({ x: 0, y: textStartY, w: fw, h: textH });

  // Autocrop text bounding box
  let tMinX = fw, tMaxX = 0, tMinY = textH, tMaxY = 0;
  text.scan(0, 0, fw, textH, (x, y, idx) => {
    if (text.bitmap.data[idx + 3] > 40) {
      if (x < tMinX) tMinX = x;
      if (x > tMaxX) tMaxX = x;
      if (y < tMinY) tMinY = y;
      if (y > tMaxY) tMaxY = y;
    }
  });

  const tw = tMaxX - tMinX + 1;
  const th = tMaxY - tMinY + 1;
  text.crop({ x: tMinX, y: tMinY, w: tw, h: th });
  await text.write("c:\\Users\\hnith\\OneDrive\\Desktop\\Nylex\\public\\nylex-text.png");

  // Icon is strictly in top 70%
  const iconMaxY = Math.floor(fh * 0.70);
  const icon = full.clone();
  icon.crop({ x: 0, y: 0, w: fw, h: iconMaxY });

  let iMinX = fw, iMaxX = 0, iMinY = iconMaxY, iMaxY = 0;
  icon.scan(0, 0, fw, iconMaxY, (x, y, idx) => {
    if (icon.bitmap.data[idx + 3] > 40) {
      if (x < iMinX) iMinX = x;
      if (x > iMaxX) iMaxX = x;
      if (y < iMinY) iMinY = y;
      if (y > iMaxY) iMaxY = y;
    }
  });

  const iw = iMaxX - iMinX + 1;
  const ih = iMaxY - iMinY + 1;
  icon.crop({ x: iMinX, y: iMinY, w: iw, h: ih });
  await icon.write("c:\\Users\\hnith\\OneDrive\\Desktop\\Nylex\\public\\nylex-icon.png");

  // Create composite horizontal lockup:
  const targetIconH = 120;
  const targetTextH = 40;
  
  const scaleI = targetIconH / ih;
  const scaleT = targetTextH / th;
  
  icon.resize({ w: Math.round(iw * scaleI), h: targetIconH });
  text.resize({ w: Math.round(tw * scaleT), h: targetTextH });

  const gap = 24;
  const totalW = icon.bitmap.width + gap + text.bitmap.width;
  const totalH = targetIconH;

  const horiz = new Jimp({ width: totalW, height: totalH, color: 0x00000000 });
  horiz.composite(icon, 0, 0);
  horiz.composite(text, icon.bitmap.width + gap, Math.round((targetIconH - targetTextH) / 2));

  await horiz.write("c:\\Users\\hnith\\OneDrive\\Desktop\\Nylex\\public\\nylex-horizontal.png");
  console.log("Horizontal logo created cleanly:", totalW, "x", totalH);
}

makeCleanHorizontal().catch(console.error);
