import qrcode
from PIL import Image

data = "https://drive.google.com/file/d/10Yc3FsDzABGblAWc6VHgt9do6XRkuzaL/view?usp=sharing"  # Replace with your link or text
qr = qrcode.QRCode(version=1, box_size=10, border=5)
qr.add_data(data)
qr.make(fit=True)

img = qr.make_image(fill="black", back_color="white")
img.save("qrcode.png")  # Save the QR code as an image

# Create QR code object
qr = qrcode.QRCode(version=1, box_size=10, border=5)
qr.add_data(data)
qr.make(fit=True)

# Generate QR code with black fill and white background
img = qr.make_image(fill="black", back_color="white").convert("RGBA")

# Make white pixels transparent
datas = img.getdata()
new_data = []
for item in datas:
    # Check if the pixel is white
    if item[:3] == (255, 255, 255):  
        new_data.append((255, 255, 255, 0))  # Make it transparent
    else:
        new_data.append(item)  # Keep black pixels

img.putdata(new_data)

# Save as a transparent PNG
img.save("qrcode_transparent.png")
