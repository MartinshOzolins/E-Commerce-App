// components
import CategoryFilter from "../../filters/CategoryFilter";

// Next.js  components
import Link from "next/link";

export default function MenuOptions({ toggleModal, categories }) {
  return (
    <>
      <CategoryFilter categories={categories} toggleModal={toggleModal} />
      <Link
        href="/products"
        className="hover:cursor-pointer"
        onClick={() => toggleModal(false)}
      >
        Browse All Products
      </Link>
      <Link
        href="/shipping-information"
        className="hover:cursor-pointer"
        onClick={() => toggleModal(false)}
      >
        Shipping
      </Link>
      <Link
        href="/return-policy"
        className="hover:cursor-pointer"
        onClick={() => toggleModal(false)}
      >
        Return Policy
      </Link>
      <Link
        href="/contact"
        className="hover:cursor-pointer"
        onClick={() => toggleModal(false)}
      >
        Contact Us
      </Link>
    </>
  );
}
