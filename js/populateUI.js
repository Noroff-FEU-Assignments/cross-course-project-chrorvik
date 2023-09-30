export function generateProductCards(products) {
  const ul = document.querySelector(".card-container");
  ul.innerHTML = ""; // Tømmer listen hvis den allerede har elementer

  products.forEach((product) => {
    const li = document.createElement("li");

    // Splitte tittelen ved de to første mellomrommene

    const [firstWord, secondWord, ...remainingWords] = product.title.split(" ");
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
      product.sizes.forEach(size => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = size;
        radio.name = 'size';
        radio.value = size;

        const label = document.createElement('label');
        label.htmlFor = size; 
        label.className = 'size-label';
        label.textContent = size;

        sizeContainer.appendChild(radio);
        sizeContainer.appendChild(label);
      });

      // Legger til klikkhendelse for å markere valgt størrelse
      const sizeLabels = document.querySelectorAll('.size-label');
      sizeLabels.forEach(label => {
        label.addEventListener('click', function(e) {
          sizeLabels.forEach(l => l.classList.remove('selected'));
          e.currentTarget.classList.add('selected');
        });
      });
    });

    ul.appendChild(li);
  });
  // Lukker popupen når brukeren klikker på 'close'-knappen
  document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("productPopup").style.display = "none";
  });
}

