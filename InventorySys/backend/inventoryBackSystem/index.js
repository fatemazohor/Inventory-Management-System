const express = require('express');
const connection = require('./connection');
const bookRoute = require('./routes/book');
const warehouseRoute = require('./routes/warehoues');
const statusRoute = require('./routes/status');
const categoriesRoute = require('./routes/categories');
const productsRoute = require('./routes/products');
const vendorRoute = require('./routes/vendors');
const customerRoute = require('./routes/customers');
const stockRoute = require('./routes/stock');
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
app.use('/status', statusRoute);
app.use('/vendors', vendorRoute);
app.use('/customers', customerRoute);
app.use('/categories', categoriesRoute);
app.use('/products', productsRoute);
app.use('/stocks', stockRoute);

module.exports = app;