import { saveToLocalStorage, getFromLocalStorage } from "./storage.js";
import { attachAddToCartClickListener } from "./eventListeners.js";

console.log("script loaded");

export function initializeCart(products) {
  let cart = getFromLocalStorage("cart") || [];

  attachAddToCartClickListener(cart, products);
}

export function getAddToCartHandler(product, cart) {
  console.log("Button clicked");
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
    } else {
      console.log("No size selected");
    }
    console.log(cart);
  };
}

document.addEventListener("click", function (event) {
  if (event.target.id === "go-to-cart") {
    const cart = localStorage.getItem("cart");
    console.log(cart ? JSON.parse(cart) : "Cart is empty");
    window.location.href = "/pages/cart.html";
  }
});
