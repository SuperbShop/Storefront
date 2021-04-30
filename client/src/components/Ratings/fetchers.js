import $ from 'jquery';
import config from '../../../../config';

const fetchersObject = {
  metaGetter: (id) => new Promise((resolve, reject) => $.ajax({
    method: 'GET',
    url: `/api/${id}/reviews/meta`,
    success: (data) => resolve(data),
    error: (err) => reject(err),
  })),
  listGetter: (id) => new Promise((resolve, reject) => $.ajax({
    method: 'GET',
    url: `/api/${id}/reviews`,
    success: (data) => resolve(data),
    error: (err) => reject(err),
  })),
  productGetter: (id) => new Promise((resolve, reject) => $.ajax({
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${id}`,
    headers: {
      Authorization: config.TOKEN,
    },
    success: (data) => resolve(data),
    error: (err) => reject(err),
  })),
};

export default fetchersObject;
