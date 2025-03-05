//# Fetch API for retrieving products

// api function to fetch all products
export async function fetchProducts({ category, sortBy, order }) {
  let baseURL = "https://dummyjson.com/products";
  if (category) baseURL = `${baseURL}/category/${category}`;
  if (sortBy && order) baseURL = `${baseURL}?sortBy=${sortBy}&order=${order}`;
  const response = await fetch(baseURL);
  const data = await response.json();
  if (!data.products || data.products.length === 0)
    return {
      error: `Sorry, we couldn't find any results for ${
        category || "such query"
      }`,
    };
  return { products: data.products };
}

// api function to fetch a single product
export async function fetchProduct(productId) {
  let baseURL = `https://dummyjson.com/products/${productId}`;
  const response = await fetch(baseURL);
  const data = await response.json();
  // if status code not in range of 200-299
  if (!response.ok) return { error: "Not found" };

  // if not found, api returns object with generic message in message property
  if (data.message) return { error: data.message };
  // if product found
  return { product: data };
}
