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
  api.fetchProductStyles(id, (styles) => {
    res.send(styles.data);
  });
});

app.get('/api/:id/reviews', (req, res) => {
  const { id } = req.params;

  api.fetchReviews(id, (reviews) => {
    res.send(reviews.data);
  });
});

app.get('/api/:id/reviews/meta', (req, res) => {
  const { id } = req.params;
  api.fetchReviewsMeta(id, (meta) => {
    res.send(meta.data);
  });
});

app.put('/api/reviews/:id/helpful', (req, res) => {
  const { id } = req.params;
  api.upvoteReview(id, (review) => {
    res.send(review.data);
  });
});

app.put('/api/reviews/:id/report', (req, res) => {
  const { id } = req.params;
  api.reportReview(id, (review) => {
    res.send(review.data);
  });
});

app.post('/api/reviews', (req, res) => {
  const content = req.body;
  console.log("content!!!!", content);
  api.postReview(content, (err) => {
    if (err) res.send(err);
    res.send();
  });
});

app.get('/api/:id/q_and_a', (req, res) => {
  const { id } = req.params;
  api.fetchQandA(id, (QandA) => {
    res.send(QandA.data);
  });
});

app.put('/api/:id/q_and_a/:question_id/report', (req, res) => {
  const { question_id } = req.params;
  api.reportQuestion(question_id, (QandA) => {
    res.send(QandA.data);
  });
});

app.get('/api/:id/q_and_a/:question_id/report', (req, res) => {
  const { question_id } = req.params;
  api.reportQuestion(question_id, (QandA) => {
    res.send(QandA.data);
  });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
