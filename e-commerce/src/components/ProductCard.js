import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

  const handleAddToCart = () => {
    addToCart(product);
    setShowSuccessMessage(true); 

    // 2 saniye sonra mesajı gizle
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000); 
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <h3>{product.name}</h3>
      <p>Fiyat: {product.price} TL</p>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Sepete Ekle
      </button>
      {showSuccessMessage && <p className="success-message">Ürün sepete eklendi!</p>}
    </div>
    
  );

};

export default ProductCard; 