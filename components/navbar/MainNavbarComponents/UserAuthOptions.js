"use client";

// Clerk components
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

// Next.js components
import Link from "next/link";

export default function UserAuthOptions() {
  return (
    <>
      {" "}
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
    </>
  );
}
