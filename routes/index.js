const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Página de inicio
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('index', { products });
});

// Vista de producto individual
router.get('/product/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    res.render('product', { product });
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Añadir producto al carro
router.post('/add-to-cart/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (product) {
    const cartItem = req.session.cart.find(item => item.product._id == productId);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      req.session.cart.push({ product, quantity: 1 });
    }
  }

  res.redirect('/');
});

// Ver carro de compras
router.get('/cart', (req, res) => {
  res.render('cart', { cart: req.session.cart });
});

// Eliminar producto del carro
router.post('/remove-from-cart/:id', (req, res) => {
  const productId = req.params.id;
  req.session.cart = req.session.cart.filter(item => item.product._id != productId);
  res.redirect('/cart');
});

module.exports = router;
