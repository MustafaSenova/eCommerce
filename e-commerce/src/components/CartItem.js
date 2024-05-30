import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ product }) => {
  const { removeFromCart, updateCartItemQuantity } = useContext(CartContext);

  const handleIncreaseQuantity = (product) => {
    const newQuantity = (product.quantity || 1) + 1;
    updateCartItemQuantity(product.Id, newQuantity);
  };

  const handleDecreaseQuantity = (product) => {
    if (product.quantity && product.quantity > 1) {
      const newQuantity = product.quantity - 1;
      updateCartItemQuantity(product.Id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <img src={product.Image} alt={product.Name} />
      <div>
        <h3>{product.Name}</h3>
        <p>Fiyat: {product.Price} TL</p>
        <div className="quantity-controls">
          <button onClick={() => handleDecreaseQuantity(product)}>-</button>
          <span>{product.quantity || 1}</span> {/* Miktarı göster */}
          <button onClick={() => handleIncreaseQuantity(product)}>+</button>
        </div>
        <button onClick={() => removeFromCart(product)}>Sepetten Çıkar</button>
      </div>
    </div>
  );
};

export default CartItem;
