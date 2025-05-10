import React, { createContext, useContext, useState } from 'react';

// Tạo context
const CartContext = createContext();

// Custom hook để sử dụng cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Tính tổng giá trị giỏ hàng
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Giá trị và functions được cung cấp bởi context
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartQuantity,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
