import os
from PIL import Image, ImageOps
import numpy as np

src_path = r"C:\Users\hnith\.gemini\antigravity-ide\brain\0de7fc80-1076-40f4-a3c7-ec07c193eb27\.user_uploaded\media_1791147784269.png"
out_dir = r"c:\Users\hnith\OneDrive\Desktop\Nylex\public"

img = Image.open(src_path).convert("RGBA")
print(f"Original size: {img.size}")

# Convert to numpy array
data = np.array(img)
r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

# The background is white (r, g, b are high, e.g. > 240)
# We calculate brightness or distance from white
# Let's make a smooth alpha mask based on whiteness:
# If max(r, g, b) < 220 -> alpha = 255
# If min(r, g, b) > 250 -> alpha = 0
# Smooth transition in between
min_rgb = np.minimum(np.minimum(r, g), b)
# Calculate grayscale / brightness
brightness = 0.299 * r + 0.587 * g + 0.114 * b

# Create alpha channel:
# When background is white (~255), alpha should be 0.
# When foreground has dark/color, alpha should be 255.
# Let's use distance from pure white: 
# distance = 255 - min(r,g,b) or 255 - brightness
# For white background removal:
alpha = 255.0 - min_rgb.astype(np.float32)
# Scale up contrast so content is crisp
alpha = np.clip(alpha * 3.5, 0, 255).astype(np.uint8)

# Create clean transparent image
clean_data = np.dstack((r, g, b, alpha))
clean_img = Image.fromarray(clean_data, mode="RGBA")

# Find bounding box of non-transparent pixels
bbox = clean_img.getbbox()
print(f"Full logo bbox: {bbox}")
if bbox:
    cropped_full = clean_img.crop(bbox)
    # Add a slight padding
    pad = 10
    w, h = cropped_full.size
    final_full = Image.new("RGBA", (w + pad*2, h + pad*2), (0, 0, 0, 0))
    final_full.paste(cropped_full, (pad, pad))
    final_full.save(os.path.join(out_dir, "nylex-logo.png"), "PNG")
    print(f"Saved nylex-logo.png ({final_full.size})")

# Let's also crop just the icon and just the text
# Find separator between icon and text
# Let's analyze row by row alpha sum
row_sums = np.sum(alpha, axis=1)
# Find where icon starts and ends, and where text starts and ends
non_zero_rows = np.where(row_sums > 500)[0]
if len(non_zero_rows) > 0:
    min_row, max_row = non_zero_rows[0], non_zero_rows[-1]
    # Look for a gap between min_row and max_row
    middle_zone = row_sums[min_row:max_row]
    # Find local minimum in row_sums around 60% of the height
    split_idx = min_row + int(len(middle_zone) * 0.65)
    # Find valley around split_idx
    search_start = min_row + int(len(middle_zone) * 0.50)
    search_end = min_row + int(len(middle_zone) * 0.80)
    valley_idx = search_start + np.argmin(row_sums[search_start:search_end])
    print(f"Found valley at y={valley_idx}")

    # Icon:
    icon_crop = clean_img.crop((0, min_row, img.width, valley_idx))
    icon_bbox = icon_crop.getbbox()
    if icon_bbox:
        icon_img = icon_crop.crop(icon_bbox)
        icon_pad = 10
        iw, ih = icon_img.size
        final_icon = Image.new("RGBA", (iw + icon_pad*2, ih + icon_pad*2), (0, 0, 0, 0))
        final_icon.paste(icon_img, (icon_pad, icon_pad))
        final_icon.save(os.path.join(out_dir, "nylex-icon.png"), "PNG")
        print(f"Saved nylex-icon.png ({final_icon.size})")

    # Text:
    text_crop = clean_img.crop((0, valley_idx, img.width, max_row + 5))
    text_bbox = text_crop.getbbox()
    if text_bbox:
        text_img = text_crop.crop(text_bbox)
        tw, th = text_img.size
        final_text = Image.new("RGBA", (tw + 10, th + 10), (0, 0, 0, 0))
        final_text.paste(text_img, (5, 5))
        final_text.save(os.path.join(out_dir, "nylex-text.png"), "PNG")
        print(f"Saved nylex-text.png ({final_text.size})")

    # Create horizontal combined version (icon on left, text on right)
    if icon_bbox and text_bbox:
        # Scale text height to match nicely with icon
        target_icon_h = 120
        scale_i = target_icon_h / ih
        icon_resized = icon_img.resize((int(iw * scale_i), target_icon_h), Image.Resampling.LANCZOS)
        
        # Scale text height
        target_text_h = int(target_icon_h * 0.38)
        scale_t = target_text_h / th
        text_resized = text_img.resize((int(tw * scale_t), target_text_h), Image.Resampling.LANCZOS)
        
        spacing = 24
        combined_w = icon_resized.width + spacing + text_resized.width + 20
        combined_h = target_icon_h + 20
        
        horiz_img = Image.new("RGBA", (combined_w, combined_h), (0, 0, 0, 0))
        horiz_img.paste(icon_resized, (10, 10), icon_resized)
        horiz_img.paste(text_resized, (10 + icon_resized.width + spacing, 10 + (target_icon_h - target_text_h) // 2), text_resized)
        horiz_img.save(os.path.join(out_dir, "nylex-horizontal.png"), "PNG")
        print(f"Saved nylex-horizontal.png ({horiz_img.size})")
