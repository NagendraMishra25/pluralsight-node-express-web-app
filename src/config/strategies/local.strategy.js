const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

const localStrategy = () => {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser(){
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected correctly to mongodb server');

          const db = client.db(dbName);
          const col = db.collection('users');

          const user = await col.findOne({ username });

          if(user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch(err) {
          debug(err.stack);
        }

        client.close();
    }());

    }));
}

module.exports = localStrategy;
