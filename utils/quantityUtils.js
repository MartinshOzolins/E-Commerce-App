export function updateProductQuantity(allProducts, newProduct) {
  const index = allProducts.findIndex(
    (product) => product.id === newProduct.id
  );
  if (index !== -1) {
    const updatedProducts = [...allProducts];
    // updates quantity of specific product to +1
    updatedProducts[index] = {
      ...updatedProducts[index],
      quantity: updatedProducts[index].quantity + 1,
    };
    // returns all products to contex with updated quantity
    return updatedProducts;
  }
  // returns all products
  return [...allProducts, { ...newProduct, quantity: 1 }];
}

export function decreaseProductQuantity(allProducts, product) {
  const index = allProducts.findIndex((prod) => prod.id === product.id);

  if (index !== -1 && allProducts[index].quantity > 1) {
    const updatedProducts = [...allProducts];
    // updates quantity of specific product to -1
    updatedProducts[index] = {
      ...updatedProducts[index],
      quantity: updatedProducts[index].quantity - 1,
    };
    console.log(updatedProducts);
    return updatedProducts;
  }
  // if did not find or quantity only one
  return [...allProducts];
}
