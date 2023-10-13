import { fetchProducts } from "./apiClient.js";
import { generateProductCards } from "./populateUI.js";
import { initializeCart} from "./cart.js";

async function init() {
    const products = await fetchProducts();
    if (document.querySelector('.card-container')) {
    generateProductCards(products);
    }
    if (document.querySelector('.shopping-cart')) {
    initializeCart(products);
    }
    console.log(products)
}

init()