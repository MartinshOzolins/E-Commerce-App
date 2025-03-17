"use client";

import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchInputSearch, fetchProducts } from "../utils/fetchFunctions";
import { useParams, useSearchParams } from "next/navigation";

import SingleProductCard from "./SingleProductCard";

function LoadMore() {
  const { ref, inView } = useInView();
  const [products, setProducts] = useState([]);
  const [isNext, setIsNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [productsSkipped, setProductsSkipped] = useState(0); // State instead of global variable

  // Extracts existing URL params and search params
  const { slug } = useParams();
  const searchParams = useSearchParams();

  // Fetch function moved outside useEffect
  const fetchFunction = async () => {
    if (!isNext || isLoading) return; // Prevents multiple requests

    setIsLoading(true);

    // Check if search query exists
    const queryParam = searchParams.get("q"); // input search adds q=value to the urlSearchParams
    const category = slug?.[0] || null;
    const sortBy = searchParams.get("sortBy") || null;

    let newProducts = [];
    let isNextAvailable = true;

    if (queryParam) {
      // Use search query if available
      const response = await fetchInputSearch({
        input: queryParam,
        sortBy,
        skipped: productsSkipped + 15,
      });

      newProducts = response.products || [];
      isNextAvailable = response.isNextAvailable;
    } else {
      // Otherwise, use category-based fetch

      const response = await fetchProducts({
        category,
        sortBy,
        skipped: productsSkipped + 15,
      });

      newProducts = response.products || [];
      isNextAvailable = response.isNextAvailable;
    }

    if (newProducts.length > 0) {
      setProducts((prev) => [...prev, ...newProducts]);
      setProductsSkipped((prev) => prev + 15); // Increase skipped count
    }

    if (!isNextAvailable) setIsNext(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView) {
      fetchFunction();
    }
  }, [inView]); // Triggers only when `inView` changes

  return (
    <>
      {products.length > 0 && (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 justify-items-center p-3 pt-3">
          {products.map((product) => (
            <SingleProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <section className="flex justify-center items-center w-full">
        {isNext && (
          <div ref={ref}>
            <Image
              src="/spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        )}
      </section>
    </>
  );
}

export default LoadMore;
