import { getFromLocalStorage } from "./storage.js";
import {
  attachAddToCartClickListener,
  showToast,
  handleCloseButtonClick,
} from "./eventListeners.js";

export function initializeCart(products) {
  let cart = getFromLocalStorage("cart") || [];

  attachAddToCartClickListener(cart, products);
}

export function getAddToCartHandler(product, cart) {
  return function () {
    const selectedRadio = document.querySelector('input[name="size"]:checked');
    if (selectedRadio) {
      const selectedSize = selectedRadio.value;
      const productToAdd = {
        title: product.title,
        price: product.price,
        color: product.baseColor,
        size: selectedSize,
        image: product.image,
      };
      cart.push(productToAdd);
      localStorage.setItem("cart", JSON.stringify(cart));
      document.getElementById("cart-count").textContent = cart.length;
      showToast("The product has been added to your cart! 🎉");
      handleCloseButtonClick();
    } else {
      console.log("No size selected");
    }
  };
}

document.addEventListener("click", function (event) {
  if (event.target.id === "go-to-cart") {
    const cart = localStorage.getItem("cart");
    window.location.href = "/pages/cart.html";
  }
});
