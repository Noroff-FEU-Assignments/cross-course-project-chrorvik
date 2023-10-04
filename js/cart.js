console.log("script loaded")
export function initializeCart(products) {
    let cart = [];

    if(localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    attachAddToCartClickListener(cart, products);
}

export function getAddToCartHandler(product, cart) {
    console.log("Button clicked")
    return function() {
        const selectedRadio = document.querySelector('input[name="size"]:checked');
        if (selectedRadio) {
            const selectedSize = selectedRadio.value;
            const productToAdd = {
                title: product.title, 
                price: product.price,
                size: selectedSize,
            };
            cart.push(productToAdd);
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
        console.log("No size selected");
        }
        console.log(cart);
    };
}

function attachAddToCartClickListener(cart, products) {
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

