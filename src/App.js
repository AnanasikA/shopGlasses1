import React from 'react';
import './scss/styles.scss';
import { BrowserRouter as Router, Route, Routers } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import Header from './components/Header';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import About from './components/About';
import store from './redux/store';
import { addToCard } from './redux/actions/cartActions';


const stripePromise = loadStripe('');

const products = [
  {id: 1, name: 'Okulary 1', price: 200, image: '/images/glasses2.jpg'},
  {id: 1, name: 'Okulary 2', price: 300, image: '/images/okulary2.png'},
  {id: 1, name: 'Okulary 3', price: 250, image: '/images/okulary3.png'}
]

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);

  const addToCartHandler = (product) => {
    dispatch(addToCard(product));
  };

  const totalAmount = cart.reduce((total, product) => total + product.price, 0);

  return (
    <Router>
      <Header />
      <Elements stripe={stripePromise}>
        <div className='container'>
          <Routers>
            <Route path='/' element={<ProductList products={products} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
          </Routers>  
          <header className='header'>
            <h1>Sklep z okularami</h1>
          </header>
          <ProductList products={products} addToCard={addToCartHandler} />
          {cart.length > 0 && <Checkout totalAmount={totalAmount} />}
          <footer className='footer'>
            <p>&copy; 2024 Anastasiia Kupriianets</p>
          </footer>
          
        </div>
      </Elements>
    </Router>
  );
};

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default WrappedApp;
