const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

function goodreadsService() {
  function getBookById() {
    return new Promise((resolve, reject) => {
    //  axios.get()
      resolve({ description: 'our description' });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();
