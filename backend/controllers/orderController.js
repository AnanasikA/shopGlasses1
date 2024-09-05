const Order = require('../models/orderModel');

// Złóż zamówienie
const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// Pobierz wszystkie zamówienia
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

module.exports = {
  placeOrder,
  getOrders,
};