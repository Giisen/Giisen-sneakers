let shoppingCart = JSON.parse(localStorage.getItem("localStorageData")) || [];

let addOneItem = (id) => {
  let selectedItem = id;
  let search = shoppingCart.find((x) => x.id == selectedItem.id);
  console.log(selectedItem);
  if (search === undefined) {
    shoppingCart.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

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

  localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
};

let update = (id) => {
  let search = shoppingCart.find((x) => x.id == id);
  document.getElementById(id).innerHTML = search.item;
  totalItemsInCart();
};

let totalItemsInCart = () => {
  let cartTotal = document.getElementById("cartAmount");
  cartTotal.innerHTML = shoppingCart
    .map((x) => x.item)
    .reduce((x, y) => x + y, 0);
};
totalItemsInCart();

// const buttons = document.getElementsByTagName("button");
// const result = document.getElementById("result");

// const buttonPressed = (e) => {
//   console.log(e.target.id);
// };

// for (let button of buttons) {
//   button.addEventListener("click", buttonPressed);
// }

const modal = document.getElementById("myModal");

const btn = document.getElementById("sneaker1");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  selectedId = btn.id;
  console.log("selectedid......." + selectedId);
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function getItemInfo() {
  const search = shopItemsData.find((x) => x.id === "sneaker1") || [];

  return `
      <div id=product-id-${search.id} class="item">
        
        <div class="details">
          <h3>${search.name}</h3>
          <p>${search.decription}</p>
        </div>
        
        
        <div class="price-quantity">
                <h2>${search.price} kr</h2>
        </div>


        <div class="buttons">
          <i onclick="removeOneItem(${search.id})" class="bi bi-dash-lg"></i>
          
          <div id=${search.id} class="quantity">
            ${search.item === undefined ? 0 : search.item}
          </div>
          
          <i onclick="addOneItem(${search.id})" class="bi bi-plus-lg"></i>
          
        </div>
      
      
      </div>
    `;
}

document.getElementById("modal-text").innerHTML = getItemInfo();
