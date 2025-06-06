"use client";

// Clerk func
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
// Cart context
import { useCartContext } from "../../../../contexts/CartContextProvider";
// React
import { useState, useActionState, useEffect } from "react";
// Components
import AddressForm from "../../../../components/forms/AddressForm";
// utils
import { validateCheckoutInput } from "../../../../actions/actions";
// Next.js functions
import { redirect } from "next/navigation";

export default function CheckoutPage() {
  // User states
  const { user } = useUser();

  // Cart states
  const { cartItems } = useCartContext();

  // State for confirming address and billing address
  const [sameAsDelivery, setSameAsDelivery] = useState(false);

  // Form state for address and billing address
  const [address, setAddress] = useState({
    houseInfo: "123 Random St",
    streetName: "Main Street",
    town: "Randomtown",
    city: "Randomcity",
    county: "Randomshire",
    postcode: "RND 123",
    country: "Randomland",
  });
  const [billingAddress, setBillingAddress] = useState({
    isBillingAddressTheSame: sameAsDelivery,
    houseInfo: "123 Random St",
    streetName: "Main Street",
    town: "Randomtown",
    city: "Randomcity",
    county: "Random",
    postcode: "RND 123",
    country: "Randomland",
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

  // Handles user info input change
  const [expiry, setExpiry] = useState("12/25");
  const [cardHolder, setCardHolder] = useState("John Doe");
  const [cardNumber, setCardNumber] = useState("4111 1111 1111 1111");
  const [securityCode, setSecurityCode] = useState("123");

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // removes non-digit chars

    if (value.length > 4) value = value.slice(0, 4); // max 4 characters

    if (value.length >= 3) {
      // Formats MM/YY by adding slash after 2nd character
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setExpiry(value);
  };

  // Handle same as delivery checkbox
  const handleSameAsDeliveryChange = () => {
    setSameAsDelivery(!sameAsDelivery);
    if (!sameAsDelivery) {
      setBillingAddress(address); // Adds delivery address to billing if checked
    }
  };

  // Form state and action state
  const [state, formAction, isPending] = useActionState(
    validateCheckoutInput.bind(
      null,
      user?.id,
      cartItems,
      address,
      billingAddress
    ),
    {}
  );

  useEffect(() => {
    return () => {
      if (JSON.parse(localStorage.getItem("clearContext")) === true) {
        // manually triggers the useEffect in CartIcon
        window.dispatchEvent(
          new StorageEvent("storage", { key: "clearContext", newValue: "true" })
        );
      }
    };
  }, []);

  function handleRedirect() {
    // redirects
    redirect("/");
  }

  if (!user) {
    return (
      <RedirectToSignIn
        signInFallbackRedirectUrl="/checkout"
        redirect_url="/checkout"
      />
    );
  }

  if (cartItems.length === 0) {
    const storedItems = localStorage.getItem("items");
    const parsedItems = storedItems ? JSON.parse(storedItems) : [];
    if (parsedItems.length === 0) {
      redirect("/");
    }
  }

  // converts deliveryDate to needed format
  let deliveryDate;
  let day;
  let month;
  let year;
  if (state.dbResponse && state.dbResponse.status === "success") {
    // retrievs delivery date
    deliveryDate = new Date(state.dbResponse.data[0].deliveryDate);
    day = deliveryDate.getDate();
    if (day < 10) day = `0${day}`;
    month = deliveryDate.getMonth();
    if (month < 10) month = `0${month}`;
    year = deliveryDate.getFullYear();

    // sets to clear context (executed in CartIcon component)
    localStorage.setItem("clearContext", "true");
  }

  return (
    <>
      <div className="flex flex-col w-full bg-white h-10 justify-center pl-2 fixed top-0 z-20">
        <h1
          className="text-2xl hover:cursor-pointer caveat-italic"
          onClick={handleRedirect}
        >
          GoodsHub
        </h1>
      </div>
      <div className="w-full h-full flex flex-col z-10 fixed bg-gray-200 top-0 pt-15 space-y-3 overflow-scroll items-center px-2">
        {state.dbResponse && state.dbResponse.status === "success" && (
          <div className="w-full bg-white h-full fixed top-11 z-20 pt-12 px-2 md:px-5">
            <div className="max-w-3xl mx-auto bg-green-100 p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <p className="text-lg font-semibold text-green-800">
                  Order placed successfully!
                </p>
                <p className="text-sm text-green-700 mt-2">
                  Your order will be delivered on:{" "}
                  <span className="font-bold">{`${day}/${month}/${year}`}</span>
                </p>
              </div>

              <button
                className="w-full mt-6 text-center bg-green-500 text-white px-6 py-2 rounded-md font-medium hover:bg-green-600 transition-colors hover:cursor-pointer "
                onClick={() => handleRedirect()}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
        {/* Display order details and possibly returned errors */}
        {state.dbResponse && state?.dbResponse?.status === "success" ? null : (
          <>
            <div className="flex flex-col w-full bg-white px-2 py-2 rounded md:max-w-3xl mx-auto">
              <h2 className="font-semibold">Your details</h2>
              <div className="flex flex-col sm:flex-row">
                <p>{user.fullName},</p>
                <p className="sm:ml-1">
                  {user.primaryEmailAddress.emailAddress}
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full bg-white px-2 py-2 pb-3 rounded md:max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex">
                <h2 className="font-semibold border-b border-b-2 border-gray-300">
                  Delivery
                </h2>
                <p className="text-red-500 font-semibold text-xs pt-1 sm:pt-0">
                  {state.errors && state.errors.addressError
                    ? `*${state.errors.addressError}`
                    : null}
                </p>
              </div>
              <AddressForm state={address} setState={handleAddressChange} />

              {/* Billing Section */}
              <div className="flex flex-col w-full bg-white py-2  rounded">
                <div className="flex flex-col sm:flex">
                  <h2 className="font-semibold border-b border-b-2 border-gray-300">
                    Billing Address
                  </h2>
                  <p className="text-red-500 font-semibold text-xs pt-1 sm:pt-0">
                    {state.errors && state.errors.billingError
                      ? `*${state.errors.billingError}`
                      : null}
                  </p>
                </div>
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
            </div>

            {/* Payment Section */}
            <div className="w-full bg-white px-2 py-2 pb-3 rounded md:max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex">
                <h2 className="font-semibold border-b border-b-2 border-gray-300">
                  Payment
                </h2>
                <p className="text-red-500 font-semibold text-xs pt-1 sm:pt-0">
                  {state.errors && state.errors.creditCardError.length > 0
                    ? `*Invalid Credit Card Details`
                    : null}
                </p>
              </div>
              <form
                className="flex flex-col space-y-2 pt-2 md:items-center w-full"
                action={formAction}
              >
                <div className="flex flex-col w-full md:w-[500px]">
                  <label className="text-sm text-gray-600" htmlFor="cardHolder">
                    Card Holder
                  </label>
                  <input
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Enter fake name (for demo purposes)"
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    name="cardHolder"
                    id="cardHolder"
                  />
                </div>
                <div className="flex flex-col w-full md:w-[500px]">
                  <label className="text-sm text-gray-600" htmlFor="cardNumber">
                    Card Number
                  </label>
                  <input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter random credit card number"
                    className="border px-2 py-1 rounded w-full"
                    name="cardNumber"
                    id="cardNumber"
                  />
                </div>
                <div className="flex flex-col w-full md:w-[500px]">
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
                <div className="flex flex-col w-full md:w-[500px]">
                  <label
                    className="text-sm text-gray-600"
                    htmlFor="securityCode"
                  >
                    Security Code
                  </label>
                  <input
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    placeholder="Enter fake security code (for demo purposes)"
                    className="border px-2 py-1 rounded w-full"
                    name="securityCode"
                    id="securityCode"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:cursor-pointer hover:bg-green-600"
                >
                  Place Order
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
