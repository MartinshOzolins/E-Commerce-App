"use client";

import { useEffect } from "react";

// MUI components
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
    const storedItems = localStorage.getItem("items");

    // Parses the items once and check if they exist and have a length greater than 0
    const parsedItems = storedItems ? JSON.parse(storedItems) : [];

    if (parsedItems.length > 0 && cartItems.length === 0) {
      // Updates cart from storage if it's empty
      setCartItems(parsedItems);
    }
  }, []);

  useEffect(() => {
    // Every time cartItems changes, updates localStorage
    localStorage.setItem("items", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "clearContext" && event.newValue === "true") {
        setTimeout(() => {
          setCartItems([]);
          localStorage.removeItem("clearContext");
        }, 0);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
