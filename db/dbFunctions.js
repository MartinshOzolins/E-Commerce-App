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
  let { data, error } = await supabase.from("orders").select("*");
  console.log(data);
  const response = {};
  if (error)
    return (response.error = "Server Failure. Please try again later.");

  if (data.length === 0) {
    return (response.error = "There are no orders on your account.");
  }

  return (response.orders = data);
}
