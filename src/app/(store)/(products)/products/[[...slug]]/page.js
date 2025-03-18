//# Catalog page (Product Listings)

// api functions
import {
  fetchInputSearch,
  fetchProducts,
} from "../../../../../../utils/fetchFunctions";
import LoadMore from "../../../../../../components/LoadMore";

//components
import SortingFilters from "../../../../../../components/filters/SortingFilters";
import SingleProductCard from "../../../../../../components/SingleProductCard";

export default async function ProductCatalog({ params, searchParams }) {
  //extracts url params /params
  const { slug } = await params;
  // extracts searchParams ?param=value
  const sortingParams = await searchParams;

  // extracts sortBy params
  let sortByValue;
  if (sortingParams) {
    sortByValue = sortingParams.sortBy;
  }
  let inputSearchValue;
  if (sortingParams.q) {
    inputSearchValue = sortingParams.q;
  }

  // if inputSearchValue exists, we use input based fetching, otherwise fetchProducts based on params and sorting filters
  const { products, error } = inputSearchValue
    ? await fetchInputSearch({
        input: inputSearchValue,
        sortBy: sortByValue || null,
        skipped: 0,
      })
    : await fetchProducts({
        category: slug?.[0] || null,
        sortBy: sortByValue || null,
        skipped: 0,
      });

  // fetches all products based on urlParams

  return (
    <>
      {error ? (
        <div className="w-full text-center pt-10 min-h-screen">
          <h2 className="text-2xl font-semibold pb-3">{error}</h2>
          <p>
            Try searching again, we&apos;re sure you&apos;ll find something you
            need!
          </p>
        </div>
      ) : null}
      {products ? (
        <>
          <SortingFilters
            currParams={slug?.[0]}
            currSearchParams={sortingParams}
          />
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
