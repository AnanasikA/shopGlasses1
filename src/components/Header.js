import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Header = () => {
  const cart = useSelector(state => state.cart.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className='bg-gray-800 text-white p-4 shadow-md fixed w-full top-0 z-10'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-2xl font-bold'>
          My Glasses Shop
        </Link>
        <nav>
          <ul className='flex space-x-4'>
            <li><Link to='/'>Produkty</Link></li>
            <li><Link to='/about'>O nas</Link></li>
            <li><Link to='/contact'>Kontakt</Link></li>
            <li>
              <Link to='/cart' className='relative'>
                <FaShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className='absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 text-sm'>
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
