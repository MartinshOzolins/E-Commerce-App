//# Server Component (Product Display)
"use client";

// Next.js components
import Image from "next/image";
import Link from "next/link";

// MUI components
import { Rating } from "@mui/material";

// helper function
import { fixRatingValue } from "../utils/fixRatingValue";

// context custom hook
import { useCartContext } from "../contexts/CartContextProvider";

// helper function to check quantity and update cart proplery
import { updateProductQuantity } from "../utils/quantityUtils";

export default function SingleProductCard({ product }) {
  // converts rating value
  const rating = fixRatingValue(String(product.rating));

  //  cart context
  const { cartItems, setCartItems, isCartOpen, setIsCartOpen } =
    useCartContext();

  return (
    <div className="flex flex-col w-full h-96 border border-gray-300 p-2 max-w-[280px]">
      {/* Make only image & title clickable */}
      <Link href={`/single-product/${product.id}`} className="h-1/2 relative">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-col items-start text-base h-1/2 px-3">
        <Link
          href={`/single-product/${product.id}`}
          className="truncate text-start max-w-full font-semibold"
        >
          <h2 className="truncate">{product.title}</h2>
        </Link>
        <div className="flex flex-col w-full justify-start items-start h-1/2">
          <p>{product.brand}</p>
          <p>{product.price}</p>
        </div>
        <div className="flex flex-col justify-end h-1/2 w-full">
          <div className="flex w-full justify-start items-center pb-1">
            <Rating
              size="small"
              readOnly
              value={rating}
              defaultValue={5}
              precision={0.5}
              max={5}
            />
            <p>({product?.reviews.length})</p>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              className="w-full py-2 px-2 bg-blue-900 text-white hover:cursor-pointer hover:border duration-100 hover:bg-blue-800
              transform hover:-translate-y-[1px]"
              onClick={() =>
                setCartItems((prev) => updateProductQuantity(prev, product))
              }
            >
              ADD TO BASKET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
