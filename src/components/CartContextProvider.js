"use client";

import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the CartContext
export const useCartContext = () => useContext(CartContext);
