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

const lista = document.getElementById("listaprodukter");

for (const produkter of shopItemsData) {
  const node = document.createElement("li");
  node.onclick = () => {
    getItemInfo(produkter.id);
  };
  const textnode = document.createTextNode(produkter.name);
  node.appendChild(textnode);

  document.getElementById("listaprodukter").appendChild(node);
  console.log(produkter.name);
}

function getItemInfo(id) {
  console.log(id);
  const search = shopItemsData.find((x) => x.id === id) || [];
  console.log(search.price);
  const modalText = document.getElementById("modal-text");
  modalText.innerHTML = `
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

  document.getElementById("myModal").style.display = "block";
}

const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

//When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
