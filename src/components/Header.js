import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <h1>Sklep z Okularami</h1>
            <nav>
                <ul>
                    <li><Link to="/">Sklep</Link></li>
                    <li><Link to="/cart">Koszyk</Link></li>
                    <li><Link to="/contact">Kontakt</Link></li>
                    <li><Link to="/about">O nas</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;