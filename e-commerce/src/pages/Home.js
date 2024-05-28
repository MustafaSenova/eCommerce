import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';


const Home = ({ showNotification }) => { // Prop olarak al
  return (
    <div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} showNotification={showNotification} /> // Prop olarak ilet
        ))}
      </div>
    </div>
  );
};

export default Home;