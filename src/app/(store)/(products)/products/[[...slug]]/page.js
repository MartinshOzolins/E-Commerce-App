//# Catalog page (Product Listings)

// api functions
import { fetchProducts } from "@/app/utils/fetchProducts";
import LoadMore from "@/components/LoadMore";

//components
import SortingFilters from "@/components/SearchFilters";
import SingleProductCard from "@/components/SingleProductCard";

export default async function ProductCatalog({ params, searchParams }) {
  //extracts url params /params
  const { slug } = await params;
  // extracts searchParams ?param=value
  const sortingParams = await searchParams;
  let sortValue;
  // extracts sortBy params
  if (sortingParams) {
    sortValue = sortingParams.sortBy;
  }
  // fetches all products based on params
  const { products, error } = await fetchProducts({
    category: slug?.[0] || null,
    sortBy: sortValue || null,
    skipped: 30,
  });

  return (
    <>
      {error ? (
        <div className="w-full text-center pt-10">
          <h2 className="text-2xl font-semibold pb-3">{error}</h2>
          <p>
            Try searching again, we&apos;re sure you&apos;ll find something you
            need!
          </p>
        </div>
      ) : null}
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
