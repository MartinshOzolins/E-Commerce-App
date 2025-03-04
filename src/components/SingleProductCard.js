//# Server Component (Product Display)

// Next.js components
import Image from "next/image";

// MUI components
import { Rating } from "@mui/material";

const fixRatingValue = (rating) => {
  //converts from string to number
  const numericRating = parseFloat(rating);

  // gets first and second parts of rating
  const integerPart = Math.floor(numericRating);
  const decimalPart = numericRating - integerPart;

  if (decimalPart >= 0.75) return integerPart + 1;
  if (decimalPart >= 0.35 && decimalPart < 0.75) return integerPart + 0.5;
  return integerPart;
};

export default function SingleProductCard({ product }) {
  const rating = fixRatingValue(String(product.rating));
  return (
    <div className="flex flex-col w-full h-96 border border-gray-300 p-2 max-w-[280px]">
      <div className="h-1/2 relative">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          // width="400"
          // height="400"
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-start text-base h-1/2 px-3">
        <h2 className="truncate text-start max-w-full font-semibold ">
          {product.title}
        </h2>
        <div className="flex flex-col w-full justify-start items-start h-1/2">
          <p>{product.brand}</p>
          <p className="">{product.price}</p>
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
            <p>({product?.reviews.length + Math.floor(Math.random() * 10)})</p>
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="w-full py-2 px-2 bg-blue-900 text-white">
              ADD TO BASKET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
