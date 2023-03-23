const cartPopup = document.getElementById("cart-popup");
const cartDialog = document.getElementById("cart-dialog");
const closeDialog = document.getElementById("close-dialog");
const cartSection = document.getElementById("cart");
const isEmptyDiv = document.getElementById("isEmpty");

// Define the cart items array
let cartItems = [];

cartPopup.addEventListener("click", function (event) {
    event.preventDefault();

    // Call a function to update the cart content
    updateCart();

    cartDialog.showModal();
});

closeDialog.addEventListener("click", function () {
    cartDialog.close();
});

function updateCart() {
    // Clear the cart section and hide the "empty" message
    cartSection.innerHTML = "";
    isEmptyDiv.style.display = "none";

    // Get the cart items from local storage
    const products = localStorage.getItem("products");
    const cart = JSON.parse(products);

    // If the cart is empty, show the "empty" message
    if (!cart || cart.length === 0)
    {
        isEmptyDiv.style.display = "block";
        return;
    }

    // Loop through the cart items and create a new element for each one
    for (let i = 0; i < cart.length; i++)
    {
        let image = cart[i][0];
        let name = cart[i][1];
        let price = cart[i][2];

        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");

        const img = document.createElement("img");
        img.src = image;
        img.classList.add("cart-item-image");
        cartItemElement.appendChild(img);

        const product_name = document.createElement("h2");
        product_name.textContent = name;
        product_name.classList.add("cart-item-name");
        cartItemElement.appendChild(product_name);

        const product_price = document.createElement("p");
        product_price.textContent = price;
        product_price.classList.add("cart-item-price");
        cartItemElement.appendChild(product_price);

        cartSection.appendChild(cartItemElement);

    }
}


// If the cart is empty, show the "empty" message
if (cartItems.length === 0)
{
    isEmptyDiv.style.display = "block";
}
