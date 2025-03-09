"use client";

// mui components
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// context hooks
import { useCartContext } from "../../contexts/CartContextProvider";

// components
import CartModal from "./CartModal";

export default function CartIcon() {
  // cart context
  const { cartItems, setCartItems, isCartOpen, setIsCartOpen } =
    useCartContext();

  return (
    <>
      {isCartOpen ? <CartModal /> : null}
      <ShoppingCartIcon
        sx={{ width: "24px" }}
        className="hover:cursor-pointer"
        onClick={() => setIsCartOpen(true)}
      />
    </>
  );
}
