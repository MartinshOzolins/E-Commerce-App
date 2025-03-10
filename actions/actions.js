"use server";

import { redirect } from "next/navigation";

// server action to change url params with input search
export async function validateSearchInput(input) {
  redirect(`/products/search?q=${encodeURIComponent(input)}`);
}

// server action to validate checkout forms and execute DB function
export async function validateCheckoutInput(
  cartItems,
  address,
  billingAddress,
  prevState,
  formData
) {
  const response = {};
  // validates address
  if (
    !address.houseInfo ||
    address.streetName ||
    !address.city ||
    !address.postcode ||
    !address.postcode
  ) {
    response.addressError = {
      addressError: "Please complete required fields",
    };
  }
  // validates billing address
  // if isBillingAddressTheSame, avoids validating
  // validates card info
}

// cartItems [
// {id: 3, quantity: 3}
//]
// address {
//   houseInfo: 'Latgales ',
//   streetName: '266',
//   town: '',
//   city: 'riga',
//   county: 'countyd',
//   eircode: 'lv-1063',
//   country: 'latvia'
// }
// billing {
//   isBillingAddressTheSame: false,
//   houseInfo: 'Latgales',
//   streetName: '',
//   town: '22',
//   city: '',
//   county: 'asd',
//   eircode: '',
//   country: ''
// }
// prevState {}
// formData FormData {
//   cardHolder: 'MARTINS OZOLINS',
//   cardNumber: '5573672022535913',
//   expiryDate: '12/27',
//   securityCode: '479'
// }
