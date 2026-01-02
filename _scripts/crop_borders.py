from PIL import Image, ImageChops
import os

def crop_borders(image_path, output_path, fuzz=20):
    """
    Crops the solid border from an image.
    
    Args:
        image_path (str): Path to valid image.
        output_path (str): Path to save cropped image.
        fuzz (int): Distance from background color to consider as background.
    """
    try:
        img = Image.open(image_path)
        
        # Get background color from top-left pixel
        bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
        
        # Calculate difference between image and background
        diff = ImageChops.difference(img, bg)
        diff = ImageChops.add(diff, diff, 2.0, -fuzz)
        
        # Calculate bounding box of non-background content
        bbox = diff.getbbox()
        
        if bbox:
            # Crop image
            cropped_img = img.crop(bbox)
            cropped_img.save(output_path)
            print(f"Propriamente croppata: {image_path} -> {output_path} (BBox: {bbox})")
            return True
        else:
            print(f"Nessun contenuto rilevato da croppare (immagine uniforme?): {image_path}")
            return False
            
    except Exception as e:
        print(f"Errore processando {image_path}: {e}")
        return False

# Batch process all images in portfolio
portfolio_dir = r"c:\Users\hp\Documents\GitHub\francescocucci.github.io\assets\images\portfolio"
processed_count = 0
error_count = 0

print(f"Inizio elaborazione immagini in: {portfolio_dir}")

for root, dirs, files in os.walk(portfolio_dir):
    for file in files:
        if file.lower().endswith(('.jpg', '.jpeg', '.png')):
            # Skip valid cropped check if we are overwriting, but maybe skip temp files
            if "_cropped" in file:
                continue
                
            full_path = os.path.join(root, file)
            print(f"Elaborazione: {file}...")
            
            # Overwrite original file
            success = crop_borders(full_path, full_path)
            
            if success:
                processed_count += 1
            else:
                error_count += 1

print(f"\n--- Riepilogo ---")
print(f"Immagini elaborate con successo: {processed_count}")
print(f"Immagini saltate/errori: {error_count}")

