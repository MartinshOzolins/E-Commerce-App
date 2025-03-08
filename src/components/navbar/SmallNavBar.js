"use client";

import { useState } from "react";

// mui components
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// components
import CategoryFilter from "../filters/CategoryFilter";
// Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

// Next.js components
import Link from "next/link";
import SearchFilter from "../filters/SearchFilter";

export default function SmallNavBar({ categories }) {
  const [modalOpen, setModalOpen] = useState(false);

  // Toggle the modal state when the menu icon is clicked
  const toggleModal = (action) => {
    setModalOpen(action);
  };
  return (
    <>
      {/* For Mobile Screens */}
      <div className="grid grid-cols-3 p-2 pt-3 sm:hidden">
        <div className="col-span-1 flex flex-row items-center">
          <MenuIcon
            className="hover:cursor-pointer"
            onClick={() => toggleModal(true)}
          />
          <h1 className="text-xl sm:text-3xl text-blue-900 font-semibold">
            GoodsHub
          </h1>
        </div>
        <div className="col-span-2 text-center flex flex-row items-center justify-center ">
          <SearchFilter searchIconSize="24px" />
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
              <Link
                href="/"
                className="hover:cursor-pointer"
                onClick={() => toggleModal(false)}
              >
                <h1 className="text-2xl sm:text-3xl text-blue-900 font-semibold">
                  GoodsHub
                </h1>
              </Link>

              <button className="" onClick={() => toggleModal(false)}>
                <CloseIcon />
              </button>
            </div>

            {/* Menu Options */}
            <div className="flex flex-col space-y-3 text-blue-900 text-md">
              <CategoryFilter
                categories={categories}
                toggleModal={toggleModal}
              />
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
              <div>
                <SignedOut>
                  <SignInButton className="hover:cursor-pointer">
                    Sign In
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <SignOutButton className="hover:cursor-pointer">
                    Sign In
                  </SignOutButton>
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
