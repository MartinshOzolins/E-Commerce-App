"use client";

import { useAuth } from "@clerk/nextjs";

import { useEffect, useState } from "react";

import { fetchUserOrders } from "../../../../db/dbFunctions";

export default function OrdersPage() {
  const { userId } = useAuth();
  const [orders, setOrders] = useState();
  useEffect(() => {
    if (userId) {
      const fetchOrd = async () => {
        const response = await fetchUserOrders();
        setOrders(response);
      };
      fetchOrd();
    }
    ({ userId });
  }, [userId]);

  return (
    <div className="w-full min-h-screen">
      <p>{JSON.stringify(userId)}</p>
      {userId ? <p>{JSON.stringify(orders)}</p> : null}
    </div>
  );
}
