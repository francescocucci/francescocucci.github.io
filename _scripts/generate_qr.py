
import qrcode
from PIL import Image, ImageDraw, ImageFont

# 1. Configuration
url = "https://francescocucci.it"
text_lines = ["FRANCESCO", "CUCCI"] # Uppercase
qr_filename = "assets/images/qr_francescocucci.png"

# Style settings
qr_bg_color = "white"
qr_fill_color = "black"
center_box_bg = "white"
text_color = "black"
font_path = "arial.ttf"

# 2. Generate QR Code
qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=20, # Increased box size for higher resolution
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

img_qr = qr.make_image(fill_color=qr_fill_color, back_color=qr_bg_color).convert('RGB')

# 3. Prepare Text Overlay
width, height = img_qr.size
center_size = int(width * 0.30) # Increased to 30% coverage (safe for H correction)
center_box = Image.new('RGB', (center_size, center_size), center_box_bg)
draw = ImageDraw.Draw(center_box)

# Dynamic Font Sizing
max_text_width = center_size * 0.90 # Leave 5% padding on each side
font_size = int(center_size * 0.3) # Start with a reasonable size
font = None

while font_size > 5:
    try:
        current_font = ImageFont.truetype(font_path, font_size)
    except IOError:
        current_font = ImageFont.load_default()
        font = current_font
        break # Default font is not resizable

    # Check widths of all lines
    fit = True
    for line in text_lines:
        bbox = draw.textbbox((0, 0), line, font=current_font)
        if (bbox[2] - bbox[0]) > max_text_width:
            fit = False
            break
    
    if fit:
        font = current_font
        break
    
    font_size -= 2 # Reduce size and try again

if font is None:
    font = ImageFont.load_default() # Safety fallback

# Calculate positioning
total_text_height = 0
line_heights = []
for line in text_lines:
    bbox = draw.textbbox((0, 0), line, font=font)
    h = bbox[3] - bbox[1]
    line_heights.append(h)
    total_text_height += h

# Add scaleable spacing
spacing = int(font_size * 0.2)
total_text_height += spacing * (len(text_lines) - 1)

current_y = (center_size - total_text_height) // 2

for i, line in enumerate(text_lines):
    bbox = draw.textbbox((0, 0), line, font=font)
    w = bbox[2] - bbox[0]
    # Center horizontally including the internal bounding box offset
    x = (center_size - w) // 2 - bbox[0]
    draw.text((x, current_y), line, fill=text_color, font=font)
    current_y += line_heights[i] + spacing

# 4. Paste Overlay
# Calculate position to paste center box
pos_x = (width - center_size) // 2
pos_y = (height - center_size) // 2

# Paste
img_qr.paste(center_box, (pos_x, pos_y))

# 5. Save
img_qr.save(qr_filename)
print(f"QR code generated and saved to {qr_filename}")
