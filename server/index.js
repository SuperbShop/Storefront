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

app.put('/api/questions/:id/report', (req, res) => {
  const { id } = req.params;
  api.reportQuestion(id, (question) => {
    res.send(question.data);
  });
});

app.post('/api/reviews', (req, res) => {
  const content = req.body;
  api.postReview(content, () => {
    res.end();
  });
});

app.get('/api/:id/questions', (req, res) => {
  const { id } = req.params;
  api.fetchQandA(id, (QandA) => {
    res.send(QandA.data);
  });
});

app.post('/api/qa/questions', (req, res) => {
  const {
    product_id, body, name, email,
  } = req.body;
  api.addQuestion(product_id, body, name, email, () => {
    res.end();
  });
});

app.post('/api/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params;
  const content = req.body;
  api.addAnswer(question_id, content, () => {
    res.end();
  });
});

app.put('/api/questions/:id/helpful', (req, res) => {
  const { id } = req.params;
  api.upvoteQuestions(id, (question) => {
    res.send(question.data);
  });
});

app.put('/api/answers/:id/helpful', (req, res) => {
  const { id } = req.params;
  api.upvoteAnswers(id, (answer) => {
    res.send(answer.data);
  });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
