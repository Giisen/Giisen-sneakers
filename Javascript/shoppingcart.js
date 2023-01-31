const label = document.getElementById("label");
const shopC = document.getElementById("shopping-cart");

let shoppingCart = JSON.parse(localStorage.getItem("localStorageData")) || [];

const totalItemsInCart = () => {
  let cartTotal = document.getElementById("cartAmount");
  cartTotal.innerHTML = shoppingCart
    .map((x) => x.item)
    .reduce((x, y) => x + y, 0);
};

totalItemsInCart();

let generateCartItems = () => {
  if (shoppingCart.length !== 0) {
    return (shopC.innerHTML = shoppingCart
      .map((x) => {
        const { id, item } = x;
        const search = shopItemsData.find((y) => y.id === id) || [];
        return `
         <div class="cart-item">
            <img width="100px"src="${search.img}" alt="image"/>
         <div class="details">

        <div class="title-price-x">
            <h4 class="title-price">
            <p>${search.name}</p>
            <p class="card-price">${search.price} kr</p>
            </h4>
            <i onclick="removeItem(${id})"class="bi bi-x-lg"></i>
        </div>

        <div class="buttons">
            <i onclick="removeOneItem(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${item}</div>
            <i onclick="addOneItem(${id})" class="bi bi-plus-lg"></i>
        </div>

            <h3 class="card-totalprice">${item * search.price} kr</h3>
        </div>
    </div>
            `;
      })
      .join(""));
  } else {
    shopC.innerHTML = ``;
    label.innerHTML = `
        <h2> Shoppingcart is empty</h2>
        <a href="/index.html"> 
        <button class="HomeButton">Home</button> 
        </a> 
        `;
  }
};
generateCartItems();

let addOneItem = (id) => {
  let selectedItem = id;
  let search = shoppingCart.find((x) => x.id == selectedItem.id);

  if (search === undefined) {
    shoppingCart.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
};

let removeOneItem = (id) => {
  let selectedItem = id;
  let search = shoppingCart.find((x) => x.id == selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  shoppingCart = shoppingCart.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
};

let update = (id) => {
  let search = shoppingCart.find((x) => x.id == id);
  document.getElementById(id).innerHTML = search.item;
  totalItemsInCart();
  TotalCartAmount();
};

const removeItem = (id) => {
  let selectedItem = id;
  shoppingCart = shoppingCart.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalCartAmount();
  totalItemsInCart();
  localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
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

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("checkoutbutton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  clearCart();
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  clearCart();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    clearCart();
  }
};
