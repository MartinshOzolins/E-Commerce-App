import { Rating } from "@mui/material";

// helper function
import { fixRatingValue } from "../../../../../../utils/fixRatingValue";

// api function
import { fetchProduct } from "../../../../../../utils/fetchFunctions";

//components
import SwiperComponent from "../../../../../../components/productDetailsComponents/SwiperComponentSingleProduct";

//Next.js functions
import { notFound } from "next/navigation";
import AddButton from "../../../../../../components/productDetailsComponents/AddButton";

export default async function SingleProductDetails({ params }) {
  const { productId } = await params;

  const { error, product } = await fetchProduct(productId);

  // if fetchFn returns error prop, notFound() func is invoked
  if (error) {
    notFound();
  }

  const rating = fixRatingValue(product.rating);

  return (
    <div className="flex flex-col w-full min-h-screen px-2 mt-5 ">
      <SwiperComponent product={product} />
      <div className="flex flex-col text-base px-3">
        <div className="flex flex-col w-full justify-start pb-2">
          <h2 className="truncate text-center max-w-full font-semibold text-lg">
            {product.title}
          </h2>
          <div className="flex justify-center items-center gap-1">
            <Rating
              size="medium"
              readOnly
              value={rating}
              precision={0.5}
              max={5}
            />
            <p className="text-sm text-gray-600">({product?.reviews.length})</p>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full pt-3">
          <p className="text-center text-lg font-semibold">${product.price}</p>
          <div className="w-full flex justify-center items-center mt-2">
            <AddButton product={product} />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full pt-5 px-2">
        <h2 className="font-semibold lg:text-lg">Product Details:</h2>
        <p className="text-sm lg:text-lg text-gray-700">{product.brand}</p>
        <p className="text-sm text-gray-700 lg:text-base">
          {product.description}
        </p>
      </div>
      <div className="w-full flex flex-col px-2 pt-4 ">
        <h2 className="font-semibold lg:text-lg">Overall Rating:</h2>
        <div className="flex items-center pb-2 ">
          <p className="text-3xl lg:text-4xl font-bold">{rating}</p>
          <div className="flex flex-col items-start pl-2">
            <Rating
              size="small md:medium"
              readOnly
              value={rating}
              precision={0.5}
              max={5}
            />
            <p className="text-xs font-semibold lg:text-base">
              {product?.reviews.length > 1
                ? `${product?.reviews.length} reviews`
                : `${product?.reviews.length} review`}
            </p>
          </div>
        </div>
        {product.reviews.length > 0 && (
          <>
            <div className="w-full h-[1px] bg-gray-400 mb-3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
              {product.reviews.map((review, index) => (
                <div key={index} className="p-2 border border-gray-300">
                  <Rating
                    size="small"
                    readOnly
                    value={review.rating}
                    precision={0.5}
                    max={5}
                  />
                  <p className="text-sm lg:text-base text-gray-700 mt-1">
                    {review.comment}
                  </p>
                  <p className="text-xs lg:text-base text-gray-500 font-semibold">
                    {review.reviewerName.split(" ")[0]}
                  </p>
                  <p className="text-xs lg:text-base text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
