//api.listennotes.com
//import axios from 'axios';
const axios = require('axios')

const baseURL = 'http://api.listennotes.com/api/v1'

var instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,/*,
  headers: {'X-Custom-Header': 'foobar'}*/
  headers: {"X-RapidAPI-Key": "07af026654msha123af120ab3af5p170f9bjsn8dca276ee35a"}

});

instance.get('/search?q=usapodden', {
  timeout: 5000
}).then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
