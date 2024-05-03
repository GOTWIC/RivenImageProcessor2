from PIL import Image

def process_image(image_path):
    # Open an image file
    with Image.open(image_path) as img:
        # Convert the image to RGB if it is not
        img = img.convert('RGB')
        
        # Get dimensions
        width, height = img.size
        
        # Create a new image with the same size
        new_img = Image.new('RGB', (width, height), color='white')
        
        # Process each pixel
        for x in range(width):
            for y in range(height):
                pixel = img.getpixel((x, y))
                
                # Check if the pixel is white
                if pixel[0] <= 150:
                    new_img.putpixel((x, y), (0, 0, 0, 255))
                else:
                    new_img.putpixel((x, y), (255, 255, 255, 255))
                    
        # Save the new image
        new_img.save('images/watermark.png')


def flatten_pixel_data(image_path):
    img = Image.open(image_path)
    img_data = list(img.getdata())
    flattened_data = []

    for pixel in img_data:
        r, g, b = pixel  # Ignore alpha channel
        v = r
        if v > 0:
            v = 255
        flattened_data.append(round(v/255))

    return flattened_data

def save_flattened_data(data, output_file):
    with open(output_file, 'w') as f:
        f.write(','.join(map(str, data)))

if __name__ == "__main__":
    image_path = "images/watermark.png"
    output_file = "flattened_pixel_data.txt"
    
    process_image("images/watermark1.png")
    flattened_data = flatten_pixel_data(image_path)
    print(len(flattened_data))
    save_flattened_data(flattened_data, output_file)


