const Order = require('../models/orderModel');
const stripe = require('../config/stripe');

exports.createOrder = async (req, res) => {
  const { paymentMethodId } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cart.totalPrice * 100,
    currency: 'usd',
    payment_method: paymentMethodId,
    confirm: true,
  });

  const newOrder = new Order({
    userId: req.user._id,
    items: cart.items,
    totalPrice: cart.totalPrice,
    paymentIntentId: paymentIntent.id,
  });

  await newOrder.save();

  // Clear the cart
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.status(201).json(newOrder);
};

exports.getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};
