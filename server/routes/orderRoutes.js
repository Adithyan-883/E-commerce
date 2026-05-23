const express = require('express');
const router = express.Router();
const { addOrderItems, getOrders } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// POST /api/orders — open, no auth (guest checkout)
// GET  /api/orders — admin only (protected)
router.route('/')
  .post(addOrderItems)
  .get(protect, admin, getOrders);

module.exports = router;
