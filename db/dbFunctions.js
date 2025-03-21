// Supabase import
import supabase from "./supabase.js";

export async function insertNewOrder({
  userId,
  orderedAt,
  deliveryDate,
  orderProducts,
  address,
}) {
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        orderedAt: orderedAt,
        deliveryDate: deliveryDate,
        products: orderProducts,
        address: address,
      },
    ])
    .select("*");

  const response = {};
  if (error) {
    response.status = "fail";

    return response;
  }

  response.status = "success";
  response.data = data;
  return response;
}

// fetch previous orders
export async function fetchUserOrders({ userId }) {
  let { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId);

  const response = {};
  if (error) {
    response.error = "Server Failure. Please try again later.";
    return response;
  }
  if (data.length === 0) {
    response.error = "There are no orders on your account.";
    return response;
  }

  response.orders = data;
  return response;
}
