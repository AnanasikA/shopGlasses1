import Cart from '../models/cartModel.js';

// Pobierz zawartość koszyka
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// Dodaj produkt do koszyka
export const addToCart = async (req, res) => {
  try {
    const newCartItem = new Cart(req.body);
    const savedCartItem = await newCartItem.save();
    res.status(201).json(savedCartItem);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// Usuń produkt z koszyka
export const removeFromCart = async (req, res) => {
  try {
    const removedItem = await Cart.findByIdAndDelete(req.params.id);
    if (!removedItem) {
      return res.status(404).json({ message: 'Produkt nie znaleziony w koszyku' });
    }
    res.json({ message: 'Produkt usunięty z koszyka' });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

