import { getAddToCartHandler } from "./cart.js";
import { getFromLocalStorage } from "./storage.js";

let cart = getFromLocalStorage("cart") || [];

export function generateProductCards(products) {
  const ul = document.querySelector(".card-container");
  if (ul !== null) {
    ul.innerHTML = ""; // Tømmer listen hvis den allerede har elementer

    products.forEach((product) => {
      const li = document.createElement("li");

      // Splitte tittelen ved de to første mellomrommene

      const [firstWord, secondWord, ...remainingWords] =
        product.title.split(" ");
      const mainTitle = `${firstWord} ${secondWord}`;
      const subtitle = remainingWords.join(" ");

      li.innerHTML = `
            <a href="#" class="card card-${ul.children.length + 1}">
            <div class="product-placeholder" style="background-image: url('${
              product.image
            }');">
                <div class="product-btn cta-buttons">More info</div>
            </div>
            <div class="card-fav"></div>
            <h2>${mainTitle}</h2> <!-- Hovedtittel -->
            <h3>${subtitle}</h3> <!-- Undertittel -->
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            </a>
        `;
      // Legger til klikkhendelse på 'More info'-knappen
      li.querySelector(".product-btn").addEventListener("click", function () {
        // Åpner popupen
        document.getElementById("productPopup").style.display = "block";

        // Setter inn produktinfo i popupen
        document.getElementById("popupTitle").innerText = `${subtitle}`;
        document.getElementById("popupImage").src = product.image;
        document.getElementById("popupColor").innerText = product.baseColor;
        document.getElementById("popupGender").innerText = product.gender;
        document.getElementById("popupDescription").innerText =
          product.description;
        document.getElementById("popupPrice").innerText = "$" + product.price;

        const sizeContainer = document.getElementById("popupSize");
        sizeContainer.innerHTML = ""; //Tømmer containeren
        product.sizes.forEach((size) => {
          const radio = document.createElement("input");
          radio.type = "radio";
          radio.id = size;
          radio.name = "size";
          radio.value = size;

          const label = document.createElement("label");
          label.htmlFor = size;
          label.className = "size-label";
          label.textContent = size;

          sizeContainer.appendChild(radio);
          sizeContainer.appendChild(label);
        });

        const addToCartButton = document.querySelector(".popup-cta-btn");
        addToCartButton.setAttribute("data-product-id", product.id);
        addToCartButton.replaceWith(addToCartButton.cloneNode(true));
        const updatedAddToCartButton = document.querySelector(".popup-cta-btn");
        updatedAddToCartButton.addEventListener(
          "click",
          getAddToCartHandler(product, cart)
        );

        // Legger til klikkhendelse for å markere valgt størrelse
        const sizeLabels = document.querySelectorAll(".size-label");
        sizeLabels.forEach((label) => {
          label.addEventListener("click", function (e) {
            sizeLabels.forEach((l) => l.classList.remove("selected"));
            e.currentTarget.classList.add("selected");
          });
        });
        const womenProducts = products.filter(
          (product) => product.gender === "Male"
        );
        console.log(womenProducts);
      });

      ul.appendChild(li);
    });
    // Lukker popupen når brukeren klikker på 'close'-knappen
    document.querySelector(".close").addEventListener("click", function () {
      document.getElementById("productPopup").style.display = "none";
    });
  }
}

function getCartData() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function populateCartPage() {
  const cart = getCartData();
  const targetElement = document.getElementsByClassName("shopping-cart")[0];
  targetElement.innerHTML = "";

  const headers = [
    "Products",
    "",
    "Shipping date",
    "Sizes and colors",
    "Price",
    "Amount",
    "Total",
  ];
  headers.forEach((header) => {
    const h2 = document.createElement("h2");
    h2.innerText = header;
    targetElement.appendChild(h2);
  });
  cart.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-item");

    const elements = [
      item.title,
      "",
      "Not specified",
      `Size: ${item.size}, Color: ${item.color}`,
      `$${item.price}`,
      "1",
      `$${item.price}`,
    ];
    elements.forEach((el) => {
      const div = document.createElement("div");
      div.innerText = el;
      productDiv.appendChild(div);
    });

    targetElement.appendChild(productDiv);
  });
}

export function populateDropdownCart() {
  const cart = getCartData();
  const targetElement = document.getElementById("cart-dropdown");
  let itemsHTML = "";
  let total = 0;

  cart.forEach((item) => {
    itemsHTML += `
        <li>
        <img src="${item.image}" alt="${item.title}" width="60">
        <p class="cart-item-title">${item.title}</p><p class="cart-item-size">Size: ${item.size}</p><p class="cart-item-color">Color: ${item.color}</p>
        <span class="price">$${item.price}</span>
        </li>`;
    total += item.price;
  });
  let formattedTotal = parseFloat(total.toFixed(2));
  document.getElementById("cart-item-count").textContent = cart.length;
  document.getElementById("cart-total").textContent = formattedTotal;
  targetElement.innerHTML = itemsHTML;
}

/* export function populateCartItems() {
  if (window.location.pathname.includes("cart.html")) {
    populateCartPage();
  } else {
    populateDropdownCart();
  }
} */

export function toggleCartDropdown() {
  const cartDropdown = document.getElementById("cart-dropdown");
  if (cartDropdown.classList.contains("cart-dropdown-hidden")) {
    populateCartItems();
    cartDropdown.classList.remove("cart-dropdown-hidden");
    cartDropdown.classList.add("cart-dropdown-visible");
  } else {
    cartDropdown.classList.remove("cart-dropdown-visible");
    cartDropdown.classList.add("cart-dropdown-hidden");
  }
}

export function populateCartItems() {
  console.log("Entering populateCartItems");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart from localStorage: ", cart);
  document.getElementById("cart-count").textContent = cart.length;
  console.log(cart);
  console.log("populateCartItems called");
  let itemsHTML = "";
  let total = 0;
  let itemCount = 0;

  let targetElement;
  if (window.location.pathname.includes("cart.html")) {
    console.log("Working with cart.html");
    targetElement = document.getElementsByClassName("shopping-cart")[0];

    targetElement.innerHTML = "";

    const headers = [
      "Products",
      "",
      "Shipping date",
      "Sizes and colors",
      "Price",
      "Amount",
      "Total",
    ];
    headers.forEach((header) => {
      const h2 = document.createElement("h2");
      h2.innerText = header;
      targetElement.appendChild(h2);
    });

    cart.forEach((item) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");

      const elements = [
        item.title,
        "",
        "Not specified",
        `Size: ${item.size}, Color: ${item.color}`,
        `$${item.price}`,
        "1",
        `$${item.price}`,
      ];
      elements.forEach((el) => {
        const div = document.createElement("div");
        div.innerText = el;
        productDiv.appendChild(div);
      });

      targetElement.appendChild(productDiv);
    });
  } else {
    console.log("Working with dropdown cart");
    targetElement = document.getElementById("shopping-cart");
    cart.forEach((item) => {
      itemsHTML += `
                  <li>
                  <img src="${item.image}" alt="${item.title}" width="60">
                  <p class="cart-item-title">${item.title}</p><p class="cart-item-size">Size: ${item.size}</p><p class="cart-item-color">Color: ${item.color}</p>
                  <span class="price">$${item.price}</span>
                  </li>`;
      total += item.price;
      itemCount++;
    });
    const cartItems = document.getElementById("cart-items");
    let formattedTotal = parseFloat(total.toFixed(2));
    document.getElementById("cart-item-count").textContent = itemCount;
    document.getElementById("cart-total").textContent = formattedTotal;
    cartItems.innerHTML = itemsHTML;
    document.getElementById("cart-count").textContent = itemCount;
  }
}
