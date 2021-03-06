/* eslint-disable no-param-reassign */
const express = require('express');
const bookController = require('../controller/bookController');

function routers(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);
  bookRouter
    .route('/books')
    .post(controller.post)
    .get(controller.get);

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

      const newBook = book.toJSON();
      const genre = newBook.genre.replace(' ', '%20');
      newBook.links = {};
      newBook.links.findBooksByGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
      return res.json(newBook);
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
