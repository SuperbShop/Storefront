const axios = require('axios');
const API_KEY = require('../config.js');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';
axios.defaults.headers.common.Authorization = API_KEY.TOKEN; // authorization for all requests

const fetchProducts = (id, callback) => {
  axios.get(`${API_URL}/products/${id}`)
    .then((data) => callback(data))
    .catch((err) => console.error(err));
};

const fetchProductStyles = (id, callback) => {
  axios.get(`${API_URL}/products/${id}/styles`)
    .then((data) => callback(data))
    .catch((err) => console.error(err));
};

module.exports.fetchProducts = fetchProducts;
module.exports.fetchProductStyles = fetchProductStyles;
