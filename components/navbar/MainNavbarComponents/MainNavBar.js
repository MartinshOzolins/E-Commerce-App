// # Server Component (Handles auth state & cart updates)

// Next.js components
import Link from "next/link";

// api func
import { fetchCategories } from "../../../utils/fetchFunctions";

// components
import SmallNavBar from "../SmallNavbarComponents/SmallNavBar";
import NavLinks from "./NavLinks";
import CartIcon from "../../cart/CartIcon";
import SearchFilter from "../../filters/SearchFilter";
import UserAuthOptions from "./UserAuthOptions";

export default async function NavBar() {
  // fetch available categories
  const { categories } = await fetchCategories();

  return (
    <header>
      {/* Navbar for Small Screens */}
      <SmallNavBar categories={categories} />

      {/* Navbar for Larger Screens */}
      <div className="w-full h-20 flex items-center justify-between px-6 hidden sm:flex">
        <Link href="/" className="w-28">
          <h1 className="text-2xl sm:text-3xl text-blue-900 font-semibold caveat-italic">
            GoodsHub
          </h1>
        </Link>

        {/* Search Bar Section */}
        <div className="flex-1 flex justify-center pl-1">
          <SearchFilter searchIconSize="32px" />
        </div>

        {/* Auth and Cart Section */}
        <div className="flex items-center space-x-4">
          {/* Auth options and User button */}
          <UserAuthOptions />

          {/* Cart Icon */}
          <CartIcon />
        </div>
      </div>

      {/* Navbar Links Section */}
      <NavLinks categories={categories} />

      {/* Subtle Divider */}
      <div className="h-[1px] bg-blue-100 w-full mt-3" />
    </header>
  );
}
