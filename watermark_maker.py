import cv2

def process_image(input_image_path, output_image_path):
    # Read the input image
    image = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)

    # Iterate through the image and apply the transformation
    for i in range(image.shape[0]):
        for j in range(image.shape[1]):
            if image[i, j] != 255:
                image[i, j] = min(255, 255 * 0.97)

    # Save the processed image
    cv2.imwrite(output_image_path, image)

if __name__ == "__main__":
    input_image_path = 'watermark_orig.png'
    output_image_path = 'watermark.png'

    process_image(input_image_path, output_image_path)
    print("Image processed and saved successfully!")
