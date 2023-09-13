import { fetchProducts } from "./apiClient.js";
import { generateProductCards } from "./populateUI.js";

async function init() {
    const products = await fetchProducts();
    generateProductCards(products);
    console.log(products)
}

init()