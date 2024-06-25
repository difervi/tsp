const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

const Product = require('./models/product');

// Middleware para inicializar el carro de compras
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

// Rutas aquí (ver siguiente sección)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
