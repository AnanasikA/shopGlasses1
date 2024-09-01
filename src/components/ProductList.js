import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const ProductList = ({ addToCart }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.list);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p className='text-center mt-10'>Ładowanie produktów...</p>;
  }

  if (error) {
    return <p className='text-center mt-10 text-red-500'>Wystąpił błąd: {error}</p>;
  }

  return (
    <motion.div
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {products.map(product => (
        <ProductItem 
          key={product.id}
          product={product}
          addToCart={addToCart} 
        />
      ))}
    </motion.div>
  );
};

export default ProductList;