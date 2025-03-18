//# Fetch API for retrieving products

// api function to fetch all products
export async function fetchProducts({ category, sortBy, skipped }) {
  let baseURL = "https://dummyjson.com/products";
  // category filtering;
  if (category)
    baseURL = `${baseURL}/category/${category}?skip=${skipped}&limit=15`;
  if (!category) baseURL = `${baseURL}?skip=${skipped}&limit=15`;
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
  // fetching
  const response = await fetch(baseURL);
  const data = await response.json();

  // for LoadMore to check if can fetch again
  // checks if can be fetched agains
  if (data.total < skipped) {
    return {
      isNextAvailable: false,
    };
  }
  // for products page, to showcase error message (Not used to showcase in LoadMore component, just to check if error exists)
  if (!data.products || data.products.length === 0)
    return {
      error: `Sorry, we couldn't find any results for ${
        category || "such query"
      }`,
    };

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

// fetch input search
export async function fetchInputSearch({ input, sortBy, skipped }) {
  let baseURL = `https://dummyjson.com/products/search?q=${input}&skip=${skipped}&limit=15`;
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

  // fetching
  const response = await fetch(baseURL);
  const data = await response.json();

  // if status code not in range of 200-299
  if (!response.ok) return { error: "Not found" };

  // if skipped more than available, return that no products left
  if (data.total < skipped) {
    return {
      isNextAvailable: false,
    };
  }

  // if not found
  if (!data.products || data.products.length === 0)
    return {
      error: `Sorry, we couldn't find any results for ${input || "such query"}`,
    };

  return { products: data.products, isNextAvailable: true };
}

// fetch available categories
export async function fetchCategories() {
  const response = await fetch("https://dummyjson.com/products/categories");
  const data = await response.json();
  // if status code not in range of 200-299
  if (!response.ok) return { error: "Not found" };

  return { categories: data };
}
