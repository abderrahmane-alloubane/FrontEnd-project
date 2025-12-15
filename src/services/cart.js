export function setCartProduct(product, qte) {
  // Sauvegarder un produit dans le localStorage
  const products = getCartProducts();
  product.qte = qte;

  // Check if the product already exists in the cart
  const existingProductIndex = products.findIndex((p) => p.id === product.id);

  if (existingProductIndex === -1) {
    // If it doesn't exist, add it to the cart
    products.push(product);
  } else {
    // If it exists, update the quantity
    products[existingProductIndex].qte = qte;
  }

  localStorage.setItem("cart", JSON.stringify(products));
}

export function getCartProducts() {
  // Récupérer tous les produits sauvegardés
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

export function removeProduct(product) {
  let products = getCartProducts();

  // Garde uniquement les produits dont l'id est différent de celui à supprimer
  products = products.filter((p) => p.id !== product.id);
  localStorage.removeItem("cart");
  // Mets à jour le localStorage
  localStorage.setItem("cart", JSON.stringify(products));
}

export function savetotalprice(total) {
  localStorage.removeItem("totalprice");
  localStorage.setItem("totalprice", total);
}

export function clearCart() {
  localStorage.removeItem("cart");
  localStorage.setItem("cartTotal", 0);
}
