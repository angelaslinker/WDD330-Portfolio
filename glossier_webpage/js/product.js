var product = [];
var products = [];

function addItem(index) {
  products.push(product[index]);
  window.localStorage.setItem("products", JSON.stringify(products));
  console.log(products);

  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerText = "Item Added";
  document.body.appendChild(popup);

  setTimeout(() => {
    document.body.removeChild(popup);
  }, 1000);
}


(async function () {
  try
  {
    const response = await fetch('./json/products.json');
    const data = await response.json();
    // Filter products by ID
    const product1 = data.find(product => product.id === 1004);
    const product2 = data.find(product => product.id === 1002);
    const product3 = data.find(product => product.id === 1001);
    const product4 = data.find(product => product.id === 1000);

    // Assign product information to HTML elements
    const item1 = document.querySelector(".product1");
    const stock1 = [
      item1.querySelector("img").src = product1.image_link,
      item1.querySelector("h2").textContent = product1.name,
      item1.querySelector("p").textContent = `$${product1.price}`];
    product.push(stock1);


    const item2 = document.querySelector(".product2");
    const stock2 = [
      item2.querySelector("img").src = product2.image_link,
      item2.querySelector("h2").textContent = product2.name,
      item2.querySelector("p").textContent = `$${product2.price}`];
    product.push(stock2);

    const item3 = document.querySelector(".product3");
    const stock3 = [
      item3.querySelector("img").src = product3.image_link,
      item3.querySelector("h2").textContent = product3.name,
      item3.querySelector("p").textContent = `$${product3.price}`];
    product.push(stock3);

    const item4 = document.querySelector(".product4");
    const stock4 = [
      item4.querySelector("img").src = product4.image_link,
      item4.querySelector("h2").textContent = product4.name,
      item4.querySelector("p").textContent = `$${product4.price}`];
    product.push(stock4);


  } catch (error)
  {
    console.error(error);
  }
})();

