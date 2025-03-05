//# Single Product Details Page

// Next.js componnets
import Image from "next/image";
import { Rating } from "@mui/material";

// helper function
import { fixRatingValue } from "@/app/utils/fixRatingValue";

// api function
import { fetchProduct } from "@/app/utils/fetchProducts";

export default async function SingleProductDetails({ params }) {
  const { productId } = await params;

  const { error, product } = await fetchProduct(productId);

  const rating = fixRatingValue(product.rating);

  return (
    <div className="flex flex-col w-full h-full border border-gray-300 p-2 mt-5 ">
      <div className="h-1/2 relative m-h-[400px]">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          // width="400"
          // height="400"
          className="object-contain"
        />
      </div>
      <div className="flex flex-col text-base px-3">
        <div className="flex flex-col w-full justify-start pb-1">
          <h2 className=" truncate text-center max-w-full font-semibold ">
            {product.title}
          </h2>
          <div className="flex">
            <Rating
              size="medium"
              readOnly
              value={rating}
              defaultValue={5}
              precision={0.5}
              max={5}
            />
            <p>({product?.reviews.length})</p>
          </div>
        </div>
        <div className="flex flex-col justify-center  w-full pt-1">
          <p className="">${product.price}</p>
          <div className="w-full flex justify-center items-center">
            <button className="w-full py-2 px-2 bg-blue-900 text-white">
              ADD TO BASKET
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full pt-5 px-2 ">
        <h2 className="font-semibold">Product Details:</h2>
        <p>Brand: {product.brand}</p>
        <p>{product.description}</p>
      </div>
      <div className="w-full flex flex-col px-2 pt-2">
        <h2 className="font-semibold">Overall Rating:</h2>
        <div className="flex items-center pb-2">
          <p className="text-3xl h-full">{rating}</p>
          <div className="flex flex-col items-start h-full pl-1">
            <Rating
              size="small"
              readOnly
              value={rating}
              defaultValue={5}
              precision={0.5}
              max={5}
            />
            <p className="text-xs  font-semibold">
              {product?.reviews.length > 1
                ? `${product?.reviews.length} reviews`
                : `${product?.reviews.length} review`}
            </p>
          </div>
        </div>
        {product.reviews.length > 0 ? (
          <>
            <div className="w-full h-[1px] bg-gray-400 mb-2 "></div>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 space-y-5">
              {product.reviews.map((review, index) => (
                <div key={index} className="grid-span-1">
                  <Rating
                    size="small"
                    readOnly
                    value={review.rating}
                    defaultValue={5}
                    precision={0.5}
                    max={5}
                  />
                  <p className="">{review.comment}</p>
                  <p>{review.reviewerName.split(" ")[0]}</p>
                  <p> {new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
