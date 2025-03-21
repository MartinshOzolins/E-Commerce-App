// # Server Component (Handles auth state & cart updates)

// components
import SearchFilter from "../filters/SearchFilter";

// Clerk components
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

// Next.js components
import Link from "next/link";

// api func
import { fetchCategories } from "../../utils/fetchFunctions";

// components
import SmallNavBar from "./SmallNavBar";
import CategoryFilter from "../filters/CategoryFilter";
import CartIcon from "../cart/CartIcon";

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
          <h1 className="text-2xl sm:text-3xl text-blue-900 font-semibold ">
            GoodsHub
          </h1>
        </Link>

        {/* Search Bar Section */}
        <div className="flex-1 flex justify-center pl-1">
          <SearchFilter searchIconSize="32px" />
        </div>

        {/* Auth and Cart Section */}
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton className="text-sm sm:text-base md:text-lg hover:text-blue-700 transition duration-200">
              Sign In
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center space-x-3">
              <SignOutButton className="text-sm sm:text-base md:text-lg hover:text-blue-700 transition duration-200 hover:cursor-pointer">
                Sign Out
              </SignOutButton>
              <Link
                href="/user-profile"
                className="text-sm sm:text-base md:text-lg hover:text-blue-700 transition duration-200"
              >
                Profile
              </Link>
            </div>
          </SignedIn>

          {/* Cart Icon */}
          <CartIcon />
        </div>
      </div>

      {/* Navbar Links Section */}
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

      {/* Subtle Divider */}
      <div className="h-[1px] bg-blue-100 w-full mt-3" />
    </header>
  );
}
