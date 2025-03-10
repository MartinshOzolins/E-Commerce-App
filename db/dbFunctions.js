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
    response.status = false;
    return response;
  }

  response.status = true;
  response.data = data;
  return response;
}
