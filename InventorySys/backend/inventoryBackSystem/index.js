const express = require('express');
const connection = require('./connection');
const bookRoute = require('./routes/book');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/book', bookRoute);

module.exports = app;