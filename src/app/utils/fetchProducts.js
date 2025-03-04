//# Fetch API for retrieving products

export async function fetchProducts({ category, sortBy, order }) {
  console.log(category, sortBy, order);
  let baseURL = "https://dummyjson.com/products";
  if (category) baseURL = `${baseURL}/category/${category}`;
  if (sortBy && order) baseURL = `${baseURL}?sortBy=${sortBy}&order=${order}`;
  const response = await fetch(baseURL);
  const data = await response.json();

  return data.products;
}
