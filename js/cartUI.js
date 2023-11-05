import { getAddToCartHandler } from "./cart.js";
import { getFromLocalStorage } from "./storage.js";
import { closeCartDropDown } from "./eventListeners.js";

let cart = getFromLocalStorage("cart") || [];

export function generateProductCards(products) {
  const ul = document.querySelector(".card-container");
  if (ul !== null) {
    ul.innerHTML = "";

    products.forEach((product) => {
      const li = document.createElement("li");

      // Split the title at the first two spaces

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
      // Adds click event on 'More info' button
      li.querySelector(".card").addEventListener("click", function () {
        closeCartDropDown();
        // Opens the popup
        document.getElementById("productPopup").style.display = "block";

        // Inserts product info in the popup
        document.getElementById("popupTitle").innerText = `${subtitle}`;
        document.getElementById("popupImage").src = product.image;
        document.getElementById("popupColor").innerText = product.baseColor;
        document.getElementById("popupGender").innerText = product.gender;
        document.getElementById("popupDescription").innerText =
          product.description;
        document.getElementById("popupPrice").innerText = "$" + product.price;

        const sizeContainer = document.getElementById("popupSize");
        sizeContainer.innerHTML = "";
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

        // Adds click event to highlight selected size
        const sizeLabels = document.querySelectorAll(".size-label");
        sizeLabels.forEach((label) => {
          label.addEventListener("click", function (e) {
            sizeLabels.forEach((l) => l.classList.remove("selected"));
            e.currentTarget.classList.add("selected");
          });
        });
      });

      ul.appendChild(li);
    });
    // Closes the popup when the user clicks the 'close' button
    document.querySelector(".close").addEventListener("click", function () {
      document.getElementById("productPopup").style.display = "none";
    });
  }
}

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
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
  let itemsHTML = "";
  let total = 0;
  let itemCount = 0;

  let targetElement;
  if (window.location.pathname.includes("cart.html")) {
    targetElement = document.getElementsByClassName("shopping-cart")[0];
    targetElement.innerHTML = "";

    const headers = [
      "Product",
      "",
      "Shipping date",
      "Sizes and colors",
      "Price",
      "Amount",
      "Total",
    ];

    const table = document.createElement("table");

    const headerRow = document.createElement("tr");
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.innerText = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    cart.forEach((item) => {
      const row = document.createElement("tr");

      const titleCell = document.createElement("td");
      const img = document.createElement("img");
      titleCell.className = "product-cell";
      img.src = item.image;
      img.style.width = "100px";
      titleCell.appendChild(img);
      const titleText = document.createTextNode(item.title);
      titleCell.appendChild(titleText);

      const elements = [
        titleCell,
        document.createTextNode(""),
        document.createTextNode("Not specified"),
        document.createTextNode(`Size: ${item.size}, Color: ${item.color}`),
        document.createTextNode(item.price),
        document.createTextNode("1"),
        document.createTextNode(item.price),
      ];

      elements.forEach((element) => {
        const td = document.createElement("td");
        td.appendChild(element);
        row.appendChild(td);
      });

      table.appendChild(row);
    });

    targetElement.appendChild(table);
  } else {
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
