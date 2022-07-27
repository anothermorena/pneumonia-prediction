# -*- coding: utf-8 -*-
"""
Created on Wed July 25 18:04:51 2022
@author: Otsogile Ogaisitse Onalepelo aka Morena

"""

#1. Library imports
import numpy as np
from PIL import Image
import tensorflow as tf
from google.cloud import storage

#2. gcp config
model = None
interpreter = None
input_index = None
output_index = None

BUCKET_NAME = "morena-tf-models" # Here you need to put the name of your GCP bucket

#3. function to download the model
def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)

    blob.download_to_filename(destination_file_name)

    print(f"Blob {source_blob_name} downloaded to {destination_file_name}.")

#4. the function that will be deployed as gcf to make inferences
def predict(request):
    global model

    if model is None:
        download_blob(
            BUCKET_NAME,
            "models/pneumonia_prediction_best_model_v2.h5",
            "/tmp/pneumonia_prediction_best_model_v2.h5",
        )
        model = tf.keras.models.load_model("/tmp/pneumonia_prediction_best_model_v2.h5")

    image = request.files["file"]

    image = np.array(
        Image.open(image).convert("RGB").resize((150, 150)) # image resizing
    )

    image = image.reshape(-1, 150, 150, 1)

    image = image/255 
    
    prediction = model.predict(image)
    
    if (int(prediction[0].round()) == 0):
        return {"prediction": "This patient has pneumonia 😔."}

    else:
       return {"prediction": "This patient do not have pneumonia🙂."}
