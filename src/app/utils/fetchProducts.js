//# Fetch API for retrieving products

// api function to fetch all products
export async function fetchProducts({ category, sortBy, skipped }) {
  let baseURL = "https://dummyjson.com/products?limit=30";
  // category filtering
  if (category) baseURL = `${baseURL}/category/${category}`;
  // sorting params
  let order = "desc";
  let sortByValue;
  if (sortBy && sortBy === "most-relevant") {
    sortByValue = "";
    baseURL = `${baseURL}&sortBy=${sortByValue}`;
  }
  if (sortBy && sortBy === "price-low-to-high") {
    sortByValue = "price";
    order = "asc";
    baseURL = `${baseURL}&sortBy=${sortByValue}&order=${order}`;
  }
  if (sortBy && sortBy === "price-high-to-low") {
    sortByValue = "price";
    order = "desc";
    baseURL = `${baseURL}&sortBy=${sortByValue}&order=${order}`;
  }
  if (sortBy && sortBy === "lowest-rating") {
    sortByValue = "rating";
    order = "asc";
    baseURL = `${baseURL}&sortBy=${sortByValue}&order=${order}`;
  }
  if (sortBy && sortBy === "highest-rating") {
    sortByValue = "rating";
    order = "desc";
    baseURL = `${baseURL}&sortBy=${sortByValue}&order=${order}`;
  }
  if (sortBy && sortBy === "createdAt") {
    sortByValue = "createdAt";
    order = "desc";
    baseURL = `${baseURL}&sortBy=${sortBy}&order=${order}`;
  }

  // adds skipping
  baseURL = baseURL + `&skip=${skipped}`;
  // fetching
  const response = await fetch(baseURL);
  const data = await response.json();

  if (!data.products || data.products.length === 0)
    return {
      error: `Sorry, we couldn't find any results for ${
        category || "such query"
      }`,
    };
  // checks if can be fetched agains
  if (data.total < skipped) {
    return {
      error: "Sorry, we couldn't find any results for such query",
      isNextAvailable: false,
    };
  }

  return { products: data.products, isNextAvailable: true };
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
