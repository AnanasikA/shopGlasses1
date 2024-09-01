import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Contact from './components/Contact';
import About from './components/About';
import Checkout from './components/Checkout';
import { addToCart } from './redux/actions/cartActions';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe('your-publishable-key-here');

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
        <div className='container mx-auto pt-20 pb-10'>
          <Routes>
            <Route path='/' element={<ProductList addToCart={addToCartHandler} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
          </Routes>
          {cart.length > 0 && <Checkout totalAmount={totalAmount} />}
          <footer className='footer mt-10 text-center'>
            <p>&copy; 2024 Anastasiia Kupriianets</p>
          </footer>
          <ToastContainer position='bottom-right' />
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
