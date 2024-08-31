import React from 'react';

const ProductCard = ({ product, addToCard }) => {
    return (
        <div className='product-card'>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button onClick={() => addToCard(product)}>Dodaj do koszyka</button>
        </div>
    );
};

export default ProductCard;