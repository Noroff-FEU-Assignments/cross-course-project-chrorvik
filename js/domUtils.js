import { toggleCartDropdown, populateCartItems } from "./cartUI.js";

document.addEventListener("DOMContentLoaded", function() {
    populateCartItems();
    console.log("DOM fully loaded and parsed"); 
    const cartIcon = document.getElementById("shopping-cart");
    
    if (cartIcon) {
        cartIcon.addEventListener("click", function(e) {
            e.preventDefault();
            console.log("Handlekurv ikonet er trykket på!");
            toggleCartDropdown();
        });
    }
});