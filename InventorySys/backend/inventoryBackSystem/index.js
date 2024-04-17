const express = require('express');
const connection = require('./connection');
const bookRoute = require('./routes/book');
const cors = require('cors');

const app = express();
app.use(cors({
    origin:"http://localhost:4201",
    credentials:true
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/book', bookRoute);

module.exports = app;