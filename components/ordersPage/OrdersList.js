import { fetchUserOrders } from "../../db/dbFunctions";

export default async function OrdersList({ userId }) {
  const response = await fetchUserOrders({ userId });

  return (
    <div>
      <p>{JSON.stringify(response)}</p>
    </div>
  );
}
