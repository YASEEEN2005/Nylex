import { Jimp } from "jimp";
import path from "path";
import fs from "fs";

const uploads = "C:/Users/hnith/.gemini/antigravity-ide/brain/7073dd75-ff3e-43cd-8bfb-527fb498aa2e/.user_uploaded/";
const outDir = "c:/Users/hnith/OneDrive/Desktop/Nylex/public/clients";

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function processAll() {
  console.log("Starting full logo processing...");

  // 1. DEFENSE
  {
    const img = await Jimp.read(path.join(uploads, "media_1791625059000.png"));
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    let minX = w, maxX = 0, minY = h, maxY = 0;
    img.scan(0, 0, w, h, (x, y, idx) => {
      const a = img.bitmap.data[idx + 3];
      if (a > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      } else {
        img.bitmap.data[idx + 3] = 0;
      }
    });
    img.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
    await img.write(path.join(outDir, "defense.png"));
    console.log("✓ defense.png saved");
  }

  // 2. AMAZINK
  {
    const img = await Jimp.read(path.join(uploads, "media_1791625072491.png"));
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    let minX = w, maxX = 0, minY = h, maxY = 0;
    img.scan(0, 0, w, h, (x, y, idx) => {
      const a = img.bitmap.data[idx + 3];
      if (a > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      } else {
        img.bitmap.data[idx + 3] = 0;
      }
    });
    img.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
    await img.write(path.join(outDir, "amazink.png"));
    console.log("✓ amazink.png saved");
  }

  // 3. MODERN - Keep yellow icon, convert white text to rich charcoal #18181b
  {
    const img = await Jimp.read(path.join(uploads, "media_1791625108232.png"));
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    let minX = w, maxX = 0, minY = h, maxY = 0;
    img.scan(0, 0, w, h, (x, y, idx) => {
      const a = img.bitmap.data[idx + 3];
      if (a > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        const r = img.bitmap.data[idx];
        const g = img.bitmap.data[idx + 1];
        const b = img.bitmap.data[idx + 2];

        // If pixel is white / light gray (the text "MODERN Blinds & Curtains")
        // Not yellow icon (yellow has high R, high G, low B)
        const isYellow = (r > 180 && g > 140 && b < 80);
        if (!isYellow && r > 200 && g > 200 && b > 200) {
          // Map to sharp dark text #18181b
          img.bitmap.data[idx] = 24;
          img.bitmap.data[idx + 1] = 24;
          img.bitmap.data[idx + 2] = 27;
        }
      } else {
        img.bitmap.data[idx + 3] = 0;
      }
    });
    img.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
    await img.write(path.join(outDir, "modern.png"));
    console.log("✓ modern.png saved (yellow icon + visible dark text)");
  }

  // 4. TASTE OF MALABAR
  {
    const img = await Jimp.read(path.join(uploads, "media_1791625141240.png"));
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    let minX = w, maxX = 0, minY = h, maxY = 0;
    img.scan(0, 0, w, h, (x, y, idx) => {
      const a = img.bitmap.data[idx + 3];
      if (a > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      } else {
        img.bitmap.data[idx + 3] = 0;
      }
    });
    img.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
    await img.write(path.join(outDir, "taste-of-malabar.png"));
    console.log("✓ taste-of-malabar.png saved");
  }

  // 5. CROWN E
  {
    const img = await Jimp.read(path.join(uploads, "media_1791626926192.png"));
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    let minX = w, maxX = 0, minY = h, maxY = 0;
    img.scan(0, 0, w, h, (x, y, idx) => {
      const a = img.bitmap.data[idx + 3];
      const r = img.bitmap.data[idx];
      const g = img.bitmap.data[idx + 1];
      const b = img.bitmap.data[idx + 2];

      // Remove soft white shadow or near-white background pixels
      if (a > 40 && !(r > 240 && g > 240 && b > 240)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      } else if (r > 245 && g > 245 && b > 245) {
        img.bitmap.data[idx + 3] = 0;
      }
    });
    img.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
    await img.write(path.join(outDir, "crown-e.png"));
    console.log("✓ crown-e.png saved");
  }

  // 6. TECHSMART SYSTEMS
  {
    const img = await Jimp.read(path.join(uploads, "media_1791626947693.png"));
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    let minX = w, maxX = 0, minY = h, maxY = 0;
    img.scan(0, 0, w, h, (x, y, idx) => {
      const a = img.bitmap.data[idx + 3];
      if (a > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      } else {
        img.bitmap.data[idx + 3] = 0;
      }
    });
    img.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
    await img.write(path.join(outDir, "techsmart.png"));
    console.log("✓ techsmart.png saved");
  }

  console.log("All 6 client logos processed successfully!");
}

processAll().catch(console.error);
