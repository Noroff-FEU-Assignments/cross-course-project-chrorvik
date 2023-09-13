export function generateProductCards(products){
    const ul = document.querySelector('.card-container');
    ul.innerHTML = ''; // Tømmer listen hvis den allerede har elementer

    products.forEach((product) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <a href="#" class="card card-${ul.children.length + 1}">
            <div class="product-placeholder">
                <div class="product-btn cta-buttons">More info</div>
            </div>
            <div class="card-fav"></div>
            <h2>${product.title}</h2>
            <h3>${product.description}</h3>
            <p>${product.price} NOK</p>
            </a>
        `;
        
        ul.appendChild(li);
    });
}
