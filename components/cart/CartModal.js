"use client";

import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

// custom hook for cart context
import { useCartContext } from "../../contexts/CartContextProvider";

// helper func for product quantity change
import {
  decreaseProductQuantity,
  updateProductQuantity,
} from "../../utils/quantityUtils";

// Next.js components
import Link from "next/link";

export default function CartModal() {
  //  cart context
  const { cartItems, setCartItems, isCartOpen, setIsCartOpen } =
    useCartContext();

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      {/* Black background with opacity */}
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40 z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* White modal positioned on the right side for medium screens and above */}
      <div className="fixed right-0 top-0 w-full md:w-[400px] bg-gray-100 h-full flex flex-col shadow-lg z-50 mr-0">
        <div className="w-full h-13 bg-white mb-5 flex items-center">
          <div className="w-full h-full flex justify-start pl-3 border-r border-gray-300 items-center">
            <h2 className="">
              Your basket (
              {cartItems.reduce(
                (accum, product) => product.quantity + accum,
                0
              )}{" "}
              items)
            </h2>
          </div>
          <button
            className="p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsCartOpen(false)}
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto space-y-3 px-2 bg-gray-100">
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div
                key={product.id}
                className="flex items-center p-4 rounded-lg shadow-sm bg-white"
              >
                <Link
                  href={`/single-product/${product.id}`}
                  className="w-20 h-20 relative"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </Link>

                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-gray-600">${product.price}</p>
                  <div className="flex flex-col justify-center items-start mt-2 ">
                    <p className="text-xs text-gray-500 ">Quantity</p>
                    <div className="flex flex-row items-center ">
                      <button
                        onClick={() =>
                          setCartItems((prev) =>
                            decreaseProductQuantity(prev, product)
                          )
                        }
                        className="text-sm bg-gray-300 py-1 px-4 rounded hover:cursor-pointer"
                        disabled={product.quantity === 1}
                      >
                        -
                      </button>
                      <span className="text-base text-gray-500 px-1">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() =>
                          setCartItems((prev) =>
                            updateProductQuantity(prev, product)
                          )
                        }
                        className="text-sm bg-gray-300 py-1 px-4 rounded hover:cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-sm text-red-600 hover:text-red-800 font-medium mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Total and Checkout */}
        <div className="p-4 border-t">
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total:</span>
            <span>${total}</span>
          </div>
          <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
            <button
              className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-white hover:text-blue-900 transition hover:cursor-pointer hover:border hover:border-blue-900"
              disabled={cartItems.length == 0}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
