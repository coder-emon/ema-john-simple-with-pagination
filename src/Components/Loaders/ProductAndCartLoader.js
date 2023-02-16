import { getShoppingCart } from "../../utilities/fakedb";

export const ProductAndCartLoader = async () => {
  // get products data
  const productsData = await fetch("products.json");
  const products = await productsData.json();

  // stored cart data
  const storedCart = getShoppingCart();
  const previousCart = [];
  for (const id in storedCart) {
    const addedProduct = products.find((product) => product.id === id);
    // console.log(addedProduct);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      previousCart.push(addedProduct);
    }
  }
  return { products, previousCart };
};
