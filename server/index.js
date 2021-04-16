const express = require('express');
const api = require('./apiHandler');

const app = express();
const port = 3000;
app.use(express.json());
app.use('/products:id', express.static('../client/dist'));

app.get('/', (req, res) => {
  res.redirect('/products');
});

app.get('/products', (req, res) => {
  res.send('hello world');
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  api.fetchProducts(id, (details) => {
    res.send(details.data);
    api.fetchProductStyles(id, (styles) => {
      res.send(styles.data);
    });
  });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
