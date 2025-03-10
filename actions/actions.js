"use server";

import { redirect } from "next/navigation";
import { capitalizeFirstLetter } from "@/app/utils/capitaliseFirstLetter";
import { insertNewOrder } from "../db/dbFunctions";

// server action to change url params with input search
export async function validateSearchInput(input) {
  redirect(`/products/search?q=${encodeURIComponent(input)}`);
}

// server action to validate checkout forms and execute DB function
export async function validateCheckoutInput(
  userId,
  cartItems,
  address,
  billingAddress,
  prevState,
  formData
) {
  const response = { errors: { creditCardError: [] } };
  let updatedAddress = {};
  let updatedBillingAddress = {};

  // Validate shipping address
  if (
    !address.houseInfo ||
    !address.streetName ||
    !address.city ||
    !address.postcode ||
    !address.country
  ) {
    response.errors.addressError =
      "Please complete required fields for address";
  } else {
    updatedAddress = {
      houseInfo: address.houseInfo,
      streetName: capitalizeFirstLetter(address.streetName),
      city: capitalizeFirstLetter(address.city),
      postcode: address.postcode,
      country: capitalizeFirstLetter(address.country),
    };
    if (address.town && address.town.length > 3)
      updatedAddress.town = capitalizeFirstLetter(address.town);
    if (address.county && address.county.length > 3)
      updatedAddress.county = capitalizeFirstLetter(address.county);
  }

  // Validate billing address
  if (billingAddress.isBillingAddressTheSame) {
    updatedBillingAddress = updatedAddress;
  } else {
    if (
      !billingAddress.houseInfo ||
      !billingAddress.streetName ||
      !billingAddress.city ||
      !billingAddress.postcode ||
      !billingAddress.country
    ) {
      response.errors.billingError =
        "Please complete required fields for billing address";
    } else {
      updatedBillingAddress = {
        houseInfo: billingAddress.houseInfo,
        streetName: capitalizeFirstLetter(billingAddress.streetName),
        city: capitalizeFirstLetter(billingAddress.city),
        postcode: billingAddress.postcode,
        country: capitalizeFirstLetter(billingAddress.country),
      };
      if (billingAddress.town && billingAddress.town.length > 3)
        updatedBillingAddress.town = capitalizeFirstLetter(billingAddress.town);
      if (billingAddress.county && billingAddress.county.length > 3)
        updatedBillingAddress.county = capitalizeFirstLetter(
          billingAddress.county
        );
    }
  }
  // Early return if address validation fails
  if (response.errors.addressError || response.errors.billingError)
    return response;

  // Validate credit card details
  const cardHolder = formData.get("cardHolder");
  const cardNumber = formData.get("cardNumber");
  const expiryDate = formData.get("expiryDate");
  const securityCode = formData.get("securityCode");
  // Checks if cardholder name has at least two words
  if (!cardHolder || cardHolder.trim().split(/\s+/).length < 2) {
    response.errors.creditCardError.push("Invalid cardholder name");
  }

  // Checks if card number has at least 15 digits
  if (!cardNumber || cardNumber.length < 15) {
    response.errors.creditCardError.push("Invalid card number");
  }

  // Expiry date validation
  if (expiryDate) {
    const [month, year] = expiryDate.split("/").map(Number);
    const currentYear = new Date().getFullYear() % 100;

    if (
      isNaN(month) ||
      isNaN(year) ||
      month < 1 ||
      month > 12 ||
      year < currentYear
    ) {
      response.errors.creditCardError.push("Invalid expiry date");
    }
  }

  // Security code validation (3 or 4 digits)
  if (!securityCode || securityCode.length < 3 || securityCode.length > 4) {
    response.errors.creditCardError.push("Invalid security code");
  }

  // Return response with errors
  if (response.errors.creditCardError.length > 0) return response;

  // Converts cartItems into
  // expected format -> [
  //   { "id": 1, "quantity": 3 },
  //   { "id": 2, "quantity": 1 }
  // ]
  const orderProducts = cartItems.map((prod) => ({
    id: prod.id,
    quantity: prod.quantity,
  }));

  // Creates orderedAt column for db
  //2025-03-15T14:30:00.000Z
  const orderedAt = new Date().toISOString();

  // Creates deliveryDate column for db
  const deliveryDate = new Date(Date.now() + 20 * 86400000).toISOString();

  // Validation successful - executes db function
  const dbResponse = await insertNewOrder({
    userId,
    orderedAt,
    deliveryDate,
    orderProducts,
    address: updatedAddress,
  });

  response.dbResponse = dbResponse;

  return response;
}
