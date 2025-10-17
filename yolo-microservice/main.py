from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image, ImageOps
import numpy as np
import io
import pytesseract
import cv2

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("best.pt")  # Make sure best.pt is in this folder

@app.post("/detect-plate/")
async def detect_plate(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    results = model(image)
    boxes = results[0].boxes.xyxy.cpu().numpy()
    if len(boxes) == 0:
        return JSONResponse({"plate": "", "box": None})
    x1, y1, x2, y2 = map(int, boxes[0])
    w, h = image.size
    margin_x = int((x2 - x1) * 0.05)
    margin_y = int((y2 - y1) * 0.05)
    x1 = max(0, x1 - margin_x)
    y1 = max(0, y1 - margin_y)
    x2 = min(w, x2 + margin_x)
    y2 = min(h, y2 + margin_y)
    plate_img = image.crop((x1, y1, x2, y2))

    # Save cropped plate image for debugging
    try:
        plate_img.save("last_plate_crop.jpg")
    except Exception as e:
        print(f"Could not save cropped plate image: {e}")

    # --- Preprocessing ---
    plate_img = plate_img.convert("L")  # Grayscale
    plate_img = ImageOps.autocontrast(plate_img)
    plate_img = plate_img.resize((plate_img.width * 2, plate_img.height * 2), Image.LANCZOS)
    # Binarize (threshold)
    np_img = np.array(plate_img)
    _, np_img = cv2.threshold(np_img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    plate_img = Image.fromarray(np_img)

    # --- OCR with Tesseract ---
    # Whitelist: uppercase letters, digits, dash
    custom_config = r'--oem 3 --psm 8 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-'
    try:
        plate_text = pytesseract.image_to_string(plate_img, config=custom_config, lang='eng')
    except Exception as e:
        print(f"Tesseract error: {e}")
        plate_text = ""

    # Clean up the text
    plate_text = plate_text.replace(' ', '').replace('\n', '').replace('\x0c', '')

    return JSONResponse({"plate": plate_text, "box": [x1, y1, x2, y2], "raw_ocr": plate_text})
