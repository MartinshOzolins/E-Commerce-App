// # Server Component for catalog grid

import LoadMore from "./LoadMore";

//components
import SortingFilters from "@/components/filters/SearchFilters";
import SingleProductCard from "./SingleProductCard";

export default function ProductGrid({ products }) {
  return (
    <>
      {products ? (
        <>
          <SortingFilters />
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 justify-items-center p-3 pt-3">
            {products.map((product) => (
              <SingleProductCard key={product.id} product={product} />
            ))}
          </div>
          <LoadMore />
        </>
      ) : null}
    </>
  );
}
