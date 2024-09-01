// src/components/Cart.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/cartActions';
import { FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity(id, quantity));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <motion.div
      className='container mx-auto p-4'
      initial={{ x: '100vw' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <h2 className='text-2xl font-bold mb-4'>Koszyk</h2>
      {cart.length === 0 ? (
        <p>Twój koszyk jest pusty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className='flex items-center justify-between mb-4 p-4 border rounded-lg'>
              <img src={item.image} alt={item.name} className='w-20 h-20 object-cover rounded' />
              <div className='flex-1 mx-4'>
                <h3 className='text-lg font-semibold'>{item.name}</h3>
                <p className='text-gray-700'>{item.price} PLN</p>
                <div className='flex items-center mt-2'>
                  <label className='mr-2'>Ilość:</label>
                  <input 
                    type='number'
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    className='w-16 p-1 border rounded'
                  />
                </div>
              </div>
              <button 
                onClick={() => handleRemove(item.id)}
                className='text-red-500 hover:text-red-700'
              >
                <FaTrash size={20} />
              </button>
            </div>
          ))}
          <div className='text-right mt-6'>
            <h3 className='text-xl font-semibold'>Łączna kwota: {totalAmount} PLN</h3>
            <button className='mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300'>
              Przejdź do płatności
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
