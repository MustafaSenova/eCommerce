import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

  const handleAddToCart = () => {
    addToCart(product);
    setShowSuccessMessage(true); 

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000); 
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.Id}`}>
        <img src={product.Image} alt={product.Name} />
      </Link>
      <h3>{product.Name}</h3>
      <p>Fiyat: {product.Price} TL</p>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Sepete Ekle
      </button>
      {showSuccessMessage && <p className="success-message">Ürün sepete eklendi!</p>}
    </div>
    
  );

};

export default ProductCard; 