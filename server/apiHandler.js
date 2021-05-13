const axios = require('axios');
const API_KEY = require('../config.js');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';
const API_ALT = 'http://localhost:8080';
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

const fetchReviews = (id, cb) => {
  axios.get(`${API_URL}/reviews?product_id=${id}&count=50`)
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

const fetchReviewsMeta = (id, cb) => {
  axios.get(`${API_URL}/reviews/meta?product_id=${id}`)
    .then((meta) => cb(meta))
    .catch((err) => console.error(err));
};

const upvoteReview = (id, cb) => {
  axios.put(`${API_URL}/reviews/${id}/helpful`)
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

const reportReview = (id, cb) => {
  axios.put(`${API_URL}/reviews/${id}/report`)
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

const postReview = (content, cb) => {
  axios.post(`${API_URL}/reviews`, content)
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

const fetchQandA = (id, cb) => {
  axios.get(`${API_ALT}/qa/questions/product_id=${id}`)
    .then((data) => cb(data))
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
};

const addQuestion = (product_id, body, name, email, cb) => {
  axios.post(`${API_ALT}/qa/questions`, {
    product_id, body, name, email,
  })
    .then((data) => {
      cb(data);
    })
    .catch((err) => console.error(err));
};

const upvoteQuestions = (id, cb) => {
  axios.put(`${API_ALT}/qa/questions/${id}/helpful`)
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

const upvoteAnswers = (id, cb) => {
  axios.put(`${API_ALT}/qa/answers/${id}/helpful`)
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

const addAnswer = (question_id, body, name, email, cb) => {
  axios.post(`${API_ALT}/qa/questions/${question_id}/answers`, {
    body, name, email,
  })
    .then((data) => {
      cb(data);
    })
    .catch((err) => console.error(err));
};

const reportQuestion = (question_id, cb) => {
  axios.put(`${API_ALT}/qa/questions/${question_id}/report`)
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

module.exports = {
  fetchProducts,
  fetchProductStyles,
  fetchReviews,
  upvoteReview,
  reportReview,
  postReview,
  fetchReviewsMeta,
  fetchQandA,
  addQuestion,
  addAnswer,
  reportQuestion,
  upvoteQuestions,
  upvoteAnswers,
};
