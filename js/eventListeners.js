import { getAddToCartHandler } from "./cart.js";
import { getCart } from "./storage.js";

// Redirect to cart page when "go-to-cart" is clicked
function redirectToCartPage() {
  // Listener for redirecting to the cart page
  document.addEventListener("click", function (event) {
    if (event.target.id === "go-to-cart") {
      const cart = getCart();
      window.location.href = "/pages/cart.html";
    }
  });
}

// Attaches event listeners to "Add to Cart" buttons
function attachAddToCartClickListener(cart, products) {
  const buttons = document.querySelectorAll(".popup-cta-btn");
  console.log("Buttons found: ", buttons.length);

  buttons.forEach((button) => {
    const productId = button.getAttribute("data-product-id");
    console.log(`Working with product ID: ${productId}`);
    const product = products.find((p) => p.id === productId);
    if (product) {
      console.log(`Attaching listener to product: ${product.title}`);
      button.addEventListener("click", getAddToCartHandler(product, cart));
    } else {
      console.log("No matching product found");
    }
  });
}

export function setupEventListeners(cart, products) {
  redirectToCartPage();
  attachAddToCartClickListener(cart, products);
}

export function handleCloseButtonClick() {
  document.getElementById("productPopup").style.display = "none";
}

export function closeCartDropDown() {
  const cartDropdown = document.querySelector("#cart-dropdown");
  cartDropdown.classList.remove("cart-dropdown-visible");
  cartDropdown.classList.add("cart-dropdown-hidden");
}

export function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("visible");
  }, 100);
  setTimeout(() => {
    toast.classList.remove("visible");
  }, 3000);
}
