// # Server Component (Handles auth state & cart updates)

// mui components
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SmallNavBar from "./SmallNavBar";

// components
import SearchFilter from "../filters/SearchFilter";

//Clerk components
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

//Next.js components
import Link from "next/link";

// api func
import { fetchCategories } from "@/app/utils/fetchFunctions";

import CategoryFilter from "../filters/CategoryFilter";

export default async function NavBar() {
  // fetch available categories
  const { categories } = await fetchCategories();

  return (
    <>
      {/* Navbar for Small Screens */}
      <SmallNavBar categories={categories} />
      {/* Navbar from Small Screens */}
      <div className="grid grid-cols-4 p-2 hidden sm:grid">
        <div className="col-span-1 pl-1 md:pl-2 pt-2">
          <h1 className="text-2xl sm:text-3xl text-blue-900 ">GoodsHub</h1>
        </div>
        <div className="col-span-2 text-center pt-4">
          <SearchFilter searchIconSize="32px" />
        </div>
        <div className="col-span-1 pt-4 pr-2 md:pr-5 lg:pr-10">
          <div className="w-full flex flex-row justify-end items-center">
            <SignedOut>
              <SignInButton className="text-base md:text-lg pr-2">
                Sign In
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton className="hover:cursor-pointer text-base md:text-lg pr-2">
                Sign Out
              </SignOutButton>
              <Link href="/user-profile" className="text-lg md:text-lg pr-2">
                Profile
              </Link>
            </SignedIn>
            <ShoppingCartIcon
              sx={{ width: "24px" }}
              className="hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start pl-4 pt-2 space-x-5 hidden sm:flex text-blue-900">
        <CategoryFilter categories={categories} />
        <Link href="/products" className="hover:cursor-pointer">
          Browse All Products
        </Link>
        <Link href="/shipping-information" className="hover:cursor-pointer">
          Shipping
        </Link>
        <Link href="/return-policy" className="hover:cursor-pointer">
          Return Policy
        </Link>
      </div>
      <div className="h-[2px] bg-blue-100 w-full" />
    </>
  );
}
