import { toggleCartDropdown, populateCartItems } from "./cartUI.js";

document.addEventListener("DOMContentLoaded", function () {
  populateCartItems();
  const cartIcon = document.getElementById("shopping-cart");

  if (cartIcon) {
    cartIcon.addEventListener("click", function (e) {
      e.preventDefault();
      toggleCartDropdown();
    });
  }
});
