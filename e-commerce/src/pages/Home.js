import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';


const Home = () => {

  return (
    <div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;