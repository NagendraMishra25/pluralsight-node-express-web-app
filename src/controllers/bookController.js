const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');


const bookController = (bookService, nav) => {
  const getIndex = (req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo(){
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected correctly to mongodb server');

        const db = client.db(dbName);

        const col = await db.collection('books')
        const books = await col.find().toArray();

        res.render(
          'bookListView',
           {
             title: 'MyLibrary',
             nav,
             books
            }
          );
        } catch(err) {
          debug(err.stack);
        }
      }());
  };

  const getById = (req, res) => {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo(){
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected correctly to mongodb server');

        const db = client.db(dbName);

        const col = await db.collection('books')
        const book = col.findOne({ _id: new ObjectID(id) });
        debug(book);

        book.details = await bookService.getBookById(book.bookId);
        res.render(
          'bookView',
           {
             title: 'MyLibrary',
             nav,
             book: book
            }
          );
        } catch(err) {
          debug(err.stack);
        }
    }());

  };

  const middleware = (req, res, next) => {
    if(req.user) {
      next();
    } else {
      res.redirect('/');
    }
  };

  return {
    getIndex,
    getById,
    middleware
  }
};

module.exports = bookController;
