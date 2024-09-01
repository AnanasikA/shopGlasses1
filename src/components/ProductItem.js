import React from 'react';
import { motion } from 'framer-motion';
import { FaCartPlus } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductItem = ({ product, addToCart }) => {
  return (
    <motion.div
      className='bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'
      whileHover={{ scale: 1.05 }}
    >
      <LazyLoadImage
        src={product.image}
        alt={product.name}
        effect='blur'
        className='w-full h-64 object-cover'
      />
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2'>{product.name}</h2>
        <p className='text-gray-700 mb-4'>{product.price} PLN</p>
        <button
          onClick={() => addToCart(product)}
          className='flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300'
        >
          <FaCartPlus className='mr-2' /> Dodaj do koszyka
        </button>
      </div>
    </motion.div>
  );
};

export default ProductItem;
