import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/cartActions';

const Cart = () => {
    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleQuantityChang = (productId, quantity) => {
        dispatch(updateQuantity(productId, quantity));
    };

    return (
        <div>
            <h2>Twój koszyk</h2>
            {cart.length === 0 ? (
                <p>Twój koszyk jest pusty</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>{item.price} zł.</p>
                            <input
                                type ="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChang(item.id, e.target.value)}
                            />
                            <button onClick={() => handleRemove(item.id)}>Usuń</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;