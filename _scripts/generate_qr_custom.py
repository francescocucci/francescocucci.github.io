
import qrcode
from PIL import Image, ImageDraw, ImageFont, ImageOps

# Configuration
url = "https://francescocucci.it"
output_dir = "assets/images/"
qr_text_filename = "qr_FC.png"
qr_image_filename = "qr_francesco3.png"
source_image_path = "assets/images/francesco3.jpg"

# Common QR Settings
qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=20,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

def generate_qr_with_text(text, filename):
    img_qr = qr.make_image(fill_color="black", back_color="white").convert('RGB')
    width, height = img_qr.size
    center_size = int(width * 0.30)
    center_box_bg = "white"
    
    # Create white box for center
    center_box = Image.new('RGB', (center_size, center_size), center_box_bg)
    draw = ImageDraw.Draw(center_box)
    
    # Font settings
    font_path = "arial.ttf"
    font_size = int(center_size * 0.6) # Large text
    try:
        font = ImageFont.truetype(font_path, font_size)
    except IOError:
        font = ImageFont.load_default()
        
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_w = text_bbox[2] - text_bbox[0]
    text_h = text_bbox[3] - text_bbox[1]
    
    # Center text
    x = (center_size - text_w) // 2 - text_bbox[0]
    y = (center_size - text_h) // 2 - text_bbox[1]
    
    draw.text((x, y), text, fill="black", font=font)
    
    # Paste
    pos_x = (width - center_size) // 2
    pos_y = (height - center_size) // 2
    img_qr.paste(center_box, (pos_x, pos_y))
    
    output_path = output_dir + filename
    img_qr.save(output_path)
    print(f"Generated {output_path}")

def generate_qr_with_image(image_path, filename):
    img_qr = qr.make_image(fill_color="black", back_color="white").convert('RGB')
    width, height = img_qr.size
    center_size = int(width * 0.30)
    
    try:
        # Load and process image
        icon = Image.open(image_path).convert("RGBA")
        
        # Create circular mask
        mask = Image.new("L", (center_size, center_size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, center_size, center_size), fill=255)
        
        # Resize image to fit keeping aspect ratio, crop to center
        icon = ImageOps.fit(icon, (center_size, center_size), centering=(0.5, 0.5))
        
        # Create white background circle to put behind image (optional, for visibility)
        bg_circle = Image.new("RGBA", (center_size, center_size), (255, 255, 255, 255))
        
        # Composite
        final_icon = Image.composite(icon, bg_circle, mask)
        
        # Paste onto QR code using the mask
        pos_x = (width - center_size) // 2
        pos_y = (height - center_size) // 2
        
        img_qr.paste(final_icon, (pos_x, pos_y), mask)
        
        output_path = output_dir + filename
        img_qr.save(output_path)
        print(f"Generated {output_path}")
        
    except Exception as e:
        print(f"Error generating image QR: {e}")

# Run
generate_qr_with_text("FC", qr_text_filename)
generate_qr_with_image(source_image_path, qr_image_filename)
