"use client";

// Clerk func
import { RedirectToSignIn, useUser } from "@clerk/nextjs";

// Cart context
import { useCartContext } from "../../../../contexts/CartContextProvider";

// react
import { useState, useActionState } from "react";

// Next.js components
import Link from "next/link";

// components
import AddressForm from "../../../../components/forms/AddressForm";
import { validateCheckoutInput } from "../../../../actions/actions";

export default function CheckoutPage() {
  // User states
  const { isSignedIn, user, isLoaded } = useUser();

  // Cart states
  const { cartItems } = useCartContext();

  // State for confirming address and billing address
  const [sameAsDelivery, setSameAsDelivery] = useState(true);

  // Form state
  const [address, setAddress] = useState({
    houseInfo: "",
    streetName: "",
    town: "",
    city: "",
    county: "",
    postcode: "",
    country: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    isBillingAddressTheSame: sameAsDelivery,
    houseInfo: "",
    streetName: "",
    town: "",
    city: "",
    county: "",
    postcode: "",
    country: "",
  });

  // Handles address input change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handles billing address input change
  const handleBillingAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handles card expiry date info input change
  const [expiry, setExpiry] = useState("");

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // removes non-digit ch

    if (value.length > 4) value = value.slice(0, 4); // max 4 characters

    if (value.length >= 3) {
      // Formats MM/YY by adding slash after 2nd character
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setExpiry(value);
  };

  // Handle confirm address button
  const handleConfirmAddress = () => {
    setConfirmAddress(true);
  };

  // Handle same as delivery checkbox
  const handleSameAsDeliveryChange = () => {
    setSameAsDelivery(!sameAsDelivery);
    if (!sameAsDelivery) {
      setBillingAddress(address); // Copy delivery address to billing if checked
    }
  };
  // form state
  const [state, formAction, isPending] = useActionState(
    validateCheckoutInput.bind(null, cartItems, address, billingAddress),
    {}
  );

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <>
      <div className="flex flex-col w-full bg-white h-10 justify-center pl-2 fixed top-0 z-20">
        <Link href="/">
          <h1 className="text-2xl">GoodsHub</h1>
        </Link>
      </div>
      <div className="w-full h-full flex flex-col z-10 fixed bg-gray-200 top-0 pt-15 px-2 space-y-3 overflow-scroll">
        <div className="flex flex-col w-full bg-white px-2 py-2 rounded">
          <h2 className="font-semibold">Your details</h2>
          <p>
            {user.fullName}, {user.primaryEmailAddress.emailAddress}
          </p>
        </div>
        <div className="flex flex-col w-full bg-white px-2 py-2 pb-3 rounded ">
          <h2 className="font-semibold border-b border-b-2 border-gray-300">
            Delivery
          </h2>
          <AddressForm state={address} setState={handleAddressChange} />
        </div>

        {/* Payment Section */}

        <div className="flex flex-col w-full bg-white px-2 py-2 rounded">
          <h2 className="font-semibold border-b border-b-2 border-gray-300">
            Payment
          </h2>
          <div className="flex flex-col items-start justify-center pt-2">
            <p className="">Billing Address</p>
            <div className="flex ">
              <input
                type="checkbox"
                checked={sameAsDelivery}
                onChange={handleSameAsDeliveryChange}
                className="mr-2"
              />
              <label htmlFor="sameAsDelivery">
                Billing address same as delivery
              </label>
            </div>
          </div>
          {!sameAsDelivery && (
            <AddressForm
              state={billingAddress}
              setState={handleBillingAddressChange}
            />
          )}
          <form
            className="flex flex-col space-y-2 pt-2 md:items-center w-full"
            action={formAction}
          >
            <p className="pt-2">Card Details</p>
            <div className="flex flex-col w-[500px]">
              <label className="text-sm text-gray-600" htmlFor="cardHolder">
                Card Holder
              </label>
              <input
                type="text"
                className="border px-2 py-1 rounded w-full"
                name="cardHolder"
                id="cardHolder"
              />
            </div>
            <div className="flex flex-col w-[500px]">
              <label className="text-sm text-gray-600" htmlFor="cardNumber">
                Card Number
              </label>
              <input
                className="border px-2 py-1 rounded w-full"
                name="cardNumber"
                id="cardNumber"
              />
            </div>
            <div className="flex flex-col w-[500px]">
              <label className="text-sm text-gray-600" htmlFor="expiryDate">
                Expiry Date (MM/YY)
              </label>
              <input
                type="text"
                className="border px-2 py-1 rounded w-full"
                name="expiryDate"
                id="expiryDate"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength="5"
              />
            </div>
            <div className="flex flex-col w-[500px]">
              <label className="text-sm text-gray-600" htmlFor="securityCode">
                Security Code
              </label>
              <input
                type="number"
                className="border px-2 py-1 rounded w-full"
                name="securityCode"
                id="securityCode"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
