import { saveToLocalStorage, getFromLocalStorage, getCart } from "./storage.js";
import { setupEventListeners, showToast } from "./eventListeners.js";
import { CART_STORAGE_KEY } from "./constants.js";

console.log("script loaded");

// Initialize the shopping cart
export function initializeCart(products) {
  let cart = getFromLocalStorage(CART_STORAGE_KEY) || [];
  setupEventListeners(cart, products);
}

// Handle adding a product to the cart
export function getAddToCartHandler(product, cart) {
  console.log("More info clicked");
  return function () {
    const selectedRadio = document.querySelector('input[name="size"]:checked');
    if (selectedRadio) {
      const selectedSize = selectedRadio.value;
      addProductToCart(product, selectedSize, cart);
    }
  };
}

// Helper function to add product to cart
function addProductToCart(product, selectedSize) {
  let cart = getCart();
  const productToAdd = {
    title: product.title,
    price: product.price,
    color: product.baseColor,
    size: selectedSize,
    image: product.image,
  };
  cart.push(productToAdd);
  saveToLocalStorage(CART_STORAGE_KEY, cart);
  updateCartCount(cart);
  showToast('The product has been added to your cart! 🎉');
}

// Helper function to update cart count in UI
function updateCartCount(cart) {
  document.getElementById("cart-count").textContent = cart.length;
}
