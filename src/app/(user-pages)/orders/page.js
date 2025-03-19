"use client";

import { useAuth } from "@clerk/nextjs";
import OrdersList from "../../../../components/ordersPage/OrdersList";
export default function OrdersPage() {
  const { userId } = useAuth();

  return (
    <div className="w-full min-h-screen">
      <p>{JSON.stringify(userId)}</p>
      {userId ? <OrdersList userId={userId} /> : null}
    </div>
  );
}
