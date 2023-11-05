import { fetchProducts } from "./apiClient.js";
import { generateProductCards } from "./cartUI.js";
import { initializeCart } from "./cart.js";
import { setupEventListeners } from './eventListeners.js';
import { getCart } from "./storage.js";
import "./domUtils.js";

async function init() {
    const products = await fetchProducts();
    const cart = getCart();

    if (document.querySelector('.card-container')) {
    generateProductCards(products);
    }
    if (document.querySelector('.shopping-cart')) {
    initializeCart(products);
    }
    console.log(products)
    setupEventListeners(cart, products);
}
init()