"use client";

import { fetchProduct } from "../../utils/fetchFunctions";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OrderedProductList({ productsToFetch }) {
  const [showProducts, setShowProducts] = useState(false);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (showProducts && !hasFetched) {
      const getOrderedProducts = async () => {
        try {
          const products = await Promise.all(
            productsToFetch.map((item) => fetchProduct(item.id))
          );
          setOrderedProducts(products);
          setHasFetched(true);
        } catch (error) {
          setIsError(true);
        }
      };
      getOrderedProducts();
    }
  }, [showProducts, hasFetched, productsToFetch]);

  if (!productsToFetch || productsToFetch.length === 0) return null;

  return (
    <div>
      {!showProducts ? (
        <p>
          View Products:{" "}
          <ArrowDropDownIcon
            onClick={() => setShowProducts(true)}
            className="hover:cursor-pointer"
          />
        </p>
      ) : (
        <>
          <p>
            View Products:{" "}
            <ArrowDropUpIcon
              onClick={() => setShowProducts(false)}
              className="hover:cursor-pointer"
            />
          </p>
          {isError ? (
            <p className="text-red-500 text-sm sm:text-base">
              Oops! Something went wrong while fetching the products. Please try
              again later.
            </p>
          ) : null}
          {orderedProducts.length > 0 ? (
            <div className="flex flex-col text-xs sm:text-base">
              {orderedProducts.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex flex-row h-20 sm:h-40 mb-2"
                >
                  <Image
                    className="w-full max-w-[80px] sm:max-w-[200px] border-gray-200 border m-1"
                    alt={item.product.title}
                    src={item.product.thumbnail}
                    style={{
                      objectFit: "contain",
                    }}
                    width={200}
                    height={200}
                  />
                  <div className="w-full sm:pl-2 sm:pt-2 ">
                    <p className="">
                      ID: {item.product.id}, Title: {item.product.title}
                    </p>
                    <p>
                      Quantity:{" "}
                      {
                        productsToFetch.find((it) => it.id === item.product.id)
                          ?.quantity
                      }
                    </p>
                    <p>Price: ${item.product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </div>
  );
}
