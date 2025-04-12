"use client";

import { useState } from "react";

// mui components
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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

// components
import CartIcon from "../cart/CartIcon";

export default function SmallNavBar({ categories }) {
  const [modalOpen, setModalOpen] = useState(false);

  // Toggle the modal state when the menu icon is clicked
  const toggleModal = (action) => {
    setModalOpen(action);
  };

  // Close modal when clicking outside of it
  const closeModalOnClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <>
      {/* For Mobile Screens */}
      <div className="flex p-2 pt-3 sm:hidden w-full justify-between">
        <div className="flex flex-row items-center w-10">
          <MenuIcon
            className="hover:cursor-pointer"
            onClick={() => toggleModal(true)}
            aria-label="Open Menu"
          />
        </div>
        <div className="flex-1 text-center flex flex-row items-center justify-center ">
          <SearchFilter searchIconSize="24px" />
        </div>
        <div className="flex items-center justify-center">
          <CartIcon />
        </div>
      </div>

      {/* Full-Screen Modal for Small Screens */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center sm:hidden"
          onClick={closeModalOnClickOutside} // Close modal on click outside
        >
          <div
            className="bg-white p-6 w-full h-full relative flex flex-col space-y-4 items-start"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner modal click
          >
            <div className="flex flex-row w-full justify-between items-center">
              <Link
                href="/"
                className="hover:cursor-pointer"
                onClick={() => toggleModal(false)}
              >
                <h1 className="text-2xl sm:text-3xl text-blue-900  caveat-italic">
                  GoodsHub
                </h1>
              </Link>

              <button
                className="text-blue-900"
                onClick={() => toggleModal(false)}
                aria-label="Close Menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Menu Options */}
            <div className="flex flex-col space-y-3 text-blue-900 text-md select-category-small">
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
              <Link
                href="/contact"
                className="hover:cursor-pointer"
                onClick={() => toggleModal(false)}
              >
                Contact Us
              </Link>

              <div className="flex flex-col space-y-2">
                <SignedOut>
                  <SignInButton className="hover:cursor-pointer text-left">
                    Sign In
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <SignOutButton
                    className="hover:cursor-pointer text-left"
                    onClick={() => toggleModal(false)}
                  >
                    Sign Out
                  </SignOutButton>
                  <Link
                    href="/user-profile"
                    className="hover:cursor-pointer"
                    onClick={() => toggleModal(false)}
                  >
                    Profile
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
