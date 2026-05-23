const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const products = [
  {
    title: 'Banana Chips',
    description: 'Classic thin and crispy Kerala banana chips.',
    price: 150,
    oldPrice: 200,
    category: 'snacks',
    images: ['/images/Banana Chips 1.webp', '/images/Banana Chips  2.webp', '/images/Banana Chips 3.webp'],
    packs: [
      { label: '250g', save: 50, oldPrice: 200, price: 150 },
      { label: '500g', save: 120, oldPrice: 400, price: 280 },
      { label: '1kg', save: 300, oldPrice: 800, price: 500 },
    ],
    stock: 50,
    rating: 4.9,
    numReviews: 12,
  },
  {
    title: 'Sharkara Varatti',
    description: 'Thick cut banana pieces coated in jaggery and ginger.',
    price: 150,
    oldPrice: 200,
    category: 'sweets',
    images: ['/images/Sharkara Varatti.webp'],
    packs: [
      { label: '250g', save: 50, oldPrice: 200, price: 150 },
      { label: '500g', save: 120, oldPrice: 400, price: 280 },
      { label: '1kg', save: 300, oldPrice: 800, price: 500 },
    ],
    stock: 30,
    rating: 4.8,
    numReviews: 8,
  },
  {
    title: 'Jackfruit Chips',
    description: 'Crispy and naturally sweet chips made from ripe jackfruit.',
    price: 150,
    oldPrice: 200,
    category: 'snacks',
    images: ['/images/Jackfruit Chips.webp'],
    packs: [
      { label: '250g', save: 50, oldPrice: 200, price: 150 },
      { label: '500g', save: 120, oldPrice: 400, price: 280 },
      { label: '1kg', save: 300, oldPrice: 800, price: 500 },
    ],
    stock: 40,
    rating: 4.7,
    numReviews: 10,
  },
  {
    title: 'Spicy Banana Chips',
    description: 'Crunchy Kerala banana chips with a touch of chili and turmeric.',
    price: 150,
    oldPrice: 200,
    category: 'snacks',
    images: ['/images/Spicy Banana Chips.webp'],
    packs: [
      { label: '250g', save: 50, oldPrice: 200, price: 150 },
      { label: '500g', save: 120, oldPrice: 400, price: 280 },
      { label: '1kg', save: 300, oldPrice: 800, price: 500 },
    ],
    stock: 60,
    rating: 4.8,
    numReviews: 15,
  },
  {
    title: 'Crispy Tapioca Chips',
    description: 'Thinly sliced and perfectly fried kappa (tapioca) chips seasoned with salt.',
    price: 150,
    oldPrice: 200,
    category: 'snacks',
    images: ['/images/Tapioca Chips.webp'],
    packs: [
      { label: '250g', save: 50, oldPrice: 200, price: 150 },
      { label: '500g', save: 120, oldPrice: 400, price: 280 },
      { label: '1kg', save: 300, oldPrice: 800, price: 500 },
    ],
    stock: 45,
    rating: 4.7,
    numReviews: 9,
  },
  {
    title: 'KERALA CHIPS COMBO - BANANA, JACKFRUIT & TAPIOCA',
    description: 'A classic Kerala snack trio featuring crispy banana chips, naturally sweet jackfruit chips, and crunchy tapioca chips, all fried in pure coconut oil.',
    price: 599,
    oldPrice: 1400,
    category: 'combos',
    images: ['/images/Combo 4.webp'],
    packs: [
      { label: '120g + 180g + 100g', save: 801, oldPrice: 1400, price: 599 },
      { label: '300g + 400g + 200g', save: 51, oldPrice: 950, price: 899 },
      { label: '600g + 400g + 400g', save: 401, oldPrice: 1400, price: 999 },
    ],
    stock: 20,
    rating: 4.7,
    numReviews: 22,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
