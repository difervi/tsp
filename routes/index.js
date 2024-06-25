const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Home Route
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('index', { products: products });
});

// Product Route
router.get('/product/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('product', { product: product });
});

// Cart Route
router.get('/cart', (req, res) => {
  res.render('cart');
});

module.exports = router;
