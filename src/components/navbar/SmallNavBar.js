"use client";

import { useState } from "react";

// mui components
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

// Next.js components
import Link from "next/link";

export default function SmallNavBar() {
  const [modalOpen, setModalOpen] = useState(false);

  // Toggle the modal state when the menu icon is clicked
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <>
      {/* For Mobile Screens */}
      <div className="grid grid-cols-3 p-2 pt-3 sm:hidden">
        <div className="col-span-1 flex flex-row items-center">
          <MenuIcon className="hover:cursor-pointer" onClick={toggleModal} />
          <h1 className="text-xl sm:text-3xl text-blue-900 font-semibold">
            GoodsHub
          </h1>
        </div>
        <div className="col-span-2 text-center flex flex-row items-center justify-center ">
          <input
            type="text"
            className="border border-gray-400 px-1 py-1 h-7 w-2/3 outline-none"
            style={{ maxWidth: "480px" }}
            placeholder="Search products..."
          />
          <SearchIcon
            sx={{ width: "24px" }}
            className="w-1/3 hover:cursor-pointer"
          />
          <ShoppingCartIcon
            sx={{ width: "24px" }}
            className="hover:cursor-pointer ml-auto"
          />
        </div>
      </div>
      {/* Full-Screen Modal for Small Screens */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div
            className="bg-white p-6 rounded-lg w-full h-full relative flex flex-col space-y-4 items-start"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner modal click
          >
            <div className="flex flex-row w-full justify-between">
              <h1 className="text-2xl sm:text-3xl text-blue-900 font-semibold">
                GoodsHub
              </h1>
              <button className="" onClick={toggleModal}>
                <CloseIcon />
              </button>
            </div>

            {/* Menu Options */}
            <div className="flex flex-col space-y-3 text-blue-900">
              <p className="hover:cursor-pointer text-lg">
                Shop by Category <ArrowDropDownIcon />
              </p>
              <p className="hover:cursor-pointer text-lg">
                Browse All Products
              </p>
              <p className="hover:cursor-pointer text-lg">Shipping</p>
              <p className="hover:cursor-pointer text-lg">Return Policy</p>
              <div>
                <SignedOut>
                  <SignInButton className="text-lg">Sign In</SignInButton>
                </SignedOut>
                <SignedIn>
                  <SignOutButton className="text-lg">Sign In</SignOutButton>
                  <Link href="/user-profile">Profile</Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
