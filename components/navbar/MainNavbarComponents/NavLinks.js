// components
import CategoryFilter from "../../filters/CategoryFilter";

// Next.js components
import Link from "next/link";

export default function NavLinks({ categories }) {
  return (
    <div className="flex flex-row w-full justify-start pl-4 pt-2 space-x-5 hidden sm:flex text-blue-900 font-semibold ">
      <CategoryFilter categories={categories} />
      <Link
        href="/products"
        className="hover:cursor-pointer hover:text-blue-700 transition duration-200 select-category"
      >
        Browse All Products
      </Link>
      <Link
        href="/shipping-information"
        className="hover:cursor-pointer hover:text-blue-700 transition duration-200 select-category"
      >
        Shipping
      </Link>
      <Link
        href="/return-policy"
        className="hover:cursor-pointer hover:text-blue-700 transition duration-200 select-category"
      >
        Return Policy
      </Link>
      <Link
        href="/contact"
        className="hover:cursor-pointer hover:text-blue-700 transition duration-200 select-category"
      >
        Contact Us
      </Link>
    </div>
  );
}
