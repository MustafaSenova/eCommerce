import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const product = products.find((p) => p.id === parseInt(id));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
      };
    
      if (!product) {
        return <div>Ürün bulunamadı!</div>;
      }
  return (
    <div className="product-details-page"> {/* Sayfa için yeni sınıf */}
      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">Fiyat: {product.price} TL</p>
          <p>{/* İleride buraya açıklama ekleyebilirsiniz */}</p>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Sepete Ekle
        </button>
        {showSuccessMessage && (
          <p className="success-message">Ürün sepete eklendi!</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;