import { fetchProducts } from "./apiClient.js";
import { generateProductCards } from "./cartUI.js";
import { initializeCart } from "./cart.js";
import "./domUtils.js";

async function init() {
  // Show the loading indicator
  document.getElementById("loading-indicator").style.display = "flex";

  const products = await fetchProducts();
  if (document.querySelector(".card-container")) {
    generateProductCards(products);
  }
  if (document.querySelector(".shopping-cart")) {
    initializeCart(products);
  }

  // Hide the loading indicator
  document.getElementById("loading-indicator").style.display = "none";
}

init();
