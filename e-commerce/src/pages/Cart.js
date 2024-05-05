import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="cart-page">
      <h2>Sepet</h2>
      {cart.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onRemove={handleRemoveFromCart}
            />
          ))}
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Sepeti Temizle
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;