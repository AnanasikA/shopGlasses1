import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  cart: {
    type: [cartItemSchema],
    required: true,
  },
  totalAmount: { type: Number, required: true },
  user: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
