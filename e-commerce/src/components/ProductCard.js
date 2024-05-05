import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Fiyat: {product.price} TL</p>
      <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
            Sepete Ekle
      </button>
    </div>
  );
};

export default ProductCard;