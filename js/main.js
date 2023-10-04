import { fetchProducts } from "./apiClient.js";
import { generateProductCards } from "./populateUI.js";
import { initializeCart} from "./cart.js";

async function init() {
    const products = await fetchProducts();
    generateProductCards(products);
    initializeCart(products);
    console.log(products)
}

init()