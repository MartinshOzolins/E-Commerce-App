// components
import NavLinkItem from "./NavLinkItem";
import CategoryFilter from "../../filters/CategoryFilter";

export default function NavLinks({ categories }) {
  return (
    <div className="flex flex-row w-full justify-start pl-4 pt-2 space-x-5 hidden sm:flex text-blue-900 font-semibold ">
      <CategoryFilter categories={categories} />
      <NavLinkItem href="/products">Browse All Products</NavLinkItem>
      <NavLinkItem href="/shipping-information">Shipping</NavLinkItem>
      <NavLinkItem href="/return-policy">Return Policy</NavLinkItem>
      <NavLinkItem href="/contact">Contact Us</NavLinkItem>
    </div>
  );
}
