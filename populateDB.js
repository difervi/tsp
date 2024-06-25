const mongoose = require('mongoose');
const Product = require('./models/product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: 'Collar para Perro',
    description: 'Un collar ajustable para perros de todas las razas.',
    price: 30.000,
    image: 'collar_perro.jpg'
  },
  {
    name: 'Juguete para Gato',
    description: ' juguete interactivo para mantener a tu gato entretenido.',
    price: 20.999,
    image: 'juguete_gato.jpg'
  },
  {
    name: 'Cama para Mascotas',
    description: 'Una cama cómoda y suave para mascotas.',
    price: 40.000,
    image: 'cama_mascotas.jpg'
  }
];

Product.insertMany(products)
  .then(() => {
    console.log('Productos añadidos exitosamente');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
