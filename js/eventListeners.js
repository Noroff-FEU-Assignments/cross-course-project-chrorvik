import { getAddToCartHandler } from "./cart.js";
export function attachAddToCartClickListener(cart, products) {
    const buttons = document.querySelectorAll(".popup-cta-btn");
    console.log("Buttons found: ", buttons.length);
    
    buttons.forEach(button => {
        const productId = button.getAttribute("data-product-id");
        console.log(`Working with product ID: ${productId}`);
        const product = products.find(p => p.id === productId);
        if (product) {
            console.log(`Attaching listener to product: ${product.title}`);
            button.addEventListener("click", getAddToCartHandler(product, cart));
        } else {
            console.log('No matching product found');
        }
    });
}