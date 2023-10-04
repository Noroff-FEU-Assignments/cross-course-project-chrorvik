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
                color: product.baseColor,
                size: selectedSize,
                image: product.image,
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

document.addEventListener("DOMContentLoaded", function() {
        const cartIcon = document.getElementById("shopping-cart");
        const cartDropdown = document.getElementById("cart-dropdown");
        const cartItems = document.getElementById("cart-items");
        
        cartIcon.addEventListener("click", function(e) {
        e.preventDefault();
        toggleCartDropdown();
        });
  
        function toggleCartDropdown() {
        if (cartDropdown.classList.contains("cart-dropdown-hidden")) {
            populateCartItems();
            cartDropdown.classList.remove("cart-dropdown-hidden");
            cartDropdown.classList.add("cart-dropdown-visible");
        } else {
            cartDropdown.classList.remove("cart-dropdown-visible");
            cartDropdown.classList.add("cart-dropdown-hidden");
        }
        }
        function populateCartItems() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            console.log(cart);
            console.log("populateCartItems called");
            let itemsHTML = '';
            let total = 0;
            let itemCount = 0;
        
            cart.forEach(item => {
            itemsHTML += `
                <li>
                <img src="${item.image}" alt="${item.title}" width="60">
                <p class="cart-item-title">${item.title}</p><p class="cart-item-size">Size: ${item.size}</p><p class="cart-item-color">Color: ${item.color}</p>
                <span class="price">${item.price} NOK</span>
                </li>`;
            total += item.price;
            itemCount++;
            });
        
            document.getElementById("cart-item-count").textContent = itemCount;
            document.getElementById("cart-total").textContent = total;
            cartItems.innerHTML = itemsHTML;
        }
        
        document.getElementById("go-to-cart").addEventListener("click", function() {
            window.location.href = "/cart";
        });
        console.log(localStorage.getItem("cart"));
  });
  