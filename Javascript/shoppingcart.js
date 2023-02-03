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
  while (shoppingCart.childElementCount > 0) {
    shoppingCart.children[0].remove();
  }

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
    const cardAdd = document.createElement("div");
    const cardRemove = document.createElement("div");

    //Styla Element
    card.classList.add("card", "mb-2", "cursor-pointer");
    cardheader.classList.add("card-header", "bg-info", "fw-bold");
    cardbody.classList.add("card-body");
    cardText.classList.add("card-text");
    cardPrice.classList.add("card-price");
    cardfooter.classList.add("card-footer", "fw-bold");
    cardItems.classList.add("card-footer");
    cardAdd.classList.add("card-footer");
    cardRemove.classList.add("card-footer");

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

// let generateCartItems = () => {
//   if (shoppingCart.length !== 0) {
//     return (shopC.innerHTML = shoppingCart
//       .map((x) => {
//         const { id, item } = x;
//         const search = shopItemsData.find((y) => y.id === id) || [];
//         return `
//          <div class="cart-item">
//          <i onclick="removeItem(${id})"class="fw-bold">X</i>

//             <img width="100px"src="${search.img}" alt="image"/>
//          <div class="details">

//         <div class="title-price-x">

//             <h4 class="title-price">
//             <p>${search.name}</p>
//             <p class="card-price">${search.price} kr</p>
//             </h4>
//         </div>

//         <div class="buttons">
//             <i onclick="removeOneItem(${id})" class="bi bi-dash-lg">-</i>
//             <div id=${id} class="quantity">${item}</div>
//             <i onclick="addOneItem(${id})" class="bi bi-plus-lg">+</i>
//         </div>

//             <h3 class="card-totalprice">${item * search.price} kr</h3>
//         </div>
//     </div>
//             `;
//       })
//       .join(""));
//   } else {
//     shopC.innerHTML = ``;
//     label.innerHTML = `
//         <h2> Shoppingcart is empty</h2>
//         <a href="/index.html">
//         <button class="HomeButton">Home</button>
//         </a>
//         `;
//   }
// };
// generateCartItems();

function addItemToCart(id) {
  console.log(id);
  let sneaker = shopItemsData.find((x) => x.id == id);
  let cart = shopItemsData.find((x) => x.id == id);
  console.log(cart);
  if (cart === undefined) {
    shoppingCart.push({
      id: sneaker.id,
      price: sneaker.price,
      name: sneaker.name,
      img: sneaker.img,
      item: 1,
    });
  } else {
    sneaker.item += 1;
  }
  localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
}

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
  generateCart();
  update(selectedItem);
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

  //document.getElementById("cardItems").innerHTML = search.item;
  totalItemsInCart();
  TotalCartAmount();
};

// const removeItem = (id) => {
//   let selectedItem = id;
//   shoppingCart = shoppingCart.filter((x) => x.id !== selectedItem.id);
//   generateCartItems();
//   TotalCartAmount();
//   totalItemsInCart();
//   localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
// };

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

var modal = document.getElementById("myModal");

var btn = document.getElementById("checkoutbutton");

var span = document.getElementsByClassName("close")[0];

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
