import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductItem from './ProductItem'; 

const ProductList = ({ addToCart }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.list); 

  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);

  return (
    <div className='product-list'>
      {products.length === 0 ? (
        <p>Ładowanie produktów...</p>
      ) : (
        products.map(product => (
          <ProductItem 
            key={product.id}
            product={product}
            addToCart={addToCart} 
          />
        ))
      )}
    </div>
  );
};

export default ProductList;
