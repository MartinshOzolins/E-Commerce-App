"use client";

// context hook
import { useCartContext } from "../../contexts/CartContextProvider";

// helper function to check quantity and update cart proplery
import { updateProductQuantity } from "../../utils/quantityUtils";

export default function AddButton({ product }) {
  //  cart context
  const { setCartItems } = useCartContext();

  return (
    <button
      className="w-full py-3 px-3 bg-blue-900 text-white hover:bg-white hover:text-blue-900 hover:cursor-pointer  hover:border-blue-900 hover:border duration-100 max-w-4xl rounded "
      onClick={() =>
        setCartItems((prev) => updateProductQuantity(prev, product))
      }
    >
      ADD TO BASKET
    </button>
  );
}
