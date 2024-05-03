from PIL import Image

def flatten_pixel_data(image_path):
    img = Image.open(image_path)
    img_data = list(img.getdata())
    flattened_data = []

    for pixel in img_data:
        r, g, b, = pixel  # Ignore alpha channel
        v = r
        if v > 0:
            v = 255
        flattened_data.append(round(v/255))

    return flattened_data

def save_flattened_data(data, output_file):
    with open(output_file, 'w') as f:
        f.write(','.join(map(str, data)))

if __name__ == "__main__":
    image_path = "images/watermark.jpg"
    output_file = "flattened_pixel_data.txt"
    
    flattened_data = flatten_pixel_data(image_path)
    print(len(flattened_data))
    save_flattened_data(flattened_data, output_file)
