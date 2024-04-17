const express = require('express');
const connection = require('./connection');
const bookRoute = require('./routes/book');
const warehouseRoute = require('./routes/warehoues');
const categoriesRoute = require('./routes/categories');
const productsRoute = require('./routes/products');
const cors = require('cors');

const app = express();
app.use(cors({
    origin:"http://localhost:4201",
    credentials:true
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/book', bookRoute);
app.use('/warehouse', warehouseRoute);
app.use('/categories', categoriesRoute);
app.use('/products', productsRoute);

module.exports = app;