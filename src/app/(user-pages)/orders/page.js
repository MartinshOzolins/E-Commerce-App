"use client";

import { useAuth } from "@clerk/nextjs";

import { useEffect, useState } from "react";

import { fetchUserOrders } from "../../../../db/dbFunctions";

//MUI components
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import OrderedProductList from "../../../../components/ordersPage/OrderedProductList";

//helper function
function convertDate(input) {
  const orderDate = new Date(input);

  let date = orderDate.getDate();
  date = date < 10 ? `0${date}` : date;

  let month = orderDate.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  let year = orderDate.getFullYear();

  let hours = orderDate.getHours();
  hours = hours < 10 ? `0${hours}` : hours;

  let minutes = orderDate.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${date}/${month}/${year} ${hours}:${minutes}`;
}

export default function OrdersPage() {
  const { userId } = useAuth();
  const [orders, setOrders] = useState();
  useEffect(() => {
    if (userId) {
      const fetchOrd = async () => {
        const response = await fetchUserOrders({ userId });
        setOrders(response);
      };
      fetchOrd();
    }
    ({ userId });
  }, [userId]);

  return (
    <div className="w-full min-h-screen px-5 py-10 bg-gray-100 flex flex-col">
      {/* <p>{JSON.stringify(userId)}</p> */}
      {/* {userId ? <p>{JSON.stringify(orders)}</p> : null} */}
      {orders ? (
        <div className="w-full sm:max-w-[900px] flex flex-col bg-white px-4 py-4 rounded-lg shadow-md place-self-center">
          <h2 className="px-2 text-lg font-semibold border-b-2 border-gray-300 pb-2 mb-3">
            Orders
          </h2>

          {/* Orders List */}
          <div className="w-full space-y-4">
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
      ) : null}
    </div>
  );
}
