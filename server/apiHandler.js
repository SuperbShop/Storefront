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

const fetchQandA = (id, cb) => {
  axios.get(`${API_URL}/qa/questions?product_id=${id}`)
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

// Curtis POST request AddQuestion goes here
// Curtis POST request AddAnswer goes here
// [X] Curtis POST request ReportAnswer goes here
const reportQuestion = (question_id, cb) => {
  axios.put(`${API_URL}/qa/questions?question_id=${question_id}`)
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};
// Curtis POST request addQuestion goes here
// Curtis POST request QuestionHelpful goes here
// Curtis POST request AnswerHelpful goes here

// Sam POST request for [createReview] goes here
// Sam POST request for [createReview] goes here
// Sam POST request for [createReview] goes here
// Sam POST request for [createReview] goes here

module.exports.fetchProducts = fetchProducts;
module.exports.fetchProductStyles = fetchProductStyles;
module.exports.fetchReviews = fetchReviews;
module.exports.upvoteReview = upvoteReview;
module.exports.reportReview = reportReview;
module.exports.fetchReviewsMeta = fetchReviewsMeta;
module.exports.fetchQandA = fetchQandA;
module.exports.reportQuestion = reportQuestion;
