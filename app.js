const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const bookRouter = express.Router();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter
  .route('/books')
  .post((req, res) => {
    const book = new Book(req.body);

    console.log(book);
    return res.json(book);
  })
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => (err ? res.send(err) : res.json(books)));
  });

bookRouter.route('/books/:bookId').get((req, res) => {
  Book.findById(req.params.bookId, (err, book) => (err ? res.send(err) : res.json(book)));
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Node');
});

app.listen(port, () => {
  console.log(`server start listening at ${port}`);
});
