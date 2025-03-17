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
      <div className="relative">
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 text-xs font-semibold text-white bg-blue-800 rounded-full">
            {cartItems.reduce((accum, product) => product.quantity + accum, 0)}
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
