import { getAddToCartHandler } from "./cart.js";
import { getCart, getFromLocalStorage } from "./storage.js";
import { handleCloseButtonClick, closeCartDropDown } from "./eventListeners.js";

const cartItemsElement = document.getElementById("cart-items");
const cartItemCountElement = document.getElementById("cart-item-count");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById("cart-count");
const cartDropdownElement = document.getElementById("cart-dropdown");

function updateCartUI(itemCount, formattedTotal, itemsHTML) {
  cartItemCountElement.textContent = itemCount;
  cartTotalElement.textContent = formattedTotal;
  cartCountElement.textContent = itemCount;
  cartItemsElement.innerHTML = itemsHTML;
}

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
        // Lukker dropdownmenyen
        closeCartDropDown();
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
        const addCartButtonHandlers = new Map();

        // Sjekk om det er en tidligere event listener og fjern den
        if (addCartButtonHandlers.has(product.id)) {
          addToCartButton.removeEventListener(
            "click",
            addCartButtonHandlers.get(product.id)
          );
        }

        // Opprett en ny event listener og legg til den i map-en
        const newHandler = getAddToCartHandler(product, getCart);
        addCartButtonHandlers.set(product.id, newHandler);

        // Legg til den nye event listener til addToCartButton
        addToCartButton.addEventListener("click", newHandler);

        // Legger til klikkhendelse for å markere valgt størrelse
        const sizeLabels = document.querySelectorAll(".size-label");
        sizeLabels.forEach((label) => {
          label.addEventListener("click", function (e) {
            sizeLabels.forEach((l) => l.classList.remove("selected"));
            e.currentTarget.classList.add("selected");
          });
        });
        const womenProducts = products.filter(
          (product) => product.gender === "Female"
        );
        console.log(womenProducts);
      });

      ul.appendChild(li);
    });
    // Lukker popupen når brukeren klikker på 'close'-knappen
    document
      .querySelector(".close")
      .addEventListener("click", handleCloseButtonClick);
  }
}

export function populateCartPage() {
  const cart = getCart();
  const targetElement = document.getElementsByClassName(
    "shopping-cart-fullpage"
  )[0];
  targetElement.innerHTML = "";

  cart.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-item", "flex-container");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("product-image");
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    imgDiv.appendChild(img);

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("product-details");
    const title = document.createElement("h3");
    title.innerText = item.title;
    const sizeColor = document.createElement("p");
    sizeColor.innerText = `Size: ${item.size}, Color: ${item.color}`;
    detailsDiv.appendChild(title);
    detailsDiv.appendChild(sizeColor);

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("product-price");
    priceDiv.innerText = `$${item.price}`;

    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("product-quantity");

    quantityDiv.innerText = item.quantity;

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("product-total");
    totalDiv.innerText = `$${item.price * item.quantity}`; // Total based on quantity

    productDiv.appendChild(imgDiv);
    productDiv.appendChild(detailsDiv);
    productDiv.appendChild(priceDiv);
    productDiv.appendChild(quantityDiv);
    productDiv.appendChild(totalDiv);

    targetElement.appendChild(productDiv);
  });
}

export function toggleCartDropdown() {
  if (cartDropdownElement.classList.contains("cart-dropdown-hidden")) {
    cartDropdownElement.classList.remove("cart-dropdown-hidden");
    cartDropdownElement.classList.add("cart-dropdown-visible");
    populateCartItems();
  } else {
    cartDropdownElement.classList.remove("cart-dropdown-visible");
    cartDropdownElement.classList.add("cart-dropdown-hidden");
  }
}

export function populateCartItems() {
  console.log("Entering populateCartItems");
  const cart = getCart();
  console.log("Cart from localStorage: ", cart);
  document.getElementById("cart-count").textContent = cart.length;

  console.log(cart);
  console.log("populateCartItems called");

  let targetElement, itemsHTML;
  let total = cart.reduce((acc, item) => acc + item.price, 0);
  let itemCount = cart.length;

  let formattedTotal = `$${total.toFixed(2)}`;

  if (window.location.pathname.includes("cart.html")) {
    targetElement = document.querySelector(".shopping-cart");
    targetElement.innerHTML = createCartHeadersHTML();

    itemsHTML = cart.map((item) => createCartItemHTML(item)).join("");
    updateCartUI(itemCount, formattedTotal, itemsHTML);
  } else {
    targetElement = cartItemsElement;
    itemsHTML = cart.map((item) => createDropdownItemHTML(item)).join("");
    updateCartUI(itemCount, formattedTotal, itemsHTML);
  }
}

function createCartHeadersHTML() {
  const headers = [
    "Products",
    "Shipping date",
    "Size and colors",
    "Price",
    "Amount",
    "Total",
  ];
  return headers.map((header) => `<h2>${header}</h2>`).join("");
}

function createCartItemHTML(item) {
  const elements = [
    item.title,
    "Not specified",
    `Size: ${item.size}, Color: ${item.color}`,
    `$${item.price}`,
    "1",
    `$${item.price}`,
  ];
  return `<div class="product-item">${elements
    .map((el) => `<div>${el}</div>`)
    .join("")}</div>`;
}

function createDropdownItemHTML(item) {
  return `
    <li>
      <img src="${item.image}" alt="${item.title}" width="60">
      <p class="cart-item-title">${item.title}</p>
      <p class="cart-item-size">Size: ${item.size}</p>
      <p class="cart-item-color">Color: ${item.color}</p>
      <span class="price">$${item.price}</span>
    </li>`;
}

export function setupCartPage() {
  generateProductCards(getFromLocalStorage("products"));
  updateCartUI();
}
