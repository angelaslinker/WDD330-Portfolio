import { qs, loadHeaderFooter, setClick, updateCartNumIcon } from "./utils.mjs";
import checkoutProcess from "./CheckoutProcess.mjs";

const summary = qs("#order-summary"),
  checkout = new checkoutProcess("so-cart", summary);

//load page functinos
pageInit();

/**
 * Wrapper for our page functionality
 */
async function pageInit() {
  // Await loading header and fooder so cart icon updates apprpriately
  await loadHeaderFooter();
  updateCartNumIcon();

  // Calculate the order and display the summary
  checkout.init();

  // Listener for submit button
  qs("#checkout").addEventListener("click", (e) => {
    e.preventDefault();
    var myForm = document.forms[0];
    var chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if(chk_status) 
      checkout.checkout();
  });
}
