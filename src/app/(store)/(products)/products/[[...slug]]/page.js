//# Catalog page (Product Listings)

// api functions
import { fetchProducts } from "@/app/utils/fetchProducts";
import SingleProductCard from "@/components/SingleProductCard";

export default async function ProductCatalog({ params }) {
  //extracts url params
  const { slug } = await params;
  // fetches all products
  const products = await fetchProducts({
    category: slug[0],
    sortBy: slug[1],
    order: slug[2],
  });
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 justify-items-center p-3 pt-5">
      {products.map((product) => (
        <SingleProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
