// # Server Component (Handles auth state & cart updates)

// mui components
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SmallNavBar from "./SmallNavBar";

//Clerk components
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

//Next.js components
import Link from "next/link";

export default function NavBar() {
  return (
    <>
      {/* Navbar for Small Screens */}
      <SmallNavBar />
      {/* Nabar from Small Screens */}
      <div className="grid grid-cols-4 p-2 hidden sm:grid">
        <div className="col-span-1 pl-1 md:pl-2 pt-2">
          <h1 className="text-2xl sm:text-3xl text-blue-900 ">GoodsHub</h1>
        </div>
        <div className="col-span-2 text-center pt-4">
          <input
            type="text"
            className="border border-gray-400 px-1 py-1 h-7 w-2/3 outline-none"
            style={{ maxWidth: "480px" }}
            placeholder="Search products..."
          />
          <SearchIcon
            sx={{ width: "32px" }}
            className="hover:cursor-pointer w-1/3"
          />
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
      <div className="flex flex-row w-full justify-start pl-2 pt-2 space-x-5 hidden sm:flex text-blue-900">
        <p className="hover:cursor-pointer">
          Shop by Category <ArrowDropDownIcon />
        </p>
        <p className="hover:cursor-pointer">Browse All Products</p>
        <p className="hover:cursor-pointer">Shipping</p>
        <p className="hover:cursor-pointer">Return Policy</p>
      </div>
      <div className="h-[2px] bg-blue-800 w-full" />
    </>
  );
}
