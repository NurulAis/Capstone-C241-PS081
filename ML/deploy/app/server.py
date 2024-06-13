from fastapi import FastAPI, UploadFile, File
import numpy as np
import tensorflow as tf
from keras.models import load_model
from PIL import Image
import io

app = FastAPI()

# with open('app/model.json', 'r') as json_file:
#     json_saved_model = json_file.read()

# model = tfjs.converters.load_keras_model(json_saved_model)
# model.load_weights('app/bin/')

model = load_model('app/explorentt_mobilenet_v2.h5')

class_names = np.array([
    'Air Terjun Oenesu',
    'Air Terjun Tanggedu',
    'Air Terjun Tesbatan',
    'Bukit Wairinding',
    'Danau Kelimut',
    'Gua Rangko',
    'Lawa Darat Gili',
    'Lingko Spider Web Rice Field',
    'Pandar Island',
    'Pantai Koka',
    'Pantai Kolbano',
    'Pantai Mandorak',
    'Pantai Oetune ',
    'Pantai Waecicu',
    'Pantai Walakiri',
    'Pantai Watu Parunu',
    'Pink Beach',
    'Pulau Kalong',
    'Pulau Kanawa',
    'Rumah Budaya Sumba',
    'Savana Puru Kambera',
    'Taman Nostalgia Kupang',
    'Wae Rebo Village',
    'Waikuri Lagoon',
    'Wisata Adat Kampung Todo'])  # Modify with your actual class names

@app.get('/')
def read_root():
    return {'message': 'Image classification model API'}

@app.post('/predict')
async def predict(file: UploadFile = File(...)):
    """
    Predicts the class of an uploaded image.

    Args:
        file (UploadFile): An image file to predict.

    Returns:
        dict: A dictionary containing the predicted class.
    """
    image = await file.read()
    image = Image.open(io.BytesIO(image))
    image = image.resize((150, 150))  # Adjust to the input shape your model expects
    image = np.array(image) / 255.0  # Normalize the image
    image = np.expand_dims(image, axis=0)  # Add batch dimension

    prediction = model.predict(image)
    predicted_class = class_names[np.argmax(prediction)]

    return {'predicted_class': predicted_class}
