"use client";

// Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

// Next.js components
import Link from "next/link";

export default function UserAuthOptions({ onClick }) {
  return (
    <div className="flex flex-col space-y-2">
      <SignedOut>
        <SignInButton className="hover:cursor-pointer text-left">
          Sign In
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton
          className="hover:cursor-pointer text-left"
          onClick={onClick}
        >
          Sign Out
        </SignOutButton>
        <Link
          href="/user-profile"
          className="hover:cursor-pointer"
          onClick={onClick}
        >
          Profile
        </Link>
      </SignedIn>
    </div>
  );
}
