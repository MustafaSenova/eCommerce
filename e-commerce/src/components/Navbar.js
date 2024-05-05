import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">E-Ticaret</Link>
      </div>
      <div className="navbar-right">
        <div className="search-box">
          <input type="text" placeholder="Ürün ara..." />
          <button>Ara</button>
        </div>
        <Link to="/cart" className="cart-link">
          <i className="fa fa-shopping-cart"></i> Sepet
        </Link>
        <Link to="/profile" className="profile-link">
          <i className="fa fa-user"></i> Profil
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;