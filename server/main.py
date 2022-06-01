# -*- coding: utf-8 -*-
"""
Created on Wed May 18 18:04:51 2022
@author: Otsogile Ogaisitse Onalepelo aka Morena

"""

#pip install fastapi uvicorn tensorflow numpy, Pillow, opencv-python,python-multipart in your virtual environment

#1. Library imports
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import cv2

#2. Create the app object
app = FastAPI()


# Add cross origin resource sharing to the app object
# These origins are the urls we want our api/backend to allow requests from
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#3. Load the  best model file into our app
cnn = tf.keras.models.load_model("../model/pneumonia_prediction_best_model_v2.h5")

#4. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
async def index():
    return {'message': 'Hello Deep Learning 😁'}

#5. Read the input file as an image and preprocess ir for inference
def read_and_preprocess_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
   
    # Set the size we want for all images: 150*150 
    img_size = 150
    
    # Reshape and resize the image to our preferred size and dimensions for the model
    image = cv2.resize(image, (img_size, img_size))
    image = image.reshape(-1, img_size, img_size, 1)
  
    # Normalize the data
    # To improve model performance, we should normalize the image pixel values (keeping them in range 0 and 1 by dividing by 255). 
    # RGB values range from 0 to 255 hence we are dividing by 255.
    image = image/255

    return image

#6. Expose the prediction functionality and make a prediction from the passed image
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_and_preprocess_image(await file.read())
    
    prediction = cnn.predict(image)
    
    if (int(prediction[0].round()) == 0):
        return {"prediction": "This patient has pneumonia 😔."}

    else:
       return {"prediction": "This patient do not have pneumonia🙂."}
   
   

#7. Run the API with uvicorn
#   Will run on http://127.0.0.1:8000
if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
    
# Or from the terminal with uvicorn main:app --reload