import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/cartActions';

const Cart = () => {
    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    
}