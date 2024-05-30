import React, { createContext, useState} from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart(prevCart => prevCart.map(item =>
      item.Id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.Id === product.Id);

    if (existingProductIndex !== -1) {
      setCart(prevCart => prevCart.map((item, index) => 
        index === existingProductIndex ? {...item, quantity: (item.quantity || 1) + 1} : item
      ));
    } else {
      
      setCart([...cart, {...product, quantity: 1}]); 
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.Id !== product.Id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};