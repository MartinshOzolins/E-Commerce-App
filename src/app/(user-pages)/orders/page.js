"use client";

import { useAuth } from "@clerk/nextjs";

import { useEffect, useState } from "react";

import { fetchUserOrders } from "../../../../db/dbFunctions";

//MUI components
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import OrderedProductList from "../../../../components/ordersPage/OrderedProductList";
import Link from "next/link";

//helper function
import convertDate from "../../../../utils/convertDate";

export default function OrdersPage() {
  const { userId } = useAuth();
  const [orders, setOrders] = useState();
  const [areOrders, setAreOrders] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const fetchOrd = async () => {
        setLoading(true);
        const { orders, error } = await fetchUserOrders({ userId });
        if (orders && orders.length > 0) {
          setAreOrders(true);
          setOrders(orders.reverse());
        } else {
          setAreOrders(false);
        }
        setLoading(false);
      };
      fetchOrd();
    }
  }, [userId]);

  return (
    <div className="w-full min-h-screen px-5 py-10 bg-gray-100 flex flex-col">
      {loading ? (
        <div className="w-full flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-gray-600">Loading your orders...</p>
        </div>
      ) : areOrders && orders.length > 0 ? (
        <div className="w-full sm:max-w-[900px] flex flex-col bg-white px-4 py-4 rounded-lg shadow-md place-self-center">
          <h2 className="px-2 text-lg font-semibold border-b-2 border-gray-300 pb-2 mb-3">
            Orders
          </h2>

          {/* Orders List */}
          <div className="w-full space-y-4 text-sm sm:text-base lg:text-lg">
            {orders.map((order, index) => (
              <div
                key={index}
                className="w-full p-4 border border-gray-200 rounded-md bg-gray-50"
              >
                <p>
                  <span className="mr-1 font-semibold">Ordered at:</span>
                  {convertDate(order.orderedAt)}
                </p>
                <p>
                  <span className="mr-1 font-semibold">Delivery date:</span>
                  {convertDate(order.deliveryDate).split(" ")[0].trim()}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Delivery Status:</span>
                  {new Date(order.deliveryDate) < new Date() ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <RadioButtonCheckedIcon className="text-green-600" />
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600">
                      <RadioButtonUncheckedIcon className="text-red-600" />
                      Pending
                    </span>
                  )}
                </p>
                <p className="font-semibold">
                  <span className="mr-1">Quantity:</span>
                  {order.products.length > 0
                    ? order.products.reduce(
                        (accum, currValu) => accum + currValu.quantity,
                        0
                      )
                    : null}
                  <span className="ml-1">
                    {order.products.reduce(
                      (accum, currValu) => accum + currValu.quantity,
                      0
                    ) > 1
                      ? "items"
                      : "item"}
                  </span>
                </p>
                <OrderedProductList productsToFetch={order.products} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full self-center max-w-[700px] flex flex-col items-center justify-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-600 pb-10 text-center">
            It looks like you haven&apos;t placed any orders yet.
          </p>
          <Link href="/products">
            <button className="px-3 py-1 bg-blue-800 text-white rounded text-base sm:text-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
