// # Server Component for catalog grid

// api functions
import { fetchProducts } from "@/app/utils/fetchProducts";
import LoadMore from "@/components/LoadMore";

//components
import SortingFilters from "@/components/SearchFilters";
import SingleProductCard from "@/components/SingleProductCard";

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
