import { saveToLocalStorage, getCart } from "./storage.js";
import { setupEventListeners, showToast, handleCloseButtonClick } from "./eventListeners.js";
import { CART_STORAGE_KEY } from "./constants.js";

console.log("script loaded");

// Initialize the shopping cart
export function initializeCart(products) {
  let cart = getCart();
  if (!cart) {
    cart = []; // Sikrer at cart alltid er en array
  }
  setupEventListeners(cart, products);
  updateCartCount(cart); // Oppdaterer handlekurvtelleren ved initialisering
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
  console.log('Current cart before adding product:', cart);

  const index = cart.findIndex(
    item => item.id === product.id && item.size === selectedSize
  );
  
  if (index !== -1) {
    cart[index].quantity = (cart[index].quantity || 0) + 1;
    console.log(`Increasing quantity for product ${product.id} size ${selectedSize}`);
  } else {
  const productToAdd = {
    id: product.id,
    title: product.title,
    price: product.price,
    color: product.baseColor,
    size: selectedSize,
    image: product.image,
    quantity: 1
  };
  cart.push(productToAdd);
  console.log(`Adding new product ${product.id} size ${selectedSize}`); 
}
saveToLocalStorage(CART_STORAGE_KEY, cart);
showToast('The product has been added to your cart! 🎉');
handleCloseButtonClick();
updateCartCount(cart);
}

/* // Helper function to update cart count in UI
function updateCartCount(cart) {
  document.getElementById("cart-count").textContent = cart.length;
} */
// Helper function to update cart count in UI
function updateCartCount(cart) {
  if (Array.isArray(cart)) {
    const totalCount = cart.reduce((count, item) => count + (item.quantity || 0), 0);
    document.getElementById("cart-count").textContent = totalCount;
  } else {
    // Håndter feilen eller sett handlekurv-telleren til 0
    console.error('updateCartCount was called with an undefined cart.');
    document.getElementById("cart-count").textContent = '0';
  }
}
