/* eslint-disable no-param-reassign */
const express = require('express');

function routers(Book) {
  const bookRouter = express.Router();

  bookRouter
    .route('/books')
    .post((req, res) => {
      const book = new Book(req.body);

      book.save();
      return res.status(201).json(book);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }

      Book.find(query, (err, books) => (err ? res.send(err) : res.json(books)));
    });

  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) return res.send(err);
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter
    .route('/books/:bookId')
    .get((req, res) => {
      const { book } = req;
      return res.json(book);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.genre = req.body.genre;
      book.author = req.body.author;
      book.read = req.body.read;
      req.book.save((err) => {
        if (err) return res.send(err);
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;

      // eslint-disable-next-line no-underscore-dangle
      if (req.book._id) delete req.book._id;

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });

      req.book.save((err) => {
        if (err) return res.send(err);
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) return res.send(err);
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}

module.exports = routers;
