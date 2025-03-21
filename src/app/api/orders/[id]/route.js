import { fetchUserOrders } from "../../../../../db/dbFunctions";

// fetches orders based on users id on the server
export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return new Response({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const response = await fetchUserOrders({ userId: id });

    if (response.error || !response.orders || response.orders.length === 0) {
      return new Response(JSON.stringify(response), { status: 404 });
    }

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server Failure. Plesae try again later." }),
      {
        status: 500,
      }
    );
  }
}
