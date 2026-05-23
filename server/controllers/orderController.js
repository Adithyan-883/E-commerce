const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

const FREE_SHIPPING_THRESHOLD = 299;
const SHIPPING_FEE = 49;
const DISCOUNT_THRESHOLD = 999;
const DISCOUNT_RATE = 0.1;

const releaseReservedStock = async (reservedStock) => {
  await Promise.all(
    reservedStock.map(({ productId, qty }) => Product.updateOne(
      { _id: productId },
      { $inc: { stock: qty } }
    ))
  );
};

// Create a guest cash-on-delivery order using prices held by the server.
const addOrderItems = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      guestName,
      guestEmail,
    } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    if (paymentMethod !== 'Cash on Delivery') {
      res.status(400).json({ message: 'Only Cash on Delivery is currently available.' });
      return;
    }

    if (
      !shippingAddress?.fullName ||
      !shippingAddress?.phone ||
      !shippingAddress?.address ||
      !shippingAddress?.city ||
      !shippingAddress?.postalCode ||
      !shippingAddress?.country
    ) {
      res.status(400).json({ message: 'Complete shipping details are required.' });
      return;
    }

    const email = String(guestEmail || '').trim().toLowerCase();
    const phone = String(shippingAddress.phone).trim();
    const postalCode = String(shippingAddress.postalCode).trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ message: 'A valid email address is required.' });
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone) || !/^\d{6}$/.test(postalCode)) {
      res.status(400).json({ message: 'A valid Indian phone number and postal code are required.' });
      return;
    }

    const productIds = orderItems.map((item) => item.productId);
    if (productIds.some((id) => !mongoose.isValidObjectId(id))) {
      res.status(400).json({ message: 'Invalid product in order.' });
      return;
    }

    const products = await Product.find({ _id: { $in: productIds } });
    const productsById = new Map(products.map((product) => [String(product._id), product]));
    const stockRequirements = new Map();
    const pricedItems = [];

    for (const item of orderItems) {
      const product = productsById.get(String(item.productId));
      const qty = Number(item.qty);

      if (!product) {
        res.status(400).json({ message: 'One or more products are no longer available.' });
        return;
      }

      if (!Number.isInteger(qty) || qty < 1) {
        res.status(400).json({ message: 'Invalid product quantity.' });
        return;
      }

      let packLabel = '';
      let price = product.price;

      if (product.packs.length > 0) {
        const selectedPack = item.packLabel
          ? product.packs.find((pack) => pack.label === item.packLabel)
          : product.packs[0];

        if (!selectedPack) {
          res.status(400).json({ message: `Selected pack is unavailable for ${product.title}.` });
          return;
        }

        packLabel = selectedPack.label;
        price = selectedPack.price;
      }

      const productId = String(product._id);
      stockRequirements.set(productId, (stockRequirements.get(productId) || 0) + qty);
      pricedItems.push({
        title: product.title,
        packLabel,
        qty,
        image: product.images[0],
        price,
        product: product._id,
      });
    }

    for (const [productId, qty] of stockRequirements) {
      const product = productsById.get(productId);
      if (product.stock < qty) {
        res.status(409).json({ message: `Only ${product.stock} units of ${product.title} are available.` });
        return;
      }
    }

    const itemsPrice = pricedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shippingPrice = itemsPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const discountPrice = itemsPrice >= DISCOUNT_THRESHOLD
      ? Number((itemsPrice * DISCOUNT_RATE).toFixed(2))
      : 0;
    const taxPrice = 0;
    const totalPrice = Number((itemsPrice - discountPrice + shippingPrice + taxPrice).toFixed(2));
    const reservedStock = [];

    for (const [productId, qty] of stockRequirements) {
      const product = await Product.findOneAndUpdate(
        { _id: productId, stock: { $gte: qty } },
        { $inc: { stock: -qty } },
        { new: true }
      );

      if (!product) {
        await releaseReservedStock(reservedStock);
        res.status(409).json({ message: 'Stock changed while ordering. Please review your cart and try again.' });
        return;
      }

      reservedStock.push({ productId, qty });
    }

    const order = new Order({
      orderItems: pricedItems,
      shippingAddress: { ...shippingAddress, phone, postalCode },
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      guestName: guestName || shippingAddress.fullName || 'Guest',
      guestEmail: email,
    });

    let createdOrder;
    try {
      createdOrder = await order.save();
    } catch (error) {
      await releaseReservedStock(reservedStock);
      throw error;
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// Return all orders to authenticated administrators.
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrderItems,
  getOrders,
};
