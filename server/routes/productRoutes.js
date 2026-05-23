const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getRelatedProducts } = require('../controllers/productController');

// IMPORTANT: /related must be defined BEFORE /:id to avoid Express matching "related" as an id param
router.route('/related').get(getRelatedProducts);
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

module.exports = router;
