"use client";

import { createContext, useContext, useState } from "react";

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [params, setParams] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  return (
    <ProductContext.Provider
      value={{
        fetchedProducts,
        setFetchedProducts,
        params,
        setParams,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook to use the CartContext
export const useProductContext = () => useContext(ProductContext);
