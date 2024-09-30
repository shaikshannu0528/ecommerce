let renderData = document.querySelector(".renderData");
let renderCartData = document.querySelector(".renderCartData");

function renderProducts(products) {
    renderData.innerHTML = "";
    products.forEach((ele) => {
        let productCard = document.createElement("div");
        productCard.setAttribute("class", "product-card");

        let createImgEle = document.createElement("img");
        createImgEle.setAttribute("src", ele.image);
        createImgEle.setAttribute("class", "myImages");

        let createTitle = document.createElement("p");
        createTitle.textContent = ele.title;

        let createPriceEle = document.createElement("p");
        createPriceEle.textContent = `$${ele.price}`;

        let btnEle = document.createElement("button");
        btnEle.textContent = "Add to cart";

        productCard.appendChild(createImgEle);
        productCard.appendChild(createTitle);
        productCard.appendChild(createPriceEle);
        productCard.appendChild(btnEle);

        renderData.appendChild(productCard);

        btnEle.addEventListener("click", () => addTocart(ele.image, ele.title, ele.price));
    });
}

function addTocart(img, title, price) {
    let cartItem = document.createElement("div");
    cartItem.setAttribute("class", "cart-item");

    let cartImgEle = document.createElement("img");
    cartImgEle.setAttribute("src", img);
    cartImgEle.setAttribute("class", "cartImgElement");

    let cartTitleEle = document.createElement("p");
    cartTitleEle.textContent = title;

    let cartPriceEle = document.createElement("p");
    cartPriceEle.textContent = `$${price}`;

    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "remove-btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
        renderCartData.removeChild(cartItem);
    });

    cartItem.appendChild(cartImgEle);
    cartItem.appendChild(cartTitleEle);
    cartItem.appendChild(cartPriceEle);
    cartItem.appendChild(removeBtn);

    renderCartData.appendChild(cartItem);
}

document.querySelector(".cart-icon").addEventListener("click", () => {
    document.getElementById("cartSection").scrollIntoView({ behavior: "smooth" });
});

function fetchJewelry() {
    fetch('https://fakestoreapi.com/products/category/jewelery')
        .then(res => res.json())
        .then(json => {
            renderProducts(json);
        });
}

document.getElementById("jewelryBtn").addEventListener("click", () => {
    fetchJewelry();  // Fix for switching to jewelry
});

document.getElementById("clothesBtn").addEventListener("click", () => {
    fetch("https://fakestoreapi.com/products/category/women's%20clothing")
        .then(res => res.json())
        .then(json => {
            renderProducts(json);
        });
});

document.addEventListener("DOMContentLoaded", () => {
    fetchJewelry();
});
