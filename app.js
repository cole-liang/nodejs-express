const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bookRouter = express.Router();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.PORT || 3000;
const Books = require('./models/bookModel');

bookRouter.route('/books').get((req, res) => {
  const query = {};
  if (req.query.genre) {
    query.genre = req.query.genre;
  }

  Books.find(query, (err, books) => (err ? res.send(err) : res.json(books)));
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Node');
});

app.listen(port, () => {
  console.log(`server start listening at ${port}`);
});
