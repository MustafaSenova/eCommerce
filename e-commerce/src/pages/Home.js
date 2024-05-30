import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios'; 

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data); 
      } catch (error) {
        console.error('Ürünleri getirirken hata oluştu:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.Id} product={product} /> 
        ))}
      </div>
    </div>
  );
};

export default Home;