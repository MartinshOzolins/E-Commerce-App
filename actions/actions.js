"use server";

import { redirect } from "next/navigation";

// server action to change url params with input search
export async function validateInput(input) {
  redirect(`/products/search?q=${encodeURIComponent(input)}`);
}
