import { Rating } from "@mui/material";

export default function ProductRating({ product, rating }) {
  return (
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
  );
}
