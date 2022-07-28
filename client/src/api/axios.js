import axios from 'axios';

//set the url for the entire application
const BASE_URL = 'https://us-central1-pneumonia-prediction-app.cloudfunctions.net/predict';

export default axios.create({
    baseURL: BASE_URL
});