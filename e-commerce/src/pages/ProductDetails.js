import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext'; // CartContext'inizi import edin

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); 

  const handleAddToCart = () => {
    addToCart(product); 
    setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
  };

  if (loading) {
    return <div>Ürün yükleniyor...</div>;
  }

  if (error) {
    return <div>Ürün getirilirken bir hata oluştu: {error.message}</div>;
  }

  if (!product) {
    return <div>Ürün bulunamadı!</div>;
  }
  return (
    <div className="product-details-page"> 
      <div className="product-details">
        <div className="product-image">
          <img src={product.Image} alt={product.Name} />
        </div>
        <div className="product-info">
          <h2>{product.Name}</h2>
          <p className="price">Fiyat: {product.Price} TL</p>
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