import { getAddToCartHandler } from "./cart.js";

export function attachAddToCartClickListener(cart, products) {
  const buttons = document.querySelectorAll(".popup-cta-btn");

  buttons.forEach((button) => {
    const productId = button.getAttribute("data-product-id");
    const product = products.find((p) => p.id === productId);
    if (product) {
      button.addEventListener("click", getAddToCartHandler(product, cart));
    } else {
      console.log("No matching product found");
    }
  });
}

export function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("visible"), 100);
  setTimeout(() => toast.classList.remove("visible"), 3000);
}

export function closeCartDropDown() {
  const cartDropdown = document.querySelector("#cart-dropdown");
  cartDropdown.classList.remove("cart-dropdown-visible");
  cartDropdown.classList.add("cart-dropdown-hidden");
}

export function handleCloseButtonClick() {
  document.getElementById("productPopup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", (event) => {
  const emptyCartButton = document.getElementById("empty-cart");
  if (emptyCartButton) {
    emptyCartButton.addEventListener("click", function () {
      localStorage.removeItem("cart");
      location.reload();
    });
  }
});

document.addEventListener("DOMContentLoaded", (event) => {
  const continueShoppingUrl = document.getElementById("continue-shopping");
  if (continueShoppingUrl) {
    continueShoppingUrl.addEventListener("click", function () {
      window.history.back();
    });
  }
});
