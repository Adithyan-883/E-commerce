const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  oldPrice: {
    type: Number
  },
  category: {
    type: String,
    required: true,
    enum: ['chips', 'sweets', 'spices', 'snacks', 'combos']
  },
  images: [{
    type: String,
    required: true
  }],
  packs: [{
    label: String,
    price: Number,
    oldPrice: Number,
    save: Number
  }],
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
