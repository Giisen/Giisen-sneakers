const label = document.getElementById("label");
const shopC = document.getElementById("shopping-cart");
const proddata = shopItemsData;
const prodlist = document.querySelector("#products");

let shoppingCart = JSON.parse(localStorage.getItem("localStorageData")) || [];

const totalItemsInCart = () => {
  let cartTotal = document.getElementById("cartAmount");
  cartTotal.innerHTML =
    "Items" + " " + shoppingCart.map((x) => x.item).reduce((x, y) => x + y, 0);
};

totalItemsInCart();

function generateCart() {
  // while (shoppingCart.length > 0) {
  //   shoppingCart.children[0].remove();
  // }

  console.log(shoppingCart.children);

  for (const prod of shoppingCart) {
    //Skapa element
    const card = document.createElement("li");
    const cardheader = document.createElement("div");
    const cardbody = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardText = document.createElement("div");
    const cardPrice = document.createElement("div");
    const cardfooter = document.createElement("div");
    const cardItems = document.createElement("div");
    const cardAdd = document.createElement("btn");
    const cardRemove = document.createElement("btn");

    //Styla Element
    card.classList.add("card", "mb-2", "cursor-pointer");
    cardheader.classList.add("card-header", "bg-info", "fw-bold");
    cardbody.classList.add("card-body");
    cardText.classList.add("card-text");
    cardPrice.classList.add("card-price");
    cardfooter.classList.add("card-footer", "fw-bold");
    cardItems.classList.add("fw-bold");
    cardAdd.classList.add("btn", "btn-outline-primary", "fw-bolder");
    cardRemove.classList.add("btn", "btn-outline-primary", "fw-bolder");
    cardImg.style.width = "220px";
    cardImg.style.height = "220px";
    cardImg.alt = "${id.name}";

    // innehåll i element

    cardheader.innerText = prod.name;
    cardPrice.innerText =
      "Total item cost: " + prod.price * prod.item + " " + "kr";
    cardImg.src = prod.img;
    cardItems.innerText = prod.item + " " + "st";
    cardAdd.innerText = "+";
    cardRemove.innerText = "-";

    //sätta event på element
    cardAdd.onclick = () => {
      addOneItem(prod.id);
    };

    cardRemove.onclick = () => {
      removeOneItem(prod.id);
    };

    //Lägg till element i dom
    cardheader.append(cardPrice);
    cardfooter.append(cardRemove, cardItems, cardAdd, cardPrice);
    cardbody.append(cardImg);
    card.append(cardheader, cardbody, cardfooter);
    prodlist.append(card);
  }
}
generateCart();

let addOneItem = (id) => {
  let selectedItem = id;
  let search = shoppingCart.find((x) => x.id == selectedItem);
  let sneaker = shopItemsData.find((x) => x.id == selectedItem);
  if (search === undefined) {
    shoppingCart.push({
      id: selectedItem.id,
      price: sneaker.price,
      name: sneaker.name,
      img: sneaker.img,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(selectedItem);
  generateCart();
  localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
};

let removeOneItem = (id) => {
  let selectedItem = id;
  let search = shoppingCart.find((x) => x.id == selectedItem);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem);
  shoppingCart = shoppingCart.filter((x) => x.item !== 0);
  console.log(selectedItem);
  localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
};

const update = (id) => {
  let search = shoppingCart.find((x) => x.id == id);
  location.reload();
  //document.getElementById(search.id).innerHTML = search.item;
  totalItemsInCart();
  TotalCartAmount();
};

let TotalCartAmount = () => {
  if (shoppingCart.length !== 0) {
    let amount = shoppingCart
      .map((x) => {
        let { item, id } = x;
        const search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
        <h2>Total cost: ${amount} kr</h2>
        <button id="checkoutbutton" class="checkoutbutton">Checkout</button>
        `;
  } else {
    return;
  }
};
TotalCartAmount();

const clearCart = () => {
  shoppingCart = [];
  generateCartItems();
  totalItemsInCart();
  localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
};

// Modal

const modal = document.getElementById("myModal");

const btn = document.getElementById("checkoutbutton");

const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
  clearCart();
};

span.onclick = function () {
  modal.style.display = "none";
  clearCart();
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    clearCart();
  }
};
