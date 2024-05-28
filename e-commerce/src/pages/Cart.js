import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };


  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * (item.quantity || 1);
    });
    return totalPrice;
  };

  return (
    <div className="cart-page">
      <h2>Alışveriş Sepeti</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Sepetiniz boş.</p>
          <Link to="/" className="continue-shopping">
            Alışverişe Devam Et
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((product) => (
              <CartItem 
                key={product.id} 
                product={product} 
                onRemove={handleRemoveFromCart} // onRemove props'u eklendi
              />
            ))}
          </div>
          <div className="cart-summary">
            <h3>Sipariş Özeti</h3>
            <div className="summary-row">
              <span>Ara Toplam:</span>
              <span>{calculateTotalPrice().toFixed(2)} TL</span>
            </div>
            {/* İleride kargo ücreti, indirim vb. eklenebilir */}
            <div className="summary-row total">
              <span>Toplam:</span>
              <span>{calculateTotalPrice().toFixed(2)} TL</span>
            </div>
            <button onClick={clearCart} className="clear-cart-btn">
              Sepeti Boşalt
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
