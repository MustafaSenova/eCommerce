import React from 'react';

const CartItem = ({ product, onRemove }) => {
  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>Fiyat: {product.price} TL</p>
        <button onClick={() => onRemove(product)}>Sepetten Çıkar</button>
      </div>
    </div>
  );
};

export default CartItem;