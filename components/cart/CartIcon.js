"use client";

import { useEffect, useState } from "react";

// mui components
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// context hooks
import { useCartContext } from "../../contexts/CartContextProvider";

// components
import CartModal from "./CartModal";

export default function CartIcon() {
  const { cartItems, setCartItems, isCartOpen, setIsCartOpen } =
    useCartContext();

  useEffect(() => {
    // On page load, checks if there are saved items
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    if (cartItems.length === 0) {
      setCartItems(storedItems); // Retrieves cart from storage
    }
  }, []);

  useEffect(() => {
    // Every time cartItems changes, updates localStorage
    if (cartItems.length > 0) {
      localStorage.setItem("items", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <>
      {isCartOpen && <CartModal />}
      <div className="relative pr-2">
        {cartItems.length > 0 && (
          <span className="absolute -top-2 left-3 flex items-center justify-center h-5 w-5 text-xs font-semibold text-white bg-blue-800 rounded-full">
            {cartItems.reduce((accum, product) => accum + product.quantity, 0)}
          </span>
        )}
        <ShoppingCartIcon
          sx={{ width: "28px", height: "28px" }}
          className="hover:cursor-pointer"
          onClick={() => setIsCartOpen(true)}
        />
      </div>
    </>
  );
}
