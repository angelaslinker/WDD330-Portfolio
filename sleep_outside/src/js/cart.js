import { loadHeaderFooter, qs, updateCartNumIcon } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

const cart = new shoppingCart();
pageInit();

//Listener for removing items from the cart
qs(".product-list").addEventListener("click", (e) => {
  const target = e.target;
  //only call remove from cart if the clicked element has a data-function value of"remove"
  if (target.dataset.function === "remove") {
    cart.removeFromCart(target.dataset.id);
  }
});

//Create a separate listener for changing quantities
qs(".product-list").addEventListener("change", (e) => {
  let selector = e.target;
  let id = selector.dataset.id;
  let input = qs(`#quantity-plus-${id}`);

  // If the input is greater than 10
  if (id && selector.value == "10+") {
    //Hide the default select and display the number input
    selector.style.display = "none";
    input.style.display = "block";

    //Do not render the cart unless the quantity is changed
    if (input.value > 0) {
      cart.changeQuantity(id, input.value);
    }

    return;
  }

  cart.changeQuantity(id, selector.value);
});

async function pageInit() {
  await loadHeaderFooter();
  updateCartNumIcon();
  cart.renderCartContents();
}
