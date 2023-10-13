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
            document.getElementById("cart-count").textContent = cart.length;
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


function getCartData() {
    return JSON.parse(localStorage.getItem("cart") ) || [];
}

function populateCartPage() {
    const cart = getCartData();
    const targetElement = document.getElementsByClassName("shopping-cart")[0];
    targetElement.innerHTML = '';

    const headers = ['Products', '', 'Shipping date', 'Sizes and colors', 'Price', 'Amount', 'Total'];
    headers.forEach(header => {
      const h2 = document.createElement('h2');
      h2.innerText = header;
      targetElement.appendChild(h2);
    });
    cart.forEach(item => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
    
        const elements = [
          item.title,
          '',
          'Not specified',
          `Size: ${item.size}, Color: ${item.color}`,
          `$${item.price}`,
          '1',
          `$${item.price}`
        ];
        elements.forEach(el => {
          const div = document.createElement('div');
          div.innerText = el;
          productDiv.appendChild(div);
        });
    
        targetElement.appendChild(productDiv);
      });
    }

    function populateDropdownCart() {
        const cart = getCartData();
        const targetElement = document.getElementById("cart-dropdown");
        let itemsHTML = '';
        let total = 0;
      
        cart.forEach(item => {
          itemsHTML += `
          <li>
          <img src="${item.image}" alt="${item.title}" width="60">
          <p class="cart-item-title">${item.title}</p><p class="cart-item-size">Size: ${item.size}</p><p class="cart-item-color">Color: ${item.color}</p>
          <span class="price">$${item.price}</span>
          </li>`;
          total += item.price;
        });
      
        document.getElementById("cart-item-count").textContent = cart.length;
        document.getElementById("cart-total").textContent = total;
        targetElement.innerHTML = itemsHTML;
      }

      function populateCartItems() {
        if (window.location.pathname.includes("cart.html")) {
          populateCartPage();
        } else {
          populateDropdownCart();
        }
      }

document.addEventListener("DOMContentLoaded", function() {
        populateCartItems();
        console.log("DOM fully loaded and parsed"); 
        const cartIcon = document.getElementById("shopping-cart");
        const cartDropdown = document.getElementById("cart-dropdown");
        const cartItems = document.getElementById("cart-items");
        
        if (cartIcon) {
        cartIcon.addEventListener("click", function(e) {
        e.preventDefault();
        toggleCartDropdown();
        });
        }
  
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
        // function populateCartItems() {
        //     console.log("Entering populateCartItems");
        //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
        //     console.log("Cart from localStorage: ", cart);
        //     document.getElementById("cart-count").textContent = cart.length;
        //     console.log(cart);
        //     console.log("populateCartItems called");
        //     let itemsHTML = '';
        //     let total = 0;
        //     let itemCount = 0;
        
        //     let targetElement;
        //     if(window.location.pathname.includes("cart.html")) {
        //         console.log("Working with cart.html");
        //         targetElement = document.getElementsByClassName("shopping-cart")[0]

        //         targetElement.innerHTML = '';

        //         const headers = ['Products', '', 'Shipping date', 'Sizes and colors', 'Price', 'Amount', 'Total'];
        //         headers.forEach(header => {
        //             const h2 = document.createElement('h2');
        //             h2.innerText = header;
        //             targetElement.appendChild(h2);
        //         });
                
        //         cart.forEach(item => {
        //             const productDiv = document.createElement("div");
        //             productDiv.classList.add("product-item");
                    
        //             const elements = [
        //                 item.title,
        //                 '',
        //                 'Not specified',
        //                 `Size: ${item.size}, Color: ${item.color}`,
        //                 `$${item.price}`,
        //                 '1',
        //                 `$${item.price}`
        //             ];
        //             elements.forEach(el => {
        //                 const div = document.createElement('div');
        //                 div.innerText = el;
        //                 productDiv.appendChild(div);
        //             });
        
        //             targetElement.appendChild(productDiv);
        //         });
        //     } else {
        //         console.log("Working with dropdown cart");
        //         targetElement = document.getElementById("shopping-cart");
        //         cart.forEach(item => {
        //         itemsHTML += `
        //             <li>
        //             <img src="${item.image}" alt="${item.title}" width="60">
        //             <p class="cart-item-title">${item.title}</p><p class="cart-item-size">Size: ${item.size}</p><p class="cart-item-color">Color: ${item.color}</p>
        //             <span class="price">$${item.price}</span>
        //             </li>`;
        //         total += item.price;
        //         itemCount++;
        //         });
            
        //     document.getElementById("cart-item-count").textContent = itemCount;
        //     document.getElementById("cart-total").textContent = total;
        //     cartItems.innerHTML = itemsHTML;
        //     document.getElementById("cart-count").textContent = itemCount;
        //     }
        // }
        
        document.getElementById("go-to-cart").addEventListener("click", function() {
            window.location.href = "/pages/cart.html";
        });
        console.log(localStorage.getItem("cart"));
    });
      
  