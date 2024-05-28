import React, { createContext, useState} from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Ürün zaten sepette varsa, miktarını güncelle
      setCart(prevCart => prevCart.map((item, index) => 
        index === existingProductIndex ? {...item, quantity: (item.quantity || 1) + 1} : item
      ));
    } else {
      // Ürün sepette yoksa, yeni bir ürün ekle (miktar 1 olarak)
      setCart([...cart, {...product, quantity: 1}]); 
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
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