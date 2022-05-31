# -*- coding: utf-8 -*-
"""
Created on Wed May 18 18:04:51 2022
@author: Otsogile Ogaisitse Onalepelo aka Morena
"""

#pip install fastapi uvicorn tensorflow numpy, Pillow in your virtual environment

#1. Library imports
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

#2. Create the app object
app = FastAPI()


#add cross origin resource sharing to the app object
#these origins are the urls we want our api/backend to allow requests from
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
cnn = tf.keras.models.load_model("../models/pneumonia_prediction_best_model_v2")

CLASS_NAMES = ['PNEUMONIA', 'NORMAL']

#4. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
async def index():
    return {'message': 'Hello Deep Learning 😁'}

#5. Process the input file and return the image array
def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

#6. Expose the prediction functionality, make a prediction from the passed
#   image and return the predicted class
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    image_array = np.expand_dims(image, 0)
    
    prediction = cnn.predict(image_array)

    predicted_class = CLASS_NAMES[np.argmax(prediction[0])]
    
    return {
        'class': predicted_class
    }

#7. Run the API with uvicorn
#   Will run on http://127.0.0.1:8000
if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
    
#or from the terminal with uvicorn main:app --reload
