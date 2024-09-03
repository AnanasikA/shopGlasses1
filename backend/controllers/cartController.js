const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); // Zakładam, że masz model Product

// Pobranie koszyka
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId'); // Możesz użyć populate, aby uzyskać pełne dane produktu
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

// Dodanie do koszyka
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const productPrice = product.price;
    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      cart.totalPrice += quantity * productPrice;
      await cart.save();
    } else {
      cart = new Cart({
        userId: req.user._id,
        items: [{ productId, quantity }],
        totalPrice: quantity * productPrice,
      });
      await cart.save();
    }

    res.status(201).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

// Usunięcie z koszyka
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(item => !item.productId.equals(productId));

      // Ponowne przeliczenie całkowitej ceny
      cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

      await cart.save();
    }

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error });
  }
};

