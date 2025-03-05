//# Catalog page (Product Listings)

// api functions
import { fetchProducts } from "@/app/utils/fetchProducts";
import SingleProductCard from "@/components/SingleProductCard";

export default async function ProductCatalog({ params }) {
  //extracts url params
  const { slug } = await params;

  // fetches all products
  const { products, error } = await fetchProducts({
    category: slug?.[0] || undefined,
    sortBy: slug?.[1] || undefined,
    order: slug?.[2] || undefined,
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
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 justify-items-center p-3 pt-5">
          {products.map((product) => (
            <SingleProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : null}
    </>
  );
}
