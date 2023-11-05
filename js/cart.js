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
    try {
    const selectedRadio = document.querySelector('input[name="size"]:checked');
    if (!selectedRadio) {
      throw new Error("No size selected");
      }
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
    } catch (error) {
      console.error(error);
    }
  };
}

document.addEventListener("click", function (event) {
  try {
    if (event.target.id === "go-to-cart") {
      const cart = localStorage.getItem("cart");
      if (!cart) {
        throw new Error("No cart found");
      }
      window.location.href = "/pages/cart.html";
    }
  } catch (error) {
    console.error(error);
  }
});
