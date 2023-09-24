export function generateProductCards(products){
    const ul = document.querySelector('.card-container');
    ul.innerHTML = ''; // Tømmer listen hvis den allerede har elementer

    products.forEach((product) => {
        const li = document.createElement('li');

        // Splitte tittelen ved de to første mellomrommene

    const [firstWord, secondWord, ...remainingWords] = product.title.split(' ');
    const mainTitle = `${firstWord} ${secondWord}`;
    const subtitle = remainingWords.join(' ');

        li.innerHTML = `
            <a href="#" class="card card-${ul.children.length + 1}">
            <div class="product-placeholder" style="background-image: url('${product.image}');">
                <div class="product-btn cta-buttons">More info</div>
            </div>
            <div class="card-fav"></div>
            <h2>${mainTitle}</h2> <!-- Hovedtittel -->
            <h3>${subtitle}</h3> <!-- Undertittel -->
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            </a>
        `;
        
        ul.appendChild(li);
    });
}
