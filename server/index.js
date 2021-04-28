const express = require('express');
const api = require('./apiHandler');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/api/:id', (req, res) => {
  const { id } = req.params;
  api.fetchProducts(id, (details) => {
    res.send(details.data);
  });
});

app.get('/api/:id/styles', (req, res) => {
  const { id } = req.params;
  api.fetchProductStyles(id, (details) => {
    res.send(details.data);
  });
});

app.get('/api/:id/reviews', (req, res) => {
  const { id } = req.params;
  api.fetchProductReviews(id, (details) => {
    res.send(details.data);
  });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
