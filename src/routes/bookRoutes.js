const express = require('express');
const bookController = require('../controllers/bookController');
const booksRouter = express.Router();
const bookService = require('../services/goodreadsService');


const router = nav => {
  const { getIndex, getById, middleware } = bookController(bookService, nav);
  booksRouter.use(middleware)
  booksRouter.route('/')
    .get(getIndex);

  booksRouter.route('/:id')
    .get(getById);

    return booksRouter
}

module.exports = router;
