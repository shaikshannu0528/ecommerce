let renderData = document.querySelector(".renderData");
let renderCartData = document.querySelector(".renderCartData");
let availableCategories = [];
function fetchCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categories => {
            availableCategories = categories;
            renderCategoryButtons(categories);
        });
}
function renderCategoryButtons(categories) {
    const categoryButtonsContainer = document.querySelector(".category-buttons");
    categoryButtonsContainer.innerHTML = '';  
    categories.forEach(category => {
        let categoryButton = document.createElement("button");
        categoryButton.textContent = category;
        categoryButton.setAttribute("data-category", category);
        categoryButton.addEventListener("click", () => {
            fetchProductsByCategory(category); 
        });
        categoryButtonsContainer.appendChild(categoryButton);
    });
}
function fetchProductsByCategory(category) {
    fetch(https://fakestoreapi.com/products/category/${category})
        .then(res => res.json())
        .then(products => {
            renderProducts(products);
        });
}
function fetchInitialProducts() {
    const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
    const promises = categories.map(category => 
        fetch(https://fakestoreapi.com/products/category/${category})
            .then(res => res.json())
    );
    Promise.all(promises).then(results => {
        let combinedProducts = [];
        results.forEach(productArray => {
            combinedProducts = combinedProducts.concat(productArray.slice(0, 3));  
        });
        renderProducts(combinedProducts);  
    });
}
function renderProducts(products) {
    renderData.innerHTML = "";
    products.forEach(product => {
        let productCard = document.createElement("div");
        productCard.setAttribute("class", "product-card");

        let productImg = document.createElement("img");
        productImg.setAttribute("src", product.image);
        productImg.setAttribute("class", "myImages");

        let productTitle = document.createElement("p");
        productTitle.textContent = product.title;

        let productPrice = document.createElement("p");
        productPrice.textContent = $${product.price};

        let addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add to cart";
        addToCartBtn.addEventListener("click", () => addToCart(product));

        productCard.appendChild(productImg);
        productCard.appendChild(productTitle);
        productCard.appendChild(productPrice);
        productCard.appendChild(addToCartBtn);

        renderData.appendChild(productCard);
    });
}
function addToCart(product) {
    let cartItem = document.createElement("div");
    cartItem.setAttribute("class", "cart-item");

    let cartImg = document.createElement("img");
    cartImg.setAttribute("src", product.image);
    cartImg.setAttribute("class", "cartImgElement");

    let cartTitle = document.createElement("p");
    cartTitle.textContent = product.title;

    let cartPrice = document.createElement("p");
    cartPrice.textContent = $${product.price};

    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "remove-btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
        renderCartData.removeChild(cartItem);
    });

    cartItem.appendChild(cartImg);
    cartItem.appendChild(cartTitle);
    cartItem.appendChild(cartPrice);
    cartItem.appendChild(removeBtn);

    renderCartData.appendChild(cartItem);
}
document.querySelector(".cart-icon").addEventListener("click", () => {
    document.getElementById("cartSection").scrollIntoView({ behavior: "smooth" });
});
document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
    fetchInitialProducts(); 
});
