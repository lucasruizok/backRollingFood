const express = require('express');
const app = express();
const user_routes = require('./routes/user.routes');
const product_routes = require('./routes/product.routes');
const pedido_routes = require('./routes/pedido.routes');
const whatsapp_routes = require('./routes/whatsapp.routes');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(user_routes,product_routes,pedido_routes,whatsapp_routes);

module.exports = app;