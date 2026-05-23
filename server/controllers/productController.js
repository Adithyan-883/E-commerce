const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch related products by category, excluding a specific product
// @route   GET /api/products/related?category=&exclude=
// @access  Public
const getRelatedProducts = async (req, res, next) => {
  try {
    const { category, exclude } = req.query;

    if (!category) {
      res.status(400).json({ message: 'Category query parameter is required' });
      return;
    }

    const filter = { category };
    if (exclude) {
      const mongoose = require('mongoose');
      if (mongoose.isValidObjectId(exclude)) {
        filter._id = { $ne: exclude };
      }
    }

    const relatedProducts = await Product.find(filter).limit(4);
    res.json(relatedProducts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getRelatedProducts,
};
