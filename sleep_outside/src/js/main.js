import { loadHeaderFooter, updateCartNumIcon } from "./utils.mjs";
import Alert from './Alert.js';

pageInit();

async function pageInit() {
  await loadHeaderFooter();
  updateCartNumIcon();
  const alert = new Alert();
  const mainElement = document.querySelector('main');
  mainElement.insertAdjacentHTML('afterbegin', alert.render());
}

