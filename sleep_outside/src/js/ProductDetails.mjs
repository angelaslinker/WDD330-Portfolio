import {
  qs,
  setClick,
  updateCartNumIcon,
  currencyFormatter,
} from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

export default class productDetails {
  /**
   * Create a new instance of productDetails to handle product pages
   * @param {string} productId The id of the product to display
   * @param {object} dataSource An instance of ShoppingCart
   */
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.cart = new shoppingCart();
  }

  /**
   * Fetch the product, render the details to the page, and set the click action for
   * the add to cart button.
   */
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(this.product);
    setClick("#addToCart", () => this.cart.addToCart(this.product));
    setClick("#addToCart", updateCartNumIcon);
  }

  /**
   * Take the fetched product and process the details to display to the user.
   * @param {product} product The product to display
   */
  renderProductDetails(product) {
    document.title = `Sleep Outside | ${product.Name}`;
    const section = qs(".product-detail");
    section.insertAdjacentHTML("beforeEnd", productTemplate(product));
  }
}

/**
 *
 * @param {product} product The product to display
 * @returns An html formatted string to insert into the page
 */
function productTemplate(product) {
  const extraImages = product.Images.ExtraImages ?? [];
  const slideTemplate = (image, i) =>
    `<div class="slides fade"><img src="${image.Src}" alt="${image.Title}"></div>`;
  const dotTemplate = (image, i) =>
    `<span class="dot" data-index="${i + 1}" data-action="change"></span>`;
  return htmlTemplate(product)(extraImages.map(slideTemplate))(
    extraImages.map(dotTemplate)
  ).trim();
}

/**
 * A curried template function for building the product detail html
 * @param {*} item the product to display
 * @param {*} slides an array containing each slide
 * @param {*} dots an array containing each dot for the carousel
 * @returns An html formatted string for displaying product details
 */
const htmlTemplate = (item) => (slides) => (dots) =>
  `<h1>${item.Brand.Name}</h1>
  <h2 class="divider">${item.NameWithoutBrand}</h2>
  <div class="divider">
    <!-- Slideshow container -->
    <div class="carousel-container">
        <!-- Full-width images -->
        <div class="slides fade">
            <img src="${item.Images.PrimaryExtraLarge}" alt="${item.Name}"/>
        </div>
        ${slides.join("")}
        <!-- Next and previous buttons -->
        <a class="prev" data-index="-1" data-action="slide">&#10094;</a>
        <a class="next" data-index="1" data-action="slide">&#10095;</a>
        <br>
        <!-- The dots/circles -->
        <div style="text-align:center">
          <span class="dot" data-index="0" data-action="change"></span>${dots.join("")}
        </div>
      </div>
      <!-- Slideshow code modified from https://www.w3schools.com/howto/howto_js_slideshow.asp -->
    </div>
  </div>
  <p class="product-card__price">List Price: ${currencyFormatter(
    item.ListPrice
  )}</p>
  <p class="product-card__price">Final Price: ${currencyFormatter(
    item.FinalPrice
  )}</p>
  <p class="product-card__price">Total Discount: ${currencyFormatter(
    item.ListPrice - item.FinalPrice
  )}</p>
  <p class="product__color">${item.Colors[0].ColorName}</p>
  <p class="product__description">${item.DescriptionHtmlSimple}</p>
  <div class="product-detail__add"><button id="addToCart" data-id="${
    item.Id
  }">Add to Cart</button></div>`;

