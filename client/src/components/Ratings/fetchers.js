import $ from 'jquery';

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
    url: `api/${id}`,
    success: (data) => resolve(data),
    error: (err) => reject(err),
  })),
};

export default fetchersObject;
