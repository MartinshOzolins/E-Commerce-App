"use client";

import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the CartContext
export const useCartContext = () => useContext(CartContext);
