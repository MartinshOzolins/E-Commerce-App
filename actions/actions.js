"use server";

import { redirect } from "next/navigation";

// server action to change url params with input search
export async function validateSearchInput(input) {
  redirect(`/products/search?q=${encodeURIComponent(input)}`);
}

// server action to validate checkout forms and execute DB function
export async function validateCheckoutInput() {}
