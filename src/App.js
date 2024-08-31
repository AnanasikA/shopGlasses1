// src/App.js
import React from 'react';
import './scss/styles.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from './components/Header';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import About from './components/About';
import store from './redux/store';
import { addToCart } from './redux/actions/cartActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe('your-publishable-key-here');

const products = [
  {id: 1, name: 'Okulary 1', price: 200, image: '/images/glasses1.jpg'},
  {id: 2, name: 'Okulary 2', price: 300, image: '/images/okulary2.png'},
  {id: 3, name: 'Okulary 3', price: 250, image: '/images/okulary3.png'}
];

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} dodano do koszyka!`);
  };

  const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <Router>
      <Header />
      <Elements stripe={stripePromise}>
        <div className='container'>
          <Routes>
            <Route path='/' element={<ProductList products={products} addToCart={addToCartHandler} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
          </Routes>
          {cart.length > 0 && <Checkout totalAmount={totalAmount} />}
          <footer className='footer'>
            <p>&copy; 2024 Anastasiia Kupriianets</p>
          </footer>
          <ToastContainer /> {/* Umieść ToastContainer tutaj */}
        </div>
      </Elements>
    </Router>
  );
}

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WrappedApp;

