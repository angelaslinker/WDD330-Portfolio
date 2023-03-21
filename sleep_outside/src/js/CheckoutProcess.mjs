import { getLocalStorage, qs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  /**
   * Create a new CheckoutProcess object for handling order checkout.
   * @param {string} key The key for the cart in localstorage
   * @param {object} outputSelector the DOM element for displaying the order summary
   */
  constructor(key, outputSelector) {
    this.externalServices = new ExternalServices();
    this.key = key;
    this.outputSelector = outputSelector;
    this.cart = getLocalStorage(this.key);
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.numOfItems = 0;
  }

  /**
   * Calculate the item summary and display it in the order summary
   */
  init() {
    this.calculateItemSummary();
    this.calculateOrdertotal();
    // display the totals.
    this.displayOrderTotals()
  }

  /**
   * Calculate and display the total amount of the items
   * in the cart, and the number of items.
   */
  calculateItemSummary() {
    const cart = getLocalStorage("so-cart");
    cart.forEach((item) => {
      this.numOfItems += item.Quantity;
      this.itemTotal += item.Quantity * item.FinalPrice;
    });
  }

  /**
   * Calculate the order's charges
   */
  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = this.numOfItems === 0 ? 0 : (this.numOfItems - 1) * 2 + 10;
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
  }

  /**
   * Display the order details in the Order Summary Section
   */
  displayOrderTotals() {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    const body = `
    <p>Item Subtotal (${this.numOfItems}) <span>${formatter.format(
      this.itemTotal
    )}</span></p>
    <p>Shipping Estimate <span>${formatter.format(this.shipping)}</span></p>
    <p>Tax <span>${formatter.format(this.tax)}</span></p>
    <strong><p>Order Total <span>${formatter.format(
      this.orderTotal
    )}</span></p></strong>`;

    // once the totals are all calculated display them in the order summary page
    qs("#orderSummary").insertAdjacentHTML("beforeEnd", body);
  }

  /**
   * Collect the user input from the form and submit
   * it to the remote server.
   * @param {object} formElem The form being submitted
   */
  async checkout(formElem) {
    // Hide the order messages
    qs("#success-message").style.display = "none";
    qs("#failure-message").style.display = "none";

    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    let JSONForm = formDataToJSON(formElem),
      cart = getLocalStorage("so-cart"),
      items = packageItems(cart),
      checkoutObj = {
        orderDate: new Date(),
        ...JSONForm,
        items: items,
        orderTotal: this.orderTotal,
        shipping: this.shipping,
        tax: this.tax,
      };

    let response;

    try {
      // call the checkout method in our ExternalServices module and send it our data object.
      response = await this.externalServices.checkout(checkoutObj);
    } catch(err) {
      console.log(err.message);
    }

    // Let the user know their order was placed successfully
    if (response) {
      qs("#success-message").style.display = "block";
    } else {
      qs("#failure-message").style.display = "block";
    }
  }
}

/**
 * Template that generates each line item in the order
 * @param {product} product The product to format
 * @returns a product entry to include in the order
 */
function postItemTemplate(product) {
  return {
    id: product.Id,
    name: product.Name,
    price: product.FinalPrice,
    quantity: product.Quantity,
  };
}

/**
 * Collects the items in the cart and formats them
 * to submitted with the form
 * @returns an array of cart items ready to be
 * sent with the order
 */
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  return items.map(postItemTemplate);
}

/**
 * Collects the form data from the page and converts it
 * into a JSON compatible object.
 * @param {object} formElement The form to collect data from
 * @returns a JSON-like object containing the form data
 */
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
