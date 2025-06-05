import json

# Specify the base path for your images
base_path = "assets/gallery/"
image_prefix = "MANTHOS-"
image_extension = ".jpg"
num_images = 44

# Create the JSON array
image_array = []

for i in range(1, num_images + 1):
    image_data = {
        "original": f"{base_path}{image_prefix}{str(i).zfill(2)}{image_extension}",
        "thumbnail": f"{base_path}{image_prefix}{str(i).zfill(2)}{image_extension}"
    }
    image_array.append(image_data)

# Convert the list of dictionaries to JSON format
json_array = json.dumps(image_array, indent=2)

# Print the resulting JSON array
print(json_array)